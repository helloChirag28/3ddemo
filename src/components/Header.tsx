'use client'

import { motion } from 'framer-motion'
import { Shirt } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <Shirt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">CustomFit</h1>
              <p className="text-sm text-neutral-600">3D Product Customizer</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Products
            </a>
            <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              About
            </a>
            <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}