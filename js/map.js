// ==========================================
// 🗺️ MAP PHYSICS & GESTURE ENGINE (CLEANED)
// ==========================================
const MapEngine = {
    scale: 1, translateX: 0, translateY: 0,
    isDragging: false, isMinimapDragging: false,
    dragStartX: 0, dragStartY: 0, translateStartX: 0, translateStartY: 0,
    initialPinchDistance: null, initialScale: 1,
    activeHoverCountry: null, previousHoverCountry: null,
    
    hasDragged: false, lastHitTestTime: 0,
    pinchCenterX: 0, pinchCenterY: 0, initialTranslateX: 0, initialTranslateY: 0,
    
    MAP_ORIGINAL_W: 6194,
    MAP_ORIGINAL_H: 3876,
  
    init() {
      this.mapViewport = document.getElementById('map-viewport');
      this.mapContent = document.getElementById('map-content');
      this.minimap = document.getElementById('minimap');
      this.minimapRect = document.getElementById('minimap-rect');
      this.mapWrapper = document.getElementById('map-wrapper');
  
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
      // Pure, simple transitions without the CSS class hacks
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
      // 🔥 THE SECRET WEAPON: translate3d forces the phone's GPU to take over instantly
      this.mapContent.style.transform = `translate3d(${this.translateX}px, ${this.translateY}px, 0) scale(${this.scale})`; 
      this.updateMinimap(); 
      
      document.querySelectorAll('.city-pin').forEach(pin => {
        pin.style.transform = `translate(-50%, -50%) scale(${1 / this.scale})`;
      });
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
        else {
          const now = Date.now();
          if (now - this.lastHitTestTime < 50) return; 
          this.lastHitTestTime = now;

          const rect = this.mapViewport.getBoundingClientRect();
          const mouseX = e.clientX - rect.left; const mouseY = e.clientY - rect.top;
          const visibleLayers = Array.from(document.querySelectorAll('.map-ethnic.visible')).reverse();
          let hitFound = false;
  
          const contentX = (mouseX - this.translateX) / this.scale;
          const contentY = (mouseY - this.translateY) / this.scale;
          const wrapperLeft = (this.mapViewport.clientWidth - this.mapWrapper.clientWidth) / 2;
          const wrapperTop = (this.mapViewport.clientHeight - this.mapWrapper.clientHeight) / 2;
          
          const wrapperX = contentX - wrapperLeft;
          const wrapperY = contentY - wrapperTop;
  
          const hitCanvas = document.createElement('canvas');
          const hitCtx = hitCanvas.getContext('2d', { willReadFrequently: true });
  
          for (const layer of visibleLayers) {
            const imgWidth = this.MAP_ORIGINAL_W; 
            const imgHeight = this.MAP_ORIGINAL_H;
  
            const pixelX = (wrapperX / this.mapWrapper.clientWidth) * imgWidth;
            const pixelY = (wrapperY / this.mapWrapper.clientHeight) * imgHeight;
  
            if (pixelX >= 0 && pixelX < imgWidth && pixelY >= 0 && pixelY < imgHeight) {
              hitCanvas.width = 1; hitCanvas.height = 1;
              hitCtx.drawImage(layer, pixelX, pixelY, 1, 1, 0, 0, 1, 1);
              const pixelData = hitCtx.getImageData(0, 0, 1, 1).data;
              
              if (pixelData[3] > 10) { 
                hitFound = true;
                this.activeHoverCountry = layer.getAttribute('data-country');
                break;
              }
            }
          }
          if (!hitFound) { this.activeHoverCountry = null; }
          
          if (this.activeHoverCountry !== this.previousHoverCountry) {
            document.querySelectorAll('.map-ethnic.hovered').forEach(el => el.classList.remove('hovered'));
            if (this.activeHoverCountry) {
              const activeLayer = document.querySelector(`.map-ethnic.visible[data-country="${this.activeHoverCountry}"]`);
              if (activeLayer) activeLayer.classList.add('hovered');
            }
            this.previousHoverCountry = this.activeHoverCountry;
          }
        }
      });
  
      this.mapViewport.addEventListener('click', () => {
        if (this.hasDragged) return;

        if (this.activeHoverCountry) {
          SoundEngine.play('tick'); 
          UI.hideTopBanner(); 
          UI.cityDossier.classList.add('hidden'); 
          
          const opt = document.querySelector(`.custom-option[data-value="${this.activeHoverCountry}"]`);
          if (opt) document.getElementById('custom-select-text').textContent = opt.textContent;
          
          window.history.replaceState(null, null, '#' + this.activeHoverCountry);
    
          const targetCb = document.querySelector(`input[data-layer="${this.activeHoverCountry}"]`);
          if (targetCb && !targetCb.checked) {
              targetCb.checked = true;
              UI.updateLayerVisibility(this.activeHoverCountry, true);
          }
          
          UI.showInfoPanel(this.activeHoverCountry); 
          UI.updateCityVisibility();
    
          if (window.innerWidth <= 768) {
              document.querySelector('.sidebar').classList.add('collapsed');
          }
        }
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
        this.setTransitionEnabled(true); // Smooth scroll instantly
        const rect = this.mapViewport.getBoundingClientRect(); 
        const mx = e.clientX - rect.left; 
        const my = e.clientY - rect.top;
        
        const nextScale = Math.min(8, Math.max(1, this.scale + (e.deltaY > 0 ? -0.4 : 0.4)));
        
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
          const nextScale = Math.min(6, Math.max(1, this.initialScale * scaleChange));
          
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