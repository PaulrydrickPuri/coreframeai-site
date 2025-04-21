export async function fetchPostSuggestions(notes: string, mode: string) {
    try {
      const response = await fetch("/api/postpulse/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, mode }),
      });
  
      const data = await response.json();
  
      if (!data || !data.suggestions) {
        throw new Error("No suggestions returned from API");
      }
  
      const raw = data.suggestions;
      const suggestions = Array.isArray(raw)
        ? raw
        : raw.split("\n").filter((line: string) => line.trim().length > 0);
  
      return suggestions;
    } catch (err) {
      console.error("❌ GPT fetch error:", err);
      return ["⚠️ GPT failed to return suggestions."];
    }
  }
  