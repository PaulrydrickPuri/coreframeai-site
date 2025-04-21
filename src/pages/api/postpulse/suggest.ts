import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { notes, mode } = req.body;

    const modeTemplates: Record<string, string> = {
      creator: "You are a content coach. Give high-performing ideas for Reels, Carousels, or Posts.",
      student: "You are a helpful tutor. Break down ideas clearly for learning and revision.",
      dev: "You are a concise AI engineer. Give suggestions in a direct, technical tone.",
    };

    const systemPrompt = modeTemplates[mode] ?? "You are PostPulse, a helpful content assistant.";

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `Here are my notes:\n\n${notes}\n\nPlease suggest 3 unique content ideas.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content ?? "⚠️ No suggestion.";

    res.status(200).json({ suggestions: reply.split("\n").filter(Boolean) });
  } catch (error) {
    console.error("PostPulse error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
