'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { CharacterWithShirt } from '../components/RealisticCharacter';
import { fabricTextures } from '../data/fabricTextures';

export default function CharacterDemo() {
  const [selectedFabric, setSelectedFabric] = useState('cotton');
  const [customLogo, setCustomLogo] = useState('');

  const fabricOptions = Object.keys(fabricTextures);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex h-full">
        {/* 3D Viewport */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            className="w-full h-full"
          >
            <Suspense fallback={
              <Html center>
                <div className="text-white text-xl">Loading Character...</div>
              </Html>
            }>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1.2} />
              <pointLight position={[-10, -10, -5]} intensity={0.8} />
              
              <CharacterWithShirt 
                fabricTexture={selectedFabric}
                customLogo={customLogo}
              />
              
              <Environment preset="studio" />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={4}
                maxDistance={15}
              />
            </Suspense>
          </Canvas>
          
          {/* Controls Overlay */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Realistic Character Demo</h3>
            <p className="text-sm text-gray-600">
              • Drag to rotate • Scroll to zoom • Right-click to pan
            </p>
          </div>
        </div>

        {/* Control Panel */}
        <div className="w-80 bg-white shadow-xl p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Character Customizer</h2>
          
          {/* Fabric Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Choose Fabric</h3>
            <div className="grid grid-cols-2 gap-2">
              {fabricOptions.map((fabric) => (
                <button
                  key={fabric}
                  onClick={() => setSelectedFabric(fabric)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedFabric === fabric
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div 
                    className="w-full h-8 rounded mb-2"
                    style={{ 
                      backgroundColor: fabricTextures[fabric]?.color 
                        ? `#${fabricTextures[fabric].color.toString(16).padStart(6, '0')}` 
                        : '#ffffff' 
                    }}
                  />
                  <span className="text-sm font-medium capitalize">{fabric}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Custom Logo */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Upload Custom Logo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setCustomLogo(url);
                  setSelectedFabric('custom');
                }
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            />
          </div>

          {/* Character Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Character Features</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Realistic male torso anatomy</p>
              <p>• Natural skin tone and muscle definition</p>
              <p>• Proper shirt fitting and draping</p>
              <p>• Subtle breathing animation</p>
              <p>• High-quality lighting and materials</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-2">How to Use</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. Select different fabric types to see how they look</p>
              <p>2. Upload a custom logo/image for personalized shirts</p>
              <p>3. Rotate the character to see all angles</p>
              <p>4. Zoom in to examine fabric details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 