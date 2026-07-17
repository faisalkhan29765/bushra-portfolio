import { useEffect, useState } from 'react';

/**
 * Detects whether WebGL is available. Used to decide between the
 * interactive Three.js hero and a static/animated 2D fallback
 * (older devices, disabled GPU, some mobile browsers, low-power mode).
 */
export default function useWebGLSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(!!gl);
    } catch (e) {
      setSupported(false);
    }
  }, []);

  return supported;
}
