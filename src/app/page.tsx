'use client'

import { useEffect, useState } from 'react'
import { CHECKLIST, type ChecklistItem } from '@/lib/checklist-data'

const STORAGE_KEY = 'setup-tracker:v1'

export default function Home() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {}
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    try {
      return JSON.parse(raw) as Record<string, boolean>
    } catch {
      return {}
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
  }, [checked])

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }))

  const allItems = CHECKLIST.flatMap((c) => c.items)
  const doneCount = allItems.filter((i) => checked[i.id]).length
  const pct = allItems.length === 0 ? 0 : Math.round((doneCount / allItems.length) * 100)

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Setup Tracker</h1>
          <p className="text-zinc-400 mt-2 text-sm">{doneCount} of {allItems.length} done · {pct}%</p>
          <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </header>
        <div className="space-y-10">
          {CHECKLIST.map((category) => (
            <section key={category.title}>
              <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{category.title}</h2>
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <ItemRow key={item.id} item={item} checked={!!checked[item.id]} onToggle={() => toggle(item.id)} />
                ))}
              </ul>
            </section>
          ))}
        </div>
        <footer className="mt-16 pt-8 border-t border-zinc-800 text-sm text-zinc-500 flex items-center justify-between">
          <span>Built with Next.js, Tailwind, and Cursor</span>
          <button onClick={() => { if (confirm('Reset all checks?')) setChecked({}) }} className="hover:text-zinc-300 transition-colors">Reset</button>
        </footer>
      </div>
    </main>
  )
}

function ItemRow({ item, checked, onToggle }: { item: ChecklistItem; checked: boolean; onToggle: () => void }) {
  return (
    <li>
      <label className="flex items-start gap-3 py-2 px-3 -mx-3 rounded-md hover:bg-zinc-900 cursor-pointer transition-colors">
        <input type="checkbox" checked={checked} onChange={onToggle} className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-zinc-950" />
        <div className="flex-1 min-w-0">
          <div className={`font-medium ${checked ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
            {item.name}
            {item.url && (
              <a href={item.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="ml-2 text-xs text-zinc-500 hover:text-emerald-400">↗</a>
            )}
          </div>
          {item.description && <p className={`text-sm ${checked ? 'text-zinc-600' : 'text-zinc-400'}`}>{item.description}</p>}
          {item.command && <code className="text-xs text-emerald-400/80 font-mono break-all">{item.command}</code>}
        </div>
      </label>
    </li>
  )
}
