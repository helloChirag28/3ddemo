'use client';

import React from 'react';
import Link from 'next/link';
import { ShirtCustomizer } from '../components/ShirtCustomizer';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">3D Shirt Customizer</h1>
              <p className="text-sm text-gray-600">Interactive 3D customization demo</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Back to Home
              </Link>
              <Link
                href="/demo/character-demo"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Realistic Character Demo
              </Link>
              <a
                href="https://github.com/your-repo/model-3d"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <ShirtCustomizer />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time 3D rendering</li>
                <li>• Multiple fabric options</li>
                <li>• Custom text & logo upload</li>
                <li>• Screenshot & sharing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tech Stack</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Next.js 15</li>
                <li>• Three.js & React Three Fiber</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspired By</h3>
              <p className="text-sm text-gray-600 mb-4">
                This project is inspired by the amazing 3D customizer from{' '}
                <a
                  href="https://www.jennisandwarmann.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Jennis & Warmann
                </a>
              </p>
              <div className="text-xs text-gray-500">
                Perfect Fit Guarantee | Made to measure by expert tailors
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 