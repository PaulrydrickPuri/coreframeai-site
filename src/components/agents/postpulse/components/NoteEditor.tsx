"use client";

import { Textarea } from "@/components/ui/PromptTextarea";

type Props = {
  notes: string;
  setNotes: (val: string) => void;
};

export default function NoteEditor({ notes, setNotes }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor="notes" className="text-sm font-medium text-foreground">
        Your Notes
      </label>
      <Textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes, ideas, or captions here..."
        className="min-h-[150px] resize-none text-sm"
      />
    </div>
  );
}
