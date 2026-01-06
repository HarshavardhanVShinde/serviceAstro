import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial, Float, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.2, 64, 64]} ref={meshRef} {...props}>
          <MeshDistortMaterial
            color="#2563eb"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
    </Float>
  );
}

function AnimatedTorus(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * -0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * -0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <Torus args={[1.2, 0.4, 32, 64]} ref={meshRef} {...props}>
         <meshStandardMaterial color="#ec4899" roughness={0.1} metalness={0.9} />
      </Torus>
    </Float>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none fade-in-delay">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ec4899" />
        
        <AnimatedSphere position={[-2, 0, -2]} scale={1} />
        <AnimatedTorus position={[2, 0, -1]} rotation={[Math.PI / 4, 0, 0]} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
