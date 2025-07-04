  // --- Inicializar mapa Leaflet ---
  const map = L.map("Mapa").setView([-36.8955, -60.3218], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);



  // --- Barra de búsqueda ---
  document.querySelector(".busqueda-form").addEventListener("submit", e => {
    e.preventDefault();
    const query = document.getElementById("busqueda-input").value.trim();
    console.log("Buscando:", query);
    // Aquí podés implementar la lógica de búsqueda
  });

  // --- Filtros por tipo ---
  const botonesFiltro = document.querySelectorAll(".filtro-btn");
  botonesFiltro.forEach(btn => {
    btn.addEventListener("click", () => {
      botonesFiltro.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");

      const tipo = btn.getAttribute("data-tipo");
      console.log("Filtrando por tipo:", tipo);
      filtrarPorTipo(tipo);
    });
  });

  // --- Lista de lugares ---
  const marcadores = [
    {
      tipo: "restaurante",
      coords: [-36.903173, -60.327349],
      nombre: "Jengibre casa de comida",
      direccion: "25 de Mayo 1818",
      imagenes: [
        "/IMAGENES/jengibre cocina.jpg",
        "/IMAGENES/jen1.jpeg",
        "/IMAGENES/jen2.jpeg",
        "/IMAGENES/jen3.jpeg",
        "/IMAGENES/jen4.jpeg",
        "/IMAGENES/jen5.jpeg"
      ]
    },
    {
      tipo: "restaurante",
      coords: [-36.894273, -60.322631],
      nombre: "Macola",
      direccion: "Rivadavia 2730",
      imagenes: ["imagenes/Macola- imagen 1.jpg",
        "/IMAGENES/Macola-imagen 2.jpg",
        "/IMAGENES/Macola-imagen 3.jpg",
        "/IMAGENES/Macola-imagen 4.jpg",
        "/IMAGENES/Macola-imagen5.jpg"
      ]
    },
    {
      tipo: "cafe",
      coords: [-36.894519, -60.324892],
      nombre: "Café Vega",
      direccion: "Vicente López 2599",
      imagenes: [
        "/IMAGENES/cafe vega.jpg",
        "/IMAGENES/vega1.jpeg",
        "/IMAGENES/vega2.jpeg",
        "/IMAGENES/vega3.jpeg",
        "/IMAGENES/vega4.jpeg",
        "/IMAGENES/vega5.jpeg"
      ]
    },
    {
      tipo: "cafe",
      coords: [-36.894502, -60.321556],
      nombre: "Cafetto",
      direccion: "San Martin & Moreno",
      imagenes: ["imagenes/Cafetto- imag1.jpg",
        "/IMAGENES/cafetto-imag2.jpg",
        "/IMAGENES/cafetto-imag3.jpg",
        "/IMAGENES/cafetto-imag4.jpg",
        "/IMAGENES/cafetto-imag5.jpg"
        
      ]
    },
    {
      tipo: "dietetica",
      coords: [-36.894792, -60.326319],
      nombre: "Santa Lucía",
      direccion: "Horno 2634",
      imagenes: [
        "/IMAGENES/santa lucia.jpg",
        "/IMAGENES/sl1.jpeg",
        "/IMAGENES/sl2.jpeg",
        "/IMAGENES/sl3.jpeg",
        "/IMAGENES/sl4.jpeg",
        "/IMAGENES/sl5.jpeg"
      ]
    },
    {
      tipo: "dietetica",
      coords: [-36.892211, -60.319249],
      nombre: "Dietética Olavarría",
      direccion: "Necoche 2875",
      imagenes: ["imagenes/dietOla-img1.webp",
        "/IMAGENES/dietOlav-imag2.webp",
        "/IMAGENES/dietOlav-imag3.webp",
        "/IMAGENES/dietOlav-imag4.webp",
        "/IMAGENES/dietOlav-imag5.webp" 
      ]
    },
    {
      tipo: "mercado",
      coords: [-36.883718, -60.324447],
      nombre: "Almacén Saludable",
      direccion: "Av. Colón 1909",
      imagenes: [
        "/IMAGENES/almacen saludable.jpg",
        "/IMAGENES/as1.jpeg",
        "/IMAGENES/as2.jpeg",
        "/IMAGENES/as3.jpeg",
        "/IMAGENES/as4.jpeg",
        "/IMAGENES/as5.jpeg"
      ]
    },
     {
      tipo: "mercado",
      coords: [-36.894084, -60.322575],
      nombre: "Supermercado Día",
      direccion: "Rivadavia 2746",
      imagenes: [
        "/IMAGENES/dia-imag1.jpeg",
        "/IMAGENES/dia-imag2.webp",
        "/IMAGENES/dia-imag3.webp"

      ]
    }
  ];

  const marcadoresLeaflet = [];
  let lugarActual = null;
  let imagenActual = 0;
  let imagenesActuales = [];

  // --- Agregar marcadores al mapa ---
  marcadores.forEach(lugar => {
    const marker = L.marker(lugar.coords).addTo(map).bindTooltip(lugar.nombre, { direction: "top" });
    marker.tipo = lugar.tipo;
    marcadoresLeaflet.push(marker);

    marker.on("click", () => {
      lugarActual = lugar;
      imagenesActuales = lugar.imagenes;
      imagenActual = 0;

      document.getElementById("info-nombre").textContent = lugar.nombre;
      document.getElementById("info-tipo").textContent = `Tipo: ${lugar.tipo}`;
      document.getElementById("info-direccion").textContent = `Dirección: ${lugar.direccion}`;
      document.getElementById("info-imagen").src = imagenesActuales[imagenActual];

      mostrarComentarios(lugar.nombre);
      document.getElementById("info-lugar").classList.remove("oculto");
    });
  });

  function mostrarComentarios(nombreLugar) {
    const lista = document.getElementById("lista-comentarios");
    lista.innerHTML = "";

    const comentarios = JSON.parse(localStorage.getItem(`comentarios_${nombreLugar}`)) || [];
    comentarios.forEach(c => {
      const li = document.createElement("li");
      li.textContent = c;
      lista.appendChild(li);
    });
  }

  // --- Agregar a favoritos ---
  document.getElementById("agregar-favorito").addEventListener("click", () => {
    if (!lugarActual) return;
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favoritos.find(l => l.nombre === lugarActual.nombre)) {
      favoritos.push(lugarActual);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      alert("¡Agregado a favoritos!");
    } else {
      alert("Este lugar ya está en favoritos.");
    }
  });

  // --- Guardar comentario ---
  document.getElementById("guardar-comentario").addEventListener("click", () => {
    const texto = document.getElementById("comentario-texto").value.trim();
    if (!texto || !lugarActual) return;

    const clave = `comentarios_${lugarActual.nombre}`;
    const comentarios = JSON.parse(localStorage.getItem(clave)) || [];
    comentarios.push(texto);
    localStorage.setItem(clave, JSON.stringify(comentarios));

    document.getElementById("comentario-texto").value = "";
    mostrarComentarios(lugarActual.nombre);
  });

  // --- Mostrar favoritos ---
  document.querySelector(".btn-favoritos").addEventListener("click", () => {
    const lista = document.getElementById("lista-favoritos");
    lista.innerHTML = "";

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
      lista.innerHTML = "<li>No hay favoritos guardados.</li>";
    } else {
      favoritos.forEach(lugar => {
        const li = document.createElement("li");
        li.textContent = `${lugar.nombre} (${lugar.tipo}) - ${lugar.direccion}`;
        lista.appendChild(li);
      });
    }

    document.getElementById("modal-favoritos").classList.remove("oculto");
  });

  // --- Mostrar comentarios globales ---
  document.querySelector(".btn-comentarios").addEventListener("click", () => {
    const lista = document.getElementById("lista-todos-comentarios");
    lista.innerHTML = "";

    let comentariosTotales = [];
    for (let clave in localStorage) {
      if (clave.startsWith("comentarios_")) {
        const nombreLugar = clave.replace("comentarios_", "");
        const comentarios = JSON.parse(localStorage.getItem(clave)) || [];
        comentarios.forEach(comentario => {
          comentariosTotales.push({ lugar: nombreLugar, texto: comentario });
        });
      }
    }

    if (comentariosTotales.length === 0) {
      lista.innerHTML = "<li>No hay comentarios guardados.</li>";
    } else {
      comentariosTotales.forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${c.lugar}</strong>: ${c.texto}`;
        lista.appendChild(li);
      });
    }

    document.getElementById("modal-comentarios").classList.remove("oculto");
  });

  // --- Cerrar modales ---
  window.cerrarModalFavoritos = function() {
    document.getElementById("modal-favoritos").classList.add("oculto");
  };

  window.cerrarModalComentarios = function() {
    document.getElementById("modal-comentarios").classList.add("oculto");
  };

  // --- Carrusel de imágenes ---
  document.getElementById("prev").addEventListener("click", () => {
    if (imagenesActuales.length > 0) {
      imagenActual = (imagenActual - 1 + imagenesActuales.length) % imagenesActuales.length;
      document.getElementById("info-imagen").src = imagenesActuales[imagenActual];
    }
  });

  document.getElementById("next").addEventListener("click", () => {
    if (imagenesActuales.length > 0) {
      imagenActual = (imagenActual + 1) % imagenesActuales.length;
      document.getElementById("info-imagen").src = imagenesActuales[imagenActual];
    }
  });

  document.getElementById("info-imagen").addEventListener("click", () => {
    if (imagenesActuales.length > 0) {
      document.getElementById("modal-img").src = imagenesActuales[imagenActual];
      document.getElementById("modal-imagen").classList.remove("oculto");
    }
  });

  document.getElementById("cerrar-modal").addEventListener("click", () => {
    document.getElementById("modal-imagen").classList.add("oculto");
  });

  document.getElementById("cerrar-info").addEventListener("click", () => {
    document.getElementById("info-lugar").classList.add("oculto");
  });

  function filtrarPorTipo(tipoSeleccionado) {
    marcadoresLeaflet.forEach(marker => {
      if (tipoSeleccionado === "todos" || marker.tipo === tipoSeleccionado) {
        marker.addTo(map);
      } else {
        map.removeLayer(marker);
      }
    });
  }
  document.addEventListener("DOMContentLoaded", () => {

//Script para toggle de menú 
   document.addEventListener("DOMContentLoaded", () => {
      const toggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");
      const navButtons = document.getElementById("nav-buttons");

      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        navButtons.classList.toggle("active");
      });
    });

      //pagina recetas solo suscriptos
const linkRecetas = document.getElementById("linkRecetas");

linkRecetas.addEventListener("click", (e) => {
  e.preventDefault(); 

  const usuarioActual = localStorage.getItem("usuarioActual");

  if (usuarioActual) {
    window.location.href="/HTML/recetas.html";
  } else {
    Swal.fire({
  title: 'Contenido exclusivo',
  text: 'Suscribite o inicia seccion para acceder a las recetas sin TACC.',
  icon: 'info',
  showCancelButton: true,
  
  });
}
});
});


