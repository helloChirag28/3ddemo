'use client';

import React, { useState, useRef } from 'react';
import { Type, Upload, X, Image as ImageIcon } from 'lucide-react';

interface TextUploaderProps {
  onTextChange: (text: string) => void;
  onLogoUpload: (logo: string) => void;
}

export function TextUploader({ onTextChange, onLogoUpload }: TextUploaderProps) {
  const [customText, setCustomText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [textSize, setTextSize] = useState(16);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setCustomText(text);
    onTextChange(text);
  };

  const handleLogoUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedLogo(result);
        onLogoUpload(result);
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
      handleLogoUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleLogoUpload(files[0]);
    }
  };

  const handleRemoveLogo = () => {
    setUploadedLogo(null);
    onLogoUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const textColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#008000' },
    { name: 'Gold', value: '#FFD700' },
    { name: 'Silver', value: '#C0C0C0' },
    { name: 'Navy', value: '#000080' }
  ];

  return (
    <div className="space-y-6">
      {/* Custom Text Section */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 flex items-center">
          <Type className="w-4 h-4 mr-2" />
          Add Custom Text
        </h4>
        
        <div className="space-y-3">
          <input
            type="text"
            value={customText}
            onChange={handleTextChange}
            placeholder="Enter your custom text..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={20}
          />
          
          {/* Text Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {textColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setTextColor(color.value)}
                  className={`w-full h-8 rounded border-2 transition-all ${
                    textColor === color.value
                      ? 'border-blue-600 scale-105'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Text Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Size: {textSize}px
            </label>
            <input
              type="range"
              min="12"
              max="32"
              value={textSize}
              onChange={(e) => setTextSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Text Preview */}
          {customText && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Preview</h5>
              <div
                className="text-center p-4 bg-white rounded border"
                style={{
                  color: textColor,
                  fontSize: `${textSize}px`
                }}
              >
                {customText}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logo Upload Section */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 flex items-center">
          <ImageIcon className="w-4 h-4 mr-2" />
          Add Custom Logo
        </h4>
        
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : uploadedLogo
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

          {uploadedLogo ? (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img
                  src={uploadedLogo}
                  alt="Uploaded logo"
                  className="w-24 h-24 object-contain rounded-lg border bg-white"
                />
                <button
                  onClick={handleRemoveLogo}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-green-600 font-medium">
                Logo uploaded successfully!
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Upload Your Logo
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Drag and drop an image here, or click to browse
                </p>
                <button
                  onClick={handleClickUpload}
                  className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Choose File
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logo Guidelines */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-1 text-sm">Logo Guidelines</h5>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Supported formats: PNG, JPG, SVG</li>
            <li>• Recommended size: 200x200 pixels</li>
            <li>• File size: Maximum 2MB</li>
            <li>• PNG with transparent background recommended</li>
          </ul>
        </div>
      </div>

      {/* Combined Preview */}
      {(customText || uploadedLogo) && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">Combined Preview</h4>
          <div className="bg-white p-4 rounded border text-center">
            {uploadedLogo && (
              <img
                src={uploadedLogo}
                alt="Logo preview"
                className="w-16 h-16 object-contain mx-auto mb-2"
              />
            )}
            {customText && (
              <div
                style={{
                  color: textColor,
                  fontSize: `${textSize}px`
                }}
              >
                {customText}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 