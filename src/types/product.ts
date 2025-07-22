export interface FabricOption {
  id: string
  name: string
  color: string
  material: string
  textureUrl: string
  price?: number
}

export interface ProductConfig {
  id: string
  name: string
  description: string
  basePrice: number
  fabrics: FabricOption[]
  sizes: string[]
  category: string
}