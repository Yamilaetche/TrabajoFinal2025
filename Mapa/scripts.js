  let map = L.map('Mapa').setView([-36.8955, -60.3218], 15)
    
    //capas
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

  
   //menú
   const botonMenu = document.getElementById("boton-menu");
   const menu = document.getElementById("menu");

    botonMenu.addEventListener("click", () => {
      menu.classList.toggle("activo");
});
   //barra de búsqueda
  document.querySelector('.busqueda-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('busqueda-input').value.trim();
    console.log("Buscando:", query);
 
});

//botones de filtros por lugar
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

function filtrarPorTipo(tipo) {
  
}

//marcadores en el mapa
const marcadores = [
  {
    tipo: "restaurante",
    coords: [-36.903173, -60.327349],
    nombre: "Jengibre casa de comida",
    direccion: "25 de Mayo 1818",
    imagen: "imagenes/jengibre cocina.jpg"
  },
  {
    tipo: "cafe",
    coords: [-36.894519, -60.324892],
    nombre: "Café Vega", 
    direccion:"Vicente López 2599",
    imagen:"imagenes/cafe vega.jpg"
  },
  {
    tipo: "dietetica",
    coords: [-36.894792, -60.326319],
    nombre: "Santa Lucía",
    direccion:"Horno 2634",
    imagen:"imagenes/santa lucia.jpg"
  },
  {
    tipo: "mercado",
    coords: [-36.883718, -60.324447],
    nombre: "Almacén Saludable",
    direccion:"Av. Colón 1909",
    imagen:"imagenes/almacen saludable.jpg"
  }
];
  
const marcadoresLeaflet = [];

marcadores.forEach(lugar => {
  const marker = L.marker(lugar.coords).addTo(map)
    .bindTooltip(lugar.nombre, {
      direction: "top"
    });
  marker.tipo = lugar.tipo;
  marcadoresLeaflet.push(marker);

//ventana emergente

 marker.on('click', () => {
    document.getElementById('info-nombre').textContent = lugar.nombre;
    document.getElementById('info-tipo').textContent = `Tipo: ${lugar.tipo}`;
    document.getElementById('info-direccion').textContent = `Dirección: ${lugar.direccion}`;
    document.getElementById('info-imagen').src = lugar.imagen;
    document.getElementById('info-lugar').classList.remove('oculto');
  });
  });

document.getElementById('cerrar-info').addEventListener('click', () => {
  document.getElementById('info-lugar').classList.add('oculto');
});

   //filtrar por tipo
function filtrarPorTipo(tipoSeleccionado) {
  marcadoresLeaflet.forEach(marker => {
    if (tipoSeleccionado === "todos" || marker.tipo === tipoSeleccionado) {
      marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });
}

