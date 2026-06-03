/* Processos T1 — sidebar + viewer */

const CATEGORIES = [
    {
        id: 'frota', title: 'Frota',
        folder: '03 - Manual de indicadores - Frota',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6H3v12h11z"/><path d="M14 8h4l3 3v7h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`,
        items: [
            '01 - Aderência Preventiva.pdf',
            '02 - Aderência Check de conformidade.pdf',
            '03 - Milimetragem de Pneu.pdf',
            '04 - Aderência Checklist - Armazém.pdf',
            '04 - Aderência Checklist - Empurrada.pdf',
            '05 - Ordens de Serviço Vencida.pdf',
            '06 - Stress test - Armazém.pdf',
            '06 - Stress test - Frota.pdf',
            '07 - Disponibilidade de empilhadeira.pdf',
            '07 - Indisponibilidade Manutenção.pdf',
            '08 - MTBF E MTTR.pdf',
        ],
    },
    {
        id: 'gente', title: 'Gente',
        folder: '01 - Manual de indicadores - Gente',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        items: [
            '01 - Banco de candidatos.pdf',
            '02 - GAP de contratação.pdf',
            '03 - Log_On Geral.pdf',
            '03 .1 - Log_On nominal.pdf',
            '04 - Acompanhamento de novos.pdf',
            '05.1 - LENT - Treinamentos cadastrados.pdf',
            '05.2 - LENT - Treinamentos executados.pdf',
            '06 - SKAP.pdf',
            '07 - JLL.pdf',
            '08 - ABS Total.pdf',
            '09 - TONH.pdf',
            '10 - LTO.pdf',
        ],
    },
    {
        id: 'gestao', title: 'Gestão',
        folder: '04 - Manual de indicadores - Gestão',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-6"/></svg>`,
        items: [
            'Disponibilidade de gente.pdf',
        ],
    },
    {
        id: 'seguranca', title: 'Segurança',
        folder: '02 - Manual de indicadores - Segurança',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
        items: [
            '% de DTOs com desvios.pdf',
            'DTO Novatos.pdf',
            'Estouro de jornada.pdf',
            'Log_On Segurança.pdf',
            'Monitoramento Liderança.pdf',
            'OKR Rollover.pdf',
            'Relatos Guardian..pdf',
            'Índice telemetria empilhadeira.pdf',
        ],
    },
    {
        id: 'auditorias', title: 'Auditorias',
        folder: '05 - Cronograma de auditorias 2026',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        items: [
            'Cronograma VPO 2026.pdf',
        ],
    },
    {
        id: 'scorecard', title: 'Scorecard',
        folder: '06 - Scorecard',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14h6"/><path d="M9 10h6"/><path d="M9 18h6"/></svg>`,
        items: [
            'Painel Scorecard v2 - abril.xlsx',
            'SCORECARD 2026.png',
        ],
    },
];


