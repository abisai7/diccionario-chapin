import assert from "node:assert/strict";
import test from "node:test";
import { submitSiteToIndexNow } from "./submit-indexnow.mjs";

test("submits unique same-site URLs from the sitemap and accepts HTTP 202", async () => {
  const submitted = [];
  const sitemaps = new Map([
    [
      "https://chapinismos.org/sitemap-index.xml",
      "<sitemapindex><sitemap><loc>https://chapinismos.org/sitemap-0.xml</loc></sitemap></sitemapindex>",
    ],
    [
      "https://chapinismos.org/sitemap-0.xml",
      "<urlset><url><loc>https://chapinismos.org/es/</loc></url><url><loc>https://chapinismos.org/es/?q=a&amp;b</loc></url><url><loc>https://chapinismos.org/es/</loc></url><url><loc>https://example.com/outside/</loc></url></urlset>",
    ],
  ]);
  const fetchImpl = async (url, options) => {
    if (options?.method === "POST") {
      submitted.push(JSON.parse(options.body));
      return new Response(null, { status: 202 });
    }

    const xml = sitemaps.get(String(url));
    assert.ok(xml, `Unexpected sitemap request: ${url}`);
    return new Response(xml, { status: 200 });
  };

  await submitSiteToIndexNow({ key: "test-key-123", fetchImpl });

  assert.equal(submitted.length, 1);
  assert.deepEqual(submitted[0], {
    host: "chapinismos.org",
    key: "test-key-123",
    keyLocation: "https://chapinismos.org/indexnow-key.txt",
    urlList: ["https://chapinismos.org/es/", "https://chapinismos.org/es/?q=a&b"],
  });
});

test("does not fail when IndexNow key verification is still pending", async () => {
  let submissionCount = 0;
  const fetchImpl = async (url, options) => {
    if (options?.method === "POST") {
      submissionCount += 1;
      return new Response(
        JSON.stringify({
          errorCode: "SiteVerificationNotCompleted",
          message: "Site Verification is not completed.",
        }),
        { status: 403 }
      );
    }

    const xml =
      String(url) === "https://chapinismos.org/sitemap-index.xml"
        ? "<sitemapindex><sitemap><loc>https://chapinismos.org/sitemap-0.xml</loc></sitemap></sitemapindex>"
        : "<urlset><url><loc>https://chapinismos.org/es/</loc></url></urlset>";
    return new Response(xml, { status: 200 });
  };

  await assert.doesNotReject(() => submitSiteToIndexNow({ key: "test-key-123", fetchImpl }));
  assert.equal(submissionCount, 1);
});

test("splits submissions at IndexNow's 10,000 URL limit", async () => {
  const batchSizes = [];
  const urls = Array.from(
    { length: 10_001 },
    (_, index) => `<url><loc>https://chapinismos.org/word/${index}/</loc></url>`
  ).join("");
  const fetchImpl = async (url, options) => {
    if (options?.method === "POST") {
      batchSizes.push(JSON.parse(options.body).urlList.length);
      return new Response(null, { status: 200 });
    }

    const xml =
      String(url) === "https://chapinismos.org/sitemap-index.xml"
        ? "<sitemapindex><sitemap><loc>https://chapinismos.org/sitemap-0.xml</loc></sitemap></sitemapindex>"
        : `<urlset>${urls}</urlset>`;
    return new Response(xml, { status: 200 });
  };

  await submitSiteToIndexNow({ key: "test-key-123", fetchImpl });

  assert.deepEqual(batchSizes, [10_000, 1]);
});
