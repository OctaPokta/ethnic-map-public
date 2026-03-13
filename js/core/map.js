// ==========================================
// 🗺️ MAP PHYSICS & GESTURE ENGINE (CLEANED)
// ==========================================
const MapEngine = {
    scale: 1, translateX: 0, translateY: 0,
    isDragging: false, isMinimapDragging: false,
    dragStartX: 0, dragStartY: 0, translateStartX: 0, translateStartY: 0,
    initialPinchDistance: null, initialScale: 1,
    
    hasDragged: false,
    pinchCenterX: 0, pinchCenterY: 0, initialTranslateX: 0, initialTranslateY: 0,
    
    MAP_ORIGINAL_W: 6194,
    MAP_ORIGINAL_H: 3876,
  
    init() {
      this.mapViewport = document.getElementById('map-viewport');
      this.mapContent = document.getElementById('map-content');
      this.minimap = document.getElementById('minimap');
      this.minimapRect = document.getElementById('minimap-rect');
      this.mapWrapper = document.getElementById('map-wrapper');
  
      // Cache city pins to avoid querying DOM every frame
      this.cityPins = Array.from(document.querySelectorAll('.city-pin'));

      this.setupWrapper();
      this.setupEventListeners();
      
      this.setTransitionEnabled(false);
      this.applyTransform();
    },
  
    setupWrapper() {
      this.mapWrapper.style.width = '100%';
      this.mapWrapper.style.height = '100%';
    },
  
    setTransitionEnabled(enabled) { 
      this.mapContent.style.transition = enabled ? 'transform 0.4s ease-out' : 'none'; 
      this.minimapRect.style.transition = enabled ? 'all 0.4s ease-out' : 'none';
    },
  
    updateMinimap() {
      const vw = this.mapViewport.clientWidth; const vh = this.mapViewport.clientHeight;
      this.minimapRect.style.width = `${(100 / this.scale)}%`; 
      this.minimapRect.style.height = `${(100 / this.scale)}%`;
      this.minimapRect.style.left = `${(-this.translateX / (vw * this.scale)) * 100}%`; 
      this.minimapRect.style.top = `${(-this.translateY / (vh * this.scale)) * 100}%`;
    },
    
    applyTransform() { 
      this.mapContent.style.transform = `translate3d(${this.translateX}px, ${this.translateY}px, 0) scale(${this.scale})`; 
      this.updateMinimap(); 
      
      const invScale = 1 / this.scale;
      this.cityPins.forEach(pin => {
        pin.style.transform = `translate(-50%, -50%) scale(${invScale})`;
      });

      this.updateDebugPanel();
    },

    // 🔥 NEW: Screen-Independent Universal Coordinate Calculator
    updateDebugPanel() {
        if (!window.UI || !UI.debugPanel) return;

        const currentW = this.mapViewport.clientWidth;
        const currentH = this.mapViewport.clientHeight;
        if (currentW === 0 || currentH === 0) return;

        const IMG_RATIO = this.MAP_ORIGINAL_W / this.MAP_ORIGINAL_H;

        // 1. Find actual image center percentage based on current view
        let currWrapperW, currWrapperH, currOffsetX, currOffsetY;
        if (currentW / currentH > IMG_RATIO) {
            currWrapperH = currentH; currWrapperW = currentH * IMG_RATIO;
            currOffsetX = (currentW - currWrapperW) / 2; currOffsetY = 0;
        } else {
            currWrapperW = currentW; currWrapperH = currentW / IMG_RATIO;
            currOffsetX = 0; currOffsetY = (currentH - currWrapperH) / 2;
        }

        const rawX = ((currentW / 2) - this.translateX) / this.scale;
        const rawY = ((currentH / 2) - this.translateY) / this.scale;
        const pctX = (rawX - currOffsetX) / currWrapperW;
        const pctY = (rawY - currOffsetY) / currWrapperH;

        // 2. Translate that percentage into the standardized BASE_W/BASE_H system
        const BASE_W = 1536; const BASE_H = 864;
        let baseWrapperW, baseWrapperH, baseOffsetX, baseOffsetY;
        if (BASE_W / BASE_H > IMG_RATIO) {
            baseWrapperH = BASE_H; baseWrapperW = BASE_H * IMG_RATIO;
            baseOffsetX = (BASE_W - baseWrapperW) / 2; baseOffsetY = 0;
        } else {
            baseWrapperW = BASE_W; baseWrapperH = BASE_W / IMG_RATIO;
            baseOffsetX = 0; baseOffsetY = (BASE_H - baseWrapperH) / 2;
        }

        const baseRawX = (pctX * baseWrapperW) + baseOffsetX;
        const baseRawY = (pctY * baseWrapperH) + baseOffsetY;

        const standardizedX = (BASE_W / 2) - (baseRawX * this.scale);
        const standardizedY = (BASE_H / 2) - (baseRawY * this.scale);

        UI.debugPanel.innerText = `view: { scale: ${this.scale.toFixed(2)}, x: ${Math.round(standardizedX)}, y: ${Math.round(standardizedY)} }`;
    },
  
    flyToView(countryKey) { 
      const view = UI.countryViews[countryKey];
      if(!view) return;
  
      const BASE_W = 1536; const BASE_H = 864;  
      const IMG_RATIO = this.MAP_ORIGINAL_W / this.MAP_ORIGINAL_H;
      const baseViewRatio = BASE_W / BASE_H;
  
      let baseWrapperW, baseWrapperH, baseOffsetX, baseOffsetY;
      if (baseViewRatio > IMG_RATIO) {
          baseWrapperH = BASE_H; baseWrapperW = BASE_H * IMG_RATIO;
          baseOffsetX = (BASE_W - baseWrapperW) / 2; baseOffsetY = 0;
      } else {
          baseWrapperW = BASE_W; baseWrapperH = BASE_W / IMG_RATIO;
          baseOffsetX = 0; baseOffsetY = (BASE_H - baseWrapperH) / 2;
      }
  
      const focalX_base = ((BASE_W / 2) - view.x) / view.scale;
      const focalY_base = ((BASE_H / 2) - view.y) / view.scale;
      const pctFocalX = (focalX_base - baseOffsetX) / baseWrapperW;
      const pctFocalY = (focalY_base - baseOffsetY) / baseWrapperH;
  
      const currentW = this.mapViewport.clientWidth;
      const currentH = this.mapViewport.clientHeight;
      const currentViewRatio = currentW / currentH;
  
      let currWrapperW, currWrapperH, currOffsetX, currOffsetY;
      if (currentViewRatio > IMG_RATIO) {
          currWrapperH = currentH; currWrapperW = currentH * IMG_RATIO;
          currOffsetX = (currentW - currWrapperW) / 2; currOffsetY = 0;
      } else {
          currWrapperW = currentW; currWrapperH = currentW / IMG_RATIO;
          currOffsetX = 0; currOffsetY = (currentH - currWrapperH) / 2;
      }
  
      const newFocalX = currOffsetX + (pctFocalX * currWrapperW);
      const newFocalY = currOffsetY + (pctFocalY * currWrapperH);
  
      const isMobile = window.innerWidth <= 768;
      let newScale = isMobile ? view.scale * 1.15 : view.scale;
      let targetCenterY = isMobile ? currentH * 0.35 : currentH / 2;
  
      this.setTransitionEnabled(true); 
      this.scale = newScale; 
      this.translateX = (currentW / 2) - (newFocalX * newScale); 
      this.translateY = targetCenterY - (newFocalY * newScale); 
      this.applyTransform(); 
    },
  
    resetView() { 
        this.setTransitionEnabled(true); this.scale = 1; this.translateX = 0; this.translateY = 0; this.applyTransform(); 
    },
  
    moveMapFromMinimap(e) {
      const rect = this.minimap.getBoundingClientRect();
      let xPercent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      let yPercent = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      this.translateX = -(xPercent * this.mapViewport.clientWidth * this.scale) + (this.mapViewport.clientWidth / 2);
      this.translateY = -(yPercent * this.mapViewport.clientHeight * this.scale) + (this.mapViewport.clientHeight / 2);
      this.applyTransform();
    },
  
    setupEventListeners() {
      this.minimap.addEventListener('mousedown', (e) => { if (e.button === 0) { e.preventDefault(); this.isMinimapDragging = true; this.setTransitionEnabled(false); this.moveMapFromMinimap(e); } });
      
      this.mapViewport.addEventListener('mousedown', (e) => { 
        if (e.button === 0) { 
          e.preventDefault(); 
          this.isDragging = true; 
          this.hasDragged = false; 
          this.dragStartX = e.clientX; 
          this.dragStartY = e.clientY; 
          this.translateStartX = this.translateX; 
          this.translateStartY = this.translateY; 
          this.setTransitionEnabled(false); 
        } 
      });
      
      document.addEventListener('mousemove', (e) => { 
        if (this.isDragging) { 
          e.preventDefault(); 
          if (Math.hypot(e.clientX - this.dragStartX, e.clientY - this.dragStartY) > 3) {
            this.hasDragged = true;
          }
          this.translateX = this.translateStartX + (e.clientX - this.dragStartX); 
          this.translateY = this.translateStartY + (e.clientY - this.dragStartY); 
          this.applyTransform(); 
        } 
        else if (this.isMinimapDragging) { e.preventDefault(); this.moveMapFromMinimap(e); } 
      });
  
      this.mapViewport.addEventListener('click', () => {
        if (this.hasDragged) return;
      });
      
      document.addEventListener('mouseup', (e) => { 
        if (e.button === 0) { 
          if (this.isDragging || this.isMinimapDragging) { 
            this.isDragging = false; this.isMinimapDragging = false; 
            this.setTransitionEnabled(true); 
          } 
        } 
      });
  
      this.mapViewport.addEventListener('wheel', (e) => {
        e.preventDefault(); 
        this.setTransitionEnabled(true); 
        const rect = this.mapViewport.getBoundingClientRect(); 
        const mx = e.clientX - rect.left; 
        const my = e.clientY - rect.top;
        
        const nextScale = Math.min(12, Math.max(1, this.scale + (e.deltaY > 0 ? -0.4 : 0.4)));
        
        if (nextScale !== this.scale) { 
          this.translateX = mx - ((mx - this.translateX) / this.scale) * nextScale; 
          this.translateY = my - ((my - this.translateY) / this.scale) * nextScale; 
          this.scale = nextScale; 
          this.applyTransform(); 
        }
      }, { passive: false });
  
      this.mapViewport.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.hasDragged = false; 
          this.dragStartX = e.touches[0].clientX;
          this.dragStartY = e.touches[0].clientY;
          this.translateStartX = this.translateX;
          this.translateStartY = this.translateY;
          this.setTransitionEnabled(false);
        } else if (e.touches.length === 2) {
          this.isDragging = false; 
          this.initialPinchDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          this.initialScale = this.scale;
          
          const rect = this.mapViewport.getBoundingClientRect();
          this.pinchCenterX = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
          this.pinchCenterY = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
          
          this.initialTranslateX = this.translateX;
          this.initialTranslateY = this.translateY;
          this.setTransitionEnabled(false);
        }
      }, { passive: false });
  
      this.mapViewport.addEventListener('touchmove', (e) => {
        e.preventDefault(); 
        if (this.isDragging && e.touches.length === 1) {
          if (Math.hypot(e.touches[0].clientX - this.dragStartX, e.touches[0].clientY - this.dragStartY) > 3) {
            this.hasDragged = true;
          }
          this.translateX = this.translateStartX + (e.touches[0].clientX - this.dragStartX);
          this.translateY = this.translateStartY + (e.touches[0].clientY - this.dragStartY);
          this.applyTransform();
        } else if (e.touches.length === 2 && this.initialPinchDistance) {
          const currentDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          const scaleChange = currentDistance / this.initialPinchDistance;
          const nextScale = Math.min(12, Math.max(1, this.initialScale * scaleChange));
          
          this.translateX = this.pinchCenterX - ((this.pinchCenterX - this.initialTranslateX) / this.initialScale) * nextScale;
          this.translateY = this.pinchCenterY - ((this.pinchCenterY - this.initialTranslateY) / this.initialScale) * nextScale;
          
          this.scale = nextScale;
          this.applyTransform();
        }
      }, { passive: false });
  
      this.mapViewport.addEventListener('touchend', (e) => {
        if (e.touches.length < 2) { this.initialPinchDistance = null; }
        if (e.touches.length === 0) {
          this.isDragging = false;
          this.setTransitionEnabled(true);
        }
      });
    }
};