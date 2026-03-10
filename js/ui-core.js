// ==========================================
// 💻 UI CORE STATE & DATA INJECTION
// ==========================================
window.UI = {
  DEBUG_MODE: false,
  countryViews: {}, demographicData: {}, countryNamesHebrew: {},
  windowZIndex: 2500, 

  // Global References
  cachedVisibleLayers: [],
  cachedCheckboxes: [],
  domUpdateScheduled: false,

  init() {
    this.buildDebugPanel();
    this.injectData();
    this.setupLoadingScreen();
    this.setupEventListeners();
    this.setupPerformanceMonitor();
    this.setupVisibilityHandler();
  },

  updateLayerVisibility(country, visible) {
    document.querySelectorAll(`[data-country="${country}"]`).forEach(el => el.classList.toggle('visible', visible));
    this.scheduleDOMUpdates();
  },

  scheduleDOMUpdates() {
    if (this.domUpdateScheduled) return;
    this.domUpdateScheduled = true;

    requestAnimationFrame(() => {
      this.updateCachedVisibleLayers();
      this.performCityVisibilityUpdate();
      this.domUpdateScheduled = false;
    });
  },

  updateCachedVisibleLayers() {
    this.cachedVisibleLayers = Array.from(document.querySelectorAll('.map-ethnic.visible')).reverse();
  },

  updateCityVisibility() {
    this.scheduleDOMUpdates();
  },

  performCityVisibilityUpdate() {
    const allPins = window.MapEngine ? MapEngine.cityPins : document.querySelectorAll('.city-pin');
    const checkedBoxes = this.cachedCheckboxes.filter(cb => cb.checked);
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

  injectData() {
    document.getElementById('loading-logo').src = DashboardData.images.watermark;
    document.getElementById('base-map-img').src = DashboardData.images.baseMap;
    document.getElementById('borders-img').src = DashboardData.images.borders;
    document.getElementById('minimap-bg').src = DashboardData.images.minimapBg;

    document.getElementById('sidebar-main-title').textContent = DashboardData.ui.mainTitle;
    document.getElementById('custom-select-text').textContent = DashboardData.ui.defaultDropdownText;
    document.getElementById('sidebar-dropdown-label').textContent = DashboardData.ui.dropdownLabel;
    document.getElementById('sidebar-checkboxes-label').textContent = DashboardData.ui.ethnicLayersTitle;
    document.getElementById('clear-map-btn').textContent = DashboardData.ui.clearMapBtn;

    document.getElementById('welcome-title').textContent = DashboardData.ui.welcomeTitle;
    document.getElementById('welcome-desc').innerHTML = DashboardData.ui.welcomeDesc;

    document.getElementById('donation-btn').href = DashboardData.ui.donationLink;
    document.getElementById('callout-title-text').textContent = DashboardData.ui.donationTooltip;

    document.getElementById('powered-by-prefix').textContent = DashboardData.ui.poweredByPrefix;
    document.getElementById('powered-by-brand').textContent = DashboardData.ui.poweredByBrand;

    const devBadge = document.getElementById('development-badge');
    if (DashboardData.ui.showUnderDevelopment) {
      document.getElementById('development-text').textContent = DashboardData.ui.underDevelopmentText;
      const versionTextEl = document.getElementById('version-text');
      if (versionTextEl) versionTextEl.textContent = DashboardData.ui.versionText || 'Alpha';
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
        img.setAttribute('data-country', key); img.draggable = false;
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

      const wrapper = document.createElement('div');
      wrapper.className = 'sidebar-item-wrapper';

      const lbl = document.createElement('label');
      lbl.className = 'checkbox-label';
      lbl.innerHTML = `<input type="checkbox" data-layer="${key}"><span class="checkbox-custom"></span>${data.hebrewName}`;
      wrapper.appendChild(lbl);

      const infoBtn = document.createElement('button');
      infoBtn.className = 'sidebar-info-btn';
      infoBtn.title = `הצג מידע על ${data.hebrewName}`;
      infoBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        `;
      infoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showInfoPanel(key);

        if (window.innerWidth <= 768) {
          const sidebar = document.querySelector('.sidebar');
          if (sidebar) sidebar.classList.add('collapsed');
        }
      });
      wrapper.appendChild(infoBtn);

      checkboxesContainer.appendChild(wrapper);
    });

    const MAP_ORIGINAL_W = 6194;
    const MAP_ORIGINAL_H = 3876;
    const cityPinsContainer = document.getElementById('city-pins');

    DashboardData.cities.forEach(city => {
      const pin = document.createElement('div');
      pin.className = 'city-pin';
      pin.setAttribute('data-country', city.country);
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

        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          document.querySelectorAll('.dynamic-dossier').forEach(el => el.remove());
          const sidebar = document.querySelector('.sidebar');
          if (sidebar && !sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('collapsed');
          }
          const infoP = document.getElementById('info-panel');
          if (infoP) infoP.classList.add('hidden-by-dossier');
        } else {
          const existing = document.getElementById(`city-dossier-${city.name}`);
          if (existing) { UI.bringToFront(existing); return; }
        }

        const dossier = document.createElement('div');
        dossier.id = `city-dossier-${city.name}`;
        dossier.className = 'glass-panel dossier-panel dynamic-dossier active';

        if (!isMobile) {
          const offset = (document.querySelectorAll('.dynamic-dossier').length * 30) % 150;
          dossier.style.top = `calc(50% + ${offset}px)`;
          dossier.style.left = `calc(50% + ${offset}px)`;
          dossier.style.transform = 'translate(-50%, -50%)';
        }

        dossier.innerHTML = `
              <button class="close-info-btn" onclick="
                  this.parentElement.remove(); 
                  SoundEngine.play('tick');
                  if(window.innerWidth <= 768) {
                      const p = document.getElementById('info-panel');
                      if(p) p.classList.remove('hidden-by-dossier');
                  }
              ">&times;</button>
              <h2 class="dossier-drag-handle" style="cursor: grab;">${city.name}</h2>
              <div class="dossier-stats"><span class="stat-label">${DashboardData.ui.populationLabel}</span><span class="stat-value">${city.pop}</span></div>
              <img class="dossier-image" src="${city.imageUrl}" alt="${city.imageAlt || city.name}" style="display: ${city.imageUrl ? 'block' : 'none'};">
              <p class="dossier-desc">${city.desc}</p>
          `;

        document.body.appendChild(dossier);
        UI.bringToFront(dossier);
        dossier.addEventListener('mousedown', () => UI.bringToFront(dossier));

        const handle = dossier.querySelector('.dossier-drag-handle');
        UI.makeDraggable(dossier, handle);
      });
      cityPinsContainer.appendChild(pin);
    });

    this.cachedCheckboxes = Array.from(document.querySelectorAll('.checkbox-label input[data-layer]'));
    this.updateCachedVisibleLayers();
  },

  setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderFill = document.getElementById('loading-bar-fill');
    const loaderContainer = document.getElementById('loading-bar-container');
    const percentText = document.getElementById('loading-percentage');
    const enterBtn = document.getElementById('enter-map-btn');

    // 🔥 Elements for pure JS Parallax Math
    const networkBg = document.getElementById('network-bg');
    const raysContainer = document.getElementById('rays-container');
    const globeContainer = document.getElementById('globe-container');

    loadingScreen.addEventListener('mousemove', (e) => {
      if (window.innerWidth > 768) {
        // Calculate relative mouse position (-1 to 1) from the center of screen
        const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
        
        // Pass spotlight coordinate variables to CSS
        loadingScreen.style.setProperty('--mouse-x', xPos);
        loadingScreen.style.setProperty('--mouse-y', yPos);

        // 1. Move the center of the rays towards the mouse (This makes them point at cursor!)
        if (raysContainer) {
          raysContainer.style.transform = `translate(${xPos * 70}px, ${yPos * 70}px)`;
        }
        
        // 2. Move the globe in the opposite direction to create massive depth
        if (globeContainer) {
          globeContainer.style.transform = `translate(calc(-50% + ${xPos * -35}px), calc(-50% + ${yPos * -35}px))`;
        }

        // 3. Tilt the entire 3D background wrapper towards the mouse
        if (networkBg) {
          networkBg.style.transform = `perspective(1000px) rotateX(${yPos * -8}deg) rotateY(${xPos * 8}deg)`;
        }
      }
    });

    const images = Array.from(document.querySelectorAll('img')).filter(img => img.src && img.src !== window.location.href);
    let loadedCount = 0; const totalImages = images.length || 1;

    const finalizeLoading = () => {
      if (loaderFill) loaderFill.style.width = `100%`;
      if (percentText) percentText.textContent = `100%`;
      setTimeout(() => {
        if (loaderContainer) loaderContainer.style.opacity = '0';
        if (percentText) percentText.style.opacity = '0';
        setTimeout(() => {
          if (loaderContainer) loaderContainer.style.display = 'none';
          if (percentText) percentText.style.display = 'none';
          if (enterBtn) enterBtn.classList.remove('hidden');
        }, 400);
      }, 500);
    };

    const updateLoading = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / totalImages) * 100);

      if (loaderFill) loaderFill.style.width = `${pct}%`;
      if (percentText) percentText.textContent = `${pct}%`;

      if (loadedCount >= totalImages) { finalizeLoading(); }
    };

    if (images.length === 0) {
      finalizeLoading();
    } else {
      images.forEach(img => {
        if (img.complete) { updateLoading(); } else { img.addEventListener('load', updateLoading); img.addEventListener('error', updateLoading); }
      });
    }

    setTimeout(() => {
      if (enterBtn && enterBtn.classList.contains('hidden')) { finalizeLoading(); }
    }, 5000);

    if (enterBtn) {
      enterBtn.addEventListener('click', () => {
        SoundEngine.init(); SoundEngine.play('swoosh');
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.remove(), 800);
        setTimeout(() => {
          const callout = document.getElementById('donation-callout');
          const btn = document.getElementById('donation-btn');
          if (callout && btn) {
            callout.classList.add('show'); btn.classList.add('pulsing'); SoundEngine.play('chime');
            setTimeout(() => { callout.classList.remove('show'); btn.classList.remove('pulsing'); }, 8000);
          }
        }, 2000);
      });
    }
  },

  setupVisibilityHandler() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        if (document.getElementById('wake-mask')) return;
        const wakeMask = document.createElement('div');
        wakeMask.id = 'wake-mask';
        wakeMask.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100dvh; background: #0f172a; z-index: 999999; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 1; transition: opacity 0.5s ease;';
        wakeMask.innerHTML = `
                    <img src="${DashboardData.images.watermark}" style="width: 150px; margin-bottom: 24px; animation: pulseLogo 1.5s infinite alternate;">
                    <div style="width: 220px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                        <div id="wake-bar-fill" style="height: 100%; width: 0%; background: #6366f1; transition: width 0.08s linear;"></div>
                    </div>
                    <div id="wake-bar-text" style="color: #94a3b8; font-size: 0.85rem; font-weight: 700; font-family: monospace; margin-top: 10px; letter-spacing: 1px;">0%</div>
                `;
        document.body.appendChild(wakeMask);
        let progress = 0;
        const barFill = document.getElementById('wake-bar-fill');
        const barText = document.getElementById('wake-bar-text');
        const wakeInterval = setInterval(() => {
          progress += Math.floor(Math.random() * 15) + 5;
          if (progress >= 100) {
            progress = 100;
            clearInterval(wakeInterval);
            setTimeout(() => { wakeMask.style.opacity = '0'; setTimeout(() => wakeMask.remove(), 500); }, 150);
          }
          barFill.style.width = `${progress}%`; barText.textContent = `${progress}%`;
        }, 40);
      }
    });
  }
};