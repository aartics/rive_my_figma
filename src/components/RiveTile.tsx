import { useEffect } from 'react'
import { useRive } from '@rive-app/react-webgl2'
import type { Interaction } from '../data/interactions'
import styles from './RiveTile.module.css'

interface Props {
  interaction: Interaction
}

export default function RiveTile({ interaction }: Props) {
  if (!interaction.rivFile) {
    return <div className={styles.empty} />
  }
  return <LiveTile interaction={interaction} />
}

function LiveTile({ interaction }: Props) {
  const { rive, RiveComponent } = useRive({
    src: `/rive_my_figma/rive/${interaction.rivFile}`,
    stateMachines: interaction.stateMachine ?? 'State Machine 1',
    autoplay: true,
  })

  // Sync the Rive drawing buffer to the canvas's CSS-rendered size.
  useEffect(() => {
    if (!rive) return
    rive.resizeDrawingSurfaceToCanvas()
    const onResize = () => rive.resizeDrawingSurfaceToCanvas()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [rive])

  // The wrapper div is sized first via CSS so the canvas mounts into a
  // non-zero container — the docs note the canvas starts at 0x0 otherwise.
  return (
    <div className={styles.tile}>
      <RiveComponent className={styles.canvas} />
    </div>
  )
}
