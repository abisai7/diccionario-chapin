// Simple proxy to forward Umami events to the Umami gateway
// Deployed on Vercel at /api/umami-proxy — client calls same-origin, server forwards.
const TARGET = "https://api-gateway.umami.dev/api/send";

module.exports = async (req, res) => {
  // Allow basic CORS for safety (client is same-origin, but keep it tolerant)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => resolve(data));
      req.on("error", reject);
    });

    const fetchRes = await fetch(TARGET, {
      method: "POST",
      headers: {
        // Forward content-type if present
        "Content-Type": req.headers["content-type"] || "application/json",
      },
      body: body,
    });

    const text = await fetchRes.text();
    // Forward response status and body
    res.statusCode = fetchRes.status;
    const contentType = fetchRes.headers.get("content-type") || "text/plain";
    res.setHeader("Content-Type", contentType);
    res.end(text);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: String(err) }));
  }
};
