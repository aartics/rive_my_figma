/* global React */
const { useState, useEffect, useRef } = React;

/**
 * Derp heart path — intentionally asymmetric, hand-drawn feel.
 *  - left lobe sits higher and is rounder/bigger
 *  - right lobe is smaller, slightly squashed, dipping lower
 *  - tip pulls down-left and curls
 *  - subtle wobbles via extra control points
 */
const DERP_HEART_D = "M 296 232 \
C 268 178, 196 168, 162 218 \
C 140 252, 156 296, 198 322 \
C 240 348, 286 386, 308 424 \
C 322 408, 348 388, 376 366 \
C 412 338, 448 312, 458 282 \
C 470 246, 444 198, 402 198 \
C 372 198, 348 220, 328 240 \
C 318 248, 308 246, 296 232 Z";
window.DERP_HEART_D = DERP_HEART_D;

/**
 * StaticState - renders a frozen pose of the heart button for the spec sheet.
 * No animation, just exact transforms so designers/devs can read keyframes.
 */
function StaticState({ size = 280, heartScale = 1, petalRadius = 145, petalOpacity = 1, petalScale = 1, petalSpin = 0, labelOpacity = 1, label = "click me", sizeAmp = 0.45, sizePhase = 0, sizeWaves = 1 }) {
  const center = size / 2;
  const sizeFor = window.petalSizeForIndex || ((i, c) => 1);
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const x = center + Math.cos(angle) * petalRadius;
        const y = center + Math.sin(angle) * petalRadius;
        const rot = (angle * 180) / Math.PI + 90 + petalSpin * (i + 1);
        const sizeMult = sizeFor(i, 8, { amp: sizeAmp, phase: sizePhase, waves: sizeWaves });
        return (
          <div key={i} style={{
            position: "absolute", left: x, top: y,
            transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${petalScale * sizeMult})`,
            opacity: petalOpacity,
          }}>
            <svg width="26" height="32" viewBox="-13 -18 26 32" style={{ overflow: "visible" }}>
              <path d="M0,-16 C9,-13 11,-2 4,7 C1,11 -3,12 -5,9 C-9,2 -7,-9 0,-16 Z" fill="#FF8A99"/>
            </svg>
          </div>
        );
      })}
      <div style={{
        position: "absolute", inset: 0, display: "grid", placeItems: "center",
        transform: `scale(${heartScale})`,
      }}>
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 600 600" style={{ overflow: "visible" }}>
          <path d={DERP_HEART_D} fill="#FF5A6E"/>
          <text x="300" y="316" textAnchor="middle" fontFamily="Caveat, 'Comic Sans MS', cursive" fontWeight="500" fontSize="40" letterSpacing="0" fill="#0E1116" opacity={labelOpacity}>
            {label}
          </text>
        </svg>
      </div>
    </div>
  );
}

/**
 * Source SVG artboard — the unstyled, layered file you paste into Rive.
 * Adds visible layer outlines + numeric labels on each petal so you can
 * see the structure at a glance.
 */
function SourceArtboard({ size = 360, sizeAmp = 0.45, sizePhase = 0, sizeWaves = 1 }) {
  const center = size / 2;
  const r = (size / 600) * 200;
  const sizeFor = window.petalSizeForIndex || ((i, c) => 1);
  return (
    <div style={{ width: size, height: size, position: "relative", background: "#fff", border: "1px dashed rgba(255,90,110,.4)" }}>
      <div style={{ position: "absolute", top: 8, left: 10, fontSize: 10, fontFamily: "ui-monospace, monospace", color: "#9aa", letterSpacing: ".08em" }}>artboard 600×600</div>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        const sizeMult = sizeFor(i, 8, { amp: sizeAmp, phase: sizePhase, waves: sizeWaves });
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${sizeMult})`, textAlign: "center" }}>
            <svg width="28" height="34" viewBox="-14 -19 28 34" style={{ overflow: "visible", display: "block" }}>
              <path d="M0,-16 C9,-13 11,-2 4,7 C1,11 -3,12 -5,9 C-9,2 -7,-9 0,-16 Z" fill="none" stroke="#FF8A99" strokeWidth="1.5"/>
            </svg>
            <div style={{ fontSize: 9, fontFamily: "ui-monospace, monospace", color: "#FF5A6E", marginTop: 2 }}>petal_{i + 1}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 600 600" style={{ overflow: "visible" }}>
          <path d={DERP_HEART_D} fill="none" stroke="#FF5A6E" strokeWidth="2"/>
          <text x="300" y="316" textAnchor="middle" fontFamily="Caveat, 'Comic Sans MS', cursive" fontWeight="500" fontSize="40" letterSpacing="0" fill="#0E1116">click me</text>
          <circle cx="300" cy="300" r="3" fill="#0E1116"/>
          <text x="312" y="304" fontFamily="ui-monospace, monospace" fontSize="10" fill="#9aa">pivot</text>
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: 8, left: 10, fontSize: 10, fontFamily: "ui-monospace, monospace", color: "#9aa" }}>
        #button_root &gt; #petals_group + #heart_group + #label_group
      </div>
    </div>
  );
}

/**
 * Timing diagram — visualizes the lub-dub + petal launch over 1.6s
 */
function TimingDiagram({ width = 720, height = 280 }) {
  const padL = 80, padR = 20, padT = 30, padB = 30;
  const W = width - padL - padR;
  const H = height - padT - padB;
  const tMax = 1.6; // seconds

  // heart scale curve points (lub-dub)
  const heartCurve = [
    [0.00, 1.00],
    [0.10, 1.18],  // lub peak
    [0.18, 1.05],  // valley
    [0.28, 1.22],  // dub peak (bigger)
    [0.42, 0.96],  // overshoot down
    [0.55, 1.02],
    [0.75, 1.00],
    [1.60, 1.00],
  ];

  // petal radius curve (idle 145, launches at .22 to 235, fades, returns)
  const petalCurve = [
    [0.00, 145],
    [0.22, 145],
    [0.55, 235],
    [0.95, 235],
    [1.20, 145],
    [1.60, 145],
  ];

  const x = (t) => padL + (t / tMax) * W;
  const yH = (s) => padT + (1 - (s - 0.9) / 0.4) * H;
  const yP = (r) => padT + (1 - (r - 100) / 180) * H;

  const heartPath = heartCurve.map((p, i) => `${i === 0 ? "M" : "L"} ${x(p[0])} ${yH(p[1])}`).join(" ");
  const petalPath = petalCurve.map((p, i) => `${i === 0 ? "M" : "L"} ${x(p[0])} ${yP(p[1])}`).join(" ");

  const ticks = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6];

  return (
    <svg width={width} height={height} style={{ background: "#0a0c11", borderRadius: 8 }}>
      {/* grid */}
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} y1={padT} x2={x(t)} y2={padT + H} stroke="rgba(255,255,255,.06)"/>
          <text x={x(t)} y={padT + H + 16} fill="#6b7280" fontSize="10" fontFamily="ui-monospace, monospace" textAnchor="middle">{t.toFixed(1)}s</text>
        </g>
      ))}
      {/* event markers */}
      <line x1={x(0)} y1={padT} x2={x(0)} y2={padT + H} stroke="#22c55e" strokeDasharray="3 3"/>
      <text x={x(0) + 4} y={padT + 12} fill="#22c55e" fontSize="10" fontFamily="ui-monospace, monospace">click</text>
      <line x1={x(0.22)} y1={padT} x2={x(0.22)} y2={padT + H} stroke="#FF5A6E" strokeDasharray="3 3"/>
      <text x={x(0.22) + 4} y={padT + 12} fill="#FF5A6E" fontSize="10" fontFamily="ui-monospace, monospace">launch</text>

      {/* axes */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + H} stroke="rgba(255,255,255,.2)"/>
      <line x1={padL} y1={padT + H} x2={padL + W} y2={padT + H} stroke="rgba(255,255,255,.2)"/>

      {/* heart curve */}
      <path d={heartPath} fill="none" stroke="#FF5A6E" strokeWidth="2"/>
      <text x={padL - 8} y={yH(1.18)} fill="#FF5A6E" fontSize="10" fontFamily="ui-monospace, monospace" textAnchor="end">heart.scale</text>

      {/* petal curve */}
      <path d={petalPath} fill="none" stroke="#FF8A99" strokeWidth="2" strokeDasharray="4 3"/>
      <text x={padL - 8} y={yP(235)} fill="#FF8A99" fontSize="10" fontFamily="ui-monospace, monospace" textAnchor="end">petal.r</text>

      {/* keyframe dots */}
      {heartCurve.map(([t, s]) => (<circle key={`h${t}`} cx={x(t)} cy={yH(s)} r="3" fill="#FF5A6E"/>))}
      {petalCurve.map(([t, r]) => (<circle key={`p${t}`} cx={x(t)} cy={yP(r)} r="3" fill="#FF8A99"/>))}

      {/* legend */}
      <g transform={`translate(${padL + W - 180}, ${padT + 6})`}>
        <rect width="174" height="46" fill="rgba(255,255,255,.04)" rx="4"/>
        <circle cx="12" cy="14" r="4" fill="#FF5A6E"/>
        <text x="22" y="18" fill="#e5e7eb" fontSize="11" fontFamily="ui-monospace, monospace">heart scale (lub-dub)</text>
        <circle cx="12" cy="34" r="4" fill="#FF8A99"/>
        <text x="22" y="38" fill="#e5e7eb" fontSize="11" fontFamily="ui-monospace, monospace">petal radius (orbit→pop)</text>
      </g>
    </svg>
  );
}

window.StaticState = StaticState;
window.SourceArtboard = SourceArtboard;
window.TimingDiagram = TimingDiagram;
