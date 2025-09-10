import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text, useProgress } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Code Stream Component
function CodeStream({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const nodes = useMemo(() => {
    const nodePositions = [];
    for (let i = 0; i < 20; i++) {
      nodePositions.push([
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ]);
    }
    return nodePositions;
  }, []);

  return (
    <group position={position} rotation={rotation}>
      {nodes.map((pos, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={pos as [number, number, number]}>
            <sphereGeometry args={[0.02 + Math.random() * 0.05]} />
            <meshStandardMaterial 
              color="#14B8A6" 
              emissive="#14B8A6" 
              emissiveIntensity={0.2}
              transparent 
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Connecting lines */}
      {nodes.slice(0, -1).map((pos, i) => {
        const nextPos = nodes[i + 1];
        const points = [new THREE.Vector3(...pos), new THREE.Vector3(...nextPos)];
        
        return (
          <mesh key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#14B8A6" transparent opacity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

// DevOps Infinity Loop
function DevOpsLoop() {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, -5]}>
        {/* Infinity loop rings */}
        <mesh rotation={[0, 0, Math.PI / 8]}>
          <torusGeometry args={[2, 0.05, 8, 100]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.1} transparent opacity={0.6} />
        </mesh>
        
        <mesh rotation={[0, 0, -Math.PI / 8]} position={[2, 0, 0]}>
          <torusGeometry args={[2, 0.05, 8, 100]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.1} transparent opacity={0.6} />
        </mesh>
        
        {/* Orbiting pods */}
        {[0, 1, 2].map((i) => (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={1} floatIntensity={0.5}>
            <mesh position={[Math.cos(i * 2) * 3, Math.sin(i * 2) * 1.5, 0]}>
              <sphereGeometry args={[0.08]} />
              <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.3} />
            </mesh>
          </Float>
        ))}
      </group>
    </Float>
  );
}

// System Architecture
function SystemArchitecture() {
  const spheres = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        Math.cos(i * 0.785) * 4,
        Math.sin(i * 0.785) * 2,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      scale: 0.8 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <group position={[3, 0, -3]}>
      {spheres.map((sphere, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={sphere.position} scale={sphere.scale}>
            <sphereGeometry args={[0.3]} />
            <meshStandardMaterial 
              color="#22C55E" 
              emissive="#22C55E" 
              emissiveIntensity={0.15}
              transparent 
              opacity={0.7}
              wireframe={Math.random() > 0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#14B8A6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7C3AED" />
      
      <CodeStream position={[-3, 2, 0]} rotation={[0, 0.5, 0]} />
      <CodeStream position={[4, -1, -2]} rotation={[0, -0.3, 0]} />
      <DevOpsLoop />
      <SystemArchitecture />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Fallback component for reduced motion
function StaticFallback() {
  return (
    <div className="canvas-fallback" />
  );
}

// Loading progress component
function LoadingProgress() {
  const { progress } = useProgress();
  
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="spinner w-8 h-8 mb-4 mx-auto" />
        <p className="text-sm text-muted-foreground">Loading 3D Environment... {Math.round(progress)}%</p>
      </div>
    </motion.div>
  );
}

interface ThreeBackgroundProps {
  className?: string;
}

export default function ThreeBackground({ className = "" }: ThreeBackgroundProps) {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <StaticFallback />;
  }

  return (
    <div className={`canvas-container ${className}`}>
      <Suspense fallback={<LoadingProgress />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ opacity: 0.2 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}