const cleanName  = f => f.replace(/\.(pdf|png|xlsx|xls|jpg|jpeg|webp)$/i, '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
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
const loaderText    = document.getElementById('loaderText');
const toastEl       = document.getElementById('toast');
const toastTextEl   = document.getElementById('toastText');
const searchClear   = document.getElementById('searchClear');
const zoomLevelEl   = document.getElementById('zoomLevel');

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
let lastRenderedKey = null;     // url|slide|width — for skip-rerender detection
const pdfCache = new Map();     // url -> { pages: [{canvas, viewportW, viewportH}], slide, baseWidth }
const SKIP_RERENDER_THRESHOLD = 0.08; // ignore resize if width change < 8%

function setLoaderText(s) {
    if (loaderText) loaderText.textContent = s;
}

async function renderPdf(url, opts = {}) {
    const token = ++renderToken;
    currentResizeUrl = url;
    const slide = slideMode;

    const decodedUrl = decodeURIComponent(url);
    const ext = decodedUrl.split('.').pop().toLowerCase();
    const isImage = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext);
    const isExcel = ['xlsx', 'xls'].includes(ext);

    if (isImage) {
        pdfCanvas.classList.remove('slide-mode');
        pdfCanvas.innerHTML = `
            <div class="img-viewer-wrap">
                <img src="${url}" alt="${escapeAttr(viewerTitle.textContent)}" />
            </div>
        `;
        pdfCanvas.classList.add('loaded');
        loader.hidden = true;
        pageIndicator.hidden = true;
        totalPages = 0;
        lastRenderedKey = `${url}|img`;
        return;
    }

    if (isExcel) {
        pdfCanvas.classList.remove('slide-mode');
        pdfCanvas.innerHTML = `
            <div class="xlsx-viewer-wrap">
                <div style="font-size:64px;color:#10B981;margin-bottom:8px;display:grid;place-items:center;">
                    <svg viewBox="0 0 24 24" width="72" height="72" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <path d="M8 13h2v7H8z"/>
                        <path d="M14 13h2v7h-2z"/>
                        <path d="M8 17h8"/>
                    </svg>
                </div>
                <h3>Planilha Excel (Scorecard)</h3>
                <p>Planilhas do Excel não podem ser visualizadas diretamente no navegador. Clique no botão abaixo para baixar e abrir o arquivo.</p>
                <a href="${url}" download class="btn-primary" style="text-decoration:none;margin-top:10px;display:inline-flex;align-items:center;gap:8px;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Baixar Planilha
                </a>
            </div>
        `;
        pdfCanvas.classList.add('loaded');
        loader.hidden = true;
        pageIndicator.hidden = true;
        totalPages = 0;
        lastRenderedKey = `${url}|excel`;
        return;
    }

    const slideKey = slide ? 's' : 'd';
    const wKey = Math.round((slide ? pdfCanvas.clientWidth : pdfCanvas.clientWidth) / 20) * 20;
    const renderKey = `${url}|${slideKey}|${wKey}`;

    // Skip re-render if width changed only slightly
    if (!opts.force && lastRenderedKey) {
        const [lUrl, lMode, lW] = lastRenderedKey.split('|');
        if (lUrl === url && lMode === slideKey) {
            const widthChange = Math.abs(wKey - Number(lW)) / Math.max(Number(lW), 1);
            if (widthChange < SKIP_RERENDER_THRESHOLD) {
                return; // current rendering is good enough
            }
        }
    }

    // Try cache
    const cacheKey = `${url}|${slideKey}`;
    const cached = pdfCache.get(cacheKey);
    if (!opts.force && cached && Math.abs(cached.baseWidth - pdfCanvas.clientWidth) / cached.baseWidth < 0.05) {
        pdfCanvas.innerHTML = '';
        for (const p of cached.pages) {
            if (slide) {
                const wrap = document.createElement('div');
                wrap.className = 'pdf-page';
                wrap.appendChild(p.canvas);
                pdfCanvas.appendChild(wrap);
            } else {
                pdfCanvas.appendChild(p.canvas);
            }
        }
        totalPages = cached.pages.length;
        pageTotalEl.textContent = totalPages;
        pageNumEl.textContent = 1;
        pdfCanvas.classList.add('loaded');
        loader.hidden = true;
        applyDesktopZoom();
        lastRenderedKey = renderKey;
        updatePageIndicator();
        return;
    }

    pdfCanvas.classList.remove('loaded');
    pdfCanvas.innerHTML = '';
    loader.hidden = false;
    loader.classList.remove('fading');
    setLoaderText('Baixando manual…');

    if (!setupPdfJs()) {
        await new Promise(r => setTimeout(r, 200));
        setupPdfJs();
    }

    try {
        const task = window.pdfjsLib.getDocument(url);
        task.onProgress = (data) => {
            if (token !== renderToken || !data) return;
            if (data.total) {
                const pct = Math.min(99, Math.floor((data.loaded / data.total) * 100));
                setLoaderText(`Baixando manual… ${pct}%`);
            }
        };
        const pdf = await task.promise;
        if (token !== renderToken) return;
        totalPages = pdf.numPages;
        pageTotalEl.textContent = totalPages;
        pageNumEl.textContent = 1;
        setLoaderText('Renderizando…');
        updatePageIndicator();

        const containerWidth = Math.max(pdfCanvas.clientWidth - (slide ? 20 : 32), 280);
        const containerHeight = pdfCanvas.clientHeight - (slide ? 20 : 0);
        const dpr = window.devicePixelRatio || 1;

        const QUALITY = slide ? 4 : 3;
        const renderScale = Math.max(QUALITY, dpr * 1.5);

        const newCache = { pages: [], slide, baseWidth: pdfCanvas.clientWidth };

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

            const canvas = document.createElement('canvas');
            canvas.width = Math.floor(viewport.width * renderScale);
            canvas.height = Math.floor(viewport.height * renderScale);
            canvas.style.width = Math.floor(viewport.width) + 'px';
            canvas.style.height = Math.floor(viewport.height) + 'px';
            canvas.dataset.naturalWidth = Math.floor(viewport.width);

            if (slide) {
                const wrap = document.createElement('div');
                wrap.className = 'pdf-page';
                wrap.appendChild(canvas);
                pdfCanvas.appendChild(wrap);
            } else {
                pdfCanvas.appendChild(canvas);
            }

            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const renderContext = {
                canvasContext: ctx,
                viewport,
                transform: [renderScale, 0, 0, renderScale, 0, 0],
            };
            await page.render(renderContext).promise;
            if (token !== renderToken) return;

            newCache.pages.push({ canvas, viewportW: viewport.width, viewportH: viewport.height });

            if (i === 1) {
                pdfCanvas.classList.add('loaded');
                loader.classList.add('fading');
                setTimeout(() => { if (token === renderToken) loader.hidden = true; }, 300);
            }
        }

        pdfCache.set(cacheKey, newCache);
        lastRenderedKey = renderKey;
        applyDesktopZoom();
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
        if (!viewer.classList.contains('is-active')) return;
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

/* Page indicator updates on scroll (both modes) */
pdfCanvas.addEventListener('scroll', updatePageIndicator, { passive: true });

/* Ctrl + wheel = zoom on desktop */
pdfCanvas.addEventListener('wheel', (e) => {
    if (slideMode) return;
    if (!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    setDesktopZoom(desktopZoom + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
}, { passive: false });

function openPdf(href, name, tag, triggerBtn) {
    // If clicking the same PDF that's already open, do nothing
    if (currentResizeUrl === href && viewer.classList.contains('is-active')) {
        return;
    }

    const wasActive = viewer.classList.contains('is-active');

    const decodedUrl = decodeURIComponent(href);
    const ext = decodedUrl.split('.').pop().toLowerCase();
    const isPdf = ext === 'pdf';

    viewerTitle.textContent = name;
    viewerTitle.title = name;
    viewerTag.textContent = tag;
    viewerOpen.href = href;
    viewerDl.href = href;
    viewerDl.setAttribute('download', name + '.' + ext);

    viewer.classList.add('is-active');

    // Show/hide zoom group based on whether it is a PDF
    const zoomGroup = document.getElementById('zoomGroup');
    if (zoomGroup) {
        zoomGroup.style.display = isPdf ? '' : 'none';
    }

    // Set mode based on current device state before rendering
    slideMode = isPdf && (manualFullscreen || (isMobile() && isLandscape()));
    pdfCanvas.classList.toggle('slide-mode', slideMode);
    pageIndicator.hidden = !isPdf;
    pageIndicator.classList.remove('show');
    viewer.classList.toggle('is-fullscreen', manualFullscreen);

    // Reset desktop zoom for new PDF
    desktopZoom = 1;
    updateZoomLabel();

    if (wasActive) {
        // Fade-out current content before rendering new
        pdfCanvas.classList.add('swap-out');
        setTimeout(() => {
            pdfCanvas.classList.remove('swap-out');
            renderPdf(href);
        }, 200);
    } else {
        renderPdf(href);
    }

    document.querySelectorAll('.pdf.is-active').forEach(el => el.classList.remove('is-active'));
    if (triggerBtn) triggerBtn.classList.add('is-active');

    // Show double-tap hint the first time slide mode is used
    if (slideMode && !localStorage.getItem('hint_doubletap')) {
        showToast('Toque duas vezes para zoom rápido. Pinça para zoom livre.', 4500);
        localStorage.setItem('hint_doubletap', '1');
    }
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
    pageIndicator.classList.remove('show');
    desktopZoom = 1;
    updateZoomLabel();
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

/* Toast */
let toastTimer;
function showToast(text, ms = 3000) {
    if (!toastEl) return;
    toastTextEl.textContent = text;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastEl.classList.remove('show');
        setTimeout(() => { toastEl.hidden = true; }, 300);
    }, ms);
}

/* Desktop zoom (CSS scale on canvas widths) */
let desktopZoom = 1;
const ZOOM_STEP = 0.2;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;

function applyDesktopZoom() {
    if (slideMode) return; // desktop only
    pdfCanvas.classList.toggle('is-zoomed', desktopZoom > 1.01);
    pdfCanvas.querySelectorAll('canvas').forEach(c => {
        const nw = parseFloat(c.dataset.naturalWidth || c.style.width);
        c.style.width = (nw * desktopZoom) + 'px';
        c.style.height = 'auto';
        c.style.maxWidth = desktopZoom > 1.01 ? 'none' : '';
    });
}
function setDesktopZoom(z) {
    desktopZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));
    applyDesktopZoom();
    updateZoomLabel();
}
function updateZoomLabel() {
    if (zoomLevelEl) zoomLevelEl.textContent = Math.round(desktopZoom * 100) + '%';
}

