import { useEffect, useRef } from 'react'
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const r = new Rive({
      src: '/rive_my_figma/rive/firstbutton.riv',
      canvas,
      stateMachines: 'State Machine 1',
      autoplay: true,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      onLoad: () => {
        console.log('[Rive] loaded, canvas=', canvas.width, 'x', canvas.height)
        r.resizeDrawingSurfaceToCanvas()
        console.log('[Rive] after resize, canvas=', canvas.width, 'x', canvas.height)

        const inputs = r.stateMachineInputs('State Machine 1')
        console.log('[Rive] SM inputs:', inputs)
        inputs?.forEach((i) =>
          console.log('  -', i.name, 'type=', i.type, 'value=', i.value),
        )

        setTimeout(() => {
          console.log('[Rive] forcing pointerMove(200, 100)')
          ;(r as unknown as { pointerMove: (x: number, y: number) => void }).pointerMove(200, 100)
          setTimeout(() => {
            console.log('[Rive] forcing pointerDown(200, 100)')
            ;(r as unknown as { pointerDown: (x: number, y: number) => void }).pointerDown(200, 100)
            setTimeout(() => {
              console.log('[Rive] forcing pointerUp(200, 100)')
              ;(r as unknown as { pointerUp: (x: number, y: number) => void }).pointerUp(200, 100)
            }, 500)
          }, 500)
        }, 1000)
      },
      onStateChange: (e) => console.log('[Rive] state →', e.data),
    })

    return () => r.cleanup()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ color: 'white' }}>vanilla rive test</h1>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ background: '#111', display: 'block' }}
      />
    </div>
  )
}
