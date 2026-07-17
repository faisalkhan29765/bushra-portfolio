import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural "microcontroller on a PCB" centerpiece.
 * Everything here is built from primitive geometry — no external 3D assets.
 *
 * Structure:
 *  - a flat "PCB" base plane with a faint grid
 *  - a central chip (box) with emissive circuit-blue edges
 *  - pin rows (small boxes) around the chip
 *  - copper "traces" (drei <Line>) connecting the chip to floating components
 *  - floating resistors/capacitors (cylinders + boxes) that orbit slowly
 *  - drifting "electron" particles along a couple of orbit paths
 */

function Chip() {
  const chipRef = useRef();

  useFrame((state) => {
    // Gentle idle bob — layered on top of user rotation from OrbitControls
    if (chipRef.current) {
      chipRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    }
  });

  return (
    <group ref={chipRef}>
      {/* Chip body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.18, 1.4]} />
        <meshStandardMaterial
          color="#0d1420"
          roughness={0.35}
          metalness={0.6}
          emissive="#00d4ff"
          emissiveIntensity={0.08}
        />
      </mesh>
      {/* Chip top engraved marker (die notch reference) */}
      <mesh position={[-0.55, 0.1, -0.55]}>
        <circleGeometry args={[0.08, 24]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.2} />
      </mesh>
      {/* Pin rows on all four sides */}
      {Array.from({ length: 8 }).map((_, i) => {
        const t = (i / 7) * 1.2 - 0.6;
        return (
          <group key={i}>
            <mesh position={[t, 0.02, 0.78]}>
              <boxGeometry args={[0.05, 0.03, 0.18]} />
              <meshStandardMaterial color="#ffb703" metalness={0.9} roughness={0.3} />
            </mesh>
            <mesh position={[t, 0.02, -0.78]}>
              <boxGeometry args={[0.05, 0.03, 0.18]} />
              <meshStandardMaterial color="#ffb703" metalness={0.9} roughness={0.3} />
            </mesh>
            <mesh position={[0.78, 0.02, t]}>
              <boxGeometry args={[0.18, 0.03, 0.05]} />
              <meshStandardMaterial color="#ffb703" metalness={0.9} roughness={0.3} />
            </mesh>
            <mesh position={[-0.78, 0.02, t]}>
              <boxGeometry args={[0.18, 0.03, 0.05]} />
              <meshStandardMaterial color="#ffb703" metalness={0.9} roughness={0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Resistor({ position, rotation = [0, 0, 0], color = '#ffb703' }) {
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position} rotation={rotation}>
        <mesh>
          <cylinderGeometry args={[0.09, 0.09, 0.4, 16]} />
          <meshStandardMaterial color="#1c2537" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <torusGeometry args={[0.09, 0.02, 8, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <torusGeometry args={[0.09, 0.02, 8, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

function Capacitor({ position }) {
  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh position={position}>
        <cylinderGeometry args={[0.14, 0.14, 0.3, 24]} />
        <meshStandardMaterial
          color="#0f1420"
          emissive="#00d4ff"
          emissiveIntensity={0.25}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
    </Float>
  );
}

function OrbitTrace({ radius, tilt = 0, color = '#00d4ff' }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <group rotation={[tilt, 0, 0]}>
      <Line points={points} color={color} transparent opacity={0.25} lineWidth={1} />
    </group>
  );
}

function Electron({ radius, speed, tilt = 0, offset = 0, color = '#00d4ff' }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
    }
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function CopperTraces() {
  // A handful of right-angle "PCB trace" style connectors from chip edges outward
  const traceDefs = [
    [[0.7, 0.02, 0.3], [1.3, 0.02, 0.3], [1.3, 0.02, 1.1]],
    [[-0.7, 0.02, -0.3], [-1.3, 0.02, -0.3], [-1.3, 0.02, -1.1]],
    [[0.3, 0.02, -0.7], [0.3, 0.02, -1.3], [1.0, 0.02, -1.3]],
    [[-0.3, 0.02, 0.7], [-0.3, 0.02, 1.3], [-1.0, 0.02, 1.3]],
  ];
  return (
    <>
      {traceDefs.map((pts, i) => (
        <Line
          key={i}
          points={pts.map((p) => new THREE.Vector3(...p))}
          color="#ffb703"
          lineWidth={1.5}
          transparent
          opacity={0.5}
        />
      ))}
    </>
  );
}

export default function CircuitScene({ reducedMotion = false }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current && !reducedMotion) {
      // Slow ambient auto-rotation; OrbitControls (drag) layers on top of this
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base PCB plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
        <circleGeometry args={[2.6, 64]} />
        <meshStandardMaterial color="#0a0e17" roughness={0.9} metalness={0.1} />
      </mesh>

      <Chip />
      <CopperTraces />

      <Resistor position={[1.7, 0.1, 0.6]} rotation={[0, 0.4, 0]} />
      <Resistor position={[-1.6, 0.1, -0.8]} rotation={[0, -0.6, 0]} color="#00d4ff" />
      <Capacitor position={[1.1, 0.15, -1.5]} />
      <Capacitor position={[-1.2, 0.15, 1.4]} />

      {!reducedMotion && (
        <>
          <OrbitTrace radius={2.1} tilt={0.15} color="#00d4ff" />
          <OrbitTrace radius={2.35} tilt={-0.25} color="#ffb703" />
          <Electron radius={2.1} speed={0.6} tilt={0.15} color="#00d4ff" />
          <Electron radius={2.1} speed={0.6} tilt={0.15} offset={Math.PI} color="#00d4ff" />
          <Electron radius={2.35} speed={-0.4} tilt={-0.25} color="#ffb703" />
        </>
      )}

      <Sparkles count={40} scale={[5, 2, 5]} size={1.5} speed={0.2} color="#00d4ff" opacity={0.4} />
    </group>
  );
}
