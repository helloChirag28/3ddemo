'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { fabricTextures } from '../data/fabricTextures';

interface AdvancedShirtModelProps {
  fabricTexture: string;
  style: string;
  customText?: string;
  customLogo?: string;
  modelPath?: string;
}

export function AdvancedShirtModel({
  fabricTexture,
  customText,
  customLogo
}: AdvancedShirtModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [shirtModel, setShirtModel] = useState<THREE.Group | null>(null);
  const [customTexture, setCustomTexture] = useState<THREE.Texture | null>(null);
  const [textureLoader] = useState(() => new THREE.TextureLoader());

  // Animation frame
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Create a more realistic shirt geometry
  const createRealisticShirtGeometry = () => {
    const group = new THREE.Group();
    
    // Shirt body with more realistic proportions
    const bodyGeometry = new THREE.BoxGeometry(2.2, 3.2, 0.6);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: fabricTexture === 'custom' ? 0xffffff : fabricTextures[fabricTexture]?.color || 0xffffff,
      roughness: fabricTextures[fabricTexture]?.roughness || 0.8,
      metalness: fabricTextures[fabricTexture]?.metalness || 0.1,
      map: customTexture
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    // Sleeves with better positioning
    const sleeveGeometry = new THREE.BoxGeometry(0.9, 1.8, 0.4);
    const sleeveMaterial = bodyMaterial.clone();
    
    const leftSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    leftSleeve.position.set(-1.55, 0.2, 0);
    leftSleeve.rotation.z = 0.1;
    group.add(leftSleeve);
    
    const rightSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    rightSleeve.position.set(1.55, 0.2, 0);
    rightSleeve.rotation.z = -0.1;
    group.add(rightSleeve);
    
    // Collar with more detail
    const collarGeometry = new THREE.BoxGeometry(1.8, 0.4, 0.15);
    const collarMaterial = bodyMaterial.clone();
    const collar = new THREE.Mesh(collarGeometry, collarMaterial);
    collar.position.set(0, 1.9, 0.4);
    group.add(collar);
    
    // Collar stand
    const collarStandGeometry = new THREE.BoxGeometry(1.6, 0.3, 0.1);
    const collarStand = new THREE.Mesh(collarStandGeometry, collarMaterial);
    collarStand.position.set(0, 2.1, 0.5);
    group.add(collarStand);
    
    // Pocket
    const pocketGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.05);
    const pocket = new THREE.Mesh(pocketGeometry, collarMaterial);
    pocket.position.set(0.6, 0.5, 0.35);
    group.add(pocket);
    
    // Buttons
    const buttonGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const buttonMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      roughness: 0.3,
      metalness: 0.7
    });
    
    // Add buttons down the front
    for (let i = 0; i < 5; i++) {
      const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
      button.position.set(0, 1.2 - i * 0.4, 0.35);
      group.add(button);
    }
    
    return group;
  };

  // Load custom texture if fabric is custom
  useEffect(() => {
    if (fabricTexture === 'custom' && customLogo) {
      const texture = textureLoader.load(customLogo);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      setCustomTexture(texture);
    } else {
      setCustomTexture(null);
    }
  }, [fabricTexture, customLogo, textureLoader]);

  // Create shirt model
  useEffect(() => {
    if (!shirtModel) {
      const newShirt = createRealisticShirtGeometry();
      setShirtModel(newShirt);
    }
  }, [shirtModel]);

  // Update materials when fabric changes
  useEffect(() => {
    if (shirtModel) {
      shirtModel.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          
          // Skip buttons
          if (material.color.getHex() === 0x333333) return;
          
          if (fabricTexture === 'custom') {
            material.color.setHex(0xffffff);
            material.map = customTexture;
          } else {
            const fabric = fabricTextures[fabricTexture];
            if (fabric) {
              material.color.setHex(fabric.color);
              material.roughness = fabric.roughness;
              material.metalness = fabric.metalness;
              material.map = null;
            }
          }
          material.needsUpdate = true;
        }
      });
    }
  }, [fabricTexture, shirtModel, customTexture]);

  // Add custom text to the shirt
  const addCustomText = () => {
    if (!customText || !shirtModel) return null;
    
    return (
      <Text
        position={[0, 0.5, 0.4]}
        fontSize={0.2}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {customText}
      </Text>
    );
  };

  if (!shirtModel) {
    return (
      <Html center>
        <div className="text-white text-xl">Loading 3D Model...</div>
      </Html>
    );
  }

  return (
    <group ref={meshRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
      <primitive object={shirtModel} />
      {addCustomText()}
    </group>
  );
}

// GLB Model Loader Component (for when you have actual GLB files)
export function GLBShirtModel({
  fabricTexture,
  customText,
  customLogo,
  modelPath
}: AdvancedShirtModelProps) {
  const gltf = useGLTF(modelPath || "/models/shirt.glb");
  const meshRef = useRef<THREE.Group>(null);
  const [customTexture, setCustomTexture] = useState<THREE.Texture | null>(null);
  const [textureLoader] = useState(() => new THREE.TextureLoader());

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Load custom texture
  useEffect(() => {
    if (fabricTexture === 'custom' && customLogo) {
      const texture = textureLoader.load(customLogo);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      setCustomTexture(texture);
    } else {
      setCustomTexture(null);
    }
  }, [fabricTexture, customLogo, textureLoader]);

  // Update materials
  useEffect(() => {
    if (gltf && 'scene' in gltf) {
      gltf.scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          
          if (fabricTexture === 'custom') {
            material.color.setHex(0xffffff);
            material.map = customTexture;
          } else {
            const fabric = fabricTextures[fabricTexture];
            if (fabric) {
              material.color.setHex(fabric.color);
              material.roughness = fabric.roughness;
              material.metalness = fabric.metalness;
              material.map = null;
            }
          }
          material.needsUpdate = true;
        }
      });
    }
  }, [fabricTexture, gltf, customTexture]);

  return (
    <group ref={meshRef}>
      {gltf && 'scene' in gltf && <primitive object={gltf.scene} />}
      {customText && (
        <Text
          position={[0, 0.5, 0.4]}
          fontSize={0.2}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {customText}
        </Text>
      )}
    </group>
  );
} 