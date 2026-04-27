/* global React */

/**
 * SpecSheet - Rive setup notes & layer naming convention
 */
function RiveSetupSheet() {
  return (
    <div style={specStyles.sheet}>
      <div style={specStyles.eyebrow}>RIVE SETUP — STEP BY STEP</div>
      <h2 style={specStyles.h2}>Importing the SVG into Rive</h2>
      <ol style={specStyles.ol}>
        <li><b>File &gt; Import</b> → select <code style={specStyles.code}>assets/heart-button.svg</code>. Rive preserves IDs as node names.</li>
        <li>Set artboard size to <b>600 × 600</b>, fill <b>#0E1116</b>.</li>
        <li>For each <code style={specStyles.code}>petal_n</code> group, in <b>Inspector &gt; Origin</b>, snap origin to the path's centroid so scale/rotate spin in place.</li>
        <li>Heart: select <code style={specStyles.code}>heart_shape</code>, set origin to (300, 300).</li>
        <li>Convert <code style={specStyles.code}>heart_shape</code> path to vertices (right-click → <i>Convert to Vertices</i>) only if you want shape morphing on beat. Otherwise leave as a path.</li>
      </ol>

      <h2 style={specStyles.h2}>State Machine inputs</h2>
      <table style={specStyles.table}>
        <thead><tr><th>Name</th><th>Type</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code style={specStyles.code}>click</code></td><td>Trigger</td><td>Fires lub-dub + petal launch</td></tr>
          <tr><td><code style={specStyles.code}>isHovered</code></td><td>Boolean</td><td>idle ↔ hover transition</td></tr>
          <tr><td><code style={specStyles.code}>orbitSpeed</code></td><td>Number (0–1)</td><td>Optional: drive ring spin from JS</td></tr>
        </tbody>
      </table>

      <h2 style={specStyles.h2}>States</h2>
      <ul style={specStyles.ul}>
        <li><b>Idle</b> (default) — looping animation: petals_group rotates 360° over 14s, heart breathes scale 1.0 → 1.02 → 1.0.</li>
        <li><b>Hover</b> — heart scale → 1.05, orbit speed × 2. Transition 180ms ease-out from Idle when <code style={specStyles.code}>isHovered = true</code>.</li>
        <li><b>Pressed (lub-dub)</b> — one-shot 520ms. Triggered by <code style={specStyles.code}>click</code>. Plays full lub-dub keyframes on heart.</li>
        <li><b>Pop</b> — one-shot 1080ms. Starts at t=0.22s of Pressed (use Blend State or sub-state). Petals fly outward, label fades.</li>
        <li><b>Recover</b> — return to Idle at t=1.6s. Petals tween back to orbit positions over 400ms ease-in-out.</li>
      </ul>

      <h2 style={specStyles.h2}>React integration</h2>
      <pre style={specStyles.pre}>{`import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

function HeartButton() {
  const { rive, RiveComponent } = useRive({
    src: '/heart-button.riv',
    stateMachines: 'Main',
    autoplay: true,
  });
  const click = useStateMachineInput(rive, 'Main', 'click');
  const hover = useStateMachineInput(rive, 'Main', 'isHovered');

  return (
    <RiveComponent
      style={{ width: 360, height: 360 }}
      onClick={() => click?.fire()}
      onMouseEnter={() => hover && (hover.value = true)}
      onMouseLeave={() => hover && (hover.value = false)}
    />
  );
}`}</pre>
    </div>
  );
}

