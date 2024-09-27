
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef, useState } from 'react'
import { Float, useGLTF } from '@react-three/drei'

const CityRing = (props) => {
  const { nodes, materials } = useGLTF('/models/cityring.glb')
  const ringRef = useRef()
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.02,
      })
      .to(ringRef.current.rotation, {
        y: hovered ? '+=2' : `+=${Math.PI * 1}`,
        x: hovered ? '+=2' : `-=${Math.PI * 1}`,
        duration: 5,
        stagger: {
          each: 0.15,
        },
      });
  });

  return (
    <Float floatIntensity={1}>
      <group {...props} dispose={null} rotation={[-Math.PI, 0, 0]} scale={0.021}>
        <mesh
        ref={ringRef}
          castShadow
          receiveShadow
          geometry={nodes['Torus001_Material_#2142150746_0'].geometry}
          material={materials.Material_2142150746}
          position={[0, 0, 32.817]}
          rotation={[0, -Math.PI / 2, 0]}
          onPointerEnter={() => setHovered(true)}
        >

        </mesh>
      </group>
    </Float>
  )
}

useGLTF.preload('/models/cityring.glb')

export default CityRing;