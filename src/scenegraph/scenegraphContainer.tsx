import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function ScenegraphPage() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  // 75,
  // window.innerWidth / window.innerHeight,
  // 0.1,
  // 1000
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const objects = [];

  // 모든 것에 하나의 구만 사용
  const radius = 1;
  const widthSegments = 6;
  const heightSegments = 6;
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );

  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(5, 5, 5); // 태양을 크게 만든다
  scene.add(sunMesh);
  objects.push(sunMesh);

  // const group = new THREE.Group();
  // const geo = new THREE.BoxBufferGeometry(2,2,2);
  // const mat = new THREE.MeshStandardMaterial({color: 0x1fbeca});
  // const mesh = new THREE.Mesh(geo, mat);
  // group.position.set(0,0.1,0.1);
  // group.add(mesh);
  // scene.add(group);
  const renderer = new THREE.WebGLRenderer();

  return (
    <Canvas>
      <group position={[0, 0.1, 0.1]}>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[0.047, 0.5, 0.29]} />
          <meshStandardMaterial attach="material" color={0xf95b3c} />
        </mesh>
      </group>
    </Canvas>
  );
}
