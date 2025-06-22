'use client'

import { motion } from 'framer-motion'
import { Star, Shield, Truck, RotateCcw } from 'lucide-react'
import { ProductConfig, FabricOption } from '@/types/product'

interface ProductInfoProps {
  product: ProductConfig
  selectedFabric: FabricOption
}

export default function ProductInfo({ product, selectedFabric }: ProductInfoProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            {product.name}
          </h2>
          <p className="text-neutral-600 mt-1">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-sm text-neutral-600">(4.8) • 127 reviews</span>
        </div>
        
        <div className="bg-neutral-50 rounded-lg p-4">
          <h4 className="font-medium text-neutral-900 mb-2">
            Current Selection:
          </h4>
          <div className="flex items-center space-x-3">
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: selectedFabric.color }}
            />
            <div>
              <p className="font-medium text-neutral-800">
                {selectedFabric.name}
              </p>
              <p className="text-sm text-neutral-600">
                {selectedFabric.material}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <Shield className="w-4 h-4" />
            <span>Premium Quality</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <Truck className="w-4 h-4" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <RotateCcw className="w-4 h-4" />
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <Star className="w-4 h-4" />
            <span>Eco-Friendly</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}