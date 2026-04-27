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
