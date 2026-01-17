import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial, Points, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Generate random star positions
function generateStarPositions(count: number, radius: number): Float32Array {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Spherical distribution for a more natural star field
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * Math.cbrt(Math.random()); // Cube root for even distribution

        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);
    }
    return positions;
}

// The star cluster component
function StarField() {
    const groupRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Slow constant rotation
        groupRef.current.rotation.x += delta * 0.02;
        groupRef.current.rotation.y += delta * 0.03;

        // Mouse parallax effect
        const targetX = (mouse.x * viewport.width) / 20;
        const targetY = (mouse.y * viewport.height) / 20;

        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    });

    return (
        <group ref={groupRef}>
            {/* Main Twinkling Stars */}
            <Sparkles
                count={3000}
                scale={[20, 20, 20]}
                size={1.5}
                speed={0.4}
                opacity={0.8}
                color="#ffffff"
            />
            {/* Distance Stars (Static-ish) */}
            <Sparkles
                count={2000}
                scale={[30, 30, 30]}
                size={0.8}
                speed={0.1}
                opacity={0.4}
                color="#6366F1" // Indigo tint
            />
        </group>
    );
}

// Adding a secondary layer of brighter, larger stars
function NebulaGlow() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Pulsing glow effect
        const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        meshRef.current.scale.setScalar(scale);
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -10]}>
            <sphereGeometry args={[5, 32, 32]} />
            <meshBasicMaterial
                color="#6366F1"
                transparent
                opacity={0.03}
                side={THREE.BackSide}
            />
        </mesh>
    );
}

// Accent particle layer (cyan accent stars)
function AccentStars() {
    const pointsRef = useRef<THREE.Points>(null);
    const positions = useMemo(() => generateStarPositions(200, 12), []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.z -= delta * 0.01;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#06B6D4"
                size={0.04}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.9}
            />
        </Points>
    );
}

// Main exported component
export default function SpaceScene() {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#0A0E27]">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: false, alpha: false }}
                style={{ background: '#0A0E27' }}
            >
                {/* Ambient lighting for subtle visibility */}
                <ambientLight intensity={0.1} />

                {/* Main star field */}
                <StarField />

                {/* Accent cyan stars */}
                <AccentStars />

                {/* Nebula glow background */}
                <NebulaGlow />
            </Canvas>
        </div>
    );
}
