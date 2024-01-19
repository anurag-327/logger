import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "react-three-fiber";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import styles from "./Globe.module.css"; // Create this file for styling

const latLonToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

const Point = ({ lat, lon, name }) => {
  const pointRef = useRef();

  useEffect(() => {
    const coordinates = latLonToVector3(lat, lon, 2);
    pointRef.current.position.copy(coordinates);
  }, [lat, lon]);

  return (
    <>
      <mesh ref={pointRef} position={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[0.05, 32, 32]} />
        <meshBasicMaterial attach="material" color={0xff0000} />
      </mesh>
      <HTMLContent coordinates={latLonToVector3(lat, lon, 2)} name={name} />
    </>
  );
};

const HTMLContent = ({ coordinates, name }) => {
  const { scene, camera } = useThree();
  const labelDiv = document.createElement("div");
  labelDiv.className = styles.label;
  labelDiv.textContent = name;

  const label = new CSS2DObject(labelDiv);
  label.position.copy(coordinates.clone().multiplyScalar(1.2));
  scene.add(label);

  useEffect(() => {
    const css2DRenderer = new CSS2DRenderer();
    css2DRenderer.setSize(window.innerWidth, window.innerHeight);
    css2DRenderer.domElement.style.position = "absolute";
    css2DRenderer.domElement.style.top = "0";
    document.body.appendChild(css2DRenderer.domElement);

    const render = () => {
      css2DRenderer.render(scene, camera);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    animate();

    return () => {
      document.body.removeChild(css2DRenderer.domElement);
    };
  }, []);

  return null;
};

const Globe = ({ data }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={0.5} />
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={0x66ccff} wireframe />
      </mesh>
      {data.map((point, index) => (
        <Point key={index} {...point} />
      ))}
    </Canvas>
  );
};

export default Globe;

// import React, { useRef } from "react";
// import { Canvas, useFrame } from "react-three-fiber";
// import * as THREE from "three";
// import globeTexture from "../public/worldmap.jpg"; // Add your map texture

// const Globe = () => {
//   const globeRef = useRef();

//   useFrame(() => {
//     if (globeRef.current) {
//       globeRef.current.rotation.y += 0.005; // Adjust the rotation speed
//     }
//   });

//   return (
//     <mesh ref={globeRef} rotation={[0, 0, 0]}>
//       <sphereGeometry args={[2, 32, 32]} />
//       <meshBasicMaterial
//         attach="material"
//         map={new THREE.TextureLoader().load(globeTexture)}
//       />
//     </mesh>
//   );
// };

// export default Globe;
