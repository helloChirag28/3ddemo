'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface UploadFabricProps {
  onFabricUpload: (fabric: string) => void;
}

export function UploadFabric({ onFabricUpload }: UploadFabricProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        onFabricUpload('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : uploadedImage
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {uploadedImage ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={uploadedImage}
                alt="Uploaded fabric"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-green-600 font-medium">
              Custom fabric uploaded successfully!
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Upload Your Custom Fabric
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop an image here, or click to browse
              </p>
              <button
                onClick={handleClickUpload}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Guidelines */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Upload Guidelines</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Supported formats: JPG, PNG, WebP</li>
          <li>• Recommended size: 1024x1024 pixels or larger</li>
          <li>• File size: Maximum 5MB</li>
          <li>• For best results, use seamless/repeating patterns</li>
        </ul>
      </div>

      {/* Fabric Preview */}
      {uploadedImage && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Fabric Preview</h4>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full h-16 rounded border"
                style={{
                  backgroundImage: `url(${uploadedImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">
            This is how your fabric will appear on the shirt
          </p>
        </div>
      )}
    </div>
  );
} 