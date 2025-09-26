// Estado del usuario
let usuarioLogueado = localStorage.getItem('usuarioLogueado') === 'true';

document.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('btn-login');
  const btnSuscribirse = document.getElementById('btn-suscribirse');
  const modalLogin = document.getElementById('modalLogin');
  const modalSuscribir = document.getElementById('modalSuscribir');
  const cerrarLogin = document.getElementById('cerrarLogin');
  const cerrarSuscribir = document.getElementById('cerrarSuscribir');
  const formLogin = document.getElementById('formLogin');
  const formSuscribir = document.getElementById('formSuscribir');
  const linkRecetas = document.getElementById('link-recetas');

  // Inicializar acceso a recetas
  if(usuarioLogueado){
    btnLogin.textContent = 'Cerrar sesión';
    linkRecetas.classList.remove('disabled');
  } else {
    linkRecetas.classList.add('disabled');
    linkRecetas.addEventListener('click', e => e.preventDefault());
  }

  // --- Botón Login / Cerrar sesión ---
  btnLogin.addEventListener('click', () => {
    if(usuarioLogueado){
      usuarioLogueado = false;
      localStorage.setItem('usuarioLogueado','false');
      Swal.fire({
        title: 'Sesión cerrada',
        icon: 'info',
        confirmButtonText: 'OK'
      }).then(() => window.location.reload());
    } else {
      modalLogin.style.display = 'flex';
    }
  });

  // --- Botón Suscribirse ---
  btnSuscribirse.addEventListener('click', () => {
    modalSuscribir.style.display = 'flex';
  });

  // --- Cerrar modales ---
  cerrarLogin.addEventListener('click', () => modalLogin.style.display = 'none');
  cerrarSuscribir.addEventListener('click', () => modalSuscribir.style.display = 'none');

  // --- Login ---
  formLogin.addEventListener('submit', e => {
    e.preventDefault();
    usuarioLogueado = true;
    localStorage.setItem('usuarioLogueado','true');
    Swal.fire({
      title: 'Login exitoso',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    modalLogin.style.display = 'none';
    btnLogin.textContent = 'Cerrar sesión';
    linkRecetas.classList.remove('disabled');
    linkRecetas.removeEventListener('click', e => e.preventDefault());
  });

  // --- Registro simple ---
  formSuscribir.addEventListener('submit', e => {
    e.preventDefault();
    usuarioLogueado = true;
    localStorage.setItem('usuarioLogueado','true');
    Swal.fire({
      title: 'Registro exitoso',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    modalSuscribir.style.display = 'none';
    btnLogin.textContent = 'Cerrar sesión';
    linkRecetas.classList.remove('disabled');
    linkRecetas.removeEventListener('click', e => e.preventDefault());
  });
});

 
 