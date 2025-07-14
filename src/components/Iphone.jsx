// Iphone.jsx
import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Iphone = ({ item, ...props }) => {
  const { nodes, materials } = useGLTF('/models/scene.glb');

  useEffect(() => {
    Object.entries(materials).forEach(([key, material]) => {
      if (
        key !== "zFdeDaGNRwzccye" &&
        key !== "ujsvqBWRMnqdwPx" &&
        key !== "hUlRcbieVuIiOXG" &&
        key !== "jlzuBkUzuJqgiAK" &&
        key !== "xNrofRCqOXXHVZt"
      ) {
        material.color = new THREE.Color(item.color[0]);
      }
      material.needsUpdate = true;
    });
  }, [materials, item.color]);

  return (
    <group {...props}>
      {Object.entries(nodes).map(([name, node]) => {
        if (node.geometry && node.material) {
          return (
            <mesh
              key={name}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={materials[node.material.name]}
            />
          );
        }
        return null;
      })}
    </group>
  );
};

export default Iphone;

useGLTF.preload('/models/scene.glb');