export function AvailabilityPill({ children = 'available for work' }: { children?: string }) {
  return (
    <span className="inline-flex items-center gap-2 py-[5px] pl-[10px] pr-3 border border-border rounded-full text-xs">
      <span className="relative flex-none w-2 h-2 rounded-full bg-[var(--available)]">
        <span
          className="absolute inset-[-4px] rounded-full border border-[var(--available)]"
          style={{ animation: 'pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite' }}
        />
      </span>
      {children}
    </span>
  )
}
