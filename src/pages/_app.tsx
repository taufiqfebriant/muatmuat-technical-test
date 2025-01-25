import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${inter.variable} font-[family-name:var(--font-inter)] max-w-6xl mx-auto py-10 px-10 xl:px-0`}
    >
      <Component {...pageProps} />
    </main>
  );
}
