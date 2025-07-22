export interface CustomizerConfig {
  // 3D Model Settings
  model: {
    defaultPath: string;
    supportedFormats: string[];
    maxFileSize: number; // in MB
  };
  
  // Fabric Settings
  fabric: {
    maxUploadSize: number; // in MB
    supportedFormats: string[];
    defaultRoughness: number;
    defaultMetalness: number;
  };
  
  // Text Settings
  text: {
    maxLength: number;
    minFontSize: number;
    maxFontSize: number;
    defaultColor: string;
    availableColors: string[];
  };
  
  // Logo Settings
  logo: {
    maxUploadSize: number; // in MB
    supportedFormats: string[];
    maxDimensions: { width: number; height: number };
  };
  
  // Camera Settings
  camera: {
    position: [number, number, number];
    fov: number;
    minDistance: number;
    maxDistance: number;
  };
  
  // UI Settings
  ui: {
    panelWidth: number;
    showControls: boolean;
    showProductInfo: boolean;
  };
}

export const customizerConfig: CustomizerConfig = {
  model: {
    defaultPath: "/models/shirt.glb",
    supportedFormats: [".glb", ".gltf"],
    maxFileSize: 10
  },
  
  fabric: {
    maxUploadSize: 5,
    supportedFormats: [".jpg", ".jpeg", ".png", ".webp"],
    defaultRoughness: 0.8,
    defaultMetalness: 0.1
  },
  
  text: {
    maxLength: 20,
    minFontSize: 12,
    maxFontSize: 32,
    defaultColor: "#000000",
    availableColors: [
      "#000000", // Black
      "#FFFFFF", // White
      "#FF0000", // Red
      "#0000FF", // Blue
      "#008000", // Green
      "#FFD700", // Gold
      "#C0C0C0", // Silver
      "#000080"  // Navy
    ]
  },
  
  logo: {
    maxUploadSize: 2,
    supportedFormats: [".png", ".jpg", ".jpeg", ".svg"],
    maxDimensions: { width: 200, height: 200 }
  },
  
  camera: {
    position: [0, 0, 5],
    fov: 50,
    minDistance: 2,
    maxDistance: 10
  },
  
  ui: {
    panelWidth: 320,
    showControls: true,
    showProductInfo: true
  }
};

// Export individual configs for easy access
export const modelConfig = customizerConfig.model;
export const fabricConfig = customizerConfig.fabric;
export const textConfig = customizerConfig.text;
export const logoConfig = customizerConfig.logo;
export const cameraConfig = customizerConfig.camera;
export const uiConfig = customizerConfig.ui; 