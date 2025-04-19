// File: src/pages/PostPulsePage.tsx
"use client";

import { useState } from "react";
import NoteEditor from "@/components/agents/postpulse/components/NoteEditor";
import SuggestionsPanel from "@/components/agents/postpulse/components/SuggestionsPanel";
import ActivitiesPanel from "@/components/agents/postpulse/components/ActivitiesPanel";
import PostPulseModeSelector from "@/components/agents/postpulse/components/PostPulseModeSelector";

export default function PostPulsePage() {
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState("creator");

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold">🧠 PostPulse</h1>
        <p className="text-muted-foreground">Build your ideas, sync your flow</p>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-20 max-w-7xl mx-auto">
        {/* Left Panel - History Placeholder */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">🧠 PostPulse Says</h2>
          <div className="bg-muted p-4 rounded-lg h-full">
            <p className="text-sm text-muted-foreground italic">History log or prior suggestions...</p>
          </div>
        </section>

        {/* Middle Panel - Input & Suggestions */}
        <section className="col-span-1 space-y-4">
          <PostPulseModeSelector selectedMode={mode} setSelectedMode={setMode} />
          <NoteEditor notes={notes} setNotes={setNotes} />
          <SuggestionsPanel notes={notes} mode={mode} />
          <div className="text-xs text-muted-foreground flex justify-between px-1">
            <span>Word count: {notes.split(/\s+/).filter(Boolean).length}</span>
            <span>✅ If satisfied, please save and sync to calendar</span>
          </div>
        </section>

        {/* Right Panel - Activities */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">📆 Activities</h2>
          <ActivitiesPanel />
        </section>
      </main>
    </div>
  );
}