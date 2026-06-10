import { DownloadSimple } from "@phosphor-icons/react/dist/ssr"

export function DownloadCv({ className = "" }: { className?: string }) {
  return (
    <a
      href="/cv.pdf"
      download
      className={`text-xs inline-flex items-center gap-1 hover:underline underline-offset-4 ${className}`}
    >
      download cv <DownloadSimple size={13} />
    </a>
  )
}
