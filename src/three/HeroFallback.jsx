/**
 * Fallback visual shown when WebGL isn't available. Pure SVG/CSS —
 * an abstracted "chip on a PCB" illustration with a subtle pulse,
 * so devices without a GPU still get something on-brand rather than a blank hero.
 */
export default function HeroFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="h-full max-h-[480px] w-full max-w-[480px]"
        role="img"
        aria-label="Illustration of a microcontroller chip on a circuit board"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="170" fill="url(#glow)" className="animate-pulseGlow" />

        {/* orbit rings */}
        <ellipse cx="200" cy="200" rx="150" ry="60" fill="none" stroke="#00d4ff" strokeOpacity="0.25" />
        <ellipse cx="200" cy="200" rx="165" ry="75" fill="none" stroke="#ffb703" strokeOpacity="0.2" />

        {/* chip body */}
        <rect x="150" y="150" width="100" height="100" rx="8" fill="#0f1420" stroke="#00d4ff" strokeOpacity="0.5" />
        <circle cx="165" cy="165" r="4" fill="#00d4ff" />

        {/* pins */}
        {Array.from({ length: 6 }).map((_, i) => {
          const x = 160 + i * 16;
          return (
            <g key={`t-${i}`}>
              <rect x={x} y="140" width="8" height="10" fill="#ffb703" />
              <rect x={x} y="250" width="8" height="10" fill="#ffb703" />
            </g>
          );
        })}
        {Array.from({ length: 6 }).map((_, i) => {
          const y = 160 + i * 16;
          return (
            <g key={`s-${i}`}>
              <rect x="140" y={y} width="10" height="8" fill="#ffb703" />
              <rect x="250" y={y} width="10" height="8" fill="#ffb703" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
