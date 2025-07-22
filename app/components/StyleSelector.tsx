'use client';

import React from 'react';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const shirtStyles = [
  {
    id: 'casual',
    name: 'Casual',
    description: 'Relaxed fit for everyday wear',
    image: '/styles/casual.svg',
    price: 45
  },
  {
    id: 'formal',
    name: 'Formal',
    description: 'Classic fit for business and formal occasions',
    image: '/styles/formal.svg',
    price: 65
  },
  {
    id: 'slim',
    name: 'Slim Fit',
    description: 'Modern slim fit for a contemporary look',
    image: '/styles/slim.svg',
    price: 55
  },
  {
    id: 'relaxed',
    name: 'Relaxed Fit',
    description: 'Comfortable relaxed fit for maximum comfort',
    image: '/styles/relaxed.svg',
    price: 50
  },
  {
    id: 'tailored',
    name: 'Tailored',
    description: 'Premium tailored fit for the perfect silhouette',
    image: '/styles/tailored.svg',
    price: 75
  },
  {
    id: 'oversized',
    name: 'Oversized',
    description: 'Trendy oversized fit for a modern statement',
    image: '/styles/oversized.svg',
    price: 60
  }
];

export function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {shirtStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            className={`group relative p-4 rounded-lg border-2 transition-all hover:shadow-md text-left ${
              selectedStyle === style.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Style Icon/Image Placeholder */}
            <div className="w-full h-20 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            {/* Style Name */}
            <div className="font-semibold text-gray-800 mb-1">
              {style.name}
            </div>
            
            {/* Style Description */}
            <div className="text-xs text-gray-600 mb-2">
              {style.description}
            </div>
            
            {/* Price */}
            <div className="text-sm font-bold text-blue-600">
              £{style.price}
            </div>

            {/* Selection Indicator */}
            {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Style Details */}
      {selectedStyle && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            {shirtStyles.find(s => s.id === selectedStyle)?.name}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            {shirtStyles.find(s => s.id === selectedStyle)?.description}
          </p>
          <div className="text-lg font-bold text-blue-600">
            £{shirtStyles.find(s => s.id === selectedStyle)?.price}
          </div>
        </div>
      )}
    </div>
  );
} 