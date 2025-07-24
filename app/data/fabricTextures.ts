export interface FabricTexture {
  name: string;
  color: number;
  roughness: number;
  metalness: number;
  textureUrl?: string;
  price?: number;
  description?: string;
}

export const fabricTextures: Record<string, FabricTexture> = {
  fabric01: {
    name: "Strips",
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.0,
    textureUrl: "/texturesf1.jpeg", // Add this image to public/textures
    price: 65,
    description: "Fun fabric01 dot pattern fabric"
  },
  fabric02: {
    name: "Strips",
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.0,
    textureUrl: "/textures/f2.jpeg", // Add this image to public/textures
    price: 65,
    description: "Fun fabric02 dot pattern fabric"
  },
  fabric03: {
    name: "Strips",
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.0,
    textureUrl: "/textures/f3.jpeg", // Add this image to public/textures
    price: 65,
    description: "Fun fabric03 dot pattern fabric"
  },
  fabric04: {
    name: "Strips",
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.0,
    textureUrl: "/textures/f4.jpg", // Add this image to public/textures
    price: 65,
    description: "Fun fabric04 dot pattern fabric"
  },
  polka: {
    name: "Strips",
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.0,
    textureUrl: "/textures/new-fab.jpg", // Add this image to public/textures
    price: 65,
    description: "Fun polka dot pattern fabric"
  },
   tweed: {
    name: "Tweed",
    color: 0x556b2f,
    roughness: 0.8,
    metalness: 0.0,
    price: 95,
    description: "Traditional tweed with textured appearance"
  },
  velvet: {
    name: "Velvet",
    color: 0x800020,
    roughness: 0.2,
    metalness: 0.3,
    price: 110,
    description: "Luxurious velvet with rich texture"
  },
  satin: {
    name: "Satin",
    color: 0xffd700,
    roughness: 0.1,
    metalness: 0.4,
    price: 75,
    description: "Smooth satin with elegant sheen"
  },
  silk: {
    name: "Silk",
    color: 0xfff8dc,
    roughness: 0.3,
    metalness: 0.1,
    price: 120,
    description: "Luxurious silk fabric with natural sheen"
  },
  cotton: {
    name: "Cotton",
    color: 0xf5f5dc,
    roughness: 0.9,
    metalness: 0.0,
    price: 45,
    description: "Breathable and comfortable cotton fabric"
  },
  linen: {
    name: "Linen",
    color: 0xfaf0e6,
    roughness: 0.8,
    metalness: 0.0,
    price: 55,
    description: "Natural linen with excellent breathability"
  },
  wool: {
    name: "Wool",
    color: 0x8b7355,
    roughness: 0.7,
    metalness: 0.0,
    price: 85,
    description: "Warm and durable wool fabric"
  },
  denim: {
    name: "Denim",
    color: 0x191970,
    roughness: 0.9,
    metalness: 0.0,
    price: 65,
    description: "Classic denim fabric for casual wear"
  },
  chambray: {
    name: "Chambray",
    color: 0x87ceeb,
    roughness: 0.6,
    metalness: 0.0,
    price: 50,
    description: "Lightweight chambray fabric"
  },
  oxford: {
    name: "Oxford",
    color: 0xf0f8ff,
    roughness: 0.7,
    metalness: 0.0,
    price: 60,
    description: "Durable oxford cloth for everyday wear"
  },
  flannel: {
    name: "Flannel",
    color: 0xcd853f,
    roughness: 0.8,
    metalness: 0.0,
    price: 70,
    description: "Soft flannel fabric for comfort"
  },
  seersucker: {
    name: "Seersucker",
    color: 0xe6e6fa,
    roughness: 0.6,
    metalness: 0.0,
    price: 55,
    description: "Lightweight seersucker with puckered texture"
  },
  checks: {
    name: "Checks",
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.0,
    textureUrl: "/textures/checks.png", // Add this image to public/textures
    price: 65,
    description: "Classic checked pattern fabric"
  },
  stripes: {
    name: "Stripes",
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.0,
    textureUrl: "/textures/stripes.png", // Add this image to public/textures
    price: 65,
    description: "Stylish striped pattern fabric"
  }
};

export const fabricCategories = {
  casual: ['cotton', 'linen', 'denim', 'chambray', 'oxford'],
  formal: ['silk', 'wool', 'tweed', 'satin'],
  luxury: ['velvet', 'silk', 'tweed'],
  summer: ['cotton', 'linen', 'seersucker', 'chambray'],
  winter: ['wool', 'flannel', 'tweed']
}; 