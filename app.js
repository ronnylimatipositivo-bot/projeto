import { createModal } from './modal.js';
import { ensureChart, updateChartSafe } from './chart.js';


const STORAGE_KEY = 'gojuice_vfinal_v2';
let state = { products: [], sales: [] };


function uid(pref='id'){ return pref + '_' + Math.random().toString(36).slice(2,9); }
function formatMoney(v){ return Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function loadState(){ try{ const raw = localStorage.getItem(STORAGE_KEY); if(raw) state = JSON.parse(raw); if(!state.products) state.products = []; if(!state.sales) state.sales = []; }catch(e){ state = { products:[], sales:[] }; } }


// DOM helpers: render incremental
function createTableFragment(rowsHtml){
const frag = document.createDocumentFragment();
const wrapper = document.createElement('div');
wrapper.innerHTML = rowsHtml;
Array.from(wrapper.children).forEach(c=>frag.appendChild(c));
return frag;
}


// sanitize URL (very basic) — rejeita javascript: scheme
function safeUrl(url){ try{ if(!url) return ''; const u = url.trim(); if(u.toLowerCase().startsWith('javascript:')) return ''; return u; }catch(e){ return ''; } }


// Initial setup
loadState();
if(!state.products.length && !state.sales.length){
state.products = [ { id:uid('p'), name:'Suco Natural - Laranja', price:6.5, qty:20 } ];
saveState();
}


// minimal: export for debug only when in dev
if(location.search.includes('debug')) window._gojuice = { state, saveState };


// UI bindings (examples)
const productsCountEl = document.getElementById('productsCount');
function render(){
productsCountEl && (productsCountEl.textContent = state.products.length);
// outras renderizações simplificadas — detalhes gerenciados aqui, usando fragments
}


// Debounced chart update
let chart = null;
let chartCanvas = document.getElementById('salesChart');
let chartTimer = null;
function scheduleChartUpdate(){
clearTimeout(chartTimer);
chartTimer = setTimeout(async ()=>{
if(!chartCanvas) return;
chart = await ensureChart(chartCanvas);
// gerar dados (simplificado) e atualizar
const data = { labels:['A','B'], datasets:[{label:'Vendas',data:[1,2]}] };
updateChartSafe(chart, data);
}, 150);
}


// attach events
document.getElementById('btnSalesPanel')?.addEventListener('click', ()=>{
document.getElementById('dashboardView').style.display = 'none';
document.getElementById('salesPanel').style.display = 'block';
scheduleChartUpdate();
});


// backup
document.getElementById('backupBtn')?.addEventListener('click', ()=>{
const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a'); a.href = url; a.download = 'gojuice-backup.json'; a.click(); URL.revokeObjectURL(url);
});


render();