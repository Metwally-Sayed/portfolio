import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Resume — Metwally Sayed"

export default function Image() {
  return ogCard({ title: "Resume", subtitle: "Metwally Sayed · Frontend Engineer" })
}
