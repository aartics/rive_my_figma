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
        r.resizeDrawingSurfaceToCanvas()

        // Bind the default ViewModel instance so state machine listeners
        // can resolve "./" property paths (isHovered, isPressed)
        const vm = (r as unknown as {
          defaultViewModel: () => { defaultInstance: () => unknown } | null
          bindViewModelInstance: (inst: unknown) => void
        })
        const viewModel = vm.defaultViewModel()
        const instance = viewModel?.defaultInstance()
        if (instance) {
          vm.bindViewModelInstance(instance)
          console.log('[Rive] ViewModel instance bound ✓')
        } else {
          console.warn('[Rive] no ViewModel instance found')
        }
      },
      onStateChange: (e) => console.log('[Rive] state →', e.data),
    })

    return () => r.cleanup()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ color: 'white' }}>state machine + viewmodel test</h1>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ background: '#111', display: 'block' }}
      />
    </div>
  )
}
