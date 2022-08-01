import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import {
  Selection,
  Select,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
function ScenegraphPage() {
  const SunRef = useRef<any>(null);
  const EarthRef = useRef<any>(null);
  const MoonRef = useRef<any>(null);
  useFrame(() => {
    SunRef.current.rotation.y += 0.01;
    SunRef.current.scale.x = 5;
    SunRef.current.scale.y = 5;
    SunRef.current.scale.z = 5;
    EarthRef.current.rotation.y += 0.01;
    EarthRef.current.position.x = 10;
    EarthRef.current.scale.x = 0.5;
    EarthRef.current.scale.y = 0.5;
    EarthRef.current.scale.z = 0.5;
    MoonRef.current.rotation.y += 0.01;
    MoonRef.current.position.x = 3.5;
    MoonRef.current.scale.x = 0.5;
    MoonRef.current.scale.y = 0.5;
    MoonRef.current.scale.z = 0.5;
  });

  const [hovered, hover] = useState(false);

  return (
    <Select enabled={hovered}>
      <group>
        <object3D
          ref={SunRef}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          <mesh>
            <sphereBufferGeometry attach="geometry" />
            <meshPhysicalMaterial
              color={"gold"}
              emissive={0xffff00}
              emissiveIntensity={2}
            />
          </mesh>
          <object3D>
            <mesh ref={EarthRef}>
              <sphereBufferGeometry attach="geometry" />
              <meshPhysicalMaterial
                color={0x2233ff}
                emissive={0x112244}
                emissiveIntensity={2}
              />
              <object3D>
                <mesh ref={MoonRef}>
                  <sphereBufferGeometry attach="geometry" />
                  <meshPhysicalMaterial
                    color={0x888888}
                    emissive={0x222222}
                    emissiveIntensity={2}
                  />
                </mesh>
              </object3D>
            </mesh>
          </object3D>
        </object3D>
      </group>
    </Select>
  );
}

export default function Go() {
  const fov = 40;
  const aspect = 2; // the canvas default
  const near = 0.3;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(50, 200, 50);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);
  return (
    <div style={{ width: "1000px", height: "1000px", padding: "5%" }}>
      <Canvas
        camera={camera}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Selection>
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline
              blur
              visibleEdgeColor="white"
              edgeStrength={10}
              width={500}
            />
          </EffectComposer>
          <ScenegraphPage />
          <spotLight intensity={0.7} position={[30, 30, 30]} angle={2} />
          <pointLight position={[-10, -10, -10]} />
        </Selection>
      </Canvas>
    </div>
  );
}
