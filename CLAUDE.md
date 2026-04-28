# rive_my_figma

A small portfolio PWA where each piece is a live Rive animation rendered in a responsive grid. React + Vite + TypeScript, hosted on GitHub Pages.

## Adding a new Rive piece

1. **In the Rive editor (0.8.x):** build the state machine using **listeners that set ViewModel properties** — e.g. `set ./isHovered to Value true` on `pointer enter`, `set ./isHovered to Value false` on `pointer exit`. The `./` prefix is a ViewModel property path. Don't use the old "Inputs" panel — it's deprecated.
2. **Export the `.riv`** and drop it in `public/rive/`.
3. **Add an entry to `src/data/interactions.ts`** with at minimum `rivFile` and `stateMachine` (default: `'State Machine 1'`).
4. That's it. `RiveTile` renders it correctly, including hover/press/click reactions.

## Why ViewModel binding is required (read this once)

In the new Rive (0.8.x and later), listeners don't talk directly to the state machine. They talk to a **ViewModel** — a separate object with the boolean/number/string/trigger properties (`isHovered`, `isPressed`, etc.). The state machine reads from that ViewModel to decide transitions.

If no ViewModel **instance** is bound to the runtime, listeners fire into the void: `set ./isHovered to true` writes to nothing, the state machine never sees the change, and the button looks frozen even though the file loaded fine.

`RiveTile` does the binding with two hooks:

```tsx
const viewModel = useViewModel(rive, { useDefault: true })
useViewModelInstance(viewModel, { useDefault: true, rive })
```

The `{ rive }` argument on `useViewModelInstance` is what calls `rive.bindViewModelInstance(instance)` under the hood. Without it, you get the broken-listener symptom.

For vanilla `@rive-app/canvas` (no React wrapper), the equivalent is:

```js
onLoad: () => {
  const vm = r.defaultViewModel()
  const instance = vm?.defaultInstance()
  if (instance) r.bindViewModelInstance(instance)
}
```

## Diagnosing a "Rive file loads but nothing reacts" symptom

If hover/click stop working on a new file, check in this order:

1. **State machine name matches.** The component defaults to `'State Machine 1'`. If the file uses a different name, set `stateMachine` in `interactions.ts`.
2. **`rive._viewModelInstance` is not null.** In the browser console: log the instance and inspect this property. If it's null, the ViewModel binding step is missing or the file has no default ViewModel.
3. **Listener targets a real shape.** In the Rive editor, the listener has a "Listen to" group/shape — make sure it's the visible button, not an empty group.
4. **No `StrictMode` around the component.** `useRive` is not StrictMode-safe in this version (`@rive-app/react-canvas` 4.28.x). The double-mount orphans pointer wiring. `src/main.tsx` intentionally does not use `StrictMode`.

## Stack notes

- `@rive-app/react-canvas` (canvas renderer). Don't switch to `@rive-app/react-webgl2` — its default export trips a Vite CJS/ESM interop bug. The canvas renderer is also smaller (~163 KB lighter bundle).
- PWA: manual `manifest.json` + `public/sw.js`. `vite-plugin-pwa` is incompatible with Vite 8.
- GitHub Pages: `base: '/rive_my_figma/'` in `vite.config.ts`, `HashRouter` in `main.tsx`, `npm run deploy` to publish.

## Local development

```sh
npm run dev      # vite dev server
npm run build    # tsc + vite build
npm run deploy   # build + publish to gh-pages
```
