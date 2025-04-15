import "../styles/globals.css";

export const metadata = {
  title: "CoreframeAI",
  description: "Modular cognitive agents. One prototype at a time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface text-white">{children}</body>
    </html>
  );
}
