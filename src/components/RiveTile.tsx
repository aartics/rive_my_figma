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
  const { RiveComponent } = useRive({
    src: `/rive_my_figma/rive/${interaction.rivFile}`,
    stateMachines: interaction.stateMachine ?? 'State Machine 1',
    autoplay: true,
  })

  return (
    <RiveComponent
      className={styles.tile}
      style={{ width: '100%', aspectRatio: '1' }}
    />
  )
}
