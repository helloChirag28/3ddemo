'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductViewer from '@/components/ProductViewer'
import CustomizationPanel from '@/components/CustomizationPanel'
import ProductInfo from '@/components/ProductInfo'
import Header from '@/components/Header'
import { ProductConfig, FabricOption } from '@/types/product'
import { productConfig } from '@/data/productConfig'

export default function Home() {
  const [selectedFabric, setSelectedFabric] = useState<FabricOption>(
    productConfig.fabrics[0]
  )
  const [isLoading, setIsLoading] = useState(true)

  const handleFabricChange = (fabric: FabricOption) => {
    setSelectedFabric(fabric)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100"
    >
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-120px)]">
          {/* 3D Viewer */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 relative"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full min-h-[600px]">
              <ProductViewer
                selectedFabric={selectedFabric}
                onLoadingChange={setIsLoading}
              />
              
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                    <p className="text-neutral-600 font-medium">Loading 3D Model...</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Customization Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 space-y-6"
          >
            <ProductInfo
              product={productConfig}
              selectedFabric={selectedFabric}
            />
            
            <CustomizationPanel
              fabrics={productConfig.fabrics}
              selectedFabric={selectedFabric}
              onFabricChange={handleFabricChange}
            />
          </motion.div>
        </div>
      </main>
    </motion.div>
  )
}