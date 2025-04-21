"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
  onModeSelected?: () => void; // optional callback
}

const modes = [
  { id: "creator", label: "🎬 Creator Mode" },
  { id: "student", label: "📚 Student Mode" },
  { id: "dev", label: "👨‍💻 Dev Mode" },
];

const modeStyles: Record<string, string> = {
  creator: "bg-pink-100 text-pink-800",
  student: "bg-yellow-100 text-yellow-800",
  dev: "bg-blue-100 text-blue-800",
};

function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
  }
  

export default function PostPulseModeSelector({ selectedMode, setSelectedMode, onModeSelected }: Props) {
  useEffect(() => {
    const saved = localStorage.getItem("postpulse-mode");
    if (saved) setSelectedMode(saved);
  }, [setSelectedMode]);

  useEffect(() => {
    localStorage.setItem("postpulse-mode", selectedMode);
  }, [selectedMode]);

  return (
    <div className="flex gap-2 flex-wrap">
      {modes.map((mode) => (
        <Button
        key={mode.id}
        variant={selectedMode === mode.id ? "default" : "outline"}
        onClick={() => {
          setSelectedMode(mode.id);
          onModeSelected?.();
        }}
        className={cn("text-xs", selectedMode === mode.id && modeStyles[mode.id])}

      >
        {mode.label}
      </Button>
      
      
      ))}
    </div>
  );
}
