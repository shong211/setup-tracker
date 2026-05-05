'use client'

import { useEffect, useMemo, useState } from 'react'
import { CHECKLIST } from '@/lib/checklist-data'
import { CategorySection } from '@/components/CategorySection'
import { SidebarNav } from '@/components/SidebarNav'
import { TopBar } from '@/components/TopBar'

const STORAGE_KEY = 'setup-tracker:v1'

export function ChecklistApp() {
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

  const [query, setQuery] = useState('')
  const [incompleteOnly, setIncompleteOnly] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
  }, [checked])

  const allItems = useMemo(() => CHECKLIST.flatMap((c) => c.items), [])
  const doneCount = allItems.filter((i) => checked[i.id]).length
  const pct = allItems.length === 0 ? 0 : Math.round((doneCount / allItems.length) * 100)

  const normalizedQuery = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    return CHECKLIST.map((category) => {
      const items = category.items.filter((item) => {
        if (incompleteOnly && checked[item.id]) return false
        if (!normalizedQuery) return true
        const haystack = `${item.name} ${item.description ?? ''} ${item.command ?? ''}`.toLowerCase()
        return haystack.includes(normalizedQuery)
      })
      return { ...category, items }
    }).filter((c) => c.items.length > 0)
  }, [checked, incompleteOnly, normalizedQuery])

  const categoryIds = useMemo(() => {
    return CHECKLIST.map((c) => ({
      id: slugify(c.title),
      title: c.title,
    }))
  }, [])

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }))

  const reset = () => setChecked({})

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <TopBar
        doneCount={doneCount}
        totalCount={allItems.length}
        pct={pct}
        query={query}
        onQueryChange={setQuery}
        incompleteOnly={incompleteOnly}
        onIncompleteOnlyChange={setIncompleteOnly}
        onReset={reset}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          <SidebarNav
            categories={categoryIds}
            onJumpTo={(id) => {
              const el = document.getElementById(id)
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          />

          <main className="min-w-0">
            <div className="space-y-6">
              {filtered.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <div className="text-sm text-zinc-300">No matches.</div>
                  <div className="mt-1 text-sm text-zinc-500">
                    Try clearing search or turning off “Incomplete only”.
                  </div>
                </div>
              ) : (
                filtered.map((category) => (
                  <CategorySection
                    key={category.title}
                    id={slugify(category.title)}
                    title={category.title}
                    items={category.items}
                    checked={checked}
                    onToggle={toggle}
                  />
                ))
              )}
            </div>

            <footer className="mt-10 pb-8 text-xs text-zinc-500">
              Built with Next.js + Tailwind. Data stays in your browser.
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

