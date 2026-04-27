import { useEffect } from 'react'
import type { Interaction } from '../data/interactions'
import styles from './InteractionModal.module.css'

interface Props {
  interaction: Interaction
  onClose: () => void
}

export default function InteractionModal({ interaction, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        <h2 className={styles.title}>{interaction.title}</h2>
        {interaction.note && <p className={styles.note}>{interaction.note}</p>}
        <div className={styles.tags}>
          {interaction.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
