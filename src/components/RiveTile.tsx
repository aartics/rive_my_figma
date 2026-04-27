import { useEffect } from 'react'
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'
import type { Interaction } from '../data/interactions'
import styles from './RiveTile.module.css'

interface Props {
  interaction: Interaction
  onClick: () => void
}

export default function RiveTile({ interaction, onClick }: Props) {
  if (!interaction.rivFile) {
    return <div className={styles.empty} />
  }
  return <LiveTile interaction={interaction} onClick={onClick} />
}

function LiveTile({ interaction, onClick }: Props) {
  const { rive, RiveComponent } = useRive({
    src: `/rive_my_figma/rive/${interaction.rivFile}`,
    stateMachines: interaction.stateMachine ?? 'State Machine 1',
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  })

  // Sync the Rive drawing surface to the actual CSS-rendered canvas size.
  // Without this, Rive's internal buffer may differ from what's displayed,
  // making pointer hit-detection fire at wrong coordinates (or not at all).
  useEffect(() => {
    if (rive) rive.resizeDrawingSurfaceToCanvas()
  }, [rive])

  return (
    <div className={styles.tile} onClick={onClick}>
      <RiveComponent className={styles.canvas} />
    </div>
  )
}
