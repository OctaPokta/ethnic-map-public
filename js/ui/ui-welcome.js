// ==========================================
// 🌌 WELCOME SCREEN & LOADING ENGINE
// ==========================================
Object.assign(window.UI, {

  setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderFill = document.getElementById('loading-bar-fill');
    const loaderContainer = document.getElementById('loading-bar-container');
    const percentText = document.getElementById('loading-percentage');
    const enterBtn = document.getElementById('enter-map-btn');

    const networkBg = document.getElementById('network-bg');
    const raysContainer = document.getElementById('rays-container');
    const globeContainer = document.getElementById('globe-container');

    loadingScreen.addEventListener('mousemove', (e) => {
      if (window.innerWidth > 950) {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
        
        loadingScreen.style.setProperty('--mouse-x', xPos);
        loadingScreen.style.setProperty('--mouse-y', yPos);

        if (raysContainer) raysContainer.style.transform = `translate(${xPos * 70}px, ${yPos * 70}px)`;
        if (globeContainer) globeContainer.style.transform = `translate(calc(-50% + ${xPos * -35}px), calc(-50% + ${yPos * -35}px))`;
        if (networkBg) networkBg.style.transform = `perspective(1000px) rotateX(${yPos * -8}deg) rotateY(${xPos * 8}deg)`;
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
      if (loadedCount >= totalImages) finalizeLoading();
    };

    if (images.length === 0) {
      finalizeLoading();
    } else {
      images.forEach(img => {
        if (img.complete) updateLoading(); 
        else { img.addEventListener('load', updateLoading); img.addEventListener('error', updateLoading); }
      });
    }

    setTimeout(() => {
      if (enterBtn && enterBtn.classList.contains('hidden')) finalizeLoading();
    }, 5000);

    if (enterBtn) {
      enterBtn.addEventListener('click', () => {
        if (window.SoundEngine && typeof window.SoundEngine.init === 'function') window.SoundEngine.init(); 
        if (window.SoundEngine) window.SoundEngine.play('swoosh');
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.remove(), 800);
        setTimeout(() => {
          const callout = document.getElementById('donation-callout');
          const btn = document.getElementById('donation-btn');
          if (callout && btn) {
            callout.classList.add('show'); btn.classList.add('pulsing'); 
            if (window.SoundEngine) window.SoundEngine.play('chime');
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
});