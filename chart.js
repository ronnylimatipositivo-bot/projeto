// chart.js — wrapper leve para inicializar Chart.js sob demanda
let ChartInstance = null;
let ChartLibLoaded = false;


function loadChartLib(){
if(ChartLibLoaded) return Promise.resolve();
return new Promise((resolve, reject)=>{
const s = document.createElement('script');
s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
s.defer = true; s.onload = ()=>{ ChartLibLoaded = true; resolve(); };
s.onerror = reject;
document.head.appendChild(s);
});
}


export async function ensureChart(canvas){
await loadChartLib();
if(ChartInstance) return ChartInstance;
const ctx = canvas.getContext('2d');
ChartInstance = new Chart(ctx, {
type:'bar',
data:{ labels: [], datasets: [] },
options:{ responsive:true }
});
return ChartInstance;
}


export function updateChartSafe(chart, data){
// atualiza sem recriar o objeto
chart.data.labels = data.labels;
chart.data.datasets = data.datasets;
chart.update();
}