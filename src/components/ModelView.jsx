// ModelView.jsx
import React, { Suspense } from 'react';
import { PerspectiveCamera, View } from "@react-three/drei";
import Lights from './Lights';
import Iphone from './Iphone';
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item
}) => {
  return (<>
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
    
    <OrbitControls
    makeDefault
    ref={controlRef}
    enableZoom={true}
    enablePan={true}
    rotateSpeed={0.4}
    target={new THREE.Vector3(0,0,0)}
    onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}

    
    
    
    />
   <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0, 0]}>
  <Suspense fallback={null}>
    <Iphone scale={index ===1 ? [15,15,15] : [17,17,17]}
    item={item} 
    size={size}/>
  </Suspense>
</group> 
</>
  );
};

export default ModelView