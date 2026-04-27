import type { Interaction } from '../data/interactions'
import styles from './InteractionCard.module.css'

interface Props {
  interaction: Interaction
  onClick?: () => void
}

const statusLabel: Record<Interaction['status'], string> = {
  live: 'live',
  wip: 'in progress',
  planned: 'planned',
}

export default function InteractionCard({ interaction, onClick }: Props) {
  const isClickable = interaction.status === 'live'

  return (
    <div
      className={`${styles.card} ${isClickable ? styles.clickable : ''}`}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable && onClick ? e => e.key === 'Enter' && onClick() : undefined}
    >
      <div className={styles.preview}>
        <div className={styles.previewInner}>
          {isClickable ? (
            <span className={styles.playHint}>open →</span>
          ) : (
            <span className={styles.placeholder}>{interaction.status === 'wip' ? '🚧' : '📐'}</span>
          )}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.title}>{interaction.title}</h3>
          <span className={`${styles.status} ${styles[interaction.status]}`}>
            {statusLabel[interaction.status]}
          </span>
        </div>
        <p className={styles.desc}>{interaction.description}</p>
        <div className={styles.tags}>
          {interaction.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
