import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://chapinismos.org";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_FILE = new URL("../public/indexnow-key.txt", import.meta.url);
const URLS_PER_REQUEST = 10_000;

function getLocations(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/gs)].map(([, location]) =>
    location
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", '"')
      .replaceAll("&apos;", "'")
  );
}

async function fetchText(url, fetchImpl) {
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url} (HTTP ${response.status})`);
  }

  return response.text();
}

export async function submitSiteToIndexNow({ siteUrl = SITE_URL, key, fetchImpl = fetch } = {}) {
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key ?? "")) {
    throw new Error("INDEXNOW_KEY must be 8–128 alphanumeric characters or dashes");
  }

  const site = new URL(siteUrl);
  const sitemapIndexUrl = new URL("sitemap-index.xml", `${site.origin}/`);
  const sitemapLocations = getLocations(await fetchText(sitemapIndexUrl, fetchImpl));
  if (sitemapLocations.length === 0) {
    throw new Error(`No sitemap files found in ${sitemapIndexUrl}`);
  }

  const urls = new Set();
  for (const sitemapLocation of sitemapLocations) {
    const sitemapUrl = new URL(sitemapLocation);
    if (sitemapUrl.origin !== site.origin) {
      continue;
    }

    const sitemapXml = await fetchText(sitemapUrl, fetchImpl);
    for (const location of getLocations(sitemapXml)) {
      const url = new URL(location);
      if (url.origin === site.origin) {
        urls.add(url.href);
      }
    }
  }

  if (urls.size === 0) {
    throw new Error(`No site URLs found in ${sitemapIndexUrl}`);
  }

  const urlList = [...urls];
  const keyLocation = new URL("indexnow-key.txt", `${site.origin}/`).href;
  for (let index = 0; index < urlList.length; index += URLS_PER_REQUEST) {
    const response = await fetchImpl(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: site.hostname,
        key,
        keyLocation,
        urlList: urlList.slice(index, index + URLS_PER_REQUEST),
      }),
    });

    if (response.status !== 200 && response.status !== 202) {
      const details = await response.text();
      if (response.status === 403 && details.includes('"SiteVerificationNotCompleted"')) {
        process.stderr.write(
          "IndexNow key verification is still pending. No URLs were submitted; rerun this workflow after verification completes.\n"
        );
        return;
      }

      throw new Error(`IndexNow rejected a URL batch (HTTP ${response.status}): ${details}`);
    }
  }

  process.stdout.write(`Submitted ${urlList.length} URLs to IndexNow.\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const key = (await readFile(KEY_FILE, "utf8")).trim();
  await submitSiteToIndexNow({ key });
}
