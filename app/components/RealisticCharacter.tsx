'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { fabricTextures } from '../data/fabricTextures';

// Preload the GLB model for better performance
// useGLTF.preload('/models/3dShirt.glb');
useGLTF.preload('/models/shirt-1.glb');

interface RealisticCharacterProps {
  fabricTexture?: string;
  customLogo?: string;
  onClothingPartsDetected?: (parts: string[]) => void;
}

// Load the GLB model
function useCharacterModel() {
  // const { scene } = useGLTF('/models/3dShirt.glb');
  const { scene } = useGLTF('/models/shirt-1.glb');
  
  useEffect(() => {
    // Clone the scene to avoid issues with multiple instances
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Debug: Log mesh names to identify shirt parts
        console.log('Shirt mesh found:', child.name, child.material);
      }
    });
  }, [scene]);

  return scene.clone();
}

export function RealisticCharacter({
  fabricTexture,
  customLogo,
  onClothingPartsDetected
}: RealisticCharacterProps) {
  const characterRef = useRef<THREE.Group>(null);
  const characterModel = useCharacterModel();
  const [textureLoader] = useState(() => new THREE.TextureLoader());
  const [customTexture, setCustomTexture] = useState<THREE.Texture | null>(null);

  // Preload the selected fabric texture (if any)
  const fabricMapTexture = useMemo(() => {
    if (
      fabricTexture &&
      fabricTexture !== 'default' &&
      fabricTextures[fabricTexture] &&
      fabricTextures[fabricTexture].textureUrl
    ) {
      const url = fabricTextures[fabricTexture].textureUrl!;
      const texture = textureLoader.load(url);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      return texture;
    }
    return null;
  }, [fabricTexture, textureLoader]);

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

  // Apply fabric textures to the shirt model
  useEffect(() => {
    if (characterModel) {
      const detectedClothingParts: string[] = [];
      characterModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          const isShirtPart = true;
          if (isShirtPart) {
            detectedClothingParts.push(child.name);
            // Only update if something changed
            if (fabricTexture === 'custom' && customTexture) {
              if (material.map !== customTexture) {
                material.map = customTexture;
                material.color.setHex(0xffffff);
                material.needsUpdate = true;
              }
            } else if (
              fabricTexture &&
              fabricTexture !== 'default' &&
              fabricTextures[fabricTexture]
            ) {
              const fabric = fabricTextures[fabricTexture];
              material.color.setHex(fabric.color);
              material.roughness = fabric.roughness;
              material.metalness = fabric.metalness;
              if (fabricMapTexture && material.map !== fabricMapTexture) {
                material.map = fabricMapTexture;
                material.needsUpdate = true;
              } else if (!fabricMapTexture && material.map) {
                material.map = null;
                material.needsUpdate = true;
              }
            } else {
              // Default fallback
              material.color.setHex(0x4A90E2);
              material.roughness = 0.8;
              material.metalness = 0.1;
              if (material.map) {
                material.map = null;
                material.needsUpdate = true;
              }
            }
          }
        }
      });
      onClothingPartsDetected?.(detectedClothingParts);
    }
  }, [fabricTexture, characterModel, customTexture, fabricMapTexture, onClothingPartsDetected]);

  // Static shirt - no animation
  useFrame(() => {
    // No animation - shirt stays static
  });

  return (
    <group ref={characterRef} position={[0, -1, 0]}>
      {/* Shirt model from GLB */}
      <primitive object={characterModel} />
    </group>
  );
}

// Character with integrated shirt - simplified to just use the shirt GLB model
export function CharacterWithShirt({
  fabricTexture,
  customLogo,
  onClothingPartsDetected
}: {
  fabricTexture: string;
  customLogo?: string;
  onClothingPartsDetected?: (parts: string[]) => void;
}) {
  return (
    <RealisticCharacter 
      fabricTexture={fabricTexture}
      customLogo={customLogo}
      onClothingPartsDetected={onClothingPartsDetected}
    />
  );
} 