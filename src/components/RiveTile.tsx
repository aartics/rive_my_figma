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
  const { RiveComponent } = useRive({
    src: `/rive_my_figma/rive/${interaction.rivFile}`,
    stateMachines: interaction.stateMachine ?? 'State Machine 1',
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  })

  return (
    <div className={styles.tile} onClick={onClick}>
      <RiveComponent className={styles.canvas} />
    </div>
  )
}
