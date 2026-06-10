import { SITE_URL, SOCIALS, PERSON } from "@/lib/site"

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    jobTitle: PERSON.jobTitle,
    url: SITE_URL,
    sameAs: [SOCIALS.github, SOCIALS.linkedin],
    knowsAbout: PERSON.knowsAbout,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
