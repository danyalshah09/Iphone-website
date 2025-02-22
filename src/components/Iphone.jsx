// IPhoneModel.jsx
import React,{useEffect} from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three'

function Iphone(props) {
  const { nodes, materials } = useGLTF('/models/scene.glb');
  const texture = useTexture(props.item.img)

  useEffect(() => {
    Object.entries(materials).map((material) => {
      // these are the material names that can't be changed color
      if (
        material[0] !== "zFdeDaGNRwzccye" &&
        material[0] !== "ujsvqBWRMnqdwPx" &&
        material[0] !== "hUlRcbieVuIiOXG" &&
        material[0] !== "jlzuBkUzuJqgiAK" &&
        material[0] !== "xNrofRCqOXXHVZt"
      ) {
        material[1].color = new THREE.Color(props.item.color[0]);
      }
      material[1].needsUpdate = true;
    });
  }, [materials, props.item]);
  
  return (
    <group {...props} dispose={null}>
      {Object.keys(nodes).map((nodeName) => {
        const node = nodes[nodeName];
        if (node.geometry && node.material) {
          return (
            <mesh
              key={nodeName}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={node.material}
              scale={0.01}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

export default Iphone;
useGLTF.preload('/models/scene.glb');