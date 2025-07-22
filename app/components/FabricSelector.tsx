'use client';

import React, { useState } from 'react';
import { fabricTextures, fabricCategories } from '../data/fabricTextures';

interface FabricSelectorProps {
  selectedFabric: string;
  onFabricChange: (fabric: string) => void;
}

export function FabricSelector({ selectedFabric, onFabricChange }: FabricSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Fabrics' },
    { id: 'casual', name: 'Casual' },
    { id: 'formal', name: 'Formal' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'summer', name: 'Summer' },
    { id: 'winter', name: 'Winter' }
  ];

  const getFabricsForCategory = () => {
    if (selectedCategory === 'all') {
      return Object.keys(fabricTextures);
    }
    return fabricCategories[selectedCategory as keyof typeof fabricCategories] || [];
  };

  const fabrics = getFabricsForCategory();

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Fabric Swatches */}
      <div className="grid grid-cols-3 gap-3">
        {fabrics.map((fabricKey) => {
          const fabric = fabricTextures[fabricKey];
          if (!fabric) return null;

          return (
            <button
              key={fabricKey}
              onClick={() => onFabricChange(fabricKey)}
              className={`group relative p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                selectedFabric === fabricKey
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Fabric Swatch */}
              <div
                className="w-full h-16 rounded-md mb-2"
                style={{
                  backgroundColor: `#${fabric.color.toString(16).padStart(6, '0')}`,
                  backgroundImage: fabric.textureUrl ? `url(${fabric.textureUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Fabric Name */}
              <div className="text-sm font-medium text-gray-800 text-center">
                {fabric.name}
              </div>
              
              {/* Price */}
              {fabric.price && (
                <div className="text-xs text-gray-600 text-center mt-1">
                  £{fabric.price}
                </div>
              )}

              {/* Selection Indicator */}
              {selectedFabric === fabricKey && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Hover Description */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {fabric.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Fabric Details */}
      {selectedFabric && fabricTextures[selectedFabric] && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            {fabricTextures[selectedFabric].name}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            {fabricTextures[selectedFabric].description}
          </p>
          {fabricTextures[selectedFabric].price && (
            <div className="text-lg font-bold text-blue-600">
              £{fabricTextures[selectedFabric].price}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 