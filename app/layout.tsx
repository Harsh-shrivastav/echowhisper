import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "EchoWhisper - Your Mental Wellness Companion",
  description:
    "AI-powered mental wellness platform providing 24/7 emotional support, mood tracking, and personalized coping strategies. Your safe space for mental health.",
  keywords: ["mental health", "emotional support", "AI therapy", "mood tracking", "wellness", "anxiety", "depression"],
  authors: [{ name: "EchoWhisper Team" }],
  creator: "EchoWhisper",
  publisher: "EchoWhisper",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://echowhisper.com",
    title: "EchoWhisper - Your Mental Wellness Companion",
    description: "24/7 AI-powered emotional support and mental wellness tracking",
    siteName: "EchoWhisper",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoWhisper - Your Mental Wellness Companion",
    description: "24/7 AI-powered emotional support and mental wellness tracking",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#6366f1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-950 text-white`}>{children}</body>
    </html>
  )
}
