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
  const stateMachine = interaction.stateMachine ?? 'State Machine 1'
  const { RiveComponent } = useRive({
    src: `/rive_my_figma/rive/${interaction.rivFile}`,
    stateMachines: stateMachine,
    autoplay: true,
    onLoad: () => {
      console.log('[Rive] loaded', interaction.rivFile, 'sm=', stateMachine)
    },
    onStateChange: (event) => {
      console.log('[Rive] state change', interaction.rivFile, event.data)
    },
  })

  return (
    <div className={styles.tile}>
      <RiveComponent className={styles.canvas} />
    </div>
  )
}
