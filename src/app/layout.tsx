// src/app/layout.tsx
import "@/styles/globals.css";
import Navbar from "@components/molecules/Navbar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-black text-white">
        <Navbar /> {/* ✅ Renders properly at top, handles its own layout */}

        <main className="flex-1 min-h-0 overflow-auto bg-black">
          {children}
        </main>
      </body>
    </html>
  );
}
