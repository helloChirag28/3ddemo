'use client';

import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { FabricSelector } from './FabricSelector';
import { StyleSelector } from './StyleSelector';
import { UploadFabric } from './UploadFabric';
import { TextUploader } from './TextUploader';
import { SaveScreenshot } from './SaveScreenshot';
import { CharacterWithShirt } from './RealisticCharacter';

interface ShirtCustomizerProps {
  modelPath?: string;
  initialFabric?: string;
  onFabricChange?: (fabric: string) => void;
  onStyleChange?: (style: string) => void;
}

// 3D Shirt Model Component
function ShirtModel({ 
  fabricTexture, 
  customLogo,
  onClothingPartsDetected
}: { 
  fabricTexture: string; 
  customLogo?: string;
  onClothingPartsDetected?: (parts: string[]) => void;
}) {
  return (
    <CharacterWithShirt
      fabricTexture={fabricTexture}
      customLogo={customLogo}
      onClothingPartsDetected={onClothingPartsDetected}
    />
  );
}

// Main Customizer Component
export function ShirtCustomizer({ 
  initialFabric = "cotton",
  onFabricChange,
  onStyleChange 
}: ShirtCustomizerProps) {
  const [selectedFabric, setSelectedFabric] = useState(initialFabric);
  const [selectedStyle, setSelectedStyle] = useState('casual');
  const [customLogo, setCustomLogo] = useState('');
  const [clothingParts, setClothingParts] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFabricChange = (fabric: string) => {
    setSelectedFabric(fabric);
    onFabricChange?.(fabric);
  };

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
    onStyleChange?.(style);
  };

  const handleSaveScreenshot = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = 'custom-shirt.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex h-full">
        {/* 3D Viewport */}
        <div className="flex-1 relative">
          <Canvas
            ref={canvasRef}
            camera={{ position: [0, 0, 3], fov: 60 }}
            className="w-full h-full"
            shadows
          >
            <Suspense fallback={
              <Html center>
                <div className="text-white text-xl">Loading 3D Model...</div>
              </Html>
            }>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              
              <ShirtModel 
                fabricTexture={selectedFabric}
                customLogo={customLogo}
                onClothingPartsDetected={setClothingParts}
              />
              
              <Environment preset="studio" />
              <OrbitControls 
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={8}
              />
            </Suspense>
          </Canvas>
          
          {/* Controls Overlay */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Controls</h3>
            <p className="text-sm text-gray-600">
              • Drag to rotate • Scroll to zoom in/out
            </p>
          </div>

          {/* Debug Overlay */}
          <div className="absolute top-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-xs">
            <h3 className="font-bold mb-2">Debug Info</h3>
            <p className="text-sm mb-2">Detected Clothing Parts:</p>
            <ul className="text-xs space-y-1">
              {clothingParts.map((part, index) => (
                <li key={index}>• {part}</li>
              ))}
            </ul>
            <p className="text-sm mt-2">Current Fabric: {selectedFabric}</p>
          </div>
        </div>

        {/* Customization Panel */}
        <div className="w-80 bg-white shadow-xl p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Customize Your Shirt</h2>
          
          {/* Fabric Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Choose Fabric</h3>
            <FabricSelector 
              selectedFabric={selectedFabric}
              onFabricChange={handleFabricChange}
            />
          </div>

          {/* Style Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Shirt Style</h3>
            <StyleSelector 
              selectedStyle={selectedStyle}
              onStyleChange={handleStyleChange}
            />
          </div>

          {/* Upload Custom Fabric */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Upload Custom Fabric</h3>
            <UploadFabric onFabricUpload={handleFabricChange} />
          </div>

          {/* Add Custom Text */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Add Custom Text</h3>
            <TextUploader 
              onTextChange={() => {}}
              onLogoUpload={setCustomLogo}
            />
          </div>

          {/* Save Screenshot */}
          <div className="mb-6">
            <SaveScreenshot onSave={handleSaveScreenshot} />
          </div>

          {/* Product Info */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 100% Custom Made to Measure</p>
              <p>• Perfect Fit, Guaranteed</p>
              <p>• No More Try & Error</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 