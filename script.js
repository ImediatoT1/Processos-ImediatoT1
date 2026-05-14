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
const app          = document.getElementById('app');
const viewer       = document.getElementById('viewer');
const viewerTitle  = document.getElementById('viewerTitle');
const viewerTag    = document.getElementById('viewerTag');
const pdfCanvas    = document.getElementById('pdfCanvas');
const loader       = document.getElementById('pdfLoader');
const viewerOpen   = document.getElementById('viewerOpen');
const viewerDl     = document.getElementById('viewerDownload');

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
        // pdf.js not yet loaded; wait briefly
        await new Promise(r => setTimeout(r, 200));
        setupPdfJs();
    }

    try {
        const pdf = await window.pdfjsLib.getDocument(url).promise;
        if (token !== renderToken) return;

        const containerWidth = Math.max(pdfCanvas.clientWidth - 32, 280);
        const dpr = window.devicePixelRatio || 1;

        for (let i = 1; i <= pdf.numPages; i++) {
            if (token !== renderToken) return;
            const page = await pdf.getPage(i);
            const baseViewport = page.getViewport({ scale: 1 });
            const scale = containerWidth / baseViewport.width;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            canvas.width = Math.floor(viewport.width * dpr);
            canvas.height = Math.floor(viewport.height * dpr);
            canvas.style.width = Math.floor(viewport.width) + 'px';
            canvas.style.height = Math.floor(viewport.height) + 'px';
            pdfCanvas.appendChild(canvas);

            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport,
                transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null,
            };
            await page.render(renderContext).promise;
            if (token !== renderToken) return;

            // Show after first page loads
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

function openPdf(href, name, tag, triggerBtn) {
    viewerTitle.textContent = name;
    viewerTitle.title = name;
    viewerTag.textContent = tag;
    viewerOpen.href = href;
    viewerDl.href = href;
    viewerDl.setAttribute('download', name);

    viewer.classList.add('is-active');
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
