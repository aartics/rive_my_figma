export interface Interaction {
  id: string
  title: string
  description: string
  tags: string[]
  rivFile?: string
  status: 'live' | 'wip' | 'planned'
  date: string
  note?: string
}

export const interactions: Interaction[] = [
  {
    id: 'first-button',
    title: 'First Button',
    description: 'A Rive button — ugly, proud, and fully mine.',
    note: "This is my first Rive button ✦ It taught me how to bind data to the view model and hook up the state machine. It's not pretty, but it works, and that's the whole point.",
    tags: ['button', 'state machine', 'view model', '#1'],
    rivFile: 'firstbutton.riv',
    status: 'live',
    date: '2026-04',
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
