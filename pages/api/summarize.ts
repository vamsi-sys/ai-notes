import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).end();

    const { content } = req.body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "OpenAI key missing" });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize this: ${content}` }],
        max_tokens: 120,
        temperature: 0.3
      })
    });

    const data = await response.json();
    const summary = data?.choices?.[0]?.message?.content ?? "";

    return res.status(200).json({ summary });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
