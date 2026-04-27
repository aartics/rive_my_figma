import { interactions } from '../data/interactions'
import RiveTile from '../components/RiveTile'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {interactions.map(i => (
          <RiveTile key={i.id} interaction={i} />
        ))}
      </div>
    </div>
  )
}
