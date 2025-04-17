// src/pages/_app.tsx

import type { AppProps } from "next/app";
import "@/styles/globals.css"; // or "../styles/globals.css" if not using path alias

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
