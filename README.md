
<img width="1082" height="542" alt="image" src="https://github.com/user-attachments/assets/131ccb1f-efc1-40ad-aa06-4da1100ea82f" />

# Middle East Ethnic Map

A high-performance, interactive demographic mapping engine built with vanilla web technologies. This application visualizes complex ethnographic data across the Middle East using a custom-built, hardware-accelerated viewport.

## Project Overview

MMapa provides an immersive geographic experience, allowing users to explore the ethnic distributions of various populations. Built to handle massive image textures without performance degradation, the app features dynamic demographics, responsive touch gestures, and cinematic audio feedback.

## Key Features

* **High-Resolution Rendering Engine**: Handles multiple 6194x3876 pixel texture layers using optimized CSS hardware acceleration and dynamic memory management.
* **Custom Gesture Physics**: Includes a custom JavaScript physics engine for smooth panning, mouse-wheel zooming, and mobile pinch-to-zoom tracking.
* **Coordinate-Based Accuracy**: Capital city data points are mathematically mapped to raw image pixels, ensuring perfect geographic locking across all device ratios.
* **Dynamic Demographics**: Features an interactive sidebar with auto-generated donut charts and distribution bar graphs based on the selected region.
* **Adaptive Interface**: Includes an automatic tab-sleep recovery system, a dark mode toggle, and a fully responsive layout engineered with Dynamic Viewport Height (`dvh`).

## Technical Architecture

The application is built without heavy external frameworks (like React or Leaflet), utilizing a domain-driven, modular vanilla architecture:
* `data.js`: Centralized data store containing geographic coordinates, demographic statistics, and UI strings.
* `app.js`: Manages DOM injection, state management, and responsive UI event listeners.
* `map.js`: The core physics and rendering engine handling matrix transformations, multi-touch gestures, and layer compositing.
* `style.css`: Advanced styling utilizing `mix-blend-mode` math and GPU-accelerated layer management.

## Intellectual Property & Legal Restrictions

**IMPORTANT: ALL RIGHTS RESERVED**

The ethnographic data (contained in `data.js`) and all geographic PNG image assets (contained in the `images/` directory) are the exclusive intellectual property of the project creator. 

By accessing this repository, you agree to the following strict limitations:

* **No Modifications**: You are strictly prohibited from altering, modifying, or creating derivative works from the image assets. Watermarks must remain intact.
* **Non-Commercial Use**: This project, its source code, and its visual assets may not be used, hosted, or distributed for commercial purposes or profit-generating activities.
* **Data Integrity**: The demographic and ethnic distribution data provided in this application may not be scraped, modified, or re-hosted without explicit written permission.
* **Attribution**: Any permitted sharing of the live application must directly credit the original author.

Unauthorized redistribution or modification of the geographic assets will be considered a breach of copyright.
