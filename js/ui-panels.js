// ==========================================
// 📊 UI PANELS & DOSSIERS
// ==========================================
Object.assign(window.UI, {

    highlightCrossBorder(ethnicName) {
        // Clear all first
        this.cachedCheckboxes.forEach(cb => { 
            cb.checked = false; 
            cb.closest('.sidebar-item-wrapper').classList.remove('disabled-limit');
            this.updateLayerVisibility(cb.dataset.layer, false); 
        });
        
        let toCheck = [];
        let ethnicDataObj = null;

        Object.keys(this.demographicData).forEach(country => {
            const ethnicData = this.demographicData[country].find(d => d.name === ethnicName);
            if (ethnicData) toCheck.push({ country, data: ethnicData });
        });

        const isMobile = window.matchMedia("(max-width: 950px)").matches;
        if (isMobile && toCheck.length > 5) {
            toCheck = toCheck.slice(0, 5); 
            this.showMobileToast(`מציג 5 מדינות בלבד (מגבלת טלפון). לחוויה מלאה, השתמשו במחשב.`);
        }

        if (toCheck.length > 0) {
            toCheck.forEach(item => {
                document.querySelector(`input[data-layer="${item.country}"]`).checked = true;
                this.updateLayerVisibility(item.country, true);
                if (!ethnicDataObj) ethnicDataObj = item.data;
            });

            this.updateLimitUI(); 
            MapEngine.resetView();
            SoundEngine.play('swoosh');
            this.updateCityVisibility();

            if (ethnicDataObj) {
                if (isMobile) {
                    document.querySelectorAll('.dynamic-dossier').forEach(el => el.remove());
                    const sidebar = document.querySelector('.sidebar');
                    if (sidebar) sidebar.classList.add('collapsed');
                    const infoP = document.getElementById('info-panel');
                    if (infoP) infoP.classList.add('hidden-by-dossier');
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

                const closeBtnHtml = isMobile 
                    ? `<button class="dossier-back-btn" onclick="this.parentElement.remove(); SoundEngine.play('tick'); const p = document.getElementById('info-panel'); if(p) p.classList.remove('hidden-by-dossier');">
                         <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg> 
                         חזור לרשימה
                       </button>`
                    : `<button class="close-info-btn" onclick="this.parentElement.remove(); SoundEngine.play('tick');">&times;</button>`;

                dossier.innerHTML = `
                ${closeBtnHtml}
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
            <svg class="mobile-click-icon mobile-only" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
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
    }
});