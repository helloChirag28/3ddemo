# 3D Shirt Customizer

A modern, interactive 3D shirt customizer built with Next.js, Three.js, and React Three Fiber. This project allows users to customize shirts with different fabrics, styles, and add custom text/logos in real-time.

## Features

### 🎨 Real-time 3D Customization
- Interactive 3D model rendering with Three.js
- Real-time fabric switching with visual swatches
- Multiple shirt styles (Casual, Formal, Slim, Relaxed, Tailored, Oversized)
- Smooth camera controls (rotate, zoom, pan)

### 🧵 Fabric Selection
- 12+ pre-built fabric types (Cotton, Linen, Silk, Wool, Denim, Tweed, etc.)
- Fabric categories (Casual, Formal, Luxury, Summer, Winter)
- Custom fabric upload with drag & drop support
- Real-time fabric preview on 3D model

### ✏️ Customization Options
- Add custom text with color and size controls
- Upload custom logos/images
- Text positioning and styling
- Logo placement on shirt

### 📸 Save & Share
- High-resolution screenshot capture
- Social media sharing
- Print design functionality
- Download 3D view as PNG

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd model-3d
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
model-3d/
├── app/
│   ├── components/
│   │   ├── ShirtCustomizer.tsx      # Main customizer component
│   │   ├── AdvancedShirtModel.tsx   # 3D model with GLB support
│   │   ├── FabricSelector.tsx       # Fabric selection UI
│   │   ├── StyleSelector.tsx        # Shirt style selection
│   │   ├── UploadFabric.tsx         # Custom fabric upload
│   │   ├── TextUploader.tsx         # Text and logo upload
│   │   └── SaveScreenshot.tsx       # Screenshot and sharing
│   ├── data/
│   │   └── fabricTextures.ts        # Fabric data and categories
│   ├── page.tsx                     # Main page
│   └── layout.tsx                   # App layout
├── public/
│   └── models/                      # GLB model files (optional)
└── package.json
```

## Usage

### Basic Customization
1. **Select Fabric**: Choose from predefined fabrics or upload your own
2. **Choose Style**: Pick from different shirt fits and styles
3. **Add Custom Text**: Enter text and customize color/size
4. **Upload Logo**: Add custom logos or images
5. **Save Design**: Capture screenshots or share your design

### Advanced Features
- **Real-time Preview**: See changes instantly in 3D
- **Camera Controls**: 
  - Left click + drag to rotate
  - Scroll to zoom
  - Right click + drag to pan
- **Fabric Categories**: Filter fabrics by occasion or season
- **Custom Textures**: Upload seamless patterns for best results

## Customization

### Adding New Fabrics
Edit `app/data/fabricTextures.ts` to add new fabric types:

```typescript
export const fabricTextures: Record<string, FabricTexture> = {
  newFabric: {
    name: "New Fabric",
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0.1,
    price: 50,
    description: "Description of the fabric"
  }
};
```

### Using Custom GLB Models
1. Place your GLB file in `public/models/`
2. Update the `modelPath` prop in `ShirtCustomizer`
3. Use the `GLBShirtModel` component for GLB files

### Styling Customization
The project uses Tailwind CSS. Customize styles in:
- `app/globals.css` for global styles
- Component files for specific styling

## Performance Optimization

- **Lazy Loading**: 3D models load on demand
- **Texture Optimization**: Automatic texture compression
- **Suspense Boundaries**: Smooth loading states
- **Memory Management**: Proper cleanup of Three.js resources

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by [Jennis & Warmann](https://www.jennisandwarmann.com/) 3D customizer
- Built with [Three.js](https://threejs.org/) and [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- Icons from [Lucide](https://lucide.dev/)

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Perfect Fit Guarantee** | **Made to measure by expert tailors** | **No More Try & Error**
