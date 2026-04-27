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

        const anyR = r as unknown as {
          animator: { stateMachines: Array<{ instance: unknown; playing: boolean }> }
          runtime: { hasListeners: (smInstance: unknown) => boolean }
          eventCleanup: unknown
        }
        const sm = anyR.animator.stateMachines[0]
        console.log('[Rive] sm.playing=', sm.playing)
        console.log('[Rive] runtime.hasListeners(sm)=', anyR.runtime.hasListeners(sm.instance))
        console.log('[Rive] eventCleanup is function?', typeof anyR.eventCleanup === 'function')

        canvas.addEventListener('mousemove', (e) => {
          console.log('[canvas] mousemove client=', e.clientX, e.clientY)
        })

        setTimeout(() => {
          console.log('[SM] manual pointerMove(120, 32) — artboard center')
          const smInst = sm.instance as { pointerMove: (x: number, y: number) => void; pointerDown: (x: number, y: number) => void; pointerUp: (x: number, y: number) => void }
          smInst.pointerMove(120, 32)
          setTimeout(() => {
            console.log('[SM] manual pointerDown(120, 32)')
            smInst.pointerDown(120, 32)
            setTimeout(() => {
              console.log('[SM] manual pointerUp(120, 32)')
              smInst.pointerUp(120, 32)
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
