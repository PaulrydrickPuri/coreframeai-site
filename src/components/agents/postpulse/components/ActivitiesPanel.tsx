"use client";

export default function ActivitiesPanel() {
  const blocks = [
    { time: "8 AM", title: "Learn", desc: "GPT Papers" },
    { time: "9 AM", title: "Post", desc: "Carousel Draft" },
    { time: "10 AM", title: "Meeting", desc: "" },
  ];

  return (
    <div className="bg-card border rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm font-semibold">
          Fri · Apr 19 · <span className="font-mono">5:37 PM</span>
        </div>
        <div className="text-xs text-muted-foreground">Posting soon</div>
      </div>

      {/* View Switcher */}
      <div className="grid grid-cols-3 gap-1 text-center text-xs font-medium bg-muted p-1 rounded-lg">
        <button className="bg-background rounded-md py-1">Day</button>
        <button className="py-1 text-muted-foreground">Week</button>
        <button className="py-1 text-muted-foreground">Month</button>
      </div>

      {/* Timeline Blocks */}
      <div className="space-y-2 text-sm">
        {blocks.map((block, idx) => (
          <div key={idx}>
            <div className="text-muted-foreground text-xs">{block.time}</div>
            <div className="border border-border rounded-lg p-2">
              <div className="font-semibold">{block.title}</div>
              <div className="text-xs text-muted-foreground">{block.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between pt-4 text-xs text-muted-foreground border-t border-border">
        <button className="hover:text-primary">➕ Add Block</button>
        <button className="hover:text-primary">🤖 Smart Suggest</button>
      </div>
    </div>
  );
}
