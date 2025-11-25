// modal.js — funções que criam e controlam modais reutilizáveis
export function createModal(){
const modal = document.createElement('div');
modal.className = 'modal overlay';
modal.style.display = 'none';
modal.setAttribute('role','dialog');
modal.innerHTML = `
<div class="modalCard card">
<div class="modal-header"><h3 id="modalTitle"></h3><button id="modalClose" class="btn ghost">Fechar</button></div>
<form id="modalForm"><div id="modalBody"></div><div class="modal-actions"><button type="button" id="cancelModal" class="btn ghost">Cancelar</button><button type="submit" class="btn">Salvar</button></div></form>
</div>`;
document.body.appendChild(modal);


function open(title, bodyHtml){
modal.querySelector('#modalTitle').textContent = title;
modal.querySelector('#modalBody').innerHTML = bodyHtml || '';
modal.style.display = 'flex';
}
function close(){ modal.style.display='none'; }
modal.querySelector('#modalClose').addEventListener('click', close);
modal.querySelector('#cancelModal').addEventListener('click', close);
return { open, close, el: modal };
}