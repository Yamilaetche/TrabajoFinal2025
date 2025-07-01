document.addEventListener("DOMContentLoaded", () => {
  const recetas = {
    panes: [
      {
        nombre: "Pan de arroz",
        imagen: "Fotos para pagina/panArroz.jpg",
        ingredientes: [
          "400 g Arroz largo fino (NO reemplazar por harina de arroz)",
          "250 ml Agua tibia",
          "50 ml Aceite",
          "1 cda Azúcar",
          "10 g Sal",
          "25 g Levadura fresca"
        ],
        pasos: [
          "Colocar el arroz en un recipiente con agua templada y dejar en remojo toda la noche.",
          "Escurrir y desechar el agua. Reservar el arroz.",
          "Licuar agua tibia, aceite, sal y azúcar. Agregar el arroz remojado de a poco mientras licúa. Luego añadir la levadura y procesar un minuto más.",
          "Volcar en un molde con papel manteca enmantecado. Dejar levar hasta que doble su volumen.",
          "Hornear a 200°C por 30 minutos. Desmoldar y enfriar sobre rejilla.",
          "Cortar en rebanadas. Se puede tostar o comer fresco."
        ]
      },
      {
        nombre: "Pan casero sin gluten",
        imagen: "Fotos para pagina/pan.jpg",
        ingredientes: [
          "500 gr de harina premezcla sin gluten",
          "10 gr de levadura en polvo",
          "300 ml de agua templada",
          "2 cucharaditas de sal"
        ],
        pasos: [
          "Mezclar harina, levadura y sal. Agregar agua templada y amasar hasta lograr una masa homogénea.",
          "Dejar fermentar 1 hora tapado con un trapo húmedo.",
          "Amasar de nuevo, darle forma (pan, panecillos, barra), dejar fermentar 1 hora más.",
          "Rociar con agua, hacer cortes en la superficie y hornear a 200°C durante 45 minutos.",
          "Dejar enfriar en rejilla. Espolvorear con harina sin gluten si se desea."
        ]
      },
      {
        nombre: "Chipa sin gluten",
        imagen: "Fotos para pagina/chipa.jpg",
        ingredientes: [
          "1/2 kg almidón de mandioca",
          "3 huevos",
          "120g manteca",
          "250g queso pategrás",
          "150g queso parmesano",
          "100ml leche",
          "1 cdita polvo para hornear"
        ],
        pasos: [
          "Cortar el pategrás en trocitos pequeños y rallar el parmesano. Mezclar en un bol.",
          "Agregar almidón de mandioca, manteca pomada y mezclar con cuchara. Luego integrar con la mano.",
          "Aparte, mezclar huevos, sal, leche y polvo para hornear.",
          "Unir los líquidos con los secos. Mezclar sin amasar. Envolver en film y enfriar 30 min.",
          "Formar bolitas, colocar en placa y enfriar.",
          "Hornear a 230°C por 10 minutos hasta dorar."
        ]
      },
      {
        nombre: "Focaccia sin TACC",
        imagen: "Fotos para pagina/focaccia.jpg",
        ingredientes: [
          "500 gr premezcla sin gluten",
          "500 ml agua tibia",
          "1 cda polvo para hornear",
          "1 cda azúcar",
          "10 g levadura en polvo",
          "1 cda sal",
          "8 cdas aceite de oliva o girasol"
        ],
        pasos: [
          "Mezclar premezcla y polvo de hornear. En el centro agregar levadura, azúcar y agua tibia. Integrar un poco de premezcla y dejar espumar 10 min.",
          "Agregar sal y aceite. Mezclar bien hasta obtener una masa pegajosa.",
          "Colocar en molde enaceitado y enharinado. Dejar levar 20 min.",
          "Cubrir con más aceite, hacer huecos con los dedos, y agregar toppings (semillas, tomates, cebolla, etc).",
          "Hornear a 200°C hasta dorar. Enfriar y cortar."
        ]
      }
    ],
    pastas: [
      {
        nombre: "Tallarines sin gluten",
        imagen: "Fotos para pagina/pasta.jpg",
        ingredientes: [
          "150 gr premezcla sin gluten",
          "150 gr leche en polvo",
          "75 gr fécula de mandioca",
          "Chuño de mandioca (ver preparación)",
          "1 huevo",
          "1 cucharada sopera de aceite neutro",
          "1 cucharadita de sal"
        ],
        pasos: [
          "Preparar el chuño: mezclar una cucharada de fécula de mandioca con 100 cc de agua fría, llevar al fuego revolviendo hasta que espese.",
          "Colocar el chuño en un bol y agregar premezcla, fécula, leche en polvo, huevo, aceite y sal. Amasar bien.",
          "Agregar más premezcla si es necesario. La masa será tierna y frágil.",
          "Estirar sobre mesada enharinada hasta 1 mm de espesor. Cortar con cuchillo filoso y formar nidos.",
          "Hervir en agua con sal y un chorrito de aceite durante unos minutos. Se cocinan rápido.",
          "Servir con salsa y queso a elección."
        ]
      },
      {
        nombre: "Ñoquis caseros de papa y Maizena",
        imagen: "Fotos para pagina/ñoquis.jpg",
        ingredientes: [
          "400 gr papas pisadas (como para puré)",
          "1 huevo",
          "200 gr Maizena",
          "1 pizca de sal"
        ],
        pasos: [
          "Con las papas frías ya pisadas, agregar la Maizena de a poco junto con el huevo y la sal. Formar una masa lisa.",
          "Dejar descansar media hora para que se hidrate.",
          "Formar choricitos de unos 2 cm de grosor y cortar trocitos del mismo largo para hacer los ñoquis.",
          "Cocinar en agua hirviendo con sal durante 4 minutos o hasta que floten.",
          "Retirar y servir con salsa a gusto."
        ]
      },
      {
        nombre: "Lasaña sin gluten (láminas caseras)",
        imagen: "Fotos para pagina/lasaña.jpg",
        ingredientes: [
          "300 gr harina sin gluten (de maíz u otra para pasta)",
          "1 cucharadita de psyllium en polvo",
          "3 huevos",
          "1 cucharadita de sal"
        ],
        pasos: [
          "En un bol, mezclar harina y psyllium. Hacer un hueco en el centro y agregar los huevos batidos con sal.",
          "Amasar hasta obtener una masa tipo plastilina blanda. Formar una bola, envolver en plástico y refrigerar por al menos 1 hora.",
          "Estirar con rodillo enharinado hasta obtener una lámina fina. Cortar rectángulos de 15x10 cm.",
          "Hervir en agua con sal hasta que estén al dente. Escurrir sobre un paño limpio.",
          "Armar la lasaña alternando capas de bechamel, carne, láminas de pasta, y terminar con bechamel y queso rallado.",
          "Hornear a 200°C por 20 minutos. Servir caliente."
        ]
      }
    ],
    tortasYdulces: [
      {
        nombre: "Torta de chocolate sin TACC",
        imagen: "Fotos para pagina/tortaChoco.jpg",
        ingredientes: [
          "3 huevos",
          "1 1/5 taza de azúcar",
          "1 taza de leche",
          "1/2 taza de aceite",
          "2 tazas de premezcla sin gluten",
          "1 taza de cacao en polvo (tipo Chocolino)",
          "1 cucharadita de polvo de hornear",
          "1 cucharadita de esencia de vainilla"
        ],
        pasos: [
          "Mezclar los huevos con el azúcar hasta integrar bien.",
          "Agregar la leche y el aceite y seguir mezclando a mano.",
          "Incorporar la esencia de vainilla y el polvo de hornear.",
          "Agregar la premezcla tamizada y luego el cacao en polvo. Unir todo bien.",
          "Verter la mezcla en un molde enmantecado.",
          "Llevar a horno medio (precalentado) por 40 minutos o hasta que al pinchar con un palillo salga limpio. No abrir el horno antes de los 30 minutos."
        ]
      },
      {
        nombre: "Budín de banana sin TACC",
        imagen: "Fotos para pagina/budin.jpg",
        ingredientes: [
          "2 huevos (100 g)",
          "100 g de aceite de girasol",
          "50 g de azúcar blanca",
          "1 taza de premezcla sin gluten (150 g)",
          "2 bananas medianas pisadas (300 g)",
          "1 cucharada de polvo para hornear (5 g)"
        ],
        pasos: [
          "En un bowl, mezclar los huevos con las bananas pisadas, el azúcar y el aceite. Integrar bien.",
          "Agregar la premezcla y el polvo para hornear. Mezclar hasta lograr una masa homogénea.",
          "Colocar la preparación en una budinera aceitada y enharinada.",
          "Cocinar en horno precalentado a 180°C por 30 a 40 minutos."
        ]
      },
      {
        nombre: "Cookies sin TACC",
        imagen: "Fotos para pagina/masitas.jpg",
        ingredientes: [
          "200 g de premezcla sin gluten o mix de harinas",
          "1 cucharadita de polvo de hornear",
          "75 g de azúcar mascabo",
          "75 g de manteca",
          "1 huevo",
          "Ralladura de una naranja",
          "2 cucharadas de jugo de naranja",
          "Chips de chocolate (cantidad a gusto)"
        ],
        pasos: [
          "Colocar la premezcla, el polvo de hornear y el azúcar en un bowl y mezclar.",
          "Agregar la manteca y formar un arenado.",
          "Incorporar el huevo, la ralladura y el jugo de naranja. Amasar hasta formar un bollo.",
          "Agregar los chips de chocolate.",
          "Formar bollitos del tamaño deseado y aplastarlos para dar forma de galleta.",
          "Colocar en una placa antiadherente dejando espacio entre cada una.",
          "Hornear a 180°C por unos 10 minutos, hasta que la base esté doradita."
        ]
      }
    ],
    masas: [
      {
        nombre: "Masa para Empanadas",
        imagen: "Fotos para pagina/empanada.jpg",
        ingredientes: [
          "250 g Premezcla",
          "C/N Agua hervida",
          "3 cdas Aceite",
          "1 Huevo",
        "1 cdita Goma Xántica",
        "Sal (opcional)"
        ],
        pasos: [
        "Colocar la premezcla y goma cantica en un bowl.",
        "En el centro tirar un poquito de agua hirviendo",
       "Agregar los demás ingredientes y amasar (ir agregando agua de a poco- si te pasas no pasa nada, agrega más premezcla)",
       "Obtenes una masa lisa que no se pega y no es dura (no se quiebra). Dejar reposar 1/2 hora.",
       "Estiras la masa, cortas las tapitas y Listo!!"
        ]
       },
       {
       nombre: "Masa de Pizza",
       imagen: "Fotos para pagina/pizza.jpg",
       ingredientes: [
      "300 gr premezcla",
      "25 gr levadura",
      "260 ml agua tibia",
      "4 cucharadas aceite",
      "Sal a gusto"
       ],
       pasos: [
      "Ponemos los sólidos en un bolws. Y agregamos las cucharadas de aceite.",
      "Preparamos un fermento previo con la levadura y el agua. Y una cucharada de azúcar para activarla",
      "Volvamos sobre los secos y batimos con tenedor. Debe quedar como la consistencia de una mezcla de panqueques.",
      "Colocamos sobre placa con papel manteca. Y dejamos levar bastante",
      "Llevamos a horno 160 grados por media hs. Una ve, que vemos que se cocino, ponemos la salsa y demás...",
      "Importante... dejarla cocinar bien para que haga piso. Es una masa muy difícil, ya que debe estar bastante en el horno para que quede rico.",
      "Poner la pizza bien abajo en el horno para que dore más rápido. Queda bien esponjosa."
       ] 
       }
    ]
  };

  const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", (e) => {
  e.stopPropagation(); // Previene cierre inmediato si hacés clic en el ícono
  menu.classList.toggle("activo");
});

