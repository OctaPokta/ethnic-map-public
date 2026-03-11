// ==========================================
// 🏗️ DOM BUILDER (HTML INJECTION)
// ==========================================
Object.assign(window.UI, {

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
      if (versionTextEl) {
        versionTextEl.textContent = DashboardData.ui.versionText || 'Alpha';
        if (DashboardData.ui.releaseNotesLink) versionTextEl.href = DashboardData.ui.releaseNotesLink;
      }
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
        if (window.matchMedia("(max-width: 950px)").matches) {
          const sidebar = document.querySelector('.sidebar');
          if (sidebar) sidebar.classList.add('collapsed');
        }
      });
      wrapper.appendChild(infoBtn);

      wrapper.addEventListener('click', (e) => {
          if (e.target.closest('.sidebar-info-btn')) return; 
          const isMobile = window.matchMedia("(max-width: 950px)").matches;
          if (isMobile) {
              const count = this.cachedCheckboxes.filter(c => c.checked).length;
              const input = wrapper.querySelector('input');
              if (!input.checked && count >= 5) {
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  this.showMobileToast("ניתן לבחור עד 5 מדינות במקביל בטלפון. לחוויה מלאה, השתמשו במחשב.");
              }
          }
      }, true); 

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

        const isMobile = window.matchMedia("(max-width: 950px)").matches;
        if (isMobile) {
          document.querySelectorAll('.dynamic-dossier').forEach(el => el.remove());
          const sidebar = document.querySelector('.sidebar');
          if (sidebar && !sidebar.classList.contains('collapsed')) sidebar.classList.add('collapsed');
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
                  if(window.matchMedia('(max-width: 950px)').matches) {
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
        if (typeof window.UI.makeDraggable === 'function') window.UI.makeDraggable(dossier, handle);
      });
      cityPinsContainer.appendChild(pin);
    });

    const regionalGrid = document.getElementById('regional-ethnic-grid');
    const container = document.getElementById('regional-layers-container');
    const clearRegionalBtn = document.getElementById('clear-regional-btn');

    if (DashboardData.regionalEthnicities) {
        DashboardData.regionalEthnicities.forEach(eth => {
            const btn = document.createElement('div');
            btn.className = 'regional-grid-item';
            btn.innerHTML = `<span>${eth.name}</span>`;
            
            btn.addEventListener('click', () => {
                SoundEngine.play('tick');
                const isMobile = window.matchMedia("(max-width: 950px)").matches;
                const isActive = btn.classList.contains('active');
                
                if (isMobile) {
                    document.querySelectorAll('.regional-grid-item').forEach(el => el.classList.remove('active'));
                    Array.from(container.children).forEach(layer => {
                        layer.classList.remove('visible');
                        setTimeout(() => layer.remove(), 500);
                    });
                    document.querySelectorAll('.regional-dossier').forEach(el => el.remove());
                    
                    if (isActive) {
                        clearRegionalBtn.style.display = 'none';
                    } else {
                        btn.classList.add('active');
                        const img = document.createElement('img');
                        img.src = `images/regional/${eth.id}.webp`;
                        img.className = 'map-layer regional-ethnic';
                        img.setAttribute('data-regional-id', eth.id);
                        img.draggable = false;
                        container.appendChild(img);
                        void img.offsetWidth;
                        img.classList.add('visible');
                        clearRegionalBtn.style.display = 'block';
                        
                        this.cachedCheckboxes.forEach(cb => { 
                            if (cb.checked) {
                                cb.checked = false; 
                                this.updateLayerVisibility(cb.dataset.layer, false); 
                            }
                        });
                        this.updateLimitUI();
                        
                        const infoP = document.getElementById('info-panel');
                        if (infoP) infoP.classList.add('hidden-by-dossier');
                        window.closeRegionalModal();
                        if (typeof this.showRegionalDossier === 'function') this.showRegionalDossier(eth);
                    }
                } else {
                    if (isActive) {
                        btn.classList.remove('active');
                        const layer = container.querySelector(`img[data-regional-id="${eth.id}"]`);
                        if (layer) {
                            layer.classList.remove('visible');
                            setTimeout(() => layer.remove(), 500);
                        }
                        const dossier = document.getElementById(`regional-dossier-${eth.id}`);
                        if (dossier) dossier.remove();
                        const legend = document.getElementById(`legend-${eth.id}`);
                        if (legend) legend.remove();
                        if (document.querySelectorAll('.regional-grid-item.active').length === 0) clearRegionalBtn.style.display = 'none';
                    } else {
                        btn.classList.add('active');
                        const img = document.createElement('img');
                        img.src = `images/regional/${eth.id}.webp`;
                        img.className = 'map-layer regional-ethnic';
                        img.setAttribute('data-regional-id', eth.id);
                        img.draggable = false;
                        container.appendChild(img);
                        void img.offsetWidth; 
                        img.classList.add('visible');
                        clearRegionalBtn.style.display = 'block';
                        
                        const legendContainer = document.getElementById('regional-legend');
                        if (legendContainer && !document.getElementById(`legend-${eth.id}`)) {
                            const item = document.createElement('div');
                            item.id = `legend-${eth.id}`;
                            item.className = 'legend-item';
                            const color = window.UI.regionalColors[eth.id] || '#ffffff';
                            item.innerHTML = `<div class="legend-color-box" style="background-color: ${color}; color: ${color};"></div><span>${eth.name}</span>`;
                            legendContainer.appendChild(item);
                        }
                        if (typeof this.showRegionalDossier === 'function') this.showRegionalDossier(eth);
                    }
                }
            });
            regionalGrid.appendChild(btn);
        });
    }

    if (clearRegionalBtn) {
        clearRegionalBtn.addEventListener('click', () => {
            SoundEngine.play('tick');
            document.querySelectorAll('.regional-grid-item').forEach(el => el.classList.remove('active'));
            Array.from(container.children).forEach(layer => {
                layer.classList.remove('visible');
                setTimeout(() => layer.remove(), 500);
            });
            document.querySelectorAll('.regional-dossier').forEach(el => el.remove());
            const legendContainer = document.getElementById('regional-legend');
            if (legendContainer) legendContainer.innerHTML = '';
            clearRegionalBtn.style.display = 'none';
        });
    }

    this.cachedCheckboxes = Array.from(document.querySelectorAll('.checkbox-label input[data-layer]'));
    this.updateCachedVisibleLayers();
    this.updateLimitUI();
  }
});