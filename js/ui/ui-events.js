// ==========================================
// 🖱️ GLOBAL EVENT LISTENERS
// ==========================================
Object.assign(window.UI, {
  setupEventListeners() {
    const dropdownText = document.getElementById('custom-select-text');
    const infoPanel = document.getElementById('info-panel');
    
    // 🔥 DEEP LINKING ENGINE: Automatically opens a country based on the URL
    setTimeout(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && hash !== 'welcome' && hash !== 'map') {
            const countryInput = document.querySelector(`input[data-layer="${hash}"]`);
            if (countryInput && !countryInput.checked) {
                countryInput.click(); 
            }
        }
    }, 1000);

    document.getElementById('donation-btn').addEventListener('mouseenter', () => { if (window.matchMedia("(min-width: 951px)").matches) SoundEngine.play('coffee-hover'); });
    const donationBtn = document.getElementById('donation-btn');
    const donationCallout = document.getElementById('donation-callout');
    
    donationBtn.addEventListener('click', (e) => { 
        if (window.matchMedia("(max-width: 950px)").matches) {
            if (!donationCallout.contains(e.target)) {
                e.preventDefault(); 
                const isShowing = donationCallout.classList.contains('show');
                if (!isShowing) {
                    donationCallout.classList.add('show');
                    SoundEngine.play('coffee-hover'); 
                } else {
                    donationCallout.classList.remove('show');
                }
            } else {
                SoundEngine.play('chime');
                setTimeout(() => donationCallout.classList.remove('show'), 500);
            }
        } else {
            SoundEngine.play('chime');
        }
    });

    document.addEventListener('click', (e) => {
        if (window.matchMedia("(max-width: 950px)").matches && donationCallout.classList.contains('show')) {
            if (!donationBtn.contains(e.target)) {
                donationCallout.classList.remove('show');
            }
        }

        const regEthModal = document.getElementById('regional-ethnic-modal');
        const regEthBtn = document.getElementById('regional-ethnic-btn');
        if (regEthModal && regEthModal.classList.contains('active')) {
            if (!regEthModal.contains(e.target) && regEthBtn && !regEthBtn.contains(e.target)) {
                window.closeRegionalModal();
            }
        }
    });

    document.getElementById('compass-btn').addEventListener('click', () => { SoundEngine.play('swoosh'); MapEngine.resetView(); });

    const mobileSettingsToggle = document.getElementById('mobile-settings-toggle');
    const mobileSettingsMenu = document.getElementById('mobile-settings-menu');
    if (mobileSettingsToggle && mobileSettingsMenu) {
      mobileSettingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileSettingsMenu.classList.toggle('active');
        SoundEngine.play('tick');
      });
      document.addEventListener('click', (e) => {
        if (!mobileSettingsToggle.contains(e.target) && !mobileSettingsMenu.contains(e.target)) {
          mobileSettingsMenu.classList.remove('active');
        }
      });
    }

    document.querySelector('.custom-select-trigger').addEventListener('click', (e) => {
      e.stopPropagation(); document.getElementById('country-dropdown').classList.toggle('open'); SoundEngine.play('tick');
    });

    document.querySelectorAll('.custom-option').forEach(opt => {
      opt.addEventListener('click', () => {
        SoundEngine.play('tick');

        document.querySelectorAll('.dynamic-dossier:not(.regional-dossier)').forEach(el => el.remove());
        if (infoPanel) infoPanel.classList.remove('hidden-by-dossier');

        dropdownText.textContent = opt.textContent;
        window.history.replaceState(null, null, '#' + opt.dataset.value);

        this.cachedCheckboxes.forEach(cb => {
          cb.checked = false; this.updateLayerVisibility(cb.dataset.layer, false);
        });
        
        document.querySelector(`input[data-layer="${opt.dataset.value}"]`).checked = true;
        this.updateLayerVisibility(opt.dataset.value, true);

        this.updateLimitUI();

        this.showInfoPanel(opt.dataset.value);
        MapEngine.flyToView(opt.dataset.value);
        this.updateCityVisibility();

        if (window.matchMedia("(max-width: 950px)").matches) document.querySelector('.sidebar').classList.add('collapsed');
      });
    });

    this.cachedCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        
        const isMobile = window.matchMedia("(max-width: 950px)").matches;
        if (isMobile) {
            const count = this.cachedCheckboxes.filter(c => c.checked).length;
            if (cb.checked && count > 5) {
                cb.checked = false; 
                this.showMobileToast("ניתן לבחור עד 5 מדינות במקביל בטלפון. לחוויה מלאה, השתמשו במחשב.");
                this.updateLimitUI(); 
                return; 
            }
            
            if (cb.checked) {
                const container = document.getElementById('regional-layers-container');
                if (container && container.children.length > 0) {
                    document.querySelectorAll('.regional-grid-item').forEach(el => el.classList.remove('active'));
                    Array.from(container.children).forEach(layer => {
                        layer.classList.remove('visible');
                        setTimeout(() => layer.remove(), 500);
                    });
                    document.querySelectorAll('.regional-dossier').forEach(el => el.remove());
                    const clrRBtn = document.getElementById('clear-regional-btn');
                    if (clrRBtn) clrRBtn.style.display = 'none';
                }
            }
        }

        SoundEngine.play('tick');
        document.querySelectorAll('.dynamic-dossier:not(.regional-dossier)').forEach(el => el.remove());
        if (infoPanel) infoPanel.classList.remove('hidden-by-dossier');

        this.updateLayerVisibility(cb.dataset.layer, cb.checked);
        this.updateLimitUI();

        if (cb.checked) {
          window.history.replaceState(null, null, '#' + cb.dataset.layer);
          const opt = document.querySelector(`.custom-option[data-value="${cb.dataset.layer}"]`);
          if (opt) dropdownText.textContent = opt.textContent;
          if (window.matchMedia("(min-width: 951px)").matches) this.showInfoPanel(cb.dataset.layer);
        } else {
          const anyChecked = this.cachedCheckboxes.some(c => c.checked);
          if (!anyChecked) {
            infoPanel.style.transform = ''; infoPanel.style.transition = ''; infoPanel.classList.remove('active'); setTimeout(() => { infoPanel.style.top = ''; infoPanel.style.left = ''; }, 500);
            dropdownText.textContent = DashboardData.ui.defaultDropdownText; window.history.replaceState(null, null, '#map');
          }
        }
        this.updateCityVisibility();
      });
    });

    document.getElementById('clear-map-btn').addEventListener('click', () => {
      SoundEngine.play('tick');
      document.querySelectorAll('.dynamic-dossier:not(.regional-dossier)').forEach(el => el.remove());
      if (infoPanel) infoPanel.classList.remove('hidden-by-dossier');

      this.cachedCheckboxes.forEach(cb => { 
          cb.checked = false; 
          this.updateLayerVisibility(cb.dataset.layer, false); 
      });
      
      this.updateLimitUI();
      
      dropdownText.textContent = DashboardData.ui.defaultDropdownText;
      infoPanel.style.transform = ''; infoPanel.style.transition = ''; infoPanel.classList.remove('active'); setTimeout(() => { infoPanel.style.top = ''; infoPanel.style.left = ''; }, 500);
      window.history.replaceState(null, null, '#map'); MapEngine.resetView(); this.updateCityVisibility();
    });

    document.querySelectorAll('.action-mute-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        SoundEngine.isMuted = !SoundEngine.isMuted;
        document.querySelectorAll('.action-mute-btn').forEach(b => b.textContent = SoundEngine.isMuted ? '🔇' : '🔊');
        if (!SoundEngine.isMuted) SoundEngine.play('tick');
      });
    });

    document.querySelectorAll('.action-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        SoundEngine.play('tick');
        const isNight = document.body.classList.contains('night-mode');
        document.querySelectorAll('.action-theme-btn').forEach(b => b.textContent = isNight ? '☀️' : '🌙');
      });
    });

    document.getElementById('toggle-sidebar-btn').addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('collapsed'); SoundEngine.play('swoosh');
    });

    document.getElementById('close-info-btn').addEventListener('click', () => {
      infoPanel.style.transform = '';
      infoPanel.style.transition = '';
      infoPanel.classList.remove('active');
      infoPanel.classList.remove('hidden-by-dossier');
      SoundEngine.play('tick');
      setTimeout(() => { infoPanel.style.top = ''; infoPanel.style.left = ''; }, 500);
    });

    if (window.matchMedia("(max-width: 1024px)").matches) document.querySelector('.sidebar').classList.add('collapsed');

  }
});

// ==========================================
// 🔥 OIL FIELDS TOGGLE (Global Scope)
// ==========================================
window.toggleOilFields = function(event) {
    if (event) event.stopPropagation();
    
    const overlay = document.getElementById('oil-fields-overlay');
    const btn = document.getElementById('oil-toggle-btn');
    
    if (overlay.classList.contains('active-overlay')) {
        overlay.classList.remove('active-overlay');
        btn.classList.remove('active');
        if (window.audioManager) window.audioManager.playSound('click');
    } else {
        overlay.classList.add('active-overlay');
        btn.classList.add('active');
        if (window.audioManager) window.audioManager.playSound('click'); 
    }
};