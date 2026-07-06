'use client'

import { DownloadSimple } from "@phosphor-icons/react/dist/ssr"
import { dict, useLocale } from "@/lib/i18n"

export function DownloadCv({ className = "" }: { className?: string }) {
  const { locale } = useLocale()
  return (
    <a
      href="/cv.pdf"
      download
      className={`text-xs inline-flex items-center gap-1 hover:underline underline-offset-4 ${className}`}
    >
      {dict[locale].common.downloadCv} <DownloadSimple size={13} />
    </a>
  )
}
