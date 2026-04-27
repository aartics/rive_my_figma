import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas'
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
  const sm = interaction.stateMachine ?? 'State Machine 1'

  const { rive, RiveComponent } = useRive({
    src: `/rive_my_figma/rive/${interaction.rivFile}`,
    stateMachines: sm,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  })

  const isHovered = useStateMachineInput(rive, sm, 'isHovered')
  const isPressed = useStateMachineInput(rive, sm, 'isPressed')

  return (
    <div
      className={styles.tile}
      onClick={onClick}
      onMouseEnter={() => { if (isHovered) isHovered.value = true }}
      onMouseLeave={() => {
        if (isHovered) isHovered.value = false
        if (isPressed) isPressed.value = false
      }}
      onMouseDown={() => { if (isPressed) isPressed.value = true }}
      onMouseUp={() => { if (isPressed) isPressed.value = false }}
    >
      <RiveComponent className={styles.canvas} />
    </div>
  )
}
