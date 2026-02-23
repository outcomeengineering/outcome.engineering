import type { Metadata, Viewport } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateMetadata(): Metadata {
  const siteUrl = "https://outcome.engineering";

  return {
    metadataBase: new URL(siteUrl),
    title: "Outcome Engineering — Spec-driven development for AI agents",
    description:
      "A methodology centered on the Spec Tree: a git-native product structure with outcome hypotheses, drift detection via lock files, and deterministic context injection.",
    keywords: [
      "outcome engineering",
      "spec-driven development",
      "spec tree",
      "AI agents",
      "deterministic context",
      "spx",
    ],
    openGraph: {
      title: "Outcome Engineering — Spec-driven development for AI agents",
      description:
        "A methodology centered on the Spec Tree: a git-native product structure with outcome hypotheses, drift detection via lock files, and deterministic context injection.",
      url: "./",
      siteName: "Outcome Engineering",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: "Outcome Engineering — Spec-driven development for AI agents",
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={firaCode.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
