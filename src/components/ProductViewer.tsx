'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { FabricOption } from '@/types/product'

interface ProductViewerProps {
  selectedFabric: FabricOption
  onLoadingChange: (loading: boolean) => void
}

function TShirtModel({ selectedFabric }: { selectedFabric: FabricOption }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Create a simple T-shirt geometry since we don't have a .glb file
  const geometry = new THREE.BoxGeometry(2, 2.5, 0.3)
  
  // Load fabric texture
  const texture = useLoader(TextureLoader, selectedFabric.textureUrl)
  
  useEffect(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(2, 2)
    }
  }, [texture])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[2, 2.5, 0.3]} />
      <meshStandardMaterial
        map={texture}
        color={selectedFabric.color}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  )
}

function Scene({ selectedFabric }: { selectedFabric: FabricOption }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      <TShirtModel selectedFabric={selectedFabric} />
      
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
      
      <Environment preset="studio" />
    </>
  )
}

export default function ProductViewer({ selectedFabric, onLoadingChange }: ProductViewerProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingChange(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [onLoadingChange])

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene selectedFabric={selectedFabric} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 glass-effect rounded-lg p-3">
        <p className="text-sm text-neutral-600 font-medium">
          Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>
    </div>
  )
}