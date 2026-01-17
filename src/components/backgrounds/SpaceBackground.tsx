import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// --- SHADERS & MATERIALS ---

// 1. Twinkling Stars Shader
const starVertexShader = `
  attribute float phase;
  varying float vAlpha;
  uniform float time;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float twinkle = sin(time * 2.0 + phase);
    vAlpha = 0.5 + 0.5 * twinkle;
    gl_PointSize = (40.0 / -mvPosition.z) * (0.8 + 0.5 * twinkle);
  }
`;

const starFragmentShader = `
  varying float vAlpha;
  uniform vec3 color;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (length(coord) > 0.5) discard;
    float strength = 1.0 - (length(coord) * 2.0);
    strength = pow(strength, 3.0);
    gl_FragColor = vec4(color, vAlpha * strength);
  }
`;

// --- COMPONENTS ---

function TwinklingStars({ count = 5000 }) {
    const points = useRef<THREE.Points>(null!);

    const [positions, phases] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const ph = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const r = 100;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
            ph[i] = Math.random() * Math.PI;
        }
        return [pos, ph];
    }, [count]);

    const starMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color("#ffffff") }
            },
            vertexShader: starVertexShader,
            fragmentShader: starFragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
    }, []);

    useFrame((state) => {
        if (points.current && points.current.material) {
            (points.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} array={positions} count={count} itemSize={3} />
                <bufferAttribute attach="attributes-phase" args={[phases, 1]} array={phases} count={count} itemSize={1} />
            </bufferGeometry>
            <primitive object={starMaterial} attach="material" />
        </points>
    );
}

function CameraRig() {
    useFrame((state) => {
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.5, 0.02);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.5, 0.02);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

export default function SpaceBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-primary-900 overflow-hidden pointer-events-none">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'radial-gradient(circle at center, #0f1221 0%, #05070a 100%)'
                }}
            />
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: true, alpha: true }} className="relative z-10 w-full h-full">
                <fog attach="fog" args={["#05070a", 8, 30]} />
                <ambientLight intensity={0.5} />

                <TwinklingStars count={15000} />

                <CameraRig />
            </Canvas>
        </div>
    );
}
