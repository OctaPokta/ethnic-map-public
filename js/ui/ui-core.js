// ==========================================
// 💻 UI CORE STATE & DATA INJECTION
// ==========================================

// 🔥 GLOBAL NAVIGATION & ROUTING

window.toggleTutorial = (show, event) => {
    if (event) { event.preventDefault(); event.stopPropagation(); }
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

window.toggleContact = (show, event) => {
    if (event) { event.preventDefault(); event.stopPropagation(); }
    const modal = document.getElementById('welcome-contact-modal');
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
    DEBUG_MODE: true,
    countryViews: {}, demographicData: {}, countryNamesHebrew: {},
    windowZIndex: 2500,

    regionalColors: {
        arabs: '#22c55e', kurds: '#eab308', persians: '#2dd4bf',
        turks: '#15803d', azeris: '#dc2626', armenians: '#3b82f6',
        jews: '#2563eb', druze: '#a855f7', maronites: '#9f1239',
        lurs: '#4338ca', baloch: '#92400e', turkmens: '#145014'
    },

    cachedVisibleLayers: [],
    cachedCheckboxes: [],
    domUpdateScheduled: false,

    init() {
        console.log("🟢 Booting Master UI Engine...");
        if (typeof this.buildDebugPanel === 'function') this.buildDebugPanel();
        this.injectData();
        this.setupLoadingScreen();
        this.setupEventListeners();
        if (typeof this.setupPerformanceMonitor === 'function') this.setupPerformanceMonitor();
        this.setupVisibilityHandler();

        // 🔥 THE ROUTER: Watches for URL changes (e.g., #map, #welcome)
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            const loadingScreen = document.getElementById('loading-screen');

            if (hash === '' || hash === '#welcome') {
                if (loadingScreen) {
                    loadingScreen.style.display = 'flex';
                    void loadingScreen.offsetWidth; // Force Reflow
                    loadingScreen.style.opacity = '1';
                    const enterBtn = document.getElementById('enter-map-btn');
                    if (enterBtn) enterBtn.classList.remove('hidden');
                }
            } else {
                // Hide welcome screen for any other hash (like #map or #Israel)
                if (loadingScreen && loadingScreen.style.display !== 'none') {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => loadingScreen.style.display = 'none', 800);
                }
            }
        });

        console.log("✅ Master UI Engine Loaded Successfully!");
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