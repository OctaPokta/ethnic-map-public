// ==========================================
// 💻 UI CORE STATE & UTILITIES
// ==========================================

window.toggleTutorial = (show, event) => {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const modal = document.getElementById('welcome-tutorial-modal');
    if (modal) {
        if (show) {
            modal.classList.add('active');
            if (window.SoundEngine) window.SoundEngine.play('tick');
        } else {
            modal.classList.remove('active');
            if (window.SoundEngine) window.SoundEngine.play('tick');
        }
    }
};

window.toggleRegionalModal = () => {
    const modal = document.getElementById('regional-ethnic-modal');
    if (modal) {
        if (!modal.classList.contains('active')) {
            if (window.SoundEngine) window.SoundEngine.play('swoosh');
            if (window.matchMedia("(max-width: 950px)").matches) {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && !sidebar.classList.contains('collapsed')) sidebar.classList.add('collapsed');
            }
        } else {
            if (window.SoundEngine) window.SoundEngine.play('tick');
        }
        modal.classList.toggle('active');
        if (window.UI && typeof window.UI.bringToFront === 'function') window.UI.bringToFront(modal);
    }
};

window.closeRegionalModal = () => {
    const modal = document.getElementById('regional-ethnic-modal');
    if (modal) {
        modal.classList.remove('active');
        if (window.SoundEngine) window.SoundEngine.play('tick');
    }
};

window.UI = {
  DEBUG_MODE: false,
  countryViews: {}, demographicData: {}, countryNamesHebrew: {},
  windowZIndex: 2500, 
  
  // 🔥 Legend Colors
  regionalColors: {
    arabs: '#22c55e', kurds: '#eab308', persians: '#2dd4bf', 
    turks: '#15803d', azeris: '#dc2626', armenians: '#3b82f6', 
    jews: '#2563eb', druze: '#a855f7', maronites: '#9f1239', 
    lurs: '#4338ca', baloch: '#92400e', turkmens: '#145014', 
    bedouins: '#d97706'
  },

  cachedVisibleLayers: [],
  cachedCheckboxes: [],
  domUpdateScheduled: false,

  init() {
    console.log("🟢 Booting Modular UI Engine...");
    if(typeof this.buildDebugPanel === 'function') this.buildDebugPanel();
    if(typeof this.injectData === 'function') this.injectData();
    if(typeof this.setupLoadingScreen === 'function') this.setupLoadingScreen();
    if(typeof this.setupEventListeners === 'function') this.setupEventListeners();
    if(typeof this.setupPerformanceMonitor === 'function') this.setupPerformanceMonitor();
    if(typeof this.setupVisibilityHandler === 'function') this.setupVisibilityHandler();
    console.log("✅ Modular UI Engine Loaded Successfully!");
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

  updateLimitUI() {
      const isMobile = window.matchMedia("(max-width: 950px)").matches;
      const count = this.cachedCheckboxes.filter(c => c.checked).length;
      this.cachedCheckboxes.forEach(c => {
          const label = c.closest('.checkbox-label');
          if (!isMobile) {
              label.classList.remove('disabled-limit');
          } else {
              if (!c.checked && count >= 5) label.classList.add('disabled-limit');
              else label.classList.remove('disabled-limit');
          }
      });
  },

  showMobileToast(message) {
      const existing = document.querySelector('.mobile-toast');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.className = 'mobile-toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      void toast.offsetWidth;
      toast.classList.add('show');
      setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.remove(), 300);
      }, 3500);
  }
};