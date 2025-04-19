export async function fetchPostSuggestions(notes: string, mode: string = "creator") {
    const promptPrefixMap: Record<string, string> = {
      creator: "You are a content creation assistant. Give high-performing ideas for carousels, reels, and posts.",
      student: "You're a study coach. Help break down this idea into learnable formats or short lessons.",
      dev: "You're an AI dev tool. Give suggestions in techy tone, useful for devs building in public.",
    };
  
    const prompt = `${promptPrefixMap[mode]}\n\nUser Input: ${notes}`;
  
    const response = await fetch("/api/postpulse/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
  
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.split("\n") || [];
  }
  