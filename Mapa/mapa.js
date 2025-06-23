document.addEventListener("DOMContentLoaded", () => {
  // --- Menú hamburguesa ---
  const botonMenu = document.getElementById("boton-menu");
  const menu = document.getElementById("menu");

  botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo");
  });

  // --- Inicializar mapa Leaflet ---
  let map = L.map('Mapa').setView([-36.8955, -60.3218], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // --- Barra de búsqueda ---
  document.querySelector('.busqueda-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('busqueda-input').value.trim();
    console.log("Buscando:", query);
    // Aquí podés implementar la lógica de búsqueda
  });

  // --- Filtros por tipo ---
  const botonesFiltro = document.querySelectorAll('.filtro-btn');

  botonesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');

      const tipo = btn.getAttribute('data-tipo');
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
        "imagenes/jengibre cocina.jpg",
        "imagenes/jen1.jpeg",
        "imagenes/jen2.jpeg",
        "imagenes/jen3.jpeg",
        "imagenes/jen4.jpeg",
        "imagenes/jen5.jpeg"
      ]
    },
    {
      tipo: "cafe",
      coords: [-36.894519, -60.324892],
      nombre: "Café Vega",
      direccion: "Vicente López 2599",
      imagenes: [
        "imagenes/cafe vega.jpg",
        "imagenes/vega1.jpeg",
        "imagenes/vega2.jpeg",
        "imagenes/vega3.jpeg",
        "imagenes/vega4.jpeg",
        "imagenes/vega5.jpeg"
      ]
    },
    {
      tipo: "dietetica",
      coords: [-36.894792, -60.326319],
      nombre: "Santa Lucía",
      direccion: "Horno 2634",
      imagenes: [
        "imagenes/santa lucia.jpg",
        "imagenes/sl1.jpeg",
        "imagenes/sl2.jpeg",
        "imagenes/sl3.jpeg",
        "imagenes/sl4.jpeg",
        "imagenes/sl5.jpeg"
      ]
    },
    {
      tipo: "mercado",
      coords: [-36.883718, -60.324447],
      nombre: "Almacén Saludable",
      direccion: "Av. Colón 1909",
      imagenes: [
        "imagenes/almacen saludable.jpg",
        "imagenes/as1.jpeg",
        "imagenes/as2.jpeg",
        "imagenes/as3.jpeg",
        "imagenes/as4.jpeg",
        "imagenes/as5.jpeg"
      ]
    }
  ];

  // --- Agregar marcadores al mapa ---
  const marcadoresLeaflet = [];

  marcadores.forEach(lugar => {
    const marker = L.marker(lugar.coords).addTo(map)
      .bindTooltip(lugar.nombre, { direction: "top" });

    marker.tipo = lugar.tipo;
    marcadoresLeaflet.push(marker);

    // Mostrar info del lugar al hacer clic
    marker.on('click', () => {
      document.getElementById('info-nombre').textContent = lugar.nombre;
      document.getElementById('info-tipo').textContent = `Tipo: ${lugar.tipo}`;
      document.getElementById('info-direccion').textContent = `Dirección: ${lugar.direccion}`;
      imagenesActuales = lugar.imagenes;
      imagenActual = 0;
      document.getElementById('info-imagen').src = imagenesActuales[imagenActual];
      document.getElementById('info-lugar').classList.remove('oculto');
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

function mostrarInfoLugar(lugar) {
  lugarActual = lugar;

  document.getElementById("info-nombre").textContent = lugar.nombre;
  document.getElementById("info-tipo").textContent = lugar.tipo;
  document.getElementById("info-direccion").textContent = lugar.direccion;
  document.getElementById("info-imagen").src = lugar.imagen || "";

  mostrarComentarios(lugar.nombre);
  
  document.getElementById("info-lugar").classList.remove("oculto");
}

  // lugares favoritos
  let lugarActual = null; // Lugar que se está mostrando en el panel

  document.getElementById("agregar-favorito").addEventListener("click", () => {
  if (!lugarActual) return;
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  
  // Evitar duplicados
  if (!favoritos.find(l => l.nombre === lugarActual.nombre)) {
    favoritos.push(lugarActual);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("¡Agregado a favoritos!");
  } else {
    alert("Este lugar ya está en favoritos.");
  }
});
  //Comentarios
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
//mostrar favoritos y comentarios
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

function cerrarModalFavoritos() {
  document.getElementById("modal-favoritos").classList.add("oculto");
}
document.querySelector(".btn-comentarios").addEventListener("click", () => {
  const lista = document.getElementById("lista-todos-comentarios");
  lista.innerHTML = "";

  let comentariosTotales = [];

  // Recorremos todas las claves del localStorage
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

function cerrarModalComentarios() {
  document.getElementById("modal-comentarios").classList.add("oculto");
}

  // Carrusel de imágenes
  let imagenActual = 0;
  let imagenesActuales = [];

  document.getElementById('prev').addEventListener('click', () => {
    if (imagenesActuales.length > 0) {
      imagenActual = (imagenActual - 1 + imagenesActuales.length) % imagenesActuales.length;
      document.getElementById('info-imagen').src = imagenesActuales[imagenActual];
    }
  });

  document.getElementById('next').addEventListener('click', () => {
    if (imagenesActuales.length > 0) {
      imagenActual = (imagenActual + 1) % imagenesActuales.length;
      document.getElementById('info-imagen').src = imagenesActuales[imagenActual];
    }
  });

  // --- Abrir imagen en modal ---
  document.getElementById('info-imagen').addEventListener('click', () => {
    if (imagenesActuales.length > 0) {
      document.getElementById('modal-img').src = imagenesActuales[imagenActual];
      document.getElementById('modal-imagen').classList.remove('oculto');
    }
  });

  document.getElementById('cerrar-modal').addEventListener('click', () => {
    document.getElementById('modal-imagen').classList.add('oculto');
  });

  // --- Cerrar ventana info lugar ---
  document.getElementById('cerrar-info').addEventListener('click', () => {
    document.getElementById('info-lugar').classList.add('oculto');
  });

  // --- Función para filtrar marcadores ---
  function filtrarPorTipo(tipoSeleccionado) {
    marcadoresLeaflet.forEach(marker => {
      if (tipoSeleccionado === "todos" || marker.tipo === tipoSeleccionado) {
        marker.addTo(map);
      } else {
        map.removeLayer(marker);
      }
    });
  }
});

