// ModelView.jsx
import React, { Suspense } from 'react';
import { Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from 'three';
import Lights from './Lights';
import Iphone from './Iphone';

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotation,
  size,
  item,
  isVisible
}) => {
  const { camera, gl } = useThree();

  return (
    <group 
      ref={groupRef} 
      name={index === 1 ? 'small' : 'large'} 
      position={[index === 1 ? 0 : 10, 0, 0]}
      visible={isVisible}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 200]} />
      <Lights />
    
      <OrbitControls
        ref={controlRef}
        enableZoom={true}
        enablePan={true}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        args={[camera, gl.domElement]}
        onEnd={() => setRotation(controlRef.current.getAzimuthalAngle())}
      />

      <Suspense fallback={
        <Html>
          <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
            <div className='w-[10vw] h-[10vw] rounded-full'>Loading...</div>
          </div>
        </Html>
      }>
      <Iphone 
  scale={index === 1 ? [10, 10, 10] : [12, 12, 12]} 
  item={item} 
  size={size}
/>

      </Suspense>
    </group>
  );
};

export default ModelView;
