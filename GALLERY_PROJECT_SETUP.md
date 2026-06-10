# Gallery Project Section Setup

## Overview
A new "Gallery Projects" section has been added to your portfolio with a cosmic/space theme and interactive BorderGlow cards.

## What Was Created

### 1. **BorderGlow Component** (`src/components/ui/BorderGlow.jsx`)
   - Interactive glow effect that responds to mouse movement
   - Customizable colors, intensity, and animation properties
   - Includes CSS file for styling (`BorderGlow.css`)

### 2. **Gallery Project Component** (`src/components/GalleryProject.jsx`)
   - Displays projects in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
   - Each card includes:
     - Project image/placeholder
     - Category label
     - Project title
     - Short description
     - Tech stack badges
     - Explore link
   - Cosmic background with subtle gradient blobs
   - Interactive BorderGlow cards with cyan/blue glow effects

### 3. **Integration**
   - Added to main page (`src/app/page.js`)
   - **Positioned above "About Me" section** (after Hero, before About Me)
   - Follows existing design system and spacing

## Design Features

### Space/Cosmos Theme
- Dark background (#0a0e27) with cosmic gradient overlays
- Cyan and blue color palette matching your existing theme
- Subtle animated background elements (blurred gradient circles)
- Galaxy emoji in image placeholders (🌌)

### BorderGlow Card Effects
- Glows on hover with directional cone effect
- Cyan/blue mesh gradient border
- Responsive to mouse proximity
- Smooth transitions and animations

### Color Scheme
- **Background**: `#0a0e27` (deep space blue)
- **Glow Color**: Cyan (200° hue)
- **Accent Colors**: `#06b6d4`, `#0ea5e9` (cyan variants)
- **Text**: Cyan-100, Slate-400 for contrast

## Project Data Structure

Each project object contains:
```javascript
{
  id: number,
  title: string,
  category: string,
  description: string,
  techStack: string[],
  image: string | null,
  link: string,
}
```

## Customization Guide

### Adding/Editing Projects
Edit the `projects` array in `GalleryProject.jsx`:

```javascript
const projects = [
  {
    id: 1,
    title: "Your Project Name",
    category: "Web App",
    description: "Brief description of the project",
    techStack: ["React", "Next.js", "Tailwind"],
    image: "/assets/images/your-image.jpg",
    link: "https://your-project-link.com",
  },
  // ... more projects
];
```

### Adjusting BorderGlow Properties
Modify the BorderGlow props in the map function:
- `glowColor`: HSL values as "H S L" (e.g., "200 100 50")
- `glowIntensity`: 0.1-3.0 (higher = brighter)
- `edgeSensitivity`: 0-100 (lower = glow appears sooner)
- `colors`: Array of 3 hex colors for gradient
- `borderRadius`: Corner radius in pixels
- `glowRadius`: How far glow extends

### Changing Colors
To customize the glow colors, modify:
```javascript
glowColor="200 100 50"  // HSL format
colors={["#06b6d4", "#0ea5e9", "#06b6d4"]}  // Hex colors
```

## File Structure
```
src/
├── components/
│   ├── GalleryProject.jsx          (Main component)
│   └── ui/
│       ├── BorderGlow.jsx          (Glow effect component)
│       └── BorderGlow.css          (Glow styling)
└── app/
    └── page.js                     (Updated with GalleryProject)
```

## Next Steps
1. Add your project data to the `projects` array
2. Add project images to `/public/assets/images/`
3. Update project links and descriptions
4. Adjust BorderGlow colors if needed
5. Test hover effects and responsiveness

## Browser Support
- Modern browsers with CSS Grid and CSS Variables support
- Smooth animations on desktop
- Touch-friendly on mobile devices

## Performance Notes
- BorderGlow uses requestAnimationFrame for smooth animations
- CSS-based glow effects (no heavy JavaScript)
- Optimized for performance with pointer event listeners
