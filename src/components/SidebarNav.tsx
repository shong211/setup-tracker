'use client'

type CategoryLink = { id: string; title: string }

type Props = {
  categories: CategoryLink[]
  onJumpTo: (id: string) => void
}

export function SidebarNav({ categories, onJumpTo }: Props) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[104px]">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-3">
          <div className="px-2 pb-2 text-xs uppercase tracking-wider text-zinc-500">Categories</div>
          <nav className="space-y-1">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onJumpTo(c.id)}
                className="w-full text-left rounded-md px-2 py-2 text-sm text-zinc-200 hover:bg-zinc-900/60 hover:text-zinc-50 transition-colors"
              >
                {c.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}

