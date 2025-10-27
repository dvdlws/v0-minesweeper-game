import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Play Minesweeper Online Free - Classic Puzzle Game",
  description:
    "Play the classic Minesweeper game online for free! Three difficulty levels with scoring system. Challenge yourself with this timeless puzzle game featuring mines, flags, and strategic gameplay.",
  keywords: [
    "minesweeper",
    "minesweeper game",
    "play minesweeper online",
    "free minesweeper",
    "puzzle game",
    "classic games",
    "mine sweeper",
    "brain game",
    "logic puzzle",
  ],
  authors: [{ name: "Minesweeper Online" }],
  generator: "v0.app",
  other: {
    "google-adsense-account": "ca-pub-3252021796682458",
  },
  openGraph: {
    title: "Play Minesweeper Online Free - Classic Puzzle Game",
    description: "Play the classic Minesweeper game online for free! Three difficulty levels with scoring system.",
    type: "website",
    locale: "en_US",
    siteName: "Minesweeper Online",
  },
  twitter: {
    card: "summary_large_image",
    title: "Play Minesweeper Online Free",
    description: "Classic Minesweeper game with three difficulty levels and scoring system.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-0LXKP64JM0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0LXKP64JM0');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3252021796682458"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
