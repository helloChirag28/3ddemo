'use client';

import React, { useState } from 'react';
import { Camera, Download, Share2, Check } from 'lucide-react';

interface SaveScreenshotProps {
  onSave: () => void;
}

export function SaveScreenshot({ onSave }: SaveScreenshotProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onSave();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Error saving screenshot:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Custom Shirt Design',
          text: 'Check out my custom shirt design!',
          url: window.location.href
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Camera className="w-5 h-5 mr-2" />
        Save & Share
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Save Screenshot Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all ${
            isSaving
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isSaved
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : isSaved ? (
            <Check className="w-4 h-4 mr-2" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Screenshot'}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Design
        </button>
      </div>

      {/* Save Options */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Save Options</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            High-resolution PNG screenshot
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            Perfect for social media sharing
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            Includes all customizations
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-800 mb-2">Quick Actions</h4>
        <div className="space-y-2">
          <button
            onClick={() => window.print()}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            Print Design
          </button>
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = window.location.href;
              link.download = 'custom-shirt-design.html';
              link.click();
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            Save Design Link
          </button>
          <button
            onClick={() => {
              const canvas = document.querySelector('canvas');
              if (canvas) {
                const dataURL = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'custom-shirt-3d.png';
                link.href = dataURL;
                link.click();
              }
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            Download 3D View
          </button>
        </div>
      </div>

      {/* Success Message */}
      {isSaved && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-bottom-2">
          Screenshot saved successfully!
        </div>
      )}
    </div>
  );
} 