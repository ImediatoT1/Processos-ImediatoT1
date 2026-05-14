/* Processos T1 — sidebar + viewer */

const CATEGORIES = [
    {
        id: 'frota', title: 'Frota',
        folder: 'Manual de indicadores - Frota',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6H3v12h11z"/><path d="M14 8h4l3 3v7h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`,
        items: [
            'Aderência Check de conformidade.pdf',
            'Aderência Checklist - Armazém.pdf',
            'Aderência Checklist - Empurrada.pdf',
            'Aderência Preventiva.pdf',
            'Disponibilidade de empilhadeira.pdf',
            'Indisponibilidade Manutenção.pdf',
            'MTBF E MTTR.pdf',
            'Milimetragem de Pneu.pdf',
            'Ordens de Serviço Vencida.pdf',
            'Stress test - Armazém.pdf',
            'Stress test - Frota.pdf',
        ],
    },
    {
        id: 'gente', title: 'Gente',
        folder: 'Manual de indicadores - Gente',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        items: [
            'ABS Total.pdf',
            'Acompanhamento_de_novos.pdf',
            'Banco de candidatos.pdf',
            'GAP DE CONTRATAÇÃO.pdf',
            'JLL.pdf',
            'LENT - Treinamentos cadastrados.pdf',
            'LENT - Treinamentos executados.pdf',
            'LTO.pdf',
            'Log On Geral.pdf',
            'Log On nominal.pdf',
            'TONH.pdf',
        ],
    },
    {
        id: 'gestao', title: 'Gestão',
        folder: 'Manual de indicadores - Gestão',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-6"/></svg>`,
        items: [],
    },
    {
        id: 'seguranca', title: 'Segurança',
        folder: 'Manual de indicadores - Segurança',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
        items: [
            '% de DTOs com desvios.pdf',
            'DTO Novatos.pdf',
            'Estouro de jornada.pdf',
            'Log On Segurança.pdf',
            'Monitoramento Liderança.pdf',
            'OKR Rollover.pdf',
            'Relatos Guardian..pdf',
            'Índice telemetria empilhadeira.pdf',
        ],
    },
];

