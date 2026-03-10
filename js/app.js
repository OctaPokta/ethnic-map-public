// ==========================================
// 🚀 MAIN APPLICATION & EVENTS
// ==========================================
Object.assign(window.UI, {

  setupEventListeners() {
    const dropdownText = document.getElementById('custom-select-text');
    const infoPanel = document.getElementById('info-panel');

    document.getElementById('donation-btn').addEventListener('mouseenter', () => { SoundEngine.play('coffee-hover'); });
    document.getElementById('donation-btn').addEventListener('click', () => { SoundEngine.play('chime'); });
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

        document.querySelectorAll('.dynamic-dossier').forEach(el => el.remove());
        if (infoPanel) infoPanel.classList.remove('hidden-by-dossier');

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
        if (infoPanel) infoPanel.classList.remove('hidden-by-dossier');

        this.updateLayerVisibility(cb.dataset.layer, cb.checked);

        if (cb.checked) {
          window.history.replaceState(null, null, '#' + cb.dataset.layer);
          const opt = document.querySelector(`.custom-option[data-value="${cb.dataset.layer}"]`);
          if (opt) dropdownText.textContent = opt.textContent;

          // 🔥 PC ONLY: Auto-open info panel when checking a box
          if (window.innerWidth > 768) {
            this.showInfoPanel(cb.dataset.layer);
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
      if (infoPanel) infoPanel.classList.remove('hidden-by-dossier');

      this.cachedCheckboxes.forEach(cb => { cb.checked = false; this.updateLayerVisibility(cb.dataset.layer, false); });
      dropdownText.textContent = DashboardData.ui.defaultDropdownText;
      infoPanel.style.transform = ''; infoPanel.style.transition = ''; infoPanel.classList.remove('active'); setTimeout(() => { infoPanel.style.top = ''; infoPanel.style.left = ''; }, 500);
      window.history.replaceState(null, null, ' '); MapEngine.resetView(); this.updateCityVisibility();
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

    if (window.innerWidth < 1024) document.querySelector('.sidebar').classList.add('collapsed');
  }
});

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