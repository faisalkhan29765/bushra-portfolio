/**
 * Fixed, full-viewport low-opacity grid that drifts slowly — the
 * "engineering lab" backdrop referenced behind every section.
 * Pure CSS (see .circuit-bg in index.css) so it costs nothing on the GPU.
 */
export default function CircuitBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-lab-bg">
      <div className="circuit-bg" />
      {/* radial vignette so the grid fades toward the edges instead of hard-cutting */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 20%, transparent 0%, #0a0e17 75%)',
        }}
      />
    </div>
  );
}
