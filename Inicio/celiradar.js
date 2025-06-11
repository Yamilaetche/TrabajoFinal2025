const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const irMapa = document.getElementById('ir-mapa');
const modal = document.getElementById('modal');

menuBtn.onclick = () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
};

irMapa.onclick = () => {
  modal.style.display = 'flex';
};

function cerrarModal() {
  modal.style.display = 'none';
}

window.onclick = function(e) {
  if (e.target === modal) {
    cerrarModal();
  }
};
