import { useEffect } from 'react'
import { useRive } from '@rive-app/react-canvas'
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

  // Sync the Rive drawing buffer to the canvas's CSS-rendered size, both at
  // load time and on any layout/window change. Without this, the canvas keeps
  // its default 300x150 buffer while CSS scales the visible canvas to whatever
  // size the grid hands it — pointer hit-detection then fires at the wrong
  // coordinates (or outside any listener's bounds entirely).
  useEffect(() => {
    if (!rive) return
    rive.resizeDrawingSurfaceToCanvas()
    const onResize = () => rive.resizeDrawingSurfaceToCanvas()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [rive])

  return (
    <RiveComponent
      className={styles.tile}
      style={{ width: '100%', aspectRatio: '1' }}
    />
  )
}
