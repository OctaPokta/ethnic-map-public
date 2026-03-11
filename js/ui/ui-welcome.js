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

    // Close Modals when clicking the background
    loadingScreen.addEventListener('click', (e) => {
        const tutModal = document.getElementById('welcome-tutorial-modal');
        const tutBtn = document.getElementById('welcome-tutorial-btn');
        if (tutModal && tutModal.classList.contains('active')) {
            if (!tutModal.contains(e.target) && !tutBtn.contains(e.target)) window.toggleTutorial(false);
        }

        const contactModal = document.getElementById('welcome-contact-modal');
        const contactBtn = document.getElementById('welcome-contact-btn');
        if (contactModal && contactModal.classList.contains('active')) {
            if (!contactModal.contains(e.target) && !contactBtn.contains(e.target)) window.toggleContact(false);
        }
    });

    // AJAX Form Submission Engine
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('contact-success');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-contact-btn');
            submitBtn.textContent = 'שולח...';
            submitBtn.disabled = true;

            const data = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    form.classList.add('hidden-state');
                    successMsg.classList.remove('hidden-state');
                    form.reset();
                    if (window.SoundEngine) window.SoundEngine.play('chime');
                } else {
                    alert("שגיאה בשליחת ההודעה. נסו שוב מאוחר יותר.");
                    submitBtn.textContent = 'שלח הודעה';
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert("שגיאת רשת. אנא בדקו את החיבור שלכם ונסו שוב.");
                submitBtn.textContent = 'שלח הודעה';
                submitBtn.disabled = false;
            }
        });
    }

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
          
          // 🔥 DEEP LINKING: Skip welcome if hash exists (e.g. #map or #Israel)
          const hash = window.location.hash;
          if (hash !== '' && hash !== '#welcome') {
              loadingScreen.style.opacity = '0';
              setTimeout(() => loadingScreen.style.display = 'none', 800);
          } else {
              if (enterBtn) enterBtn.classList.remove('hidden');
          }
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
        // 🔥 ROUTING: Change hash to skip welcome screen
        window.location.hash = 'map';
        
        if (window.SoundEngine && typeof window.SoundEngine.init === 'function') window.SoundEngine.init(); 
        if (window.SoundEngine) window.SoundEngine.play('swoosh');
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display = 'none', 800);
        
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
  



  }
});