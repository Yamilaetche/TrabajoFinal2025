document.addEventListener("DOMContentLoaded", () => {
  // --- Inicializar mapa ---
  const map = L.map("map").setView([-36.892, -60.322], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  // --- Datos de lugares ---
  const lugares = [
    { tipo:"restaurante", coords:[-36.903173,-60.327349], nombre:"Jengibre casa de comida", direccion:"25 de Mayo 1818", imagenes:["../IMAGENES/jen1.jpeg","../IMAGENES/jen2.jpeg","../IMAGENES/jen3.jpeg","../IMAGENES/jen4.jpeg","../IMAGENES/jen5.jpeg","../IMAGENES/jengibre cocina.jpg"] },
    { tipo:"restaurante", coords:[-36.894273,-60.322631], nombre:"Macola", direccion:"Rivadavia 2730", imagenes:["../IMAGENES/Macola- imagen 1.jpg","../IMAGENES/Macola-imagen 2.jpg","../IMAGENES/Macola-imagen 3.jpg","../IMAGENES/Macola-imagen 4.jpg","../IMAGENES/Macola-imagen5.jpg"] },
    { tipo:"cafe", coords:[-36.894519,-60.324892], nombre:"Café Vega", direccion:"Vicente López 2599", imagenes:["../IMAGENES/vega1.jpeg","../IMAGENES/vega2.jpeg","../IMAGENES/vega3.jpeg","../IMAGENES/vega4.jpeg","../IMAGENES/vega5.jpeg"] },
    { tipo:"cafe", coords:[-36.894502,-60.321556], nombre:"Cafetto", direccion:"San Martin & Moreno", imagenes:["../IMAGENES/Cafetto- imag1.jpg","../IMAGENES/cafetto-imag2.jpg","../IMAGENES/cafetto-imag3.jpg","../IMAGENES/cafetto-imag4.jpg","../IMAGENES/cafetto-imag5.jpg"] },
    { tipo:"dietetica", coords:[-36.894792,-60.326319], nombre:"Santa Lucía", direccion:"Horno 2634", imagenes:["../IMAGENES/santa lucia.jpg","../IMAGENES/sl1.jpeg","../IMAGENES/sl2.jpeg","../IMAGENES/sl3.jpeg","../IMAGENES/sl4.jpeg","../IMAGENES/sl5.jpeg"] },
    { tipo:"dietetica", coords:[-36.892211,-60.319249], nombre:"Dietética Olavarría", direccion:"Necoche 2875", imagenes:["../IMAGENES/dietOla-img1.webp","../IMAGENES/dietOlav-imag2.webp","../IMAGENES/dietOlav-imag3.webp","../IMAGENES/dietOlav-imag4.webp","../IMAGENES/dietOlav-imag5.webp"] },
    { tipo:"mercado", coords:[-36.883718,-60.324447], nombre:"Almacén Saludable", direccion:"Av. Colón 1909", imagenes:["../IMAGENES/almacen saludable.jpg","../IMAGENES/as1.jpeg","../IMAGENES/as3.jpeg","../IMAGENES/as4.jpeg","../IMAGENES/as5.jpeg"] },
    { tipo:"mercado", coords:[-36.894084,-60.322575], nombre:"Supermercado Día", direccion:"Rivadavia 2746", imagenes:["../IMAGENES/dia-imag1.jpeg","../IMAGENES/dia-imag2.webp","../IMAGENES/dia-imag3.webp"] }
  ];

  // --- Elementos DOM ---
  const panel = document.getElementById("info-lugar");
  const nombreEl = document.getElementById("info-nombre");
  const tipoEl = document.getElementById("info-tipo");
  const direccionEl = document.getElementById("info-direccion");
  const imagenEl = document.getElementById("info-imagen");
  const btnPrev = document.getElementById("anterior-imagen");
  const btnNext = document.getElementById("siguiente-imagen");
  const btnCerrar = document.getElementById("cerrar-info");
  const btnFavorito = document.getElementById("btn-favorito");
  const btnComentario = document.getElementById("btn-comentario");
  const formComentario = document.getElementById("form-comentario");
  const comentarioTexto = document.getElementById("comentario-texto");
  const comentariosLista = document.getElementById("comentarios-lista");

  let lugarActual = null;
  let imagenActual = 0;

  // --- Crear marcadores ---
  const marcadores = lugares.map(lugar => {
    const marker = L.marker(lugar.coords).addTo(map)
      .bindTooltip(lugar.nombre, {direction:"top"});
    marker.lugar = lugar;

    marker.on("click", () => {
      lugarActual = lugar;
      imagenActual = 0;
      nombreEl.textContent = lugar.nombre;
      tipoEl.textContent = `Tipo: ${lugar.tipo}`;
      direccionEl.textContent = `Dirección: ${lugar.direccion}`;
      imagenEl.src = lugar.imagenes[imagenActual];
      panel.classList.remove("oculto");
      panel.style.display = "flex";
      cargarComentarios();
    });

    return marker;
  });

  // --- Carrusel de imágenes ---
  btnPrev.addEventListener("click", () => {
    if (!lugarActual) return;
    imagenActual = (imagenActual - 1 + lugarActual.imagenes.length) % lugarActual.imagenes.length;
    imagenEl.src = lugarActual.imagenes[imagenActual];
  });

  btnNext.addEventListener("click", () => {
    if (!lugarActual) return;
    imagenActual = (imagenActual + 1) % lugarActual.imagenes.length;
    imagenEl.src = lugarActual.imagenes[imagenActual];
  });

  // --- Cerrar panel ---
  btnCerrar.addEventListener("click", () => {
    panel.classList.add("oculto");
    panel.style.display = "none";
    lugarActual = null;
    formComentario.classList.add("oculto");
  });

  // --- Filtros ---
  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tipo = btn.dataset.tipo;
      marcadores.forEach(marker => {
        const visible = (tipo === "todos" || marker.lugar.tipo === tipo);
        if (visible) map.addLayer(marker);
        else map.removeLayer(marker);
      });
    });
  });

  // --- Buscador ---
  document.getElementById("busqueda").addEventListener("input", e => {
    const texto = e.target.value.toLowerCase();
    marcadores.forEach(marker => {
      const visible = marker.lugar.nombre.toLowerCase().includes(texto);
      if (visible) map.addLayer(marker);
      else map.removeLayer(marker);
    });
  });

  // --- Recetas protegidas ---
  const linkRecetas = document.getElementById("linkRecetas");
  linkRecetas.addEventListener("click", (e) => {
    e.preventDefault();
    const usuarioActual = localStorage.getItem("usuarioActual");
    if (usuarioActual) window.location.href = "recetas.html";
    else Swal.fire({
      title: "Contenido exclusivo",
      text: "Suscribite o iniciá sesión para acceder a las recetas sin TACC.",
      icon: "info",
      showCancelButton: true,
    });
  });

  // --- Favoritos ---
  btnFavorito.addEventListener("click", () => {
    if (!lugarActual) return;
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (!favoritos.some(f => f.nombre === lugarActual.nombre)) {
      favoritos.push(lugarActual);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      Swal.fire({
        title: 'Agregado a favoritos',
        text: `${lugarActual.nombre} ha sido agregado a tus favoritos.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Ya está en favoritos',
        text: `${lugarActual.nombre} ya se encuentra en tu lista.`,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }
  });

  // --- Comentarios ---
  btnComentario.addEventListener("click", () => {
    formComentario.classList.toggle("oculto");
  });

  formComentario.addEventListener("submit", e => {
    e.preventDefault();
    if (!lugarActual) return;
    const texto = comentarioTexto.value.trim();
    if (!texto) return;
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || {};
    if (!comentarios[lugarActual.nombre]) comentarios[lugarActual.nombre] = [];
    comentarios[lugarActual.nombre].push(texto);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
    comentarioTexto.value = "";
    cargarComentarios();
    Swal.fire({
      title: 'Comentario agregado',
      text: 'Tu comentario se guardó correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  });

  function cargarComentarios() {
    comentariosLista.innerHTML = "";
    if (!lugarActual) return;
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || {};
    const lista = comentarios[lugarActual.nombre] || [];
    lista.forEach(c => {
      const div = document.createElement("div");
      div.classList.add("comentario-item");
      div.textContent = c;
      comentariosLista.appendChild(div);
    });
  }
});



