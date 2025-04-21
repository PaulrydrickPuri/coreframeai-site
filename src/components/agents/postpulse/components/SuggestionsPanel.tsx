"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { fetchPostSuggestions } from "@/components/agents/postpulse/lib/gpt";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { ClipboardCopyIcon, SaveIcon, CalendarIcon } from "lucide-react";

interface Props {
  notes: string;
  mode: string;
}

export default function SuggestionsPanel({ notes, mode }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = useCallback(async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setError("");

    try {
      const ideas = await fetchPostSuggestions(notes, mode);
      const processed = Array.isArray(ideas)
        ? ideas
        : ideas.split("\n").filter((line: string) => line.trim().length > 0);

      setSuggestions(processed);
    } catch (err) {
      console.error("⚠️ GPT Error:", err);
      setError("Failed to fetch suggestions. Try again later.");
    }

    setLoading(false);
  }, [notes, mode]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getDateLabel = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleSave = async (text: string) => {
    const { error } = await supabase
      .from("suggestions")
      .insert([{ content: text, mode, label: getDateLabel() }]);

    if (error) {
      console.error("Supabase insert error:", error);
      toast.error("❌ Failed to save. Please try again.");
    } else {
      toast.success("💾 Saved to PostPulse history!");
    }
  };

  const handleUse = (text: string) => {
    toast("🗓️ Added to schedule", {
      description: "This idea is ready to plan in your calendar.",
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-muted text-muted-foreground">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">PostPulse-GPT Says…</h3>
        <Button
          onClick={fetchSuggestions}
          disabled={loading || !notes.trim()}
          className="text-xs"
        >
          {loading ? "Thinking..." : "Generate"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ul className="space-y-3">
        {suggestions.length === 0 && !loading && (
          <li className="text-sm italic text-muted-foreground">
            Nothing yet. Hit <strong>Generate</strong> to get started!
          </li>
        )}

        {suggestions.map((text, idx) => (
          <li
            key={idx}
            className="p-3 rounded-md border bg-background text-foreground shadow-sm space-y-2"
          >
            <p className="whitespace-pre-line text-sm">{text}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => copyToClipboard(text)}
              >
                <ClipboardCopyIcon className="w-3 h-3 mr-1" /> Copy
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleUse(text)}
              >
                <CalendarIcon className="w-3 h-3 mr-1" /> Use this
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleSave(text)}
              >
                <SaveIcon className="w-3 h-3 mr-1" /> Save
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