const cleanName  = f => f.replace(/\.pdf$/i, '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
const encodePath = (folder, file) => `${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
const escapeAttr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const normalize  = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const ICON_CHEV  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
const ICON_ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

function render() {
    const root = document.getElementById('links');
    root.innerHTML = CATEGORIES.map(cat => {
        const empty = cat.items.length === 0;
        const itemsHtml = empty
            ? `<div class="coming-soon-msg">Em breve…</div>`
            : cat.items.map((file, i) => {
                const name = cleanName(file);
                const href = encodePath(cat.folder, file);
                return `
                    <button class="pdf" data-pdf="${escapeAttr(href)}" data-name="${escapeAttr(name)}" data-tag="${cat.title}" style="animation-delay:${0.03 + 0.025 * i}s">
                        <span class="pdf-bullet"></span>
                        <span class="pdf-name">${name}</span>
                        <span class="pdf-arrow">${ICON_ARROW}</span>
                    </button>
                `;
            }).join('');

        return `
            <div class="cat" data-cat="${cat.id}">
                <button class="cat-btn" aria-expanded="false">
                    <span class="cat-icon">${cat.icon}</span>
                    <span class="cat-text">
                        <span class="cat-title">${cat.title}</span>
                        <span class="cat-count">${empty ? 'Em breve' : cat.items.length + ' manuais'}</span>
                    </span>
                    <span class="cat-chev">${ICON_CHEV}</span>
                </button>
                <div class="cat-list">
                    <div class="cat-list-inner">${itemsHtml}</div>
                </div>
            </div>
        `;
    }).join('');
}

let openCat = null;
function toggleCat(catEl) {
    if (openCat && openCat !== catEl) {
        openCat.classList.remove('open');
        openCat.querySelector('.cat-btn').setAttribute('aria-expanded', 'false');
    }
    const willOpen = !catEl.classList.contains('open');
    catEl.classList.toggle('open', willOpen);
    catEl.querySelector('.cat-btn').setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    openCat = willOpen ? catEl : null;
}

/* Viewer */
const app           = document.getElementById('app');
const viewer        = document.getElementById('viewer');
const viewerTitle   = document.getElementById('viewerTitle');
const viewerTag     = document.getElementById('viewerTag');
const pdfCanvas     = document.getElementById('pdfCanvas');
const loader        = document.getElementById('pdfLoader');
const viewerOpen    = document.getElementById('viewerOpen');
const viewerDl      = document.getElementById('viewerDownload');
const pageIndicator = document.getElementById('pageIndicator');
const pageNumEl     = document.getElementById('pageNum');
const pageTotalEl   = document.getElementById('pageTotal');

/* Mode helpers */
const isMobile    = () => window.matchMedia('(max-width: 1023px)').matches;
const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;
let manualFullscreen = false;
let slideMode = false;
let totalPages = 0;

/* PDF.js setup */
let pdfReady = false;
function setupPdfJs() {
    if (window.pdfjsLib && !pdfReady) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        pdfReady = true;
    }
    return pdfReady;
}

let renderToken = 0;
let currentResizeUrl = null;

async function renderPdf(url) {
    const token = ++renderToken;
    currentResizeUrl = url;

    pdfCanvas.classList.remove('loaded');
    pdfCanvas.innerHTML = '';
    loader.hidden = false;
    loader.classList.remove('fading');

    if (!setupPdfJs()) {
        await new Promise(r => setTimeout(r, 200));
        setupPdfJs();
    }

    try {
        const pdf = await window.pdfjsLib.getDocument(url).promise;
        if (token !== renderToken) return;
        totalPages = pdf.numPages;
        pageTotalEl.textContent = totalPages;
        pageNumEl.textContent = 1;

        const slide = slideMode;
        const containerWidth = Math.max(pdfCanvas.clientWidth - (slide ? 20 : 32), 280);
        const containerHeight = pdfCanvas.clientHeight - (slide ? 20 : 0);
        const dpr = window.devicePixelRatio || 1;

        for (let i = 1; i <= pdf.numPages; i++) {
            if (token !== renderToken) return;
            const page = await pdf.getPage(i);
            const baseViewport = page.getViewport({ scale: 1 });

            let scale;
            if (slide) {
                const ws = containerWidth / baseViewport.width;
                const hs = containerHeight / baseViewport.height;
                scale = Math.min(ws, hs);
            } else {
                scale = containerWidth / baseViewport.width;
            }
            const viewport = page.getViewport({ scale });

            // Render at higher resolution in slide mode for crisp zoom
            const renderDpr = slide ? Math.max(dpr, 2.5) : dpr;

            const canvas = document.createElement('canvas');
            canvas.width = Math.floor(viewport.width * renderDpr);
            canvas.height = Math.floor(viewport.height * renderDpr);
            canvas.style.width = Math.floor(viewport.width) + 'px';
            canvas.style.height = Math.floor(viewport.height) + 'px';

            if (slide) {
                const wrap = document.createElement('div');
                wrap.className = 'pdf-page';
                wrap.appendChild(canvas);
                pdfCanvas.appendChild(wrap);
            } else {
                pdfCanvas.appendChild(canvas);
            }

            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport,
                transform: renderDpr !== 1 ? [renderDpr, 0, 0, renderDpr, 0, 0] : null,
            };
            await page.render(renderContext).promise;
            if (token !== renderToken) return;

            if (i === 1) {
                pdfCanvas.classList.add('loaded');
                loader.classList.add('fading');
                setTimeout(() => { if (token === renderToken) loader.hidden = true; }, 300);
            }
        }
    } catch (err) {
        if (token === renderToken) {
            console.error('Erro ao carregar PDF:', err);
            pdfCanvas.innerHTML = `<div style="color:#94A3B8;text-align:center;padding:40px;font-size:14px">Não foi possível carregar este manual.</div>`;
            pdfCanvas.classList.add('loaded');
            loader.classList.add('fading');
            setTimeout(() => { loader.hidden = true; }, 300);
        }
    }
}

/* Centralized touch gestures for slide mode:
   - 1 finger (scale=1): swipe between pages
   - 2 fingers: pinch zoom on current page
   - 1 finger (scale>1): pan within current page
   - Double tap: toggle zoom 1x <-> 2.2x */
function attachSlideGestures(container) {
    const pageState = new WeakMap();

    function getState(pageEl) {
        let s = pageState.get(pageEl);
        if (!s) { s = { scale: 1, tx: 0, ty: 0 }; pageState.set(pageEl, s); }
        return s;
    }
    function applyZoom(pageEl, animate) {
        const canvas = pageEl.querySelector('canvas');
        if (!canvas) return;
        const s = getState(pageEl);
        canvas.style.transition = animate ? 'transform 0.22s ease' : '';
        canvas.style.transform = `translate3d(${s.tx}px, ${s.ty}px, 0) scale(${s.scale})`;
        pageEl.classList.toggle('zoomed', s.scale > 1.02);
    }
    function clampPan(pageEl) {
        const canvas = pageEl.querySelector('canvas');
        if (!canvas) return;
        const s = getState(pageEl);
        const maxX = (canvas.clientWidth * (s.scale - 1)) / 2;
        const maxY = (canvas.clientHeight * (s.scale - 1)) / 2;
        s.tx = Math.min(Math.max(s.tx, -maxX), maxX);
        s.ty = Math.min(Math.max(s.ty, -maxY), maxY);
    }
    function currentPageIdx() {
        const pw = container.clientWidth;
        return pw ? Math.round(container.scrollLeft / pw) : 0;
    }
    function getActivePage() {
        return container.children[currentPageIdx()] || null;
    }
    function snapToIdx(idx, animate = true) {
        const pw = container.clientWidth;
        const max = container.children.length - 1;
        idx = Math.min(Math.max(idx, 0), max);
        if (animate) container.scrollTo({ left: idx * pw, behavior: 'smooth' });
        else container.scrollLeft = idx * pw;
    }

    let mode = null;            // 'swipe' | 'pinch' | 'pan'
    let activePage = null;
    let swipeStartX = 0, swipeStartScroll = 0, swipeMaxDelta = 0;
    let pinchStartDist = 0, pinchStartScale = 1;
    let panStartX = 0, panStartY = 0;
    let lastTap = 0;
    let tapStartX = 0, tapStartY = 0;

    container.addEventListener('touchstart', (e) => {
        if (!container.classList.contains('slide-mode')) return;
        if (e.touches.length === 1) {
            activePage = getActivePage();
            if (!activePage) return;
            const s = getState(activePage);
            const t = e.touches[0];
            tapStartX = t.clientX; tapStartY = t.clientY;
            if (s.scale > 1.02) {
                mode = 'pan';
                panStartX = t.clientX - s.tx;
                panStartY = t.clientY - s.ty;
            } else {
                mode = 'swipe';
                swipeStartX = t.clientX;
                swipeStartScroll = container.scrollLeft;
                swipeMaxDelta = 0;
            }
        } else if (e.touches.length === 2) {
            // Lock onto current page before pinch
            const idx = currentPageIdx();
            container.scrollLeft = idx * container.clientWidth;
            activePage = container.children[idx];
            if (!activePage) return;
            const [a, b] = e.touches;
            pinchStartDist = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY) || 1;
            pinchStartScale = getState(activePage).scale;
            mode = 'pinch';
        }
        e.preventDefault();
    }, { passive: false });

    container.addEventListener('touchmove', (e) => {
        if (!mode || !activePage) return;
        if (mode === 'pinch' && e.touches.length >= 2) {
            const [a, b] = e.touches;
            const dist = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY) || 1;
            const s = getState(activePage);
            s.scale = Math.min(Math.max(pinchStartScale * (dist / pinchStartDist), 1), 5);
            if (s.scale <= 1) { s.tx = 0; s.ty = 0; }
            else clampPan(activePage);
            applyZoom(activePage, false);
        } else if (mode === 'pan' && e.touches.length === 1) {
            const s = getState(activePage);
            if (s.scale > 1.02) {
                s.tx = e.touches[0].clientX - panStartX;
                s.ty = e.touches[0].clientY - panStartY;
                clampPan(activePage);
                applyZoom(activePage, false);
            }
        } else if (mode === 'swipe' && e.touches.length === 1) {
            const dx = e.touches[0].clientX - swipeStartX;
            swipeMaxDelta = Math.max(swipeMaxDelta, Math.abs(dx));
            container.scrollLeft = swipeStartScroll - dx;
        }
        e.preventDefault();
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
        if (e.touches.length === 0) {
            const endedMode = mode;
            const ap = activePage;

            if (endedMode === 'swipe' && ap) {
                const pw = container.clientWidth;
                const dx = container.scrollLeft - swipeStartScroll;
                const startIdx = Math.round(swipeStartScroll / pw);
                let targetIdx = startIdx;
                if (Math.abs(dx) > pw * 0.18) targetIdx = startIdx + (dx > 0 ? 1 : -1);
                snapToIdx(targetIdx, true);

                // Double-tap (no real swipe)
                if (swipeMaxDelta < 8) {
                    const now = Date.now();
                    if (now - lastTap < 280) {
                        const s = getState(ap);
                        if (s.scale > 1.02) { s.scale = 1; s.tx = 0; s.ty = 0; }
                        else { s.scale = 2.2; s.tx = 0; s.ty = 0; }
                        applyZoom(ap, true);
                        lastTap = 0;
                    } else {
                        lastTap = now;
                    }
                }
            } else if (endedMode === 'pinch' && ap) {
                const s = getState(ap);
                if (s.scale <= 1.05) {
                    s.scale = 1; s.tx = 0; s.ty = 0;
                    applyZoom(ap, true);
                }
            }

            mode = null;
            activePage = null;
        } else if (e.touches.length === 1 && mode === 'pinch') {
            // 1 finger left after pinch: keep mode but stay on same page
            mode = activePage && getState(activePage).scale > 1.02 ? 'pan' : null;
            if (mode === 'pan') {
                panStartX = e.touches[0].clientX - getState(activePage).tx;
                panStartY = e.touches[0].clientY - getState(activePage).ty;
            }
        }
    }, { passive: false });

    container.addEventListener('touchcancel', () => {
        mode = null;
        activePage = null;
    });
}

/* Slide mode + fullscreen */
function applyModes() {
    const wantSlide = manualFullscreen || (isMobile() && isLandscape() && viewer.classList.contains('is-active'));
    if (wantSlide !== slideMode) {
        slideMode = wantSlide;
        pdfCanvas.classList.toggle('slide-mode', slideMode);
        pageIndicator.hidden = !slideMode;
        if (currentResizeUrl) renderPdf(currentResizeUrl);
    }
    viewer.classList.toggle('is-fullscreen', manualFullscreen);
}

function toggleFullscreen() {
    manualFullscreen = !manualFullscreen;
    applyModes();
    if (manualFullscreen) {
        const el = document.documentElement;
        const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen;
        if (req) req.call(el).catch(() => {});
    } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
        if (exit && (document.fullscreenElement || document.webkitFullscreenElement)) {
            exit.call(document).catch(() => {});
        }
    }
}

/* Listen to orientation/viewport changes */
window.matchMedia('(orientation: landscape)').addEventListener('change', applyModes);
window.matchMedia('(max-width: 1023px)').addEventListener('change', applyModes);
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && manualFullscreen) {
        manualFullscreen = false;
        applyModes();
    }
});

/* Page indicator updates on scroll */
let scrollDebounce;
pdfCanvas.addEventListener('scroll', () => {
    if (!slideMode) return;
    clearTimeout(scrollDebounce);
    scrollDebounce = setTimeout(() => {
        const pageW = pdfCanvas.clientWidth;
        if (!pageW) return;
        const n = Math.min(Math.max(Math.round(pdfCanvas.scrollLeft / pageW) + 1, 1), totalPages);
        pageNumEl.textContent = n;
    }, 60);
});

function openPdf(href, name, tag, triggerBtn) {
    viewerTitle.textContent = name;
    viewerTitle.title = name;
    viewerTag.textContent = tag;
    viewerOpen.href = href;
    viewerDl.href = href;
    viewerDl.setAttribute('download', name);

    viewer.classList.add('is-active');

    // Set mode based on current device state before rendering
    slideMode = manualFullscreen || (isMobile() && isLandscape());
    pdfCanvas.classList.toggle('slide-mode', slideMode);
    pageIndicator.hidden = !slideMode;
    viewer.classList.toggle('is-fullscreen', manualFullscreen);

    renderPdf(href);

    document.querySelectorAll('.pdf.is-active').forEach(el => el.classList.remove('is-active'));
    if (triggerBtn) triggerBtn.classList.add('is-active');
}

function closePdf() {
    renderToken++;
    currentResizeUrl = null;
    viewer.classList.remove('is-active');
    setTimeout(() => {
        pdfCanvas.innerHTML = '';
        pdfCanvas.classList.remove('loaded');
    }, 400);
    viewerTitle.textContent = 'Selecione um manual';
    viewerTag.textContent = '—';
    document.querySelectorAll('.pdf.is-active').forEach(el => el.classList.remove('is-active'));
    // Exit fullscreen on close
    if (manualFullscreen) {
        manualFullscreen = false;
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
        if (exit && (document.fullscreenElement || document.webkitFullscreenElement)) {
            exit.call(document).catch(() => {});
        }
    }
    applyModes();
    pageIndicator.hidden = true;
}

/* Re-render on significant resize / sidebar toggle */
let resizeTimer;
function scheduleRerender() {
    if (!currentResizeUrl) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (currentResizeUrl) renderPdf(currentResizeUrl);
    }, 300);
}
window.addEventListener('resize', scheduleRerender);

/* Sidebar toggle */
function toggleSidebar(force) {
    const willCollapse = typeof force === 'boolean' ? force : !app.classList.contains('sidebar-collapsed');
    app.classList.toggle('sidebar-collapsed', willCollapse);
    // Re-render PDF at new width after transition finishes
    if (currentResizeUrl) {
        setTimeout(() => renderPdf(currentResizeUrl), 500);
    }
}

/* Event delegation */
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-viewer]')) return closePdf();
    if (e.target.closest('[data-toggle-sidebar]')) return toggleSidebar(true);
    if (e.target.closest('[data-show-sidebar]')) return toggleSidebar(false);
    if (e.target.closest('[data-toggle-fullscreen]')) return toggleFullscreen();

    const pdfBtn = e.target.closest('.pdf');
    if (pdfBtn) {
        e.preventDefault();
        return openPdf(pdfBtn.dataset.pdf, pdfBtn.dataset.name, pdfBtn.dataset.tag, pdfBtn);
    }
    const catBtn = e.target.closest('.cat-btn');
    if (catBtn) {
        toggleCat(catBtn.parentElement);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (viewer.classList.contains('is-active')) closePdf();
        else if (openCat) toggleCat(openCat);
    }
});

/* Search */
const searchInput = document.getElementById('searchInput');
const emptyState  = document.getElementById('emptyState');

searchInput.addEventListener('input', () => {
    const q = normalize(searchInput.value.trim());
    let anyCat = false;

    document.querySelectorAll('.cat').forEach(catEl => {
        const cat = CATEGORIES.find(c => c.id === catEl.dataset.cat);
        const titleMatch = !q || normalize(cat.title).includes(q);
        let itemMatchCount = 0;

        catEl.querySelectorAll('.pdf').forEach(pdfEl => {
            const m = !q || normalize(pdfEl.dataset.name).includes(q);
            pdfEl.classList.toggle('filter-hidden', !m);
            if (m) itemMatchCount++;
        });

        const visible = !q || titleMatch || itemMatchCount > 0;
        catEl.classList.toggle('filter-hidden', !visible);
        if (visible) anyCat = true;

        if (q && itemMatchCount > 0 && !catEl.classList.contains('open')) {
            catEl.classList.add('open');
            catEl.querySelector('.cat-btn').setAttribute('aria-expanded', 'true');
        }
        if (!q && catEl !== openCat) {
            catEl.classList.remove('open');
            catEl.querySelector('.cat-btn').setAttribute('aria-expanded', 'false');
        }
    });

    emptyState.hidden = anyCat;
});

document.addEventListener('DOMContentLoaded', () => {
    render();
    attachSlideGestures(pdfCanvas);
});
