---
title: "Mokkio Devlog #2: Expanding Horizons"
excerpt: "Mokkio v1.0.0-beta.2 introduces iPhone 17 Pro support, custom backgrounds, procedural effects, keyboard shortcuts, and major performance optimizations."
date: "2025-10-29"
readTime: "5 min read"
tags: ["Devlog", "Mokkio"]
category: "devlog"
author: "David Ros"
authorBio: "Full stack developer building tools for creators."
---

# Devlog #2 - v1.0.0-beta.2: Expanding Horizons

Welcome back to the Mokkio devlog series! This second entry covers the release of v1.0.0-beta.2, a significant update that brings advanced customization options, improved performance, and a more polished user experience. Building on the foundation laid in beta.1, this version focuses on expanding creative possibilities while maintaining the tool's commitment to simplicity and professionalism.

## 🎯 What's New in Beta.2

Beta.2 introduces powerful new features designed to give users even more control over their mockups, from custom backgrounds to procedural effects. We've also refined the existing functionality for better performance and usability.

## 🚀 Key Implementations

- **Device Frame Updates:** Added support for iPhone 17 Pro and Pro Max frames with pixel-perfect dimensions and updated hardware specs, replacing the legacy iPhone 15 Pro models.
- **Custom Background Image System:** Full CRUD operations for background images, including upload, replace, and remove functionality with efficient File API and blob storage integration.
- **Procedural Effects Engine:** Noise and blur effects for backgrounds, powered by WebGL-accelerated rendering with real-time parameter adjustments.
- **Cosmic Gradient Library:** 10 new cosmic gradient presets featuring mathematical color interpolation and optimized CSS gradients for stunning visuals.
- **Keyboard Shortcuts System:** Comprehensive shortcuts for common actions with cross-platform support (Windows/Linux/macOS), including undo (Ctrl+Z/Cmd+Z), redo (Ctrl+Y/Ctrl+Shift+Z/Cmd+Shift+Z), and export (Ctrl+E/Cmd+E).
- **Dynamic Canvas Scaling:** Responsive canvas sizing with aspect ratio preservation and viewport-aware constraints.
- **Realistic Browser Mockups:** Hardware-accelerated rendering for Chrome and Safari frames with accurate UI elements and material design.

## 🔄 Improvements & Refinements

- **Device Specifications:** Updated dimensions and specs for iPhone 17 Pro models with sub-pixel accuracy and retina display support.
- **Canvas Scaling Algorithm:** Enhanced scaling with dual-constraint optimization using constraint satisfaction programming.
- **Mobile Landing Page:** Cleaner styling, reduced clutter, and improved performance metrics for mobile users.
- **Background Rendering Pipeline:** Refactored for lazy loading, memory pooling, and GPU acceleration in the mockup canvas component.
- **Effects Documentation:** Updated descriptions and titles for better technical accuracy and user experience.

## ❌ Cleanup & Optimization

- **Legacy Device Components:** Removed iPhone 15 Pro components to reduce bundle size and maintenance overhead.

## 🛠️ Technical Enhancements

- **Background Type Architecture:** Added support for transparent and image backgrounds with efficient memory management and caching.
- **Procedural Generation:** HTML5 Canvas-based noise generation using Perlin noise algorithms and Web Workers for non-blocking computation.
- **Preview Scaling:** Enhanced right sidebar previews with bilinear interpolation and anti-aliasing.
- **Pan/Zoom Controls:** Advanced clamping algorithms, momentum scrolling, and gesture recognition for smoother interactions.

## 🎨 UX & Performance Gains

This update brings significant performance improvements, especially in background rendering and canvas scaling. The new keyboard shortcuts make the tool more efficient for power users, while the cosmic gradients and procedural effects open up creative possibilities without compromising speed.

## 🔮 Roadmap for Beta.3

Looking ahead, we're planning to add more device frames, advanced animation presets and PWA for mobiles. Performance optimizations and accessibility improvements remain top priorities.

---

## Useful Links

- [Live Website](https://mokkio.vercel.app)
- [GitHub Repository](https://github.com/rosdavid/mokkio)

---

Thanks for following along! Your feedback on beta.2 will help shape the future of Mokkio. Stay tuned for devlog #3 with more exciting updates.
