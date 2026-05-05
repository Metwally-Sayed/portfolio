import type { Metadata } from "next"
import { Geist, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Cursor } from "@/components/cursor"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Metwally Sayed — frontend engineer",
  description:
    "senior frontend engineer based in cairo. building fast, accessible web & mobile interfaces with react, next.js and react native.",
  openGraph: {
    title: "Metwally Sayed — frontend engineer",
    description:
      "senior frontend engineer based in cairo. building fast, accessible web & mobile interfaces with react, next.js and react native.",
    url: "https://metwally-sayed.vercel.app",
    siteName: "Metwally Sayed",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metwally Sayed — frontend engineer",
    description: "senior frontend engineer based in cairo.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body>
        <ThemeProvider>
          <Loader />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
