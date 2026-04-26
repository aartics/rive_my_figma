import { interactions } from '../data/interactions'
import InteractionCard from '../components/InteractionCard'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {interactions.map(i => <InteractionCard key={i.id} interaction={i} />)}
      </div>
    </div>
  )
}
