// src/app/training/layout.tsx
import { ReactNode } from "react";

export default function TrainingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full">
      <aside className="w-64 border-r p-4">
        {/* training sidebar/nav */}
      </aside>
      <div className="flex-1 p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
}
