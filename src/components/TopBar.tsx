'use client'

type Props = {
  doneCount: number
  totalCount: number
  pct: number
  query: string
  onQueryChange: (value: string) => void
  incompleteOnly: boolean
  onIncompleteOnlyChange: (value: boolean) => void
  onReset: () => void
}

export function TopBar({
  doneCount,
  totalCount,
  pct,
  query,
  onQueryChange,
  incompleteOnly,
  onIncompleteOnlyChange,
  onReset,
}: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-baseline gap-3">
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Setup Tracker</h1>
              <div className="text-xs text-zinc-400">
                <span className="text-zinc-200 font-medium">{doneCount}</span> / {totalCount} done
              </div>
            </div>
            <div className="mt-2 h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (confirm('Reset all checks?')) onReset()
              }}
              className="hidden sm:inline-flex rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/70 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-1 min-w-0">
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search tasks…"
              className="w-full rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
            />
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-zinc-300 select-none">
            <input
              type="checkbox"
              checked={incompleteOnly}
              onChange={(e) => onIncompleteOnlyChange(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-zinc-950"
            />
            Incomplete only
          </label>

          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all checks?')) onReset()
            }}
            className="sm:hidden rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/70 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  )
}

