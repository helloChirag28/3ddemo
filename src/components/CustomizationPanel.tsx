'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { FabricOption } from '@/types/product'
import { clsx } from 'clsx'

interface CustomizationPanelProps {
  fabrics: FabricOption[]
  selectedFabric: FabricOption
  onFabricChange: (fabric: FabricOption) => void
}

export default function CustomizationPanel({
  fabrics,
  selectedFabric,
  onFabricChange,
}: CustomizationPanelProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <h3 className="text-xl font-semibold text-neutral-900 mb-6">
        Customize Your Product
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium text-neutral-800 mb-4">
            Choose Fabric & Color
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            {fabrics.map((fabric, index) => (
              <motion.button
                key={fabric.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFabricChange(fabric)}
                className={clsx(
                  'relative p-4 rounded-xl border-2 transition-all duration-200',
                  'hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500',
                  selectedFabric.id === fabric.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                )}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: fabric.color }}
                  />
                  <div className="text-left flex-1">
                    <p className="font-medium text-neutral-900 text-sm">
                      {fabric.name}
                    </p>
                    <p className="text-xs text-neutral-600">
                      {fabric.material}
                    </p>
                  </div>
                </div>
                
                {selectedFabric.id === fabric.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-neutral-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary"
          >
            Add to Cart - $89.99
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-secondary mt-3"
          >
            Save Configuration
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}