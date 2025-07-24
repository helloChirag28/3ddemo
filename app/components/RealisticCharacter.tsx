'use client';

import React, { useRef, useEffect, useState } from 'react';
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
          
          // For a shirt model, we want to apply fabric to all mesh parts
          // since the entire model is the shirt
          const isShirtPart = true; // All parts of the shirt model should get fabric
          
          if (isShirtPart) {
            detectedClothingParts.push(child.name);
            console.log('Applying fabric to shirt part:', child.name);
            
            if (fabricTexture === 'custom' && customTexture) {
              material.map = customTexture;
              material.color.setHex(0xffffff);
            } else if (fabricTexture && fabricTexture !== 'default' && fabricTextures[fabricTexture]) {
              // Get fabric properties from the fabric data
              const fabric = fabricTextures[fabricTexture];
              
              material.color.setHex(fabric.color);
              material.roughness = fabric.roughness;
              material.metalness = fabric.metalness;
              material.map = null; // Clear any existing texture
              
              // If the fabric has a texture URL, load it
              if (fabric.textureUrl) {
                const texture = textureLoader.load(fabric.textureUrl);
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1, 1);
                material.map = texture;
              }
            } else {
              // Apply a default fabric color if none selected
              material.color.setHex(0x4A90E2); // Default blue color
              material.roughness = 0.8;
              material.metalness = 0.1;
            }
            
            material.needsUpdate = true;
          }
        }
      });
      
      // Notify parent component about detected clothing parts
      onClothingPartsDetected?.(detectedClothingParts);
    }
  }, [fabricTexture, characterModel, customTexture, textureLoader, onClothingPartsDetected]);

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