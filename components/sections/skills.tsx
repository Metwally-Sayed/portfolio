import { skillGroups } from '@/lib/data/skills'
import { FadeIn } from '@/components/fade-in'

function Tag({ children }: { children: string }) {
  return (
    <span className="text-[10px] py-[2px] px-[7px] border border-border rounded-[6px] text-muted-foreground">
      [{children}]
    </span>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                03 / skills
              </div>
              <h2 className="text-[32px] font-semibold tracking-[-0.02em] mt-0">stack</h2>
            </div>
            <p className="text-muted-foreground text-[13px] max-w-[380px]">
              tools i reach for daily, in roughly that order.
            </p>
          </div>
        </FadeIn>

        <div>
          {skillGroups.map(([cat, items], i) => (
            <FadeIn key={cat} delay={i * 60}>
              <div className="grid grid-cols-[200px_1fr] gap-6 py-4 border-t border-border last:border-b last:border-border max-[720px]:grid-cols-1 max-[720px]:gap-2">
                <div className="text-[11px] tracking-[0.06em] text-muted-foreground uppercase pt-1">
                  {cat}
                </div>
                <div className="flex gap-[6px] flex-wrap">
                  {items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
