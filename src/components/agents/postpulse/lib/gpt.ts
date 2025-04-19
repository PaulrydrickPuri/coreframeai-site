// src/components/agents/postpulse/lib/gpt.ts
export async function fetchPostSuggestions(notes: string, mode: string) {
    const response = await fetch("/api/postpulse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes, mode }),
    });
  
    const data = await response.json();
    return Array.isArray(data.suggestions) ? data.suggestions : [data.suggestions];
  }
  