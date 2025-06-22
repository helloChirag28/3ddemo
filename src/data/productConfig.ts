import { ProductConfig } from '@/types/product'

export const productConfig: ProductConfig = {
  id: 'premium-tshirt-001',
  name: 'Premium Cotton T-Shirt',
  description: 'Luxuriously soft, sustainably made premium cotton t-shirt with perfect fit and exceptional comfort.',
  basePrice: 89.99,
  category: 'apparel',
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  fabrics: [
    {
      id: 'cotton-white',
      name: 'Pure White',
      color: '#FFFFFF',
      material: '100% Organic Cotton',
      textureUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=512&h=512&dpr=1',
    },
    {
      id: 'cotton-navy',
      name: 'Navy Blue',
      color: '#1e3a8a',
      material: '100% Organic Cotton',
      textureUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=512&h=512&dpr=1',
    },
    {
      id: 'cotton-charcoal',
      name: 'Charcoal Gray',
      color: '#374151',
      material: '100% Organic Cotton',
      textureUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=512&h=512&dpr=1',
    },
    {
      id: 'cotton-forest',
      name: 'Forest Green',
      color: '#065f46',
      material: '100% Organic Cotton',
      textureUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=512&h=512&dpr=1',
    },
    {
      id: 'cotton-burgundy',
      name: 'Burgundy',
      color: '#7c2d12',
      material: '100% Organic Cotton',
      textureUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=512&h=512&dpr=1',
    },
    {
      id: 'cotton-black',
      name: 'Midnight Black',
      color: '#111827',
      material: '100% Organic Cotton',
      textureUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=512&h=512&dpr=1',
    },
  ],
}