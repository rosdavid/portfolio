---
title: "Mokkio Devlog #4: Scene Builder & Advanced Effects"
excerpt: "Mokkio v1.0.0-beta.4 introduces Scene Builder for multi-device compositions, Scene FX with 20 shadow presets, smart device filtering, and mobile-optimized interfaces."
date: "2025-11-10"
readTime: "6 min read"
tags: ["Devlog", "Mokkio"]
category: "devlog"
author: "David Ros"
authorBio: "Full stack developer building tools for creators."
---

# Devlog #4 - v1.0.0-beta.4: Scene Builder & Advanced Effects

Welcome to Mokkio Devlog #4! Beta.4 introduces new awesome features: Scene Builder for creating complex multi-device compositions and Scene FX for professional shadow effects. This update transforms Mokkio into a true scene composition tool, allowing users to create sophisticated mockups with multiple devices, custom layouts, and stunning visual effects.

## 🎯 What's New in Beta.4

Beta.4 focuses on creative flexibility and professional polish. The Scene Builder system enables unlimited device placement with precise control over positioning, scaling, and rotation, while the Scene FX system adds depth and professionalism with customizable shadow overlays. The mobile experience has also been significantly enhanced with touch-optimized interfaces.

## 🚀 Key Implementations

- **Scene FX System:** Complete effects system with overlay/underlay shadows, layer control, opacity management, and 20 shadow presets for professional-looking mockups.
- **Scene Builder System:** Multi-device layout system for complex compositions with custom positioning, scaling, rotation, and z-index control.
- **Mobile Scene Builder:** Full-featured Scene Builder for mobile with touch-optimized interactions and unified sidebar integration.
- **Layout Mode System:** Expanded with Single, Double, Triple, and Scene Builder modes for flexible composition.
- **Smart Device Frame Filtering:** Type-specific filtering showing only relevant frames (browsers: display/light/dark; mobile: display/color variants; tablets: display/gray/silver).
- **Scene Builder Overlays:** Visual indicators for disabled features with informative messaging.

## ✨ Major Additions

- **Scene Builder Mobile Interface:**

  - Full-screen modal matching device selector UX
  - Collapsible device sections with expand/collapse functionality
  - Device-specific configuration panels with frame selection, positioning, scaling, and rotation
  - Add Devices menu with 3-column grid layout and thumbnails
  - Touch-optimized interactions with gesture recognition
  - Device deletion with confirmation and cleanup

- **Scene FX Implementation:**

  - Mode toggle between Default (no effects) and Shadows
  - 20 shadow overlay presets for various visual styles
  - Opacity slider (0-100%) for precise control
  - Layer positioning: Overlay (above content) or Underlay (behind mockups)
  - Default button for quick reset
  - Full desktop and mobile implementation
  - Export compatibility with shadows in exported images

- **Background System Enhancements:**

  - Maintained aspect-ratio for natural appearance
  - All backgrounds preserve original dimensions without stretching

- **Device Frame System Enhancements:**

  - Browser frames: display, light, dark only
  - iPhone frames: display, blue, silver, orange (titanium variants)
  - iPad/MacBook frames: display, gray, silver
  - Automatic filtering based on device type

- **Layout System:**

  - Scene Builder mode with unlimited device placement
  - Layout presets overlay in right sidebar when active
  - Visual feedback with EyeOff icon and explanatory text
  - Seamless mode switching with state preservation

- **Navigation Improvements:**
  - Secondary navigation bar with Scene Builder section for mobile/tablet
  - Unified mobile sidebar with collapsible sections
  - Consistent modal patterns across interfaces

## 🔄 Improvements & Refinements

- **Mobile UX Refinements:**

  - Improved Add Devices menu with grid-based layout and better hierarchy
  - Enhanced touch targets for better interaction and accessibility

- **Right Sidebar Layout:**
  - Improved visual hierarchy with positioned overlay
  - Changed overlay icon for better semantic meaning
  - Adjusted overlay positioning from center to top for visibility

## 🐛 Bug Fixes

- **Device Frame Display Issues:**
  - Fixed browsers showing incorrect frame options (mobile color variants)
  - Fixed mobile devices showing tablet/desktop-specific frames
  - Ensured consistent frame filtering logic across device types

## 🛠️ Technical Enhancements

- **Mobile Performance:**
  - Optimized touch interactions with event handling and debouncing
  - Improved rendering with conditional rendering and memoization
  - Enhanced scroll behavior with optimized modal calculations
  - Better memory management with proper useEffect cleanup

## 🎨 UX & Performance Gains

Beta.4 brings significant improvements to the creative workflow. The Scene Builder enables complex compositions that were previously impossible, while Scene FX adds professional polish with minimal effort. Mobile users now enjoy a fully-featured experience with touch-optimized controls and intuitive interfaces.

## 🔮 Roadmap for Beta.5

Looking ahead, I'm planning to add, template library, and advanced export options, more devices and customization. Performance optimizations and accessibility improvements continue to be priorities.

---

## Useful Links

- [Live Website](https://mokkio.vercel.app)
- [GitHub Repository](https://github.com/rosdavid/mokkio)

---

Thanks for your continued support! Beta.4 represents a major step forward in making Mokkio the most powerful mockup tool available. Your feedback drives development—stay tuned for devlog #5!