// Cerrar el menú si hacés clic fuera de él
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !botonMenu.contains(e.target)) {
    menu.classList.remove("activo");
  }
});


  const carrusel = document.getElementById("carrusel");
  const flechaIzquierda = document.getElementById("flecha-izquierda");
  const flechaDerecha = document.getElementById("flecha-derecha");
  const recetasContainer = document.getElementById("recetas-container");
  const imagenesCarrusel = document.querySelectorAll("#carrusel img");

  // Autoplay
  setInterval(() => {
    if (carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth) {
      carrusel.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      carrusel.scrollBy({ left: 250, behavior: "smooth" });
    }
  }, 4000);

  carrusel.scrollLeft = 0;

  // Flechas
  flechaIzquierda.addEventListener("click", () => {
    carrusel.scrollBy({ left: -300, behavior: "smooth" });
  });

  flechaDerecha.addEventListener("click", () => {
    carrusel.scrollBy({ left: 300, behavior: "smooth" });
  });

  // Mostrar recetas
  imagenesCarrusel.forEach(img => {
    img.addEventListener("click", () => {
      const categoria = img.dataset.categoria;
      mostrarRecetas(categoria);
    });
  });

function mostrarRecetas(categoria) {
  const lista = recetas[categoria];
  recetasContainer.innerHTML = "";

  lista.forEach(receta => {
    const div = document.createElement("div");
    div.classList.add("receta");

    // Contenedor de texto (izquierda)
    const contenido = document.createElement("div");
    contenido.classList.add("contenido-receta");

    const titulo = document.createElement("h3");
    titulo.textContent = receta.nombre;

    const ingTitle = document.createElement("strong");
    ingTitle.textContent = "Ingredientes:";
    const ulIng = document.createElement("ul");
    receta.ingredientes.forEach(i => {
      const li = document.createElement("li");
      li.textContent = i;
      ulIng.appendChild(li);
    });

    const pasosTitle = document.createElement("strong");
    pasosTitle.textContent = "Pasos:";
    const ulPasos = document.createElement("ul");
    receta.pasos.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p;
      ulPasos.appendChild(li);
    });

    contenido.appendChild(titulo);
    contenido.appendChild(ingTitle);
    contenido.appendChild(ulIng);
    contenido.appendChild(pasosTitle);
    contenido.appendChild(ulPasos);

    // Imagen (derecha)
    const imagen = document.createElement("img");
    imagen.src = receta.imagen;
    imagen.alt = receta.nombre;
    imagen.classList.add("imagen-receta");

    //  bloque final
    div.appendChild(contenido);
    div.appendChild(imagen);
    recetasContainer.appendChild(div);
  });
}

})

