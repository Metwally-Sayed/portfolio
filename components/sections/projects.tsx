import { projects } from '@/lib/data/projects'
import { FadeIn } from '@/components/fade-in'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

function Tag({ children }: { children: string }) {
  return (
    <span className="text-[10px] py-[2px] px-[7px] border border-border rounded-[6px] text-muted-foreground">
      [{children}]
    </span>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                02 / projects
              </div>
              <h2 className="text-[32px] font-semibold tracking-[-0.02em] mt-0">selected work</h2>
            </div>
            <p className="text-muted-foreground text-[13px] max-w-[380px]">
              four production systems, shipped end-to-end. real users, real data.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
          {projects.map((p, i) => (
            <FadeIn key={p.name} delay={i * 80}>
              <article className="border border-border rounded-[10px] overflow-hidden bg-card flex flex-col transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-foreground hover:-translate-y-0.5 h-full">
                <div className="aspect-video border-b border-border relative overflow-hidden flex items-center justify-center bg-muted">
                  <span className="text-[13px] text-muted-foreground tracking-[0.04em]">
                    {p.label}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[10px] text-muted-foreground tracking-[0.06em] uppercase">
                    {p.year} / {p.kind}
                  </div>
                  <div className="text-[22px] font-semibold mt-[6px] tracking-[-0.01em]">
                    {p.name}
                  </div>
                  <div className="text-[13px] text-muted-foreground leading-[1.65] mt-[10px] flex-1">
                    {p.desc}
                  </div>

                  <div className="flex gap-[6px] flex-wrap mt-4">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>

                  <div className="flex gap-[14px] mt-4 pt-4 border-t border-border">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
                      >
                        view live <ArrowUpRight size={12} />
                      </a>
                    )}
                    {p.appStore && (
                      <a
                        href={p.appStore}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
                      >
                        app store <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
