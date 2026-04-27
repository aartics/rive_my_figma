export interface Interaction {
  id: string
  title: string
  note?: string
  tags: string[]
  rivFile?: string
  stateMachine?: string
  status: 'live' | 'wip' | 'planned'
  date: string
}

export const interactions: Interaction[] = [
  {
    id: 'first-button',
    title: 'First Button',
    note: "This is my first Rive button ✦ It taught me how to bind data to the view model and hook up the state machine. It's not pretty, but it works, and that's the whole point.",
    tags: ['button', 'state machine', 'view model', '#1'],
    rivFile: 'firstbutton.riv',
    stateMachine: 'State Machine 1',
    status: 'live',
    date: '2026-04',
  },
  {
    id: 'toggle-switch',
    title: 'Toggle Switch',
    tags: ['toggle', 'state machine', 'form'],
    status: 'planned',
    date: '2026-05',
  },
  {
    id: 'loading-spinner',
    title: 'Loading Spinner',
    tags: ['loader', 'loop', 'feedback'],
    status: 'planned',
    date: '2026-06',
  },
]
