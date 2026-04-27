import Rive from '@rive-app/react-webgl2'
import type { Interaction } from '../data/interactions'
import styles from './RiveTile.module.css'

interface Props {
  interaction: Interaction
}

export default function RiveTile({ interaction }: Props) {
  if (!interaction.rivFile) {
    return <div className={styles.empty} />
  }

  return (
    <div className={styles.tile}>
      <Rive
        src={`/rive_my_figma/rive/${interaction.rivFile}`}
        stateMachines={interaction.stateMachine ?? 'State Machine 1'}
        className={styles.canvas}
      />
    </div>
  )
}
