export type ChecklistItem = {
  id: string
  name: string
  description?: string
  url?: string
  command?: string
}

export type Category = {
  title: string
  items: ChecklistItem[]
}

export const CHECKLIST: Category[] = [
  {
    title: 'Foundations',
    items: [
      { id: 'xcode-clt', name: 'Xcode Command Line Tools', command: 'xcode-select --install' },
      { id: 'homebrew', name: 'Homebrew', url: 'https://brew.sh' },
      { id: 'git-config', name: 'Configure git identity', command: 'git config --global user.name + user.email' },
      { id: 'ssh-key', name: 'SSH key for GitHub', command: 'ssh-keygen -t ed25519' },
      { id: 'gh-auth', name: 'Authenticate gh CLI', command: 'gh auth login' },
    ],
  },
  {
    title: 'Editor & terminal',
    items: [
      { id: 'cursor', name: 'Cursor', url: 'https://cursor.com', description: 'AI-first IDE' },
      { id: 'starship', name: 'Starship prompt', command: 'brew install starship' },
      { id: 'fzf', name: 'fzf', command: 'brew install fzf', description: 'Ctrl-R history, Ctrl-T file picker' },
      { id: 'ripgrep', name: 'ripgrep', command: 'brew install ripgrep' },
      { id: 'bat', name: 'bat', command: 'brew install bat' },
      { id: 'tree', name: 'tree', command: 'brew install tree' },
    ],
  },
  {
    title: 'Languages & runtimes',
    items: [
      { id: 'node', name: 'Node.js' },
      { id: 'fnm', name: 'fnm (Node version manager)', command: 'brew install fnm' },
      { id: 'pnpm', name: 'pnpm', command: 'brew install pnpm' },
      { id: 'python', name: 'Python 3' },
      { id: 'uv', name: 'uv (Python tooling)', url: 'https://docs.astral.sh/uv/', command: 'curl -LsSf https://astral.sh/uv/install.sh | sh' },
    ],
  },
  {
    title: 'Productivity apps',
    items: [
      { id: 'raycast', name: 'Raycast', url: 'https://raycast.com', description: 'Spotlight replacement' },
      { id: 'rectangle', name: 'Rectangle', url: 'https://rectangleapp.com', description: 'Window snapping' },
      { id: '1password', name: '1Password', url: 'https://1password.com' },
      { id: 'arc', name: 'Arc Browser', url: 'https://arc.net' },
      { id: 'notion', name: 'Notion', url: 'https://notion.so' },
    ],
  },
  {
    title: 'AI tooling',
    items: [
      { id: 'claude-desktop', name: 'Claude desktop', url: 'https://claude.ai/download' },
      { id: 'chatgpt-desktop', name: 'ChatGPT desktop', url: 'https://openai.com/chatgpt/download' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { id: 'slack', name: 'Slack', url: 'https://slack.com/downloads/mac' },
      { id: 'zoom', name: 'Zoom', url: 'https://zoom.us/download' },
    ],
  },
  {
    title: 'Investor stack',
    items: [
      { id: 'pitchbook', name: 'PitchBook' },
      { id: 'cb-insights', name: 'CB Insights' },
      { id: 'crunchbase', name: 'Crunchbase Pro' },
    ],
  },
]
