// ==========================================
// 💻 UI & APPLICATION CONTROLLER
// ==========================================
const UI = {
    DEBUG_MODE: false, 
    countryViews: {}, demographicData: {}, countryNamesHebrew: {},
    
    init() {
      this.cityDossier = document.getElementById('city-dossier');
      
      this.buildDebugPanel();
      this.injectData();
      this.setupLoadingScreen();
      this.setupEventListeners();
      
      // 🔥 NEW: Setup the Wake-Up Splash Screen for Tab Switching
      this.setupVisibilityHandler(); 
    },
  
    buildDebugPanel() {
      if (this.DEBUG_MODE) {
        this.debugPanel = document.createElement('div');
        this.debugPanel.style.cssText = `
          position: fixed; bottom: 20px; right: 20px; background: rgba(15, 23, 42, 0.9); color: #00ffcc;
          padding: 12px 20px; border-radius: 8px; font-family: monospace; font-size: 16px; font-weight: bold;
          z-index: 999999; cursor: pointer; pointer-events: auto; border: 1px solid #00ffcc; direction: ltr; transition: all 0.2s ease;
        `;
        this.debugPanel.title = "Click to copy coordinates!";
        document.body.appendChild(this.debugPanel);
        this.debugPanel.addEventListener('click', () => {
          navigator.clipboard.writeText(this.debugPanel.innerText);
          this.debugPanel.style.background = "#00ffcc"; this.debugPanel.style.color = "#0f172a";
          setTimeout(() => { this.debugPanel.style.background = "rgba(15, 23, 42, 0.9)"; this.debugPanel.style.color = "#00ffcc"; }, 300);
        });
      }
    },
  
    injectData() {
      document.getElementById('loading-logo').src = DashboardData.images.watermark;
      document.getElementById('base-map-img').src = DashboardData.images.baseMap;
      document.getElementById('borders-img').src = DashboardData.images.borders;
      document.getElementById('minimap-bg').src = DashboardData.images.minimapBg;
  
      document.getElementById('sidebar-main-title').textContent = DashboardData.ui.mainTitle;
      document.getElementById('custom-select-text').textContent = DashboardData.ui.defaultDropdownText;
      document.getElementById('sidebar-dropdown-label').textContent = DashboardData.ui.dropdownLabel;
      document.getElementById('sidebar-checkboxes-label').textContent = DashboardData.ui.ethnicLayersTitle;
      document.getElementById('select-all-btn').textContent = DashboardData.ui.selectAllBtn;
      document.getElementById('clear-map-btn').textContent = DashboardData.ui.clearMapBtn;
      document.getElementById('top-title-prefix').textContent = DashboardData.ui.distributionTitle;
      document.getElementById('dossier-pop-label').textContent = DashboardData.ui.populationLabel;
      
      document.getElementById('donation-btn').href = DashboardData.ui.donationLink;
      document.getElementById('callout-title-text').textContent = DashboardData.ui.donationTooltip;
  
      document.getElementById('powered-by-prefix').textContent = DashboardData.ui.poweredByPrefix;
      document.getElementById('powered-by-brand').textContent = DashboardData.ui.poweredByBrand;

      const devBadge = document.getElementById('development-badge');
      if (DashboardData.ui.showUnderDevelopment) {
          document.getElementById('development-text').textContent = DashboardData.ui.underDevelopmentText;
          devBadge.classList.remove('hidden');
      } else {
          devBadge.classList.add('hidden');
      }

      const ethnicContainer = document.getElementById('dynamic-ethnic-layers');
      const labelContainer = document.getElementById('dynamic-label-layers');
      const dropdownContainer = document.getElementById('dynamic-dropdown-options');
      const checkboxesContainer = document.getElementById('dynamic-checkboxes');
  
      Object.entries(DashboardData.countries).forEach(([key, data]) => {
        this.countryViews[key] = data.view;
        this.demographicData[key] = data.demographics;
        this.countryNamesHebrew[key] = data.hebrewName;
  
        if (data.ethnicImage) {
          const img = document.createElement('img');
          img.src = data.ethnicImage; img.className = 'map-layer map-ethnic';
          img.setAttribute('data-country', key); img.draggable = false; img.crossOrigin = "anonymous";
          ethnicContainer.appendChild(img);
        }
        if (data.labelImage) {
          const img = document.createElement('img');
          img.src = data.labelImage; img.className = 'map-layer map-label';
          img.setAttribute('data-country', key); img.draggable = false;
          labelContainer.appendChild(img);
        }
  
        const opt = document.createElement('span');
        opt.className = 'custom-option'; opt.setAttribute('data-value', key); opt.textContent = data.hebrewName;
        dropdownContainer.appendChild(opt);
  
        const lbl = document.createElement('label');
        lbl.className = 'checkbox-label';
        lbl.innerHTML = `<input type="checkbox" data-layer="${key}"><span class="checkbox-custom"></span>${data.hebrewName}`;
        checkboxesContainer.appendChild(lbl);
      });
  
      const MAP_ORIGINAL_W = 6194;
      const MAP_ORIGINAL_H = 3876;
      const cityPinsContainer = document.getElementById('city-pins');
      const dossierImageElement = document.getElementById('dossier-image');
  
      DashboardData.cities.forEach(city => {
        const pin = document.createElement('div');
        pin.className = 'city-pin'; 
        pin.setAttribute('data-country', city.country);
        // 🔥 NEW: High-resolution SVG City Skyline Icon
        pin.innerHTML = `
          <svg class="city-icon" viewBox="0 0 512 512" fill="currentColor">
            <path d="M240 32c0-17.7 14.3-32 32-32h160c17.7 0 32 14.3 32 32v64h32c17.7 0 32 14.3 32 32v352H16V160c0-17.7 14.3-32 32-32h80c17.7 0 32 14.3 32 32v96h80V32zM128 224v-32H64v32h64zm0 96v-32H64v32h64zm0 96v-32H64v32h64zm192-256v-32h-64v32h64zm0 96v-32h-64v32h64zm0 96v-32h-64v32h64zM448 160v-32h-64v32h64zm0 96v-32h-64v32h64zm0 96v-32h-64v32h64z"/>
          </svg>
          <div class="city-tooltip">${city.name}</div>
        `;
        
        pin.style.left = `${(city.x / MAP_ORIGINAL_W) * 100}%`;
        pin.style.top = `${(city.y / MAP_ORIGINAL_H) * 100}%`;

        pin.addEventListener('click', (e) => {
          if (MapEngine.hasDragged) return;

          e.stopPropagation(); SoundEngine.play('tick');
          document.getElementById('dossier-title').textContent = city.name; 
          document.getElementById('dossier-pop').textContent = city.pop; 
          document.getElementById('dossier-desc').textContent = city.desc;
          
          if (city.imageUrl && dossierImageElement) {
              dossierImageElement.src = city.imageUrl;
              dossierImageElement.alt = city.imageAlt || city.name;
              dossierImageElement.style.display = 'block';
          } else if (dossierImageElement) {
              dossierImageElement.style.display = 'none';
          }
          this.cityDossier.classList.remove('hidden');
        });
        cityPinsContainer.appendChild(pin);
      });
    },
  
    setupLoadingScreen() {
      const loadingScreen = document.getElementById('loading-screen');
      const loaderFill = document.getElementById('loading-bar-fill');
      const loaderContainer = document.getElementById('loading-bar-container');
      const enterBtn = document.getElementById('enter-map-btn');
      const images = document.querySelectorAll('img'); 
      
      let loadedCount = 0; const totalImages = images.length;
      const updateLoading = () => {
        loadedCount++; if (loaderFill) loaderFill.style.width = `${(loadedCount / totalImages) * 100}%`;
        if (loadedCount === totalImages) {
          setTimeout(() => {
            loaderContainer.style.opacity = '0';
            setTimeout(() => { loaderContainer.style.display = 'none'; enterBtn.classList.remove('hidden'); }, 400);
          }, 500);
        }
      };
      images.forEach(img => { if (img.complete) updateLoading(); else { img.addEventListener('load', updateLoading); img.addEventListener('error', updateLoading); } });
      
      enterBtn.addEventListener('click', () => { 
        SoundEngine.init(); SoundEngine.play('swoosh'); loadingScreen.style.opacity = '0'; setTimeout(() => loadingScreen.remove(), 800); 
        setTimeout(() => {
          const callout = document.getElementById('donation-callout');
          const btn = document.getElementById('donation-btn');
          callout.classList.add('show'); btn.classList.add('pulsing'); SoundEngine.play('tick');
          setTimeout(() => { callout.classList.remove('show'); btn.classList.remove('pulsing'); }, 8000);
        }, 2000); 
      });
    },

    // 🔥 NEW: Tab Switch Wake-Up Manager
    setupVisibilityHandler() {
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                // If a wake mask is already running, don't spawn another one
                if (document.getElementById('wake-mask')) return;

                // Create a temporary dark mask
                const wakeMask = document.createElement('div');
                wakeMask.id = 'wake-mask';
                wakeMask.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100dvh; background: #0f172a; z-index: 999999; display: flex; align-items: center; justify-content: center; opacity: 1; transition: opacity 0.6s ease;';
                
                // Add the pulsing logo to it
                const logo = document.createElement('img');
                logo.src = DashboardData.images.watermark;
                logo.style.cssText = 'width: 150px; height: auto; animation: pulseLogo 1.5s infinite alternate;';
                
                wakeMask.appendChild(logo);
                document.body.appendChild(wakeMask);
                
                // Give the browser roughly 1 second to load memory back into the GPU before fading out
                setTimeout(() => {
                    wakeMask.style.opacity = '0';
                    setTimeout(() => wakeMask.remove(), 600);
                }, 900);
            }
        });
    },
  
    updateLayerVisibility(country, visible) { 
      document.querySelectorAll(`[data-country="${country}"]`).forEach(el => el.classList.toggle('visible', visible)); 
    },
  
    updateCityVisibility() {
      const checkboxes = document.querySelectorAll('.checkbox-label input[data-layer]');
      const allPins = document.querySelectorAll('.city-pin');
      const checkedBoxes = Array.from(checkboxes).filter(cb => cb.checked);
      if (checkedBoxes.length === 0) {
        allPins.forEach(pin => pin.classList.add('dimmed'));
      } else {
        const activeCountries = checkedBoxes.map(cb => cb.dataset.layer);
        allPins.forEach(pin => {
          if (activeCountries.includes(pin.getAttribute('data-country'))) pin.classList.remove('dimmed');
          else pin.classList.add('dimmed');
        });
      }
    },
  
    highlightCrossBorder(ethnicName) {
      const checkboxes = document.querySelectorAll('.checkbox-label input[data-layer]');
      checkboxes.forEach(cb => { cb.checked = false; this.updateLayerVisibility(cb.dataset.layer, false); });
      let found = 0;
      Object.keys(this.demographicData).forEach(country => {
        if (this.demographicData[country].some(d => d.name === ethnicName)) {
          document.querySelector(`input[data-layer="${country}"]`).checked = true;
          this.updateLayerVisibility(country, true); found++;
        }
      });
      if (found > 0) {
        document.getElementById('top-title-text').textContent = ethnicName; 
        document.getElementById('top-title-banner').classList.remove('hidden');
        document.getElementById('info-panel').classList.remove('active'); 
        MapEngine.resetView(); 
        SoundEngine.play('swoosh'); 
        this.updateCityVisibility();
      }
    },
  
    hideTopBanner() { 
      const banner = document.getElementById('top-title-banner');
      if (banner && !banner.classList.contains('hidden')) banner.classList.add('hidden'); 
    },
  
    showInfoPanel(country) {
      const data = this.demographicData[country]; if (!data) return;
      const hebrewName = this.countryNamesHebrew[country] || country;
      let html = `<h3>${DashboardData.ui.demographicsTitle} - ${hebrewName}</h3>`;
      
      const radius = 15.9155; 
      let svg = `<div class="donut-container"><svg viewBox="0 0 100 100" class="donut-chart">`;
      let cumulativePercent = 0;
  
      data.forEach(item => {
          const strokeDasharray = `${item.percent} ${100 - item.percent}`;
          const strokeDashoffset = 100 - cumulativePercent;
          svg += `<circle class="donut-slice" r="${radius}" cx="50" cy="50" fill="transparent" 
                  stroke="${item.color}" stroke-width="12" stroke-dasharray="${strokeDasharray}" 
                  stroke-dashoffset="${strokeDashoffset}" data-ethnic="${item.name}">
                  <title>${item.name}: ${item.percent}%</title></circle>`;
          cumulativePercent += item.percent;
      });
      svg += `</svg></div>`; html += svg;
  
      data.forEach(item => {
        html += `<div class="demo-item" data-ethnic="${item.name}" title="לחץ לראות תפוצה אזורית">
            <div class="demo-label"><span>${item.name}</span><span dir="ltr">${item.percent}%</span></div>
            <div class="demo-bar-bg"><div class="demo-bar-fill" style="--target-width: ${item.percent}%; background-color: ${item.color};"></div></div>
          </div>`;
      });
  
      const infoContent = document.getElementById('info-panel-content');
      infoContent.innerHTML = html;
      infoContent.querySelectorAll('.demo-item, .donut-slice').forEach(el => el.addEventListener('click', () => {
          SoundEngine.play('tick'); this.highlightCrossBorder(el.dataset.ethnic);
      }));
      
      const infoPanel = document.getElementById('info-panel');
      if (!infoPanel.classList.contains('active')) SoundEngine.play('tick'); 
      infoPanel.classList.add('active');
    },
  
    handleUrlHash() { 
      const hash = window.location.hash.substring(1); 
      if (hash && UI.countryViews[hash]) { 
        const option = document.querySelector(`.custom-option[data-value="${hash}"]`); 
        if (option) option.click(); 
      } 
    },
  
    setupEventListeners() {
      const dropdownText = document.getElementById('custom-select-text');
      const infoPanel = document.getElementById('info-panel');
  
      document.getElementById('donation-btn').addEventListener('click', () => { SoundEngine.play('tick'); });
      document.getElementById('close-dossier-btn').addEventListener('click', () => { SoundEngine.play('tick'); this.cityDossier.classList.add('hidden'); });
      document.getElementById('compass-btn').addEventListener('click', () => { SoundEngine.play('swoosh'); MapEngine.resetView(); });
      document.getElementById('close-title-btn').addEventListener('click', () => { SoundEngine.play('tick'); document.getElementById('clear-map-btn').click(); });
      
      document.querySelector('.custom-select-trigger').addEventListener('click', (e) => { 
        e.stopPropagation(); document.getElementById('country-dropdown').classList.toggle('open'); SoundEngine.play('tick'); 
      });
      
      document.querySelectorAll('.custom-option').forEach(opt => {
        opt.addEventListener('click', () => {
          SoundEngine.play('tick'); this.hideTopBanner(); this.cityDossier.classList.add('hidden'); 
          dropdownText.textContent = opt.textContent;
          window.history.replaceState(null, null, '#' + opt.dataset.value);
          
          document.querySelectorAll('.checkbox-label input[data-layer]').forEach(cb => { 
              cb.checked = false; this.updateLayerVisibility(cb.dataset.layer, false); 
          });
          document.querySelector(`input[data-layer="${opt.dataset.value}"]`).checked = true; 
          this.updateLayerVisibility(opt.dataset.value, true);
  
          this.showInfoPanel(opt.dataset.value); 
          MapEngine.flyToView(opt.dataset.value);
          this.updateCityVisibility();
  
          if (window.innerWidth <= 768) { document.querySelector('.sidebar').classList.add('collapsed'); }
        });
      });
  
      document.querySelectorAll('.checkbox-label input[data-layer]').forEach(cb => {
        cb.addEventListener('change', () => {
          SoundEngine.play('tick'); this.hideTopBanner(); this.cityDossier.classList.add('hidden'); 
          this.updateLayerVisibility(cb.dataset.layer, cb.checked);
          
          if (cb.checked) { 
            window.history.replaceState(null, null, '#' + cb.dataset.layer);
            const opt = document.querySelector(`.custom-option[data-value="${cb.dataset.layer}"]`); 
            if (opt) dropdownText.textContent = opt.textContent;
          } else { 
            const anyChecked = Array.from(document.querySelectorAll('.checkbox-label input[data-layer]')).some(c => c.checked);
            if (!anyChecked) { 
              infoPanel.classList.remove('active'); dropdownText.textContent = DashboardData.ui.defaultDropdownText; window.history.replaceState(null, null, ' '); 
            } 
          }
          this.updateCityVisibility();
        });
      });
  
      document.getElementById('clear-map-btn').addEventListener('click', () => { 
        SoundEngine.play('tick'); this.hideTopBanner(); this.cityDossier.classList.add('hidden'); 
        document.querySelectorAll('.checkbox-label input[data-layer]').forEach(cb => { cb.checked = false; this.updateLayerVisibility(cb.dataset.layer, false); }); 
        dropdownText.textContent = DashboardData.ui.defaultDropdownText; infoPanel.classList.remove('active'); window.history.replaceState(null, null, ' '); MapEngine.resetView(); this.updateCityVisibility(); 
      });
  
      document.getElementById('select-all-btn').addEventListener('click', () => { 
        SoundEngine.play('tick'); 
        this.hideTopBanner(); 
        this.cityDossier.classList.add('hidden'); 
        dropdownText.textContent = DashboardData.ui.selectAllBtn; 
        infoPanel.classList.remove('active'); 
        window.history.replaceState(null, null, ' '); 
        MapEngine.resetView(); 
        
        const allCheckboxes = Array.from(document.querySelectorAll('.checkbox-label input[data-layer]'));
        
        allCheckboxes.forEach((cb, index) => {
            setTimeout(() => {
                cb.checked = true; 
                this.updateLayerVisibility(cb.dataset.layer, true);
                
                if (index === allCheckboxes.length - 1) {
                    this.updateCityVisibility();
                }
            }, index * 50); 
        });
      });
  
      document.getElementById('theme-toggle-btn').addEventListener('click', () => { 
        document.body.classList.toggle('night-mode'); SoundEngine.play('tick'); 
        document.getElementById('theme-toggle-btn').textContent = document.body.classList.contains('night-mode') ? '☀️' : '🌙'; 
      });
  
      document.getElementById('toggle-sidebar-btn').addEventListener('click', () => { 
        document.querySelector('.sidebar').classList.toggle('collapsed'); SoundEngine.play('swoosh'); 
      });
  
      document.getElementById('close-info-btn').addEventListener('click', () => { 
        infoPanel.classList.remove('active'); SoundEngine.play('tick'); 
      });
      
      if (window.innerWidth < 1024) document.querySelector('.sidebar').classList.add('collapsed');
    }
};
  
// ==========================================
// 🚀 APPLICATION BOOTSTRAP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
    MapEngine.init();
    MapEngine.applyTransform(); 
    UI.updateCityVisibility();
    setTimeout(() => UI.handleUrlHash(), 200);
});