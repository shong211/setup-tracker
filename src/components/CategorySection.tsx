'use client'

import type { ChecklistItem } from '@/lib/checklist-data'
import { ItemRow } from '@/components/ItemRow'

type Props = {
  id: string
  title: string
  items: ChecklistItem[]
  checked: Record<string, boolean>
  onToggle: (id: string) => void
}

export function CategorySection({ id, title, items, checked, onToggle }: Props) {
  const done = items.filter((i) => checked[i.id]).length
  const pct = items.length === 0 ? 0 : Math.round((done / items.length) * 100)

  return (
    <section id={id} className="scroll-mt-32">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/25 overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-semibold tracking-tight text-zinc-100">{title}</h2>
            <div className="mt-1 text-xs text-zinc-500">
              <span className="text-zinc-300 font-medium">{done}</span> / {items.length} · {pct}%
            </div>
          </div>
          <div className="w-28 h-2 bg-zinc-800 rounded-full overflow-hidden shrink-0" aria-hidden="true">
            <div className="h-full bg-emerald-500/90 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <ul className="divide-y divide-zinc-800">
          {items.map((item) => (
            <ItemRow key={item.id} item={item} checked={!!checked[item.id]} onToggle={() => onToggle(item.id)} />
          ))}
        </ul>
      </div>
    </section>
  )
}