function NamingSheet() {
  const rows = [
    ["button_root", "Artboard", "Top-level. Pivot center."],
    ["petals_group", "Group", "Holds 8 petals. Rotate this for orbit."],
    ["petal_1 … petal_8", "Group", "Each petal — pivot at its own center."],
    ["heart_group", "Group", "Wraps heart_shape. Animate scale here."],
    ["heart_shape", "Path", "The heart geometry. Don't animate transform on this — animate the parent."],
    ["label_group", "Group", "Toggle opacity 1 → 0 on click."],
    ["label_text", "Text", "Editable copy: 'click me'."],
  ];
  return (
    <div style={specStyles.sheet}>
      <div style={specStyles.eyebrow}>NAMING CONVENTION</div>
      <h2 style={specStyles.h2}>Layer hierarchy in Rive</h2>
      <p style={specStyles.p}>Rive imports SVG IDs as node names. Keep these exact names so the State Machine references stay stable.</p>
      <table style={specStyles.table}>
        <thead><tr><th>Name</th><th>Type</th><th>Notes</th></tr></thead>
        <tbody>
          {rows.map(([name, type, notes]) => (
            <tr key={name}>
              <td><code style={specStyles.code}>{name}</code></td>
              <td>{type}</td>
              <td>{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={specStyles.h2}>Rules</h2>
      <ul style={specStyles.ul}>
        <li>snake_case for everything.</li>
        <li>Suffix numeric children with <code style={specStyles.code}>_1</code>, <code style={specStyles.code}>_2</code>… (not <code style={specStyles.code}>1, 2</code>) so the JS API can iterate them by string interpolation.</li>
        <li>Animate the <i>group</i>, not the path inside it. This keeps the path's local origin clean.</li>
      </ul>
    </div>
  );
}

function KeyframeSheet() {
  const heartFrames = [
    ["0.00s", "1.00", "ease-out"],
    ["0.10s", "1.18", "lub peak"],
    ["0.18s", "1.05", "valley"],
    ["0.28s", "1.22", "dub peak (bigger)"],
    ["0.42s", "0.96", "overshoot"],
    ["0.55s", "1.02", "settle"],
    ["0.75s", "1.00", "rest"],
  ];
  const petalFrames = [
    ["0.00s", "r=145, op=1, scale=1, rot=θ", "orbit position"],
    ["0.22s", "r=145, op=1, scale=1.1", "anticipation pulse"],
    ["0.55s", "r=235, op=0.6, scale=0.6, +47°·i", "launched"],
    ["0.95s", "r=235, op=0, scale=0.4", "faded out"],
    ["1.20s", "r=145, op=0, scale=1", "snap back invisible"],
    ["1.60s", "r=145, op=1, scale=1", "fade in & resume orbit"],
  ];
  return (
    <div style={specStyles.sheet}>
      <div style={specStyles.eyebrow}>MOTION SPEC — KEYFRAMES</div>
      <h2 style={specStyles.h2}>heart_group.scale (lub-dub)</h2>
      <table style={specStyles.table}>
        <thead><tr><th>t</th><th>scale</th><th>note</th></tr></thead>
        <tbody>{heartFrames.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><code style={specStyles.code}>{c}</code></td>)}</tr>)}</tbody>
      </table>
      <p style={specStyles.p}><b>Easing:</b> 0→0.10s ease-out · 0.10→0.18s ease-in · 0.18→0.28s ease-out · 0.28→0.42s ease-in · 0.42→0.75s spring (cubic-bezier(.34,1.56,.64,1)).</p>

      <h2 style={specStyles.h2}>petal_n (orbit + pop)</h2>
      <table style={specStyles.table}>
        <thead><tr><th>t</th><th>state</th><th>note</th></tr></thead>
        <tbody>{petalFrames.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><code style={specStyles.code}>{c}</code></td>)}</tr>)}</tbody>
      </table>
      <p style={specStyles.p}><b>Idle orbit:</b> petals_group.rotation = 0° → 360° over 14s, linear, loop. <b>Hover:</b> double speed.</p>

      <h2 style={specStyles.h2}>label_group.opacity</h2>
      <table style={specStyles.table}>
        <thead><tr><th>t</th><th>opacity</th></tr></thead>
        <tbody>
          <tr><td><code style={specStyles.code}>0.00s</code></td><td><code style={specStyles.code}>1</code></td></tr>
          <tr><td><code style={specStyles.code}>0.22s</code></td><td><code style={specStyles.code}>0</code></td></tr>
          <tr><td><code style={specStyles.code}>1.40s</code></td><td><code style={specStyles.code}>0</code></td></tr>
          <tr><td><code style={specStyles.code}>1.60s</code></td><td><code style={specStyles.code}>1</code></td></tr>
        </tbody>
      </table>
    </div>
  );
}

const specStyles = {
  sheet: {
    background: "#fff",
    color: "#0E1116",
    padding: "32px 36px",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 14,
    lineHeight: 1.55,
    borderRadius: 4,
  },
  eyebrow: {
    fontFamily: "ui-monospace, monospace",
    fontSize: 11,
    letterSpacing: "0.16em",
    color: "#FF5A6E",
    marginBottom: 8,
  },
  h2: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 20,
    fontWeight: 700,
    margin: "28px 0 12px",
    letterSpacing: "-0.01em",
  },
  p: { margin: "8px 0", color: "#374151" },
  ol: { margin: "8px 0", paddingLeft: 22, color: "#374151" },
  ul: { margin: "8px 0", paddingLeft: 22, color: "#374151" },
  code: {
    fontFamily: "ui-monospace, monospace",
    fontSize: 12,
    background: "#FFF1F3",
    color: "#A33B26",
    padding: "1px 6px",
    borderRadius: 3,
  },
  pre: {
    background: "#0a0c11",
    color: "#e5e7eb",
    padding: 16,
    borderRadius: 6,
    fontFamily: "ui-monospace, monospace",
    fontSize: 12,
    lineHeight: 1.5,
    overflowX: "auto",
    whiteSpace: "pre",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
    margin: "8px 0 16px",
  },
};

// Apply table cell styles via a tiny CSS injection
if (typeof document !== "undefined" && !document.getElementById("spec-table-css")) {
  const s = document.createElement("style");
  s.id = "spec-table-css";
  s.textContent = `
    .spec-sheet table th, .spec-sheet table td { text-align: left; padding: 6px 10px; border-bottom: 1px solid #f1e5e5; vertical-align: top; }
    .spec-sheet table th { font-family: ui-monospace, monospace; font-size: 11px; letter-spacing: .08em; color: #9aa; text-transform: uppercase; font-weight: 500; }
  `;
  document.head.appendChild(s);
}

window.RiveSetupSheet = RiveSetupSheet;
window.NamingSheet = NamingSheet;
window.KeyframeSheet = KeyframeSheet;
