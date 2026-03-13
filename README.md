<img width="1082" height="542" alt="image" src="https://github.com/user-attachments/assets/131ccb1f-efc1-40ad-aa06-4da1100ea82f" />

# Middle East Ethnic Map

A high-performance, interactive demographic mapping engine built with vanilla web technologies. This application visualizes complex ethnographic data across the Middle East using a custom-built, hardware-accelerated viewport.

## Project Overview

Middle East Ethnic Map provides an immersive geographic experience, allowing users to explore the ethnic distributions of various populations both within specific countries and across regional borders. Built to handle massive image textures without performance degradation, the app features dynamic demographics, responsive touch gestures, and a fluid user interface.

## Key Features

* **High-Resolution Rendering Engine**: Handles multiple 6194x3876 pixel texture layers using optimized WebP assets, CSS hardware acceleration, and dynamic memory management.
* **Custom Gesture Physics**: Includes a custom JavaScript physics engine for smooth panning, mouse-wheel zooming, and mobile pinch-to-zoom tracking.
* **Universal Coordinate System**: Geographic data points and country viewports are mathematically mapped to a screen-independent baseline ratio, ensuring perfect centering and geographic locking across all device sizes and screen aspect ratios.
* **Dynamic Demographics**: Features an interactive sidebar with auto-generated charts, distribution bar graphs, and detailed demographic dossiers based on the selected region.
* **Cross-Border Regional Scanner**: Allows users to filter and view transnational ethnic groups (e.g., Kurds, Bedouins, Druze) across the entire Middle Eastern map.
* **Adaptive Interface & Routing**: Includes a hash-based routing system for smooth state transitions, a dark mode toggle, and a fully responsive layout engineered with Dynamic Viewport Height (`dvh`).
* **Integrated Analytics**: Custom Google Analytics 4 (GA4) event tracking implementation for user interactions and engagement metrics.

## Technical Architecture

The application is built without heavy external frameworks (like React or Leaflet), utilizing a domain-driven, modular vanilla architecture:
* `js/data/`: Centralized data modules containing geographic coordinates, demographic statistics, regional definitions, and UI strings.
* `js/ui/`: Manages DOM injection, state management, hash routing, and responsive UI event listeners.
* `js/core/map.js`: The core physics and rendering engine handling matrix transformations, multi-touch gestures, universal coordinate translation, and layer compositing.
* `css/`: Advanced component-based styling utilizing CSS variables, `mix-blend-mode` math, and GPU-accelerated layer management.

## Intellectual Property & Legal Restrictions

**IMPORTANT: ALL RIGHTS RESERVED**

The ethnographic data (contained in the data files) and all geographic image assets (contained in the `images/countries-ethnic`, `images/countries-labels`and `images/regional` directory) are the exclusive intellectual property of the project creator. 

By accessing this repository, you agree to the following strict limitations:

* **No Modifications**: You are strictly prohibited from altering, modifying, or creating derivative works from the image assets. Watermarks if exists must remain intact.
* **Non-Commercial Use**: This project, its source code, and its visual assets may not be used, hosted, or distributed for commercial purposes or profit-generating activities.
* **Data Integrity**: The demographic and ethnic distribution data provided in this application may not be scraped, modified, or re-hosted without explicit written permission.
* **Attribution**: Any permitted sharing of the live application must directly credit the original author.

Unauthorized redistribution or modification of the geographic assets will be considered a breach of copyright.
