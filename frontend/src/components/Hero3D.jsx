import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Grid } from "@react-three/drei";
import * as THREE from "three";

const LOW_POWER =
  typeof window !== "undefined" &&
  ((navigator.hardwareConcurrency || 8) <= 4 || window.innerWidth < 768);

const PANEL_EDGES_GEO = new THREE.BoxGeometry(3.2, 1.9, 0.06);

const Particles = ({ count = 500 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#3b82f6" transparent opacity={0.55} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
};

const chartPoints = (seed, w = 2.6, h = 0.9) => {
  const pts = [];
  for (let i = 0; i <= 12; i++) {
    const x = (i / 12) * w - w / 2;
    const y = Math.sin(i * 0.9 + seed) * 0.12 + (i / 12) * h - h / 2;
    pts.push(new THREE.Vector3(x, y, 0.06));
  }
  return pts;
};

const GlassPanel = ({ position, rotation, seed = 0, accent = "#22C55E", bars = false, scale = 1 }) => {
  const pts = useMemo(() => chartPoints(seed), [seed]);
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <boxGeometry args={[3.2, 1.9, 0.06]} />
          <meshPhysicalMaterial
            color="#0d1830"
            metalness={0.7}
            roughness={0.25}
            transparent
            opacity={0.72}
            envMapIntensity={1.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.031]}>
          <planeGeometry args={[3.2, 1.9]} />
          <meshBasicMaterial color="#12213f" transparent opacity={0.35} />
        </mesh>
        {/* header strip */}
        <mesh position={[-1.15, 0.72, 0.05]}>
          <planeGeometry args={[0.7, 0.09]} />
          <meshBasicMaterial color="#2563EB" transparent opacity={0.9} />
        </mesh>
        <mesh position={[1.25, 0.72, 0.05]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color={accent} />
        </mesh>
        {bars ? (
          [...Array(7)].map((_, i) => {
            const h = 0.25 + Math.abs(Math.sin(i * 1.3 + seed)) * 0.75;
            return (
              <mesh key={i} position={[-1.2 + i * 0.4, h / 2 - 0.6, 0.06]}>
                <boxGeometry args={[0.18, h, 0.04]} />
                <meshStandardMaterial
                  color={i % 2 ? "#2563EB" : accent}
                  emissive={i % 2 ? "#2563EB" : accent}
                  emissiveIntensity={0.55}
                />
              </mesh>
            );
          })
        ) : (
          <>
            <Line points={pts} color={accent} lineWidth={2.2} position={[0, -0.15, 0]} />
            {pts.filter((_, i) => i % 3 === 0).map((p, i) => (
              <mesh key={i} position={[p.x, p.y - 0.15, 0.08]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshBasicMaterial color={accent} />
              </mesh>
            ))}
          </>
        )}
        {/* border glow */}
        <lineSegments geometry={PANEL_EDGES_GEO}>
          <lineBasicMaterial color="#3b6ff0" transparent opacity={0.5} />
        </lineSegments>
      </group>
    </Float>
  );
};

const Rig = () => {
  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.05;
    camera.position.y += (pointer.y * 0.5 + 0.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const Scene = () => (
  <>
    <fog attach="fog" args={["#0B1220", 9, 24]} />
    <ambientLight intensity={0.55} />
    <pointLight position={[6, 5, 4]} intensity={44} color="#2563EB" />
    <pointLight position={[-6, -2, 3]} intensity={24} color="#22C55E" />
    <directionalLight position={[0, 6, 5]} intensity={0.9} color="#ffffff" />

    <Particles count={LOW_POWER ? 220 : 500} />

    <GlassPanel position={[3.4, 0.9, -1.5]} rotation={[0, -0.45, 0.03]} seed={1} accent="#22C55E" />
    <GlassPanel position={[4.6, -1.3, -2.6]} rotation={[0.05, -0.55, -0.04]} seed={4} accent="#60A5FA" bars scale={0.85} />
    {!LOW_POWER && (
      <>
        <GlassPanel position={[-4.6, 1.6, -3.5]} rotation={[0, 0.5, -0.03]} seed={7} accent="#22C55E" bars scale={0.75} />
        <GlassPanel position={[-4.2, -1.2, -2.2]} rotation={[0.04, 0.45, 0.04]} seed={2.5} accent="#93C5FD" scale={0.7} />
      </>
    )}

    <Grid
      position={[0, -2.8, 0]}
      args={[40, 40]}
      cellSize={0.8}
      cellThickness={0.6}
      cellColor="#1e3a8a"
      sectionSize={4}
      sectionThickness={1}
      sectionColor="#2563EB"
      fadeDistance={22}
      fadeStrength={2.5}
      infiniteGrid
    />
    <Rig />
  </>
);

export const Hero3D = () => {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.02 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 z-0" data-testid="hero-3d-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.4, 7.5], fov: 45 }}
        dpr={LOW_POWER ? [1, 1.25] : [1, 1.5]}
        frameloop={active ? "always" : "never"}
        performance={{ min: 0.5 }}
        gl={{ antialias: !LOW_POWER, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
