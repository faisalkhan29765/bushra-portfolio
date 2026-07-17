import { useEffect, useState } from 'react';

/**
 * Returns true if the user's OS/browser setting requests reduced motion.
 * Used to disable non-essential animation (3D auto-rotation, parallax, etc.)
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const handler = (e) => setReduced(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return reduced;
}