// Mostrar/ocultar formulario
document.getElementById("mostrarFormulario").addEventListener("click", function () {
  const formulario = document.getElementById("formularioReceta");
  formulario.style.display = formulario.style.display === "none" ? "block" : "none";
});

// Función original para agregar nuevas recetas
function nuevaRecetaSubmit(e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const pasos = document.getElementById("pasos").value;
  const autor = localStorage.getItem("usuarioActual");
  const id = crypto.randomUUID(); // ID único para cada receta

  const receta = {
    titulo,
    ingredientes,
    pasos,
    autor,
    id
  };

  guardarReceta(receta);
  mostrarReceta(receta);

  e.target.reset();
  document.getElementById("formularioReceta").style.display = "none";
}

// Asignar función de envío inicial
const form = document.getElementById("formularioReceta");
form.addEventListener("submit", nuevaRecetaSubmit);

// Guarda receta en localStorage
function guardarReceta(receta) {
  let recetas = JSON.parse(localStorage.getItem("recetasUsuario")) || [];
  recetas.push(receta);
  localStorage.setItem("recetasUsuario", JSON.stringify(recetas));
}

// Muestra una receta en pantalla
function mostrarReceta(receta) {
  const contenedor = document.getElementById("recetasUsuario");
  const usuarioActual = localStorage.getItem("usuarioActual");

  const nueva = document.createElement("div");
  nueva.classList.add("receta");

  nueva.innerHTML = `
    <h3>${receta.titulo}</h3>
    <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
    <p><strong>Pasos:</strong> ${receta.pasos}</p>
    <p class="autor-receta">Subida por: <em>${receta.autor}</em></p>
  `;

  // Mostrar botón de editar solo si es del usuario actual
  if (receta.autor === usuarioActual) {
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar receta";
    btnEditar.classList.add("btn-editar");
    btnEditar.addEventListener("click", () => editarReceta(receta.id));
    nueva.appendChild(btnEditar);
  }

  contenedor.appendChild(nueva);
}

// Editar una receta existente
function editarReceta(id) {
  let recetas = JSON.parse(localStorage.getItem("recetasUsuario")) || [];
  const receta = recetas.find(r => r.id === id);
  if (!receta) return;

  // Mostrar valores actuales en el formulario
  document.getElementById("titulo").value = receta.titulo;
  document.getElementById("ingredientes").value = receta.ingredientes;
  document.getElementById("pasos").value = receta.pasos;

  const form = document.getElementById("formularioReceta");
  form.style.display = "block";

  // Eliminar función anterior
  form.removeEventListener("submit", nuevaRecetaSubmit);

  // Nueva función para guardar edición
  form.onsubmit = function (e) {
    e.preventDefault();

    receta.titulo = document.getElementById("titulo").value;
    receta.ingredientes = document.getElementById("ingredientes").value;
    receta.pasos = document.getElementById("pasos").value;

    localStorage.setItem("recetasUsuario", JSON.stringify(recetas));

    // Refrescar la lista
    document.getElementById("recetasUsuario").innerHTML = "";
    recetas.forEach(mostrarReceta);

    form.reset();
    form.style.display = "none";

    // Restaurar función original
    form.onsubmit = null;
    form.addEventListener("submit", nuevaRecetaSubmit);
  };
}

// Al cargar la página, mostrar recetas guardadas
window.addEventListener("DOMContentLoaded", function () {
  const recetas = JSON.parse(localStorage.getItem("recetasUsuario")) || [];
  recetas.forEach(mostrarReceta);
});

 //SCRIPT NAVBAR MOVIL

    document.addEventListener("DOMContentLoaded", () => {
      const toggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");
      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    });
  //FOOTER
  document.addEventListener("DOMContentLoaded", () => {
  const abrirBtn = document.getElementById("abrirModalContacto");
  const modal = document.getElementById("modalContacto");
  const cerrarBtn = document.getElementById("cerrarModalContacto");
  const form = document.getElementById("formContacto");

  // Abrir modal
  abrirBtn.addEventListener("click", () => {
    modal.classList.remove("oculto");
  });

  // Cerrar modal
  cerrarBtn.addEventListener("click", () => {
    modal.classList.add("oculto");
  });

  // Cerrar si se hace clic fuera del contenido del modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("oculto");
    }
  });

  // Enviar formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Gracias por tu mensaje! Te responderemos pronto.");
    form.reset();
    modal.classList.add("oculto");
  });
});




