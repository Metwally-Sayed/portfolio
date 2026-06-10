import type { Metadata } from "next"
import Link from "next/link"
import { resume } from "@/lib/data/resume"
import { PERSON } from "@/lib/site"
import { DownloadCv } from "@/components/download-cv"

export const metadata: Metadata = {
  title: "Resume — Metwally Sayed",
  description: "Resume of Metwally Sayed, senior frontend engineer based in Cairo.",
}

export default function ResumePage() {
  return (
    <main className="max-w-[820px] mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-12">
        <Link href="/" className="text-xs text-muted-foreground hover:underline underline-offset-4">
          ← back
        </Link>
        <DownloadCv />
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">{PERSON.name}</h1>
      <p className="text-sm text-muted-foreground mt-1">
        {PERSON.jobTitle} · {PERSON.location}
      </p>

      <p className="text-sm leading-[1.7] mt-8">{resume.summary}</p>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.08em] text-muted-foreground mb-5">
          Experience
        </h2>
        <div className="flex flex-col gap-8">
          {resume.experience.map((exp) => (
            <div key={exp.company}>
              <div className="flex items-baseline justify-between">
                <div className="text-base font-medium">
                  {exp.role} · {exp.company}
                </div>
                <div className="text-xs text-muted-foreground">{exp.period}</div>
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {exp.points.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground leading-[1.65] pl-4 relative">
                    <span className="absolute left-0">–</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.08em] text-muted-foreground mb-5">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] py-1 px-2 border border-border rounded-[6px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.08em] text-muted-foreground mb-5">
          Links
        </h2>
        <div className="flex flex-col gap-2">
          {resume.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm hover:underline underline-offset-4 w-fit"
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
