export interface Interaction {
  id: string
  title: string
  description: string
  tags: string[]
  rivFile?: string   // path relative to public/rive/
  status: 'live' | 'wip' | 'planned'
  date: string
}

export const interactions: Interaction[] = [
  {
    id: 'button-press',
    title: 'Button Press',
    description: 'A satisfying springy button with press state, hover glow, and idle bounce — the hello world of Rive.',
    tags: ['button', 'spring', 'micro-interaction'],
    rivFile: 'button-press.riv',
    status: 'planned',
    date: '2026-05',
  },
  {
    id: 'toggle-switch',
    title: 'Toggle Switch',
    description: 'On/off toggle with a fluid morph between states, driven by a state machine.',
    tags: ['toggle', 'state machine', 'form'],
    rivFile: 'toggle-switch.riv',
    status: 'planned',
    date: '2026-05',
  },
  {
    id: 'loading-spinner',
    title: 'Loading Spinner',
    description: 'Custom branded loader with looping animation and a success/fail end state.',
    tags: ['loader', 'loop', 'feedback'],
    rivFile: 'loading-spinner.riv',
    status: 'planned',
    date: '2026-06',
  },
]
