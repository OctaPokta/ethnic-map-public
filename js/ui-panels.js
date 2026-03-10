// ==========================================
// 📊 UI PANELS & DOSSIERS
// ==========================================
Object.assign(window.UI, {

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

                dossier.innerHTML = `
                <button class="close-info-btn" onclick="
                    this.parentElement.remove(); 
                    SoundEngine.play('tick');
                    if(window.innerWidth <= 768) {
                        const p = document.getElementById('info-panel');
                        if(p) p.classList.remove('hidden-by-dossier');
                    }
                ">&times;</button>
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
    }

});