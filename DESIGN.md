---
name: Dreamy Hearts
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4f4446'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#817476'
  outline-variant: '#d3c3c5'
  surface-tint: '#78555e'
  primary: '#78555e'
  on-primary: '#ffffff'
  primary-container: '#ffd1dc'
  on-primary-container: '#7a5761'
  inverse-primary: '#e7bbc6'
  secondary: '#40627b'
  on-secondary: '#ffffff'
  secondary-container: '#bee1ff'
  on-secondary-container: '#42647e'
  tertiary: '#5952af'
  on-tertiary: '#ffffff'
  tertiary-container: '#ded9ff'
  on-tertiary-container: '#5c55b2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e2'
  primary-fixed-dim: '#e7bbc6'
  on-primary-fixed: '#2d141c'
  on-primary-fixed-variant: '#5e3e47'
  secondary-fixed: '#cae6ff'
  secondary-fixed-dim: '#a8cbe8'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#274a63'
  tertiary-fixed: '#e3dfff'
  tertiary-fixed-dim: '#c5c0ff'
  on-tertiary-fixed: '#140067'
  on-tertiary-fixed-variant: '#413996'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Quicksand
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  element-gap: 12px
---

## Brand & Style
The design system embodies a modern, commercial "Kawaii" aesthetic, targeting an audience that values playfulness, warmth, and expressive digital environments. It blends the sweetness of Japanese pop culture with modern Glassmorphism to create a high-end, tactile experience.

The visual direction is "Hyper-Cutesy Sophistication." It utilizes a mix of soft, bubble-like geometries and translucent frosted layers to evoke a sense of lightness and wonder. The interface should feel like a floating collection of stickers and gems, maintaining high usability through clear visual hierarchies and purposeful gold accents.

## Colors
The palette is centered on a "Cotton Candy" foundation, balanced by deeper purple tones for legibility and gold for premium highlights.

- **Soft Pink (#FFD1DC):** The primary brand color, used for major surfaces, active states, and emotional focal points.
- **Celestial Blue (#BDE0FE):** Used for secondary actions, information callouts, and background accents to provide a cooling contrast.
- **Kuromi Purple (#A29BFE):** Reserved for interactive elements requiring higher contrast, and for sophisticated decorative elements.
- **Gold (#FFD700):** A precious accent used sparingly for "special" moments: achievements, star ratings, premium buttons, and icon flourishes.
- **Neutrals:** Backgrounds utilize pure white (#FFFFFF) or very faint tints of the primary colors to maintain a clean, airy feel. Text is a soft deep plum (#4A4A6A) rather than pure black to keep the look gentle.

## Typography
This design system utilizes **Quicksand** exclusively to ensure a consistent, rounded, and approachable feel across all touchpoints. 

The typography scales are generous. Headlines should always use the "Bold" or "SemiBold" weights to stand out against the soft-colored backgrounds. For the "Display" level, a slight negative letter-spacing is applied to give words a tighter, more "sticker-like" appearance. Body text maintains a "Medium" weight (500) where possible to improve legibility against pastel backgrounds.

## Layout & Spacing
The layout philosophy relies on a **Fluid Grid** with extremely generous internal padding to create "breathable" and airy compositions. 

- **Grid:** A 12-column grid for desktop, 4-column for mobile.
- **Rhythm:** An 8px base unit drives all spacing. However, primary containers should utilize larger 24px or 32px margins to emphasize the "floating" nature of the UI.
- **Safe Areas:** Elements should never feel cramped. Use larger gaps (12px - 20px) between stacked components to allow shadows and glows to breathe without overlapping awkwardly.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and soft, colorful ambient shadows.

- **Frosted Surfaces:** Main content cards use a semi-transparent white background (opacity 70-80%) with a `20px` backdrop-blur. 
- **Ambient Shadows:** Instead of grey shadows, use low-opacity versions of the primary or secondary colors (e.g., a soft pink shadow for a pink button). This creates a "glow" rather than a heavy lift.
- **Sparkle Pattern:** Backgrounds and specific "hero" containers feature a subtle, repeating SVG pattern of 4-pointed stars and hearts in white or gold at 10-15% opacity.

## Shapes
Shapes are hyper-rounded and organic. The "Pill-shaped" philosophy is the default for almost all interactive elements.

- **Buttons:** Fully pill-shaped (radius: 100px).
- **Cards:** Large corner radii (24px to 32px) to ensure no sharp edges exist within the interface.
- **Icons:** Should feature thick strokes (2px+) and rounded terminals. Icons are often enclosed in a circular "coin-like" container with a gold border.

## Components

### Buttons
Buttons are "bubble-like." The primary button is a pill-shaped gradient from Soft Pink to a slightly warmer pink, featuring a subtle inner white glow at the top to simulate a 3D "plastic" look. On hover, the button should gently scale up (1.05x).

### Floating Containers (Cards)
Cards do not have borders. They use the frosted glass effect described in the Elevation section. They should appear to "float" over the sparkle-patterned background.

### Input Fields
Inputs are pill-shaped with a thick (2px) Celestial Blue border when focused. The background is a very faint version of the Blue, ensuring the field looks "filled" and soft.

### Chips & Tags
Chips are small, fully-rounded badges. Use Kuromi Purple for high-priority tags and Celestial Blue for neutral categories.

### Icons & Stickers
Icons should have a hand-drawn quality. Important actions can be styled as "Stickers"—these have a thick white border and a drop shadow, making them look like they were physically applied to the glass interface.

### Checkboxes & Radios
Replaced by custom heart-shaped (checkbox) and star-shaped (radio) toggles. When selected, they fill with Gold and emit a small "sparkle" particle animation.