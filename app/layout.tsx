import type { Metadata } from "next"
import { Geist, JetBrains_Mono, Cairo } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LocaleProvider } from "@/lib/i18n"
import { Cursor } from "@/components/cursor"
import { Loader } from "@/components/loader"
import { PersonJsonLd } from "@/components/person-jsonld"
import { cn } from "@/lib/utils"
import { SITE_URL } from "@/lib/site"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

const cairo = Cairo({ subsets: ["arabic"], variable: "--font-arabic" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Metwally Sayed — frontend engineer",
  description:
    "senior frontend engineer based in cairo. building fast, accessible web & mobile interfaces with react, next.js and react native.",
  openGraph: {
    title: "Metwally Sayed — frontend engineer",
    description:
      "senior frontend engineer based in cairo. building fast, accessible web & mobile interfaces with react, next.js and react native.",
    url: SITE_URL,
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
      className={cn("antialiased", fontSans.variable, "font-mono", jetbrainsMono.variable, cairo.variable)}
    >
      <body>
        <PersonJsonLd />
        <LocaleProvider>
          <ThemeProvider>
            <Loader />
            <Cursor />
            {children}
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
