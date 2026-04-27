import { useEffect } from 'react'
import { useRive } from '@rive-app/react-canvas'

export default function Home() {
  const { RiveComponent, canvas, rive } = useRive({
    src: '/rive_my_figma/rive/firstbutton.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
    onLoad: () => console.log('[Rive] loaded'),
    onStateChange: (e) => console.log('[Rive] state', e.data),
  })

  useEffect(() => {
    if (!canvas) return
    console.log('[canvas] mounted', canvas, 'size=', canvas.width, 'x', canvas.height)
    const log = (e: PointerEvent) =>
      console.log('[canvas]', e.type, 'client=', e.clientX, e.clientY)
    canvas.addEventListener('pointerenter', log)
    canvas.addEventListener('pointerleave', log)
    canvas.addEventListener('pointerdown', log)
    return () => {
      canvas.removeEventListener('pointerenter', log)
      canvas.removeEventListener('pointerleave', log)
      canvas.removeEventListener('pointerdown', log)
    }
  }, [canvas])

  useEffect(() => {
    if (!rive) return
    console.log('[Rive] instance', rive)
    console.log('[Rive] state machines on file:', rive.stateMachineNames)
    console.log('[Rive] contents:', rive.contents)
  }, [rive])

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ color: 'white' }}>flat rive test</h1>
      <RiveComponent
        style={{ width: 400, height: 200, background: '#111', display: 'block' }}
      />
    </div>
  )
}