/* Page indicator updates (both modes) */
function updatePageIndicator() {
    if (!viewer.classList.contains('is-active') || totalPages === 0) {
        pageIndicator.classList.remove('show');
        return;
    }
    let pageNum = 1;
    if (slideMode) {
        const pw = pdfCanvas.clientWidth;
        if (pw) pageNum = Math.min(Math.max(Math.round(pdfCanvas.scrollLeft / pw) + 1, 1), totalPages);
    } else {
        // Find which canvas is most visible in scroll mode
        const canvases = [...pdfCanvas.querySelectorAll('canvas')];
        const center = pdfCanvas.scrollTop + pdfCanvas.clientHeight / 2;
        let bestIdx = 0, bestDist = Infinity;
        canvases.forEach((c, idx) => {
            const top = c.offsetTop;
            const mid = top + c.offsetHeight / 2;
            const d = Math.abs(mid - center);
            if (d < bestDist) { bestDist = d; bestIdx = idx; }
        });
        pageNum = bestIdx + 1;
    }
    pageNumEl.textContent = pageNum;
    pageIndicator.classList.add('show');
    clearTimeout(pageIndicatorTimer);
    pageIndicatorTimer = setTimeout(() => {
        if (!slideMode) pageIndicator.classList.remove('show');
    }, 1500);
}
let pageIndicatorTimer;

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

    const zoomBtn = e.target.closest('[data-zoom]');
    if (zoomBtn) {
        const action = zoomBtn.dataset.zoom;
        if (action === '+') setDesktopZoom(desktopZoom + ZOOM_STEP);
        else if (action === '-') setDesktopZoom(desktopZoom - ZOOM_STEP);
        else setDesktopZoom(1);
        return;
    }

    if (e.target.closest('#searchClear')) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
        return;
    }

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
        return;
    }

    // Slide mode arrow keys
    if (slideMode && viewer.classList.contains('is-active') &&
        document.activeElement.tagName !== 'INPUT') {
        const pw = pdfCanvas.clientWidth;
        if (!pw) return;
        const cur = Math.round(pdfCanvas.scrollLeft / pw);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            pdfCanvas.scrollTo({ left: (cur + 1) * pw, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            pdfCanvas.scrollTo({ left: Math.max(0, cur - 1) * pw, behavior: 'smooth' });
        }
    }

    // Desktop zoom shortcuts: Ctrl + / - / 0
    if (!slideMode && viewer.classList.contains('is-active') && (e.ctrlKey || e.metaKey)) {
        if (e.key === '+' || e.key === '=') { e.preventDefault(); setDesktopZoom(desktopZoom + ZOOM_STEP); }
        else if (e.key === '-') { e.preventDefault(); setDesktopZoom(desktopZoom - ZOOM_STEP); }
        else if (e.key === '0') { e.preventDefault(); setDesktopZoom(1); }
    }
});

