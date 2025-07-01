
//Navbar
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navButtons = document.getElementById("nav-buttons");

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navButtons.classList.toggle("active");
  });
  

  // Referencias a botones
  const btnLogin = document.getElementById("btnLogin");
  const btnSuscribite = document.getElementById("btnSuscribite");
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  const btnIrARecetas = document.getElementById("btnIrARecetas");
  const linkRecetas = document.getElementById("linkRecetas");
  const btnRegistrarse = document.getElementById("registrarse");
  const modalLogin = document.getElementById("modalLogin");
  const modalSuscripcion = document.getElementById("modal");
  const cerrarLogin = document.getElementById("cerrarLogin");
  const cerrarModalSuscripcion = document.getElementById("cerrarModal");

  // Recuperar usuarios y usuario actual
  let usuarios = JSON.parse(localStorage.getItem("suscriptos")) || [];
  let usuarioActual = localStorage.getItem("usuarioActual");

  // Mostrar modales
  btnLogin.addEventListener("click", () => {
    modalLogin.style.display = "flex";
  });

  btnSuscribite.addEventListener("click", () => {
    modalSuscripcion.style.display = "flex";
  });

  // Cerrar modales
  cerrarLogin.addEventListener("click", () => {
    modalLogin.style.display = "none";
  });

  cerrarModalSuscripcion.addEventListener("click", () => {
    modalSuscripcion.style.display = "none";
  });

 // Mostrar u ocultar botones según sesión
  if (usuarioActual) {
    if (btnLogin) btnLogin.style.display = "none";
    if (btnSuscribite) btnSuscribite.style.display = "none";
    if (btnCerrarSesion) btnCerrarSesion.style.display = "inline-block";
    if (btnIrARecetas) btnIrARecetas.style.display = "inline-block";

    if (btnCerrarSesion) {
      btnCerrarSesion.addEventListener("click", () => {
        Swal.fire({
          title: '¿Cerrar sesión?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, cerrar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#66bb6a'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("usuarioActual");
            Swal.fire({
              title: 'Sesión cerrada',
              icon: 'success',
              confirmButtonColor: '#66bb6a'
            }).then(() => location.reload());
          }
        });
      });
    }

    if (btnIrARecetas) {
      btnIrARecetas.addEventListener("click", () => {
        window.location.href = "/TrabajoFinal2025/Recetas/recetas.html";
      });
    }
  }
 
  // Evento para link "Recetas" del menú
  linkRecetas.addEventListener("click", (e) => {
  e.preventDefault(); // evita que redirija

  if (usuarioActual) {
    // Está suscripto → redireccionamos
    window.location.href="/TrabajoFinal2025/Recetas/recetas.html";
  } else {
    // No está suscripto → mostramos mensaje
    Swal.fire({
  title: 'Contenido exclusivo',
  text: 'Suscribite o inicia seccion para acceder a las recetas sin TACC.',
  icon: 'info',
  showCancelButton: true,
  confirmButtonText: 'Suscribirme',
  cancelButtonText: 'Cancelar',
  confirmButtonColor: '#66bb6a'
}).then((result) => {
  if (result.isConfirmed) {
     modalSuscripcion.style.display = "flex";
  }
});
}
});

  // Validar email
  function emailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // LOGIN
  const loginForm = document.querySelector("#modalLogin form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector("input[type='email']").value.trim().toLowerCase();
    const password = loginForm.querySelector("input[type='password']").value;

    let usuarios = JSON.parse(localStorage.getItem("suscriptos")) || [];
    const usuario = usuarios.find(u => u.email === email && u.password === password);


    if (!emailValido(email)) {
      Swal.fire({
        title: 'Email inválido',
        text: 'Ingresá un email válido.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#66bb6a'
      });
      return;
    }

    if (usuario) {
      localStorage.setItem("usuarioActual", email);
      Swal.fire({
        title: 'Inicio exitoso',
        text: 'Bienvenido nuevamente.',
        icon: 'success',
        confirmButtonText: 'Gracias',
        confirmButtonColor: '#66bb6a'
      }).then(() => {
        modalLogin.style.display = "none";
        location.reload();
      });
    } else {
      Swal.fire({
        title: 'Datos incorrectos',
        text: 'Email o contraseña incorrectos.',
        icon: 'warning',
        confirmButtonText: 'Reintentar',
        confirmButtonColor: '#66bb6a'
      });
    }
  });

  // REGISTRO
  if (btnRegistrarse) {
  btnRegistrarse.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

     if (!nombre || !apellido) {
    Swal.fire({
      title: 'Faltan datos',
      text: 'Completá tu nombre y apellido.',
      icon: 'warning',
      confirmButtonColor: '#66bb6a'
    });
    return;
  }

    if (!emailValido(email)) {
      Swal.fire({
        title: 'Email inválido',
        text: 'Ingresá un email válido.',
        icon: 'error',
        confirmButtonColor: '#66bb6a'
      });
      return;
    }

    if (password.length < 4) {
      Swal.fire({
        title: 'Contraseña muy corta',
        text: 'Debe tener al menos 4 caracteres.',
        icon: 'warning',
        confirmButtonColor: '#66bb6a'
      });
      return;
    }

    const yaExiste = usuarios.find(u => u.email === email);
    if (yaExiste) {
      Swal.fire({
        title: 'Ya registrado',
        text: 'Este email ya está suscripto.',
        icon: 'info',
        confirmButtonColor: '#66bb6a'
      });
    } else {
      usuarios.push({ email, password, nombre, apellido });
      localStorage.setItem("suscriptos", JSON.stringify(usuarios));
      localStorage.setItem("usuarioActual", email);

      Swal.fire({
        title: '¡Suscripción exitosa!',
        text: 'Ya podés acceder al contenido exclusivo.',
        icon: 'success',
        confirmButtonColor: '#66bb6a'
      }).then(() => {
        modalSuscripcion.style.display = "none";
        location.reload();
      });
    }
  });
   }
   }); 
 
 