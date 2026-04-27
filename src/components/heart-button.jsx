/* global React */
const { useState, useEffect, useRef } = React;

/**
 * <HeartButton/> — CSS/JS reference animation
 *
 * Goal: faithfully reproduce the target Rive behavior so you can feel it
 * before scripting in Rive.
 *
 * States:
 *   idle      → petals orbit slowly around the heart, heart at rest
 *   hover     → heart scales up subtly, orbit speed slightly increases
 *   pressed   → lub-dub: scale 1 → 1.18 → 1.05 → 1.22 → 1.0 (two beats)
 *   click     → petals launch outward (radial + spin + fade), label fades
 *   recovered → after ~1.6s, petals slide back into orbit, label returns
 */

const PETAL_COUNT = 8;
const ORBIT_RADIUS = 145; // px from center

/**
 * petalSizeForIndex(i, count, opts)
 * Returns a multiplier (around 1.0) for a given petal so sizes vary smoothly
 * around the ring. Uses a cosine wave: gradually grows then shrinks petal-by-petal.
 *
 *   amp   - how much sizes vary (0 = uniform; 0.5 = ±50%)
 *   phase - rotates which petal is biggest (0..1 of full ring)
 *   waves - how many full grow→shrink cycles around the ring (1 = single big bulge)
 *   base  - center scale; sizes oscillate around this
 */
function petalSizeForIndex(i, count, { amp = 0.45, phase = 0, waves = 1, base = 1 } = {}) {
  const theta = ((i / count) + phase) * Math.PI * 2 * waves;
  return base + amp * Math.cos(theta);
}

function HeartButton({ size = 360, sizeAmp = 0.45, sizePhase = 0, sizeWaves = 1 }) {
  const [phase, setPhase] = useState("idle"); // idle | hover | pressed | popped
  const [tick, setTick] = useState(0); // for orbit animation
  const rafRef = useRef(0);
  const startRef = useRef(performance.now());

  // continuous orbit time
  useEffect(() => {
    const loop = (t) => {
      setTick((t - startRef.current) / 1000);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleClick = () => {
    if (phase === "popped") return;
    setPhase("pressed");
    // lub-dub takes ~520ms; petals launch at ~200ms (peak of first beat)
    setTimeout(() => setPhase("popped"), 220);
    setTimeout(() => setPhase("idle"), 1800);
  };

  // heart scale via lub-dub keyframes
  const heartScale = (() => {
    if (phase === "pressed") return 1.18;
    if (phase === "popped") return 1.0;
    if (phase === "hover") return 1.05;
    return 1.0;
  })();

  const orbitSpeed = phase === "hover" ? 0.35 : 0.18; // rad/sec
  const orbitAngle = tick * orbitSpeed;

  const center = size / 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
      }}
      onMouseEnter={() => phase === "idle" && setPhase("hover")}
      onMouseLeave={() => phase === "hover" && setPhase("idle")}
      onClick={handleClick}
    >
      {/* PETALS */}
      {Array.from({ length: PETAL_COUNT }).map((_, i) => {
        const baseAngle = (i / PETAL_COUNT) * Math.PI * 2 - Math.PI / 2;
        const angle = baseAngle + orbitAngle;
        const isPopped = phase === "popped";
        const r = isPopped ? ORBIT_RADIUS + 90 : ORBIT_RADIUS;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        const rot = (angle * 180) / Math.PI + 90 + (isPopped ? i * 47 : 0);
        const opacity = isPopped ? 0 : 1;
        const sizeMult = petalSizeForIndex(i, PETAL_COUNT, { amp: sizeAmp, phase: sizePhase, waves: sizeWaves });
        const scale = (isPopped ? 0.4 : phase === "pressed" ? 1.1 : 1) * sizeMult;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 0,
              height: 0,
              transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`,
              opacity,
              transition: isPopped
                ? "left 700ms cubic-bezier(.18,.9,.32,1.2), top 700ms cubic-bezier(.18,.9,.32,1.2), opacity 900ms ease-out, transform 900ms cubic-bezier(.18,.9,.32,1.2)"
                : phase === "idle" && tick > 1.85
                ? "opacity 600ms ease-in 200ms"
                : "none",
            }}
          >
            <svg width="32" height="40" viewBox="-16 -22 32 40" style={{ overflow: "visible" }}>
              <path
                d="M0,-20 C11,-16 13,-2 5,9 C1,14 -3,15 -6,11 C-11,3 -9,-11 0,-20 Z"
                fill="#FF8A99"
              />
            </svg>
          </div>
        );
      })}

      {/* HEART */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          transform: `scale(${heartScale})`,
          transition:
            phase === "pressed"
              ? "transform 220ms cubic-bezier(.34,1.56,.64,1)"
              : phase === "popped"
              ? "transform 380ms cubic-bezier(.34,1.56,.64,1)"
              : "transform 240ms cubic-bezier(.34,1.56,.64,1)",
          transformOrigin: "center",
        }}
      >
        <svg
          width={size * 0.62}
          height={size * 0.62}
          viewBox="0 0 600 600"
          style={{ overflow: "visible" }}
        >
          <path
            d={window.DERP_HEART_D}
            fill="#FF5A6E"
          />
          <text
            x="300"
            y="316"
            textAnchor="middle"
            fontFamily="Caveat, 'Comic Sans MS', cursive"
            fontWeight="500"
            fontSize="48"
            letterSpacing="0"
            fill="#0E1116"
            style={{
              opacity: phase === "popped" ? 0 : 1,
              transition: "opacity 220ms ease-out",
            }}
          >
            click me
          </text>
        </svg>
      </div>
    </div>
  );
}

window.HeartButton = HeartButton;
window.petalSizeForIndex = petalSizeForIndex;
