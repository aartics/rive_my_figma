import { useParams, Link, Navigate } from 'react-router-dom'
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'
import { interactions } from '../data/interactions'
import styles from './InteractionView.module.css'

export default function InteractionView() {
  const { id } = useParams<{ id: string }>()
  const interaction = interactions.find(i => i.id === id)

  if (!interaction || interaction.status !== 'live' || !interaction.rivFile) {
    return <Navigate to="/gallery" replace />
  }

  return <RivePlayer interaction={interaction} />
}

function RivePlayer({ interaction }: { interaction: (typeof interactions)[number] }) {
  const { rive, RiveComponent } = useRive({
    src: `/rive_my_figma/rive/${interaction.rivFile}`,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  })

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/gallery" className={styles.back}>← gallery</Link>
        <span className={`${styles.status} ${styles[interaction.status]}`}>
          {interaction.status}
        </span>
      </div>

      <div className={styles.canvas}>
        <RiveComponent className={styles.riveCanvas} />
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{interaction.title}</h1>
        <p className={styles.desc}>{interaction.description}</p>

        <div className={styles.tags}>
          {interaction.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={() => rive?.play()}
          >
            ▶ Play
          </button>
          <button
            className={styles.btn}
            onClick={() => rive?.pause()}
          >
            ⏸ Pause
          </button>
          <button
            className={styles.btn}
            onClick={() => rive?.reset()}
          >
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  )
}
