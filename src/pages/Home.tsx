import { useState } from 'react'
import { interactions, type Interaction } from '../data/interactions'
import InteractionCard from '../components/InteractionCard'
import InteractionModal from '../components/InteractionModal'
import styles from './Home.module.css'

export default function Home() {
  const [selected, setSelected] = useState<Interaction | null>(null)

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {interactions.map(i => (
          <InteractionCard
            key={i.id}
            interaction={i}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>

      {selected && (
        <InteractionModal
          interaction={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
