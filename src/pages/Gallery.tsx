import { useState } from 'react'
import { interactions } from '../data/interactions'
import InteractionCard from '../components/InteractionCard'
import styles from './Gallery.module.css'

type Filter = 'all' | 'live' | 'wip' | 'planned'

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all'
    ? interactions
    : interactions.filter(i => i.status === filter)

  const counts = {
    all: interactions.length,
    live: interactions.filter(i => i.status === 'live').length,
    wip: interactions.filter(i => i.status === 'wip').length,
    planned: interactions.filter(i => i.status === 'planned').length,
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gallery</h1>
        <p className={styles.sub}>
          {interactions.length} interaction{interactions.length !== 1 ? 's' : ''} — growing as I learn.
        </p>
      </div>

      <div className={styles.filters}>
        {(['all', 'live', 'wip', 'planned'] as Filter[]).map(f => (
          <button
            key={f}
            className={`${styles.filter} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'wip' ? 'In progress' : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className={styles.count}>{counts[f]}</span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map(i => <InteractionCard key={i.id} interaction={i} />)}
        </div>
      ) : (
        <p className={styles.empty}>Nothing here yet.</p>
      )}
    </div>
  )
}
