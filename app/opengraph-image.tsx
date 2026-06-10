import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Metwally Sayed — Frontend Engineer"

export default function Image() {
  return ogCard({
    title: "Metwally Sayed",
    subtitle: "Senior Frontend Engineer · Cairo",
  })
}
