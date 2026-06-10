export const SITE_URL = "https://metwally-sayed.vercel.app"

export const SOCIALS = {
  github: "https://github.com/Metwally-Sayed",
  linkedin: "https://linkedin.com/in/metwallysayed",
}

export const PERSON = {
  name: "Metwally Sayed",
  role: "Frontend Engineer",
  jobTitle: "Senior Frontend Engineer",
  location: "Cairo, Egypt",
  knowsAbout: [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "RTL / Arabic-first interfaces",
    "SSR",
  ],
}

export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
