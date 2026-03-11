# Google Labs Design System (Kejin Lab Web)

## 1. Core Philosophy: "Canvas for Innovation"
Based on Google Labs (labs.google) and Material Design 3.
- **Surface**: Pure White (`#FFFFFF`) - The canvas.
- **Shapes**: Extreme Rounded Corners (`rounded-pill`, `rounded-4xl`) - Friendly & Modern.
- **Typography**: Google Sans / SF Pro - Clean, geometric, legible.

## 2. Color Palette

### Base
- **Surface**: `#FFFFFF`
- **Primary Text**: `#202124` (Google Grey 900)
- **Secondary Text**: `#5F6368` (Google Grey 700)

### Labs Accents (The "Spark" of AI)
Derived from Google Labs gradient mesh:
- **Labs Pink**: `#FFD6F4` (Top-Left Energy) -> *Updated to slightly more vibrant in gradients*
- **Labs Purple**: `#9D85FF` (Top-Right Intelligence)
- **Labs Blue**: `#4F9DFF` (Bottom-Left Tech)
- **Labs Orange**: `#FF9F5A` (Bottom-Right Creativity) - *Added based on user feedback*
- **Labs Green**: `#30FF8F` (Action / "Go") - Used for primary CTAs.

### Brand Colors (Functional)
- Blue: `#4285F4`
- Red: `#EA4335`
- Yellow: `#FBBC05`
- Green: `#34A853`

## 3. Shadows & Effects
- **Glassmorphism**: `backdrop-blur-xl` + `bg-white/60` + subtle border.
- **Neon Glow**: Coloured shadows for active elements (e.g., Green shadow for Green buttons).
- **Blobs**: Soft, multi-colored radial gradients in the background to create depth without clutter.

## 4. Typography
- **Headings**: Bold, tight tracking (`tracking-tighter`).
- **Subtitles**: Small, all-caps, wide tracking (`tracking-[0.2em]`).
- **Body**: Readable, comfortable line-height.

## 5. Components
- **Buttons**: Pill-shaped (`rounded-full`).
- **Cards**: Large border-radius (`rounded-3xl`), subtle border, hover lift effect.
- **Navigation**: Minimalist, sticky glass effect on scroll.
