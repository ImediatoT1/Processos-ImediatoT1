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
                attachPinchZoom(wrap, canvas);
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

/* Pinch zoom + pan + double-tap zoom on each slide page */
function attachPinchZoom(pageEl, canvasEl) {
    let scale = 1, tx = 0, ty = 0;
    const pointers = new Map();
    let pinchStartDist = 0;
    let pinchStartScale = 1;
    let panStartX = 0, panStartY = 0;
    let lastTap = 0;

    function apply(animate) {
        canvasEl.style.transition = animate ? 'transform 0.22s ease' : '';
        canvasEl.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
        pageEl.classList.toggle('zoomed', scale > 1.02);
    }
    function reset(animate = true) {
        scale = 1; tx = 0; ty = 0;
        apply(animate);
    }
    function clampPan() {
        const maxX = (canvasEl.clientWidth * (scale - 1)) / 2;
        const maxY = (canvasEl.clientHeight * (scale - 1)) / 2;
        tx = Math.min(Math.max(tx, -maxX), maxX);
        ty = Math.min(Math.max(ty, -maxY), maxY);
    }

    pageEl.addEventListener('pointerdown', (e) => {
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pointers.size === 2) {
            const [a, b] = [...pointers.values()];
            pinchStartDist = Math.hypot(b.x - a.x, b.y - a.y) || 1;
            pinchStartScale = scale;
            // Take over both pointers — prevent native scroll/zoom
            try { pageEl.setPointerCapture(e.pointerId); } catch (_) {}
            e.preventDefault();
        } else if (pointers.size === 1 && scale > 1.02) {
            panStartX = e.clientX - tx;
            panStartY = e.clientY - ty;
            try { pageEl.setPointerCapture(e.pointerId); } catch (_) {}
        }
    }, { passive: false });

    pageEl.addEventListener('pointermove', (e) => {
        if (!pointers.has(e.pointerId)) return;
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pointers.size === 2) {
            const [a, b] = [...pointers.values()];
            const dist = Math.hypot(b.x - a.x, b.y - a.y) || 1;
            scale = Math.min(Math.max(pinchStartScale * (dist / pinchStartDist), 1), 5);
            if (scale <= 1) { tx = 0; ty = 0; }
            else clampPan();
            apply(false);
            e.preventDefault();
        } else if (pointers.size === 1 && scale > 1.02) {
            tx = e.clientX - panStartX;
            ty = e.clientY - panStartY;
            clampPan();
            apply(false);
            e.preventDefault();
        }
    }, { passive: false });

    function onEnd(e) {
        const wasOne = pointers.size === 1;
        pointers.delete(e.pointerId);
        if (scale <= 1.05) reset(true);

        // Double-tap (single finger up, no movement)
        if (wasOne && pointers.size === 0) {
            const now = Date.now();
            if (now - lastTap < 280) {
                if (scale > 1.02) reset(true);
                else { scale = 2.2; tx = 0; ty = 0; apply(true); }
                lastTap = 0;
            } else {
                lastTap = now;
            }
        }
    }
    pageEl.addEventListener('pointerup', onEnd);
    pageEl.addEventListener('pointercancel', onEnd);
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
});
