import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import CircuitScene from './CircuitScene';

/**
 * Handles the camera's load-in animation: starts pulled back and slightly
 * elevated, eases into its resting position over ~1.8s. Runs once on mount.
 */
function CameraIntro({ reducedMotion }) {
  const t = useRef(0);
  const done = useRef(reducedMotion);

  useFrame((state, delta) => {
    if (done.current) return;
    t.current += delta;
    const progress = Math.min(t.current / 1.8, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    state.camera.position.set(
      0 + Math.sin(eased * 0.2) * 0.2,
      4.5 - eased * 2.7,
      8 - eased * 3
    );
    state.camera.lookAt(0, 0, 0);
    if (progress >= 1) done.current = true;
  });

  return null;
}

export default function HeroCanvas({ reducedMotion = false }) {
  const [ready, setReady] = useState(false);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: reducedMotion ? [0.5, 1.8, 5] : [0, 4.5, 8], fov: 42 }}
      onCreated={() => setReady(true)}
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}
    >
      <color attach="background" args={['#0a0e17']} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-4, 2, -3]} intensity={0.6} color="#00d4ff" />
      <pointLight position={[3, -1, 4]} intensity={0.4} color="#ffb703" />

      <Suspense fallback={null}>
        <CircuitScene reducedMotion={reducedMotion} />
        <Environment preset="city" />
      </Suspense>

      <CameraIntro reducedMotion={reducedMotion} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        enabled={!reducedMotion}
      />

      {!reducedMotion && (
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
