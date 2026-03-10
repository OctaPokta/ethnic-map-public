// ==========================================
// 🛠️ UI UTILITIES & MANAGERS
// ==========================================
Object.assign(window.UI, {

    bringToFront(element) {
        this.windowZIndex++;
        element.style.zIndex = this.windowZIndex;
    },

    makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        handle.onmousedown = (e) => {
            if (window.innerWidth <= 768) return;
            if (e.target.tagName === 'BUTTON') return;

            e.preventDefault();
            this.bringToFront(element);

            element.style.transition = 'none';

            const rect = element.getBoundingClientRect();
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

    handleUrlHash() {
        const hash = window.location.hash.substring(1);
        if (hash && UI.countryViews[hash]) {
            const option = document.querySelector(`.custom-option[data-value="${hash}"]`);
            if (option) option.click();
        }
    }

});