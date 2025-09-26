document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // 1️⃣ Datos de recetas y consejos
  // ==========================
  const recetas = {
    panes: [
      {
        nombre: "Pan de arroz",
        imagen: "/IMAGENES/panArroz.jpg",
        ingredientes: ["400 g Arroz largo fino", "250 ml Agua tibia", "50 ml Aceite", "1 cda Azúcar", "10 g Sal", "25 g Levadura fresca"],
        pasos: ["Remojar arroz toda la noche.", "Licuar con agua, aceite, sal y azúcar.", "Agregar levadura.", "Hornear 200°C 30 min."]
      },
      {
        nombre: "Pan casero sin gluten",
        imagen: "/IMAGENES/pan.jpg",
        ingredientes: ["500 gr harina sin gluten", "10 gr levadura en polvo", "300 ml agua templada", "2 cditas sal"],
        pasos: ["Mezclar ingredientes secos y agregar agua.", "Dejar fermentar 1h.", "Formar pan, hornear 45 min a 200°C."]
      }
    ],
    pastas: [
      {
        nombre: "Tallarines sin gluten",
        imagen: "/IMAGENES/pasta.jpg",
        ingredientes: ["150 gr premezcla sin gluten", "150 gr leche en polvo", "75 gr fécula de mandioca", "1 huevo", "1 cdita sal"],
        pasos: ["Preparar masa y estirar.", "Cortar nidos.", "Hervir 3-4 min.", "Servir con salsa."]
      }
    ],
    tortasYdulces: [
      {
        nombre: "Torta de chocolate sin TACC",
        imagen: "/IMAGENES/tortaChoco.jpg",
        ingredientes: ["3 huevos", "1 1/5 taza azúcar", "1 taza leche", "1/2 taza aceite", "2 tazas premezcla sin gluten", "1 taza cacao en polvo"],
        pasos: ["Mezclar huevos con azúcar.", "Agregar leche y aceite.", "Incorporar premezcla y cacao.", "Hornear 40 min a 180°C."]
      }
    ],
    masas: [
      {
        nombre: "Masa de empanadas sin gluten",
        imagen: "/IMAGENES/Masas.jpg",
        ingredientes: ["250 gr premezcla sin gluten", "1 huevo", "100 ml agua", "50 gr manteca", "1 cdita sal"],
        pasos: ["Mezclar todos los ingredientes.", "Reposar 30 min.", "Estirar y cortar discos.", "Hornear o freír."]
      }
    ],
    consejos: [
      {
        nombre: "Consejo 1",
        imagen: "/IMAGENES/consejos.webp",
        ingredientes: [],
        pasos: ["Usar utensilios limpios.", "Lavar bien frutas y verduras."]
      },
      {
        nombre: "Consejo 2",
        imagen: "/IMAGENES/consejos.webp",
        ingredientes: [],
        pasos: ["Leer etiquetas.", "Evitar harinas con gluten."]
      }
    ]
  };

  // ==========================
  // 2️⃣ Carrusel de categorías
  // ==========================
  const carrusel = document.getElementById("carrusel");
  const flechaIzquierda = document.getElementById("flecha-izquierda");
  const flechaDerecha = document.getElementById("flecha-derecha");
  const recetasContainer = document.getElementById("recetas-container");
  const imagenesCarrusel = document.querySelectorAll("#carrusel img");

  flechaIzquierda.addEventListener("click", () => carrusel.scrollBy({ left: -300, behavior: "smooth" }));
  flechaDerecha.addEventListener("click", () => carrusel.scrollBy({ left: 300, behavior: "smooth" }));

  imagenesCarrusel.forEach(img => {
    img.addEventListener("click", () => mostrarRecetas(img.dataset.categoria));
  });

  function mostrarRecetas(categoria) {
    const lista = recetas[categoria];
    recetasContainer.innerHTML = "";

    lista.forEach(receta => {
      const div = document.createElement("div");
      div.classList.add("receta");

      const contenido = document.createElement("div");
      contenido.classList.add("contenido-receta");

      const titulo = document.createElement("h3");
      titulo.textContent = receta.nombre;
      contenido.appendChild(titulo);

      if (receta.ingredientes.length > 0) {
        const ingTitle = document.createElement("strong");
        ingTitle.textContent = "Ingredientes:";
        const ulIng = document.createElement("ul");
        receta.ingredientes.forEach(i => {
          const li = document.createElement("li");
          li.textContent = i;
          ulIng.appendChild(li);
        });
        contenido.appendChild(ingTitle);
        contenido.appendChild(ulIng);
      }

      if (receta.pasos.length > 0) {
        const pasosTitle = document.createElement("strong");
        pasosTitle.textContent = receta.ingredientes.length > 0 ? "Pasos:" : "Consejos:";
        const ulPasos = document.createElement("ul");
        receta.pasos.forEach(p => {
          const li = document.createElement("li");
          li.textContent = p;
          ulPasos.appendChild(li);
        });
        contenido.appendChild(pasosTitle);
        contenido.appendChild(ulPasos);
      }

      const imagen = document.createElement("img");
      imagen.src = receta.imagen;
      imagen.alt = receta.nombre;
      imagen.classList.add("imagen-receta");

      div.appendChild(contenido);
      div.appendChild(imagen);
      recetasContainer.appendChild(div);
    });
  }

  // ==========================
  // 3️⃣ CRUD Recetas de usuario
  // ==========================
  const formReceta = document.getElementById("formularioReceta");
  document.getElementById("mostrarFormulario").addEventListener("click", () => {
    formReceta.style.display = formReceta.style.display === "none" ? "block" : "none";
  });

  formReceta.addEventListener("submit", e => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const ingredientes = document.getElementById("ingredientes").value;
    const pasos = document.getElementById("pasos").value;
    const id = crypto.randomUUID();
    const receta = { titulo, ingredientes, pasos, id };
    let recetasUsuario = JSON.parse(localStorage.getItem("recetasUsuario")) || [];
    recetasUsuario.push(receta);
    localStorage.setItem("recetasUsuario", JSON.stringify(recetasUsuario));
    mostrarRecetaUsuario(receta);
    formReceta.reset();
    formReceta.style.display = "none";

    Swal.fire({
      title: "Receta guardada",
      text: `La receta "${titulo}" se ha guardado correctamente.`,
      icon: "success",
      confirmButtonText: "OK"
    });
  });

  function mostrarRecetaUsuario(receta) {
    const contenedor = document.getElementById("recetasUsuario");
    const div = document.createElement("div");
    div.classList.add("receta");
    div.innerHTML = `<h3>${receta.titulo}</h3>
                     <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
                     <p><strong>Pasos:</strong> ${receta.pasos}</p>`;
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      div.remove();
      let recetasUsuario = JSON.parse(localStorage.getItem("recetasUsuario")) || [];
      recetasUsuario = recetasUsuario.filter(r => r.id !== receta.id);
      localStorage.setItem("recetasUsuario", JSON.stringify(recetasUsuario));
      Swal.fire({
        title: "Receta eliminada",
        text: `La receta "${receta.titulo}" ha sido eliminada.`,
        icon: "info",
        confirmButtonText: "OK"
      });
    });
    div.appendChild(btnEliminar);
    contenedor.appendChild(div);
  }

  const recetasGuardadas = JSON.parse(localStorage.getItem("recetasUsuario")) || [];
  recetasGuardadas.forEach(mostrarRecetaUsuario);

  // ==========================
  // 4️⃣ CRUD Consejos de usuario
  // ==========================
  const formConsejo = document.getElementById("formularioConsejo");
  document.getElementById("mostrarFormularioConsejo").addEventListener("click", () => {
    formConsejo.style.display = formConsejo.style.display === "none" ? "block" : "none";
  });

  formConsejo.addEventListener("submit", e => {
    e.preventDefault();
    const titulo = document.getElementById("tituloConsejo").value;
    const texto = document.getElementById("textoConsejo").value;
    const id = crypto.randomUUID();
    const consejo = { titulo, texto, id };

    let consejosUsuario = JSON.parse(localStorage.getItem("consejosUsuario")) || [];
    consejosUsuario.push(consejo);
    localStorage.setItem("consejosUsuario", JSON.stringify(consejosUsuario));

    mostrarConsejoUsuario(consejo);
    formConsejo.reset();
    formConsejo.style.display = "none";

    Swal.fire({
      title: "Consejo guardado",
      text: `El consejo "${titulo}" se ha guardado correctamente.`,
      icon: "success",
      confirmButtonText: "OK"
    });
  });

  function mostrarConsejoUsuario(consejo) {
    const contenedor = document.getElementById("consejosUsuario");
    const div = document.createElement("div");
    div.classList.add("consejo");
    div.innerHTML = `<div class="contenido-consejo">
                       <h3>${consejo.titulo}</h3>
                       <p>${consejo.texto}</p>
                     </div>`;
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      div.remove();
      let consejosUsuario = JSON.parse(localStorage.getItem("consejosUsuario")) || [];
      consejosUsuario = consejosUsuario.filter(c => c.id !== consejo.id);
      localStorage.setItem("consejosUsuario", JSON.stringify(consejosUsuario));
      Swal.fire({
        title: "Consejo eliminado",
        text: `El consejo "${consejo.titulo}" ha sido eliminado.`,
        icon: "info",
        confirmButtonText: "OK"
      });
    });
    div.appendChild(btnEliminar);
    contenedor.appendChild(div);
  }

  const consejosGuardados = JSON.parse(localStorage.getItem("consejosUsuario")) || [];
  consejosGuardados.forEach(mostrarConsejoUsuario);

  // ==========================
  // 5️⃣ Modal de contacto
  // ==========================
  const abrirBtn = document.getElementById("abrirModalContacto");
  const modal = document.getElementById("modalContacto");
  const cerrarBtn = document.getElementById("cerrarModalContacto");
  const formContacto = document.getElementById("formContacto");

  abrirBtn.addEventListener("click", () => modal.classList.remove("oculto"));
  cerrarBtn.addEventListener("click", () => modal.classList.add("oculto"));
  window.addEventListener("click", (e) => { if(e.target === modal) modal.classList.add("oculto"); });

  formContacto.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Gracias por tu mensaje! Te responderemos pronto.");
    formContacto.reset();
    modal.classList.add("oculto");
  });

});
