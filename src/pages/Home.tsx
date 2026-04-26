import { Link } from 'react-router-dom'
import { interactions } from '../data/interactions'
import InteractionCard from '../components/InteractionCard'
import styles from './Home.module.css'

export default function Home() {
  const recent = interactions.filter(i => i.status === 'live').slice(0, 3)
  const showRecent = recent.length > 0

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>portfolio</p>
        <h1 className={styles.headline}>
          Learning Rive &<br />Figma, one<br />interaction at a time.
        </h1>
        <p className={styles.sub}>
          A growing collection of motion experiments — built in Figma,
          animated in Rive, shipped as a PWA.
        </p>
        <div className={styles.cta}>
          <Link to="/gallery" className={styles.btnPrimary}>Browse gallery</Link>
          <a
            href="https://rive.app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            What is Rive? ↗
          </a>
        </div>
      </section>

      <section className={styles.stack}>
        <div className={styles.stackItem}>
          <span className={styles.stackIcon}>✦</span>
          <div>
            <strong>Figma</strong>
            <p>Design & prototype components before bringing them to life.</p>
          </div>
        </div>
        <div className={styles.stackItem}>
          <span className={styles.stackIcon}>◈</span>
          <div>
            <strong>Rive</strong>
            <p>State machines & animations that respond to real interactions.</p>
          </div>
        </div>
        <div className={styles.stackItem}>
          <span className={styles.stackIcon}>⬡</span>
          <div>
            <strong>React PWA</strong>
            <p>Hosted on GitHub Pages, installable, works offline.</p>
          </div>
        </div>
      </section>

      {showRecent && (
        <section className={styles.recent}>
          <div className={styles.sectionHeader}>
            <h2>Recent</h2>
            <Link to="/gallery">See all →</Link>
          </div>
          <div className={styles.grid}>
            {recent.map(i => <InteractionCard key={i.id} interaction={i} />)}
          </div>
        </section>
      )}

      {!showRecent && (
        <section className={styles.empty}>
          <p>No live interactions yet — first one coming soon.</p>
          <Link to="/gallery" className={styles.btnSecondary}>See what's planned →</Link>
        </section>
      )}
    </div>
  )
}