/* Search */
const searchInput = document.getElementById('searchInput');
const emptyState  = document.getElementById('emptyState');

searchInput.addEventListener('input', () => {
    const q = normalize(searchInput.value.trim());
    searchClear.hidden = !searchInput.value;
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
    setupInstallPrompt();
});

/* ============================================
   PWA install prompt — Android (native) + iOS (instructions)
   Shows max 1×/day on mobile only; never if already installed
   ============================================ */
function setupInstallPrompt() {
    const sheet     = document.getElementById('installSheet');
    const iosModal  = document.getElementById('iosInstructions');
    const acceptBtn = document.getElementById('installAccept');
    if (!sheet || !iosModal) return;

    const LS_KEY = 'installPromptShownAt';
    const DAY_MS = 24 * 60 * 60 * 1000;

    function isMobileDevice() {
        return window.matchMedia('(max-width: 1023px)').matches &&
               ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
    function isIOS() {
        const ua = navigator.userAgent;
        return /iPad|iPhone|iPod/.test(ua) ||
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }
    function isStandalone() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone === true ||
               document.referrer.startsWith('android-app://');
    }
    function shownRecently() {
        const t = parseInt(localStorage.getItem(LS_KEY), 10);
        return !isNaN(t) && (Date.now() - t < DAY_MS);
    }
    function markShown() {
        localStorage.setItem(LS_KEY, Date.now().toString());
    }
    function openSheet(el) {
        el.hidden = false;
        el.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => el.classList.add('open'));
    }
    function closeSheet(el) {
        el.classList.remove('open');
        el.setAttribute('aria-hidden', 'true');
        setTimeout(() => { el.hidden = true; }, 300);
    }

    let deferredPrompt = null;

    // Android: capture native install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    // Hide prompt forever after install + show success animation
    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        localStorage.setItem(LS_KEY, (Date.now() + 365 * DAY_MS).toString());
        closeSheet(sheet);
        closeSheet(iosModal);
        showInstallSuccess();
    });

    function showInstallSuccess() {
        const el = document.getElementById('installSuccess');
        if (!el) return;
        el.hidden = false;
        requestAnimationFrame(() => el.classList.add('show'));
        // Light haptic if supported
        if (navigator.vibrate) navigator.vibrate([15, 60, 15]);
        setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => { el.hidden = true; }, 350);
        }, 2800);
    }

    // Show prompt if criteria met
    function maybeShow() {
        if (isStandalone()) return;
        if (!isMobileDevice()) return;
        if (shownRecently()) return;
        // For iOS, always show our custom prompt (no native install)
        // For Android, wait briefly for beforeinstallprompt to fire
        const ios = isIOS();
        const delay = ios ? 3500 : 4500;
        setTimeout(() => {
            if (isStandalone() || shownRecently()) return;
            if (!ios && !deferredPrompt) return; // Android without prompt event = browser unsupported
            openSheet(sheet);
            markShown();
        }, delay);
    }
    maybeShow();

    // Accept button
    acceptBtn.addEventListener('click', async () => {
        if (isIOS()) {
            closeSheet(sheet);
            setTimeout(() => openSheet(iosModal), 250);
        } else if (deferredPrompt) {
            closeSheet(sheet);
            try {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
            } catch (_) {}
            deferredPrompt = null;
        } else {
            // Fallback: show generic instructions
            closeSheet(sheet);
            setTimeout(() => openSheet(iosModal), 250);
        }
    });

    // Close handlers
    document.addEventListener('click', (e) => {
        if (e.target.closest('[data-install-close]')) closeSheet(sheet);
        if (e.target.closest('[data-ios-close]')) closeSheet(iosModal);
    });

    // Esc closes
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (sheet.classList.contains('open')) closeSheet(sheet);
            if (iosModal.classList.contains('open')) closeSheet(iosModal);
        }
    });
}
