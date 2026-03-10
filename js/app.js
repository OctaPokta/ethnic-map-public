// ==========================================
// 💻 UI & APPLICATION CONTROLLER
// ==========================================
const UI = {
  DEBUG_MODE: false,
  countryViews: {}, demographicData: {}, countryNamesHebrew: {},
  windowZIndex: 2500, // Tracks active windows so clicking brings them to front

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

  // Brings a clicked window to the very front
  bringToFront(element) {
    this.windowZIndex++;
    element.style.zIndex = this.windowZIndex;
  },

  // Master Drag-and-Drop Engine (PC ONLY)
  makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    handle.onmousedown = (e) => {
      if (window.innerWidth <= 768) return;
      if (e.target.tagName === 'BUTTON') return;

      e.preventDefault();
      this.bringToFront(element);

      // 🔥 FIX: Instantly kill transitions before calculating the box coordinates to prevent teleportation!
      element.style.transition = 'none';

      // Read the exact physical pixel location of the element on the screen
      const rect = element.getBoundingClientRect();

      // If the element is centered via CSS transforms, lock it to pure pixels before moving
      if (window.getComputedStyle(element).transform !== 'none') {
        element.style.left = rect.left + "px";
        element.style.top = rect.top + "px";
        element.style.transform = 'none';
      }

      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDrag;
      document.onmousemove = elementDrag;
      handle.style.cursor = 'grabbing';
    };

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
      pos3 = e.clientX; pos4 = e.clientY;

      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDrag() {
      document.onmouseup = null; document.onmousemove = null;
      handle.style.cursor = 'grab';
    }
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

  setupPerformanceMonitor() {
    const smoothLoader = document.createElement('div');
    smoothLoader.id = 'smooth-fps-loader';
    smoothLoader.style.cssText = `
        position: fixed; top: 2.5rem; left: 50%; transform: translateX(-50%) translateY(-20px);
        background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(99, 102, 241, 0.4);
        color: #e2e8f0; padding: 8px 16px; border-radius: 30px; font-size: 0.85rem; font-weight: 600;
        display: flex; align-items: center; gap: 10px; z-index: 999999;
        opacity: 0; visibility: hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      `;
    smoothLoader.innerHTML = `
        <div style="width: 14px; height: 14px; border: 2px solid #6366f1; border-top-color: transparent; border-radius: 50%; animation: spinLoader 0.8s linear infinite;"></div>
        <span style="letter-spacing: 0.5px;">מעבד נתונים...</span>
      `;
    document.body.appendChild(smoothLoader);

    const style = document.createElement('style');
    style.innerHTML = `@keyframes spinLoader { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);

    let fpsPanel = null;
    if (this.DEBUG_MODE) {
      fpsPanel = document.createElement('div');
      fpsPanel.style.cssText = `
          position: fixed; top: 90px; left: 30px; background: rgba(15, 23, 42, 0.9); color: #00ffcc;
          padding: 8px 14px; border-radius: 8px; font-family: monospace; font-size: 16px; font-weight: bold;
          z-index: 999999; pointer-events: none; border: 1px solid #00ffcc; direction: ltr; box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        `;
      document.body.appendChild(fpsPanel);
    }

    let lastFrameTime = performance.now();
    let secondStart = lastFrameTime;
    let frames = 0; let lagSpikeCount = 0;

    let isLoaderVisible = false;

    const renderLoop = (now) => {
      const delta = now - lastFrameTime;
      lastFrameTime = now;
      frames++;

      if (delta > 45) { lagSpikeCount += 2; } else { lagSpikeCount = Math.max(0, lagSpikeCount - 1); }

      if (lagSpikeCount > 4 && !isLoaderVisible) {
        isLoaderVisible = true;
        smoothLoader.style.opacity = '1'; smoothLoader.style.visibility = 'visible'; smoothLoader.style.transform = 'translateX(-50%) translateY(0)';
      } else if (lagSpikeCount === 0 && isLoaderVisible) {
        isLoaderVisible = false;
        smoothLoader.style.opacity = '0'; smoothLoader.style.visibility = 'hidden'; smoothLoader.style.transform = 'translateX(-50%) translateY(-20px)';
      }

      if (now >= secondStart + 1000) {
        if (fpsPanel) {
          fpsPanel.innerText = `FPS: ${frames}`;
          if (frames >= 45) fpsPanel.style.color = "#00ffcc";
          else if (frames >= 30) fpsPanel.style.color = "#fbbf24";
          else fpsPanel.style.color = "#ef4444";
        }
        frames = 0; secondStart = now;
      }
      requestAnimationFrame(renderLoop);
    };
    requestAnimationFrame(renderLoop);
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
              <button class="close-info-btn" onclick="this.parentElement.remove(); SoundEngine.play('tick');">&times;</button>
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

    // Cache global DOM references to avoid querySelectorAll during interactions
    this.cachedCheckboxes = Array.from(document.querySelectorAll('.checkbox-label input[data-layer]'));
    this.updateCachedVisibleLayers();
  },

  updateCachedVisibleLayers() {
    this.cachedVisibleLayers = Array.from(document.querySelectorAll('.map-ethnic.visible')).reverse();
  },

  setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderFill = document.getElementById('loading-bar-fill');
    const loaderContainer = document.getElementById('loading-bar-container');
    const percentText = document.getElementById('loading-percentage');
    const enterBtn = document.getElementById('enter-map-btn');

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

  highlightCrossBorder(ethnicName) {
    this.cachedCheckboxes.forEach(cb => { cb.checked = false; this.updateLayerVisibility(cb.dataset.layer, false); });
    let found = 0;
    let ethnicDataObj = null;

    Object.keys(this.demographicData).forEach(country => {
      const ethnicData = this.demographicData[country].find(d => d.name === ethnicName);
      if (ethnicData) {
        document.querySelector(`input[data-layer="${country}"]`).checked = true;
        this.updateLayerVisibility(country, true);
        found++;
        if (!ethnicDataObj) ethnicDataObj = ethnicData;
      }
    });

    if (found > 0) {
      MapEngine.resetView();
      SoundEngine.play('swoosh');
      this.updateCityVisibility();

      if (ethnicDataObj) {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          document.querySelectorAll('.dynamic-dossier').forEach(el => el.remove());
          const sidebar = document.querySelector('.sidebar');
          if (sidebar) sidebar.classList.add('collapsed');
        } else {
          const existing = document.getElementById(`dossier-${ethnicDataObj.name}`);
          if (existing) { UI.bringToFront(existing); return; }
        }

        const dossier = document.createElement('div');
        dossier.id = `dossier-${ethnicDataObj.name}`;
        dossier.className = 'glass-panel dossier-panel dynamic-dossier active';

        if (!isMobile) {
          const offset = (document.querySelectorAll('.dynamic-dossier').length * 30) % 150;
          dossier.style.top = `calc(50% + ${offset}px)`;
          dossier.style.left = `calc(50% + ${offset}px)`;
          dossier.style.transform = 'translate(-50%, -50%)';
        }

        let badgesHtml = '';
        if (ethnicDataObj.language || ethnicDataObj.religion) {
          badgesHtml = `<div class="ethnic-badges">`;
          if (ethnicDataObj.language) badgesHtml += `<span class="ethnic-badge">🗣️ ${ethnicDataObj.language}</span>`;
          if (ethnicDataObj.religion) badgesHtml += `<span class="ethnic-badge">🕌 ${ethnicDataObj.religion}</span>`;
          badgesHtml += `</div>`;
        }

        dossier.innerHTML = `
                <button class="close-info-btn" onclick="this.parentElement.remove(); SoundEngine.play('tick');">&times;</button>
                <h2 class="dossier-drag-handle" style="margin-bottom: 1rem; color: #fff; font-size: 1.8rem; cursor: grab;">${ethnicDataObj.name}</h2>
                <img class="dossier-image" src="${ethnicDataObj.image || ''}" alt="Ethnicity photo" style="max-height: 250px; width: 100%; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.6); display: ${ethnicDataObj.image ? 'block' : 'none'};">
                ${badgesHtml}
                <p class="dossier-desc" style="margin-top: 1rem; font-size: 1rem; line-height: 1.6;">${ethnicDataObj.desc || `הצגת תפוצה אזורית עבור ${ethnicDataObj.name} על גבי המפה.`}</p>
            `;

        document.body.appendChild(dossier);
        UI.bringToFront(dossier);
        dossier.addEventListener('mousedown', () => UI.bringToFront(dossier));

        const handle = dossier.querySelector('.dossier-drag-handle');
        UI.makeDraggable(dossier, handle);
      }
    }
  },

  showInfoPanel(country) {
    const data = this.demographicData[country]; if (!data) return;
    const hebrewName = this.countryNamesHebrew[country] || country;
    let html = `<h3 class="info-drag-handle" style="cursor: grab;">${DashboardData.ui.demographicsTitle} - ${hebrewName}</h3>`;

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
    if (!infoPanel.classList.contains('active')) {
      SoundEngine.play('tick');
      infoPanel.style.transform = '';
      infoPanel.style.top = '';
      infoPanel.style.left = '';
    }
    infoPanel.classList.add('active');
    this.bringToFront(infoPanel);

    const handle = infoContent.querySelector('.info-drag-handle');
    if (handle) {
      infoPanel.addEventListener('mousedown', () => this.bringToFront(infoPanel));
      this.makeDraggable(infoPanel, handle);
    }
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

    document.getElementById('donation-btn').addEventListener('mouseenter', () => { SoundEngine.play('coffee-hover'); });
    document.getElementById('donation-btn').addEventListener('click', () => { SoundEngine.play('chime'); });
    document.getElementById('compass-btn').addEventListener('click', () => { SoundEngine.play('swoosh'); MapEngine.resetView(); });

    document.querySelector('.custom-select-trigger').addEventListener('click', (e) => {
      e.stopPropagation(); document.getElementById('country-dropdown').classList.toggle('open'); SoundEngine.play('tick');
    });

    document.querySelectorAll('.custom-option').forEach(opt => {
      opt.addEventListener('click', () => {
        SoundEngine.play('tick');

        document.querySelectorAll('.dynamic-dossier').forEach(el => el.remove());

        dropdownText.textContent = opt.textContent;
        window.history.replaceState(null, null, '#' + opt.dataset.value);

        this.cachedCheckboxes.forEach(cb => {
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

    this.cachedCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        SoundEngine.play('tick');
        document.querySelectorAll('.dynamic-dossier').forEach(el => el.remove());

        this.updateLayerVisibility(cb.dataset.layer, cb.checked);

        if (cb.checked) {
          window.history.replaceState(null, null, '#' + cb.dataset.layer);
          const opt = document.querySelector(`.custom-option[data-value="${cb.dataset.layer}"]`);
          if (opt) dropdownText.textContent = opt.textContent;

          this.showInfoPanel(cb.dataset.layer);

          // 🔥 Auto-close sidebar on mobile to reveal the info panel
          if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.add('collapsed');
          }
        } else {
          const anyChecked = this.cachedCheckboxes.some(c => c.checked);
          if (!anyChecked) {
            infoPanel.style.transform = ''; infoPanel.style.transition = ''; infoPanel.classList.remove('active'); setTimeout(() => { infoPanel.style.top = ''; infoPanel.style.left = ''; }, 500);
            dropdownText.textContent = DashboardData.ui.defaultDropdownText; window.history.replaceState(null, null, ' ');
          }
        }
        this.updateCityVisibility();
      });
    });

    document.getElementById('clear-map-btn').addEventListener('click', () => {
      SoundEngine.play('tick');
      document.querySelectorAll('.dynamic-dossier').forEach(el => el.remove());

      this.cachedCheckboxes.forEach(cb => { cb.checked = false; this.updateLayerVisibility(cb.dataset.layer, false); });
      dropdownText.textContent = DashboardData.ui.defaultDropdownText;
      infoPanel.style.transform = ''; infoPanel.style.transition = ''; infoPanel.classList.remove('active'); setTimeout(() => { infoPanel.style.top = ''; infoPanel.style.left = ''; }, 500);
      window.history.replaceState(null, null, ' '); MapEngine.resetView(); this.updateCityVisibility();
    });

    document.getElementById('mute-toggle-btn').addEventListener('click', (e) => {
      SoundEngine.isMuted = !SoundEngine.isMuted;
      e.currentTarget.textContent = SoundEngine.isMuted ? '🔇' : '🔊';
      if (!SoundEngine.isMuted) SoundEngine.play('tick');
    });

    document.getElementById('theme-toggle-btn').addEventListener('click', () => {
      document.body.classList.toggle('night-mode'); SoundEngine.play('tick');
      document.getElementById('theme-toggle-btn').textContent = document.body.classList.contains('night-mode') ? '☀️' : '🌙';
    });

    document.getElementById('toggle-sidebar-btn').addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('collapsed'); SoundEngine.play('swoosh');
    });

    document.getElementById('close-info-btn').addEventListener('click', () => {
      infoPanel.style.transform = '';
      infoPanel.style.transition = '';
      infoPanel.classList.remove('active');
      SoundEngine.play('tick');
      setTimeout(() => { infoPanel.style.top = ''; infoPanel.style.left = ''; }, 500);
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