let map = L.map('Mapa').setView([-36.8955, -60.3218], 15);

// Capa base del mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Menú hamburguesa
const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", () => {
  menu.classList.toggle("activo");
});

// Barra de búsqueda
document.querySelector('.busqueda-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = document.getElementById('busqueda-input').value.trim();
  console.log("Buscando:", query);
  // Aquí podrías implementar la lógica de búsqueda
});

// Filtros por tipo
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

// Lista de lugares
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
     imagenes:[
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
    imagenes:[ 
      "imagenes/almacen saludable.jpg",
      "imagenes/as1.jpeg",
      "imagenes/as2.jpeg",
      "imagenes/as3.jpeg",
      "imagenes/as4.jpeg",  
       "imagenes/as5.jpeg",
    ]
  }
];

// Agregar marcadores
const marcadoresLeaflet = [];

marcadores.forEach(lugar => {
  const marker = L.marker(lugar.coords).addTo(map)
    .bindTooltip(lugar.nombre, { direction: "top" });

  marker.tipo = lugar.tipo;
  marcadoresLeaflet.push(marker);

  // Ventana emergente al hacer clic en el marcador
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

document.getElementById('info-imagen').addEventListener('click', () => {
  if (imagenesActuales.length > 0) {
    document.getElementById('modal-img').src = imagenesActuales[imagenActual];
    document.getElementById('modal-imagen').classList.remove('oculto');
  }
});

document.getElementById('cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-imagen').classList.add('oculto');
});


// Cerrar la ventana emergente
document.getElementById('cerrar-info').addEventListener('click', () => {
  document.getElementById('info-lugar').classList.add('oculto');
});

// Función para filtrar los marcadores por tipo
function filtrarPorTipo(tipoSeleccionado) {
  marcadoresLeaflet.forEach(marker => {
    if (tipoSeleccionado === "todos" || marker.tipo === tipoSeleccionado) {
      marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });
}


