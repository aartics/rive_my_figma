import { useRive, useViewModel, useViewModelInstance } from '@rive-app/react-canvas'
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

  // Bind the default ViewModel instance so state machine listeners using
  // "./" property paths (e.g. set ./isHovered to true) can resolve them.
  const viewModel = useViewModel(rive, { useDefault: true })
  useViewModelInstance(viewModel, { useDefault: true, rive })

  return (
    <div className={styles.tile}>
      <RiveComponent className={styles.canvas} />
    </div>
  )
}
