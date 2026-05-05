'use client'

import type { ChecklistItem } from '@/lib/checklist-data'

type Props = {
  item: ChecklistItem
  checked: boolean
  onToggle: () => void
}

export function ItemRow({ item, checked, onToggle }: Props) {
  return (
    <li>
      <label className="flex items-start gap-3 px-5 py-3 hover:bg-zinc-900/40 transition-colors cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-zinc-950"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className={`font-medium leading-5 ${checked ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
              {item.name}
            </div>

            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
                aria-label={`Open ${item.name}`}
              >
                Open ↗
              </a>
            ) : null}
          </div>

          {item.description ? (
            <p className={`mt-1 text-sm leading-5 ${checked ? 'text-zinc-600' : 'text-zinc-400'}`}>{item.description}</p>
          ) : null}

          {item.command ? (
            <code className="mt-2 block text-xs text-emerald-400/80 font-mono break-all">{item.command}</code>
          ) : null}
        </div>
      </label>
    </li>
  )
}

