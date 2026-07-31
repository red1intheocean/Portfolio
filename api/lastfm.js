// /api/lastfm.js — Vercel Serverless Function
// Proxies Last.fm API calls so your API key stays server-side.

export default async function handler(req, res) {
  const API_KEY = process.env.LASTFM_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "LASTFM_API_KEY not configured" });
  }

  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.gettopalbums");
  url.searchParams.set("user", "LongLiveRed1");
  url.searchParams.set("period", "12month");
  url.searchParams.set("limit", "5");
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      return res.status(response.status).json({ error: "Last.fm API error" });
    }
    const data = await response.json();

    // Return only what the front-end needs
    const albums = (data.topalbums?.album || []).map((a, i) => ({
      rank: i + 1,
      name: a.name,
      artist: a.artist?.name || "Unknown",
      playcount: a.playcount,
      url: a.url,
      image: a.image?.find((img) => img.size === "large")?.["#text"] || "",
    }));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=600");
    return res.status(200).json({ albums });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch from Last.fm" });
  }
}
