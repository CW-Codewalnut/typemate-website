import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://typemate.codewalnut.com"),
  title: "TypeMate: Private Dictation",
  description:
    "TypeMate is a fast, private dictation app for Windows, macOS, Linux, Android and iPhone. Speak, and your words appear in whatever field has focus. 28 languages, fully local, no cloud.",
  openGraph: {
    title: "TypeMate: Private Dictation",
    description:
      "Fast, private, local dictation for developers and heavy typers. 28 languages. Nothing leaves your machine.",
    url: "https://typemate.codewalnut.com",
    siteName: "TypeMate",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
