//Santiago Calderon Castaño

// Array de las imagenes que serán el fondo
const imgs = [
  "imgs/img1.jpg",
  "imgs/img2.jpg",
  "imgs/img3.jpg",
  "imgs/img4.jpg",
  "imgs/img5.jpg",
  "imgs/img6.jpg",
  "imgs/img7.jpg",
  "imgs/img8.jpg",
  "imgs/img9.jpg",
  "imgs/img10.jpg",
  "imgs/img11.jpg",
  "imgs/img12.jpg",
  "imgs/img13.jpg",
  "imgs/img14.jpg",
  "imgs/img15.jpg",
  "imgs/img16.jpg",
  "imgs/img17.jpg",
  "imgs/img18.jpg",
  "imgs/img19.jpg",
  "imgs/img20.jpg",
];

/* Estructura html
<div id="container">
        <img src="" alt="">
        <div id="flechaIzquierda"></div>
        <div id="flechaDerecha"></div>
    </div> */

// Ontenemos el contenedor y los tringualos
const container = document.getElementById("container");
const trianguloIzquierda = document.getElementById("trianguloIzquierda");
const trianguloDerecha = document.getElementById("trianguloDerecha");
let index = 0;

// Inicializamos la imagen y el temporizador
container.style.backgroundSize = "cover";      // Rellena todo el contenedor
container.style.backgroundPosition = "center"; // Centra la imagen
container.style.backgroundImage = `url(${imgs[index]})`; // Asignamos como fondo la primer img
let autoSlideInterval = setInterval(imgSiguiente, 3000); // Definimos el temporizados que cambia cada 3 seg

// Funciones de navegación manual
trianguloIzquierda.addEventListener("click", () => { // Creamos un evento que se activa con un click
  clearInterval(autoSlideInterval); // Pausa el temporizador
  imgAnterior(); // Retrocedemos una una imagen 
  resetAutoSlide(); // Reinicia el temporizador después de la interacción
});

trianguloDerecha.addEventListener("click", () => { // Creamos un evento que se activa con un click
  clearInterval(autoSlideInterval); // Pausa el temporizador
  imgSiguiente(); // Avanzamos a imagen siguiente
  resetAutoSlide(); // Reinicia el temporizador después de la interacción
});

// Función de navegación acíclica
function imgAnterior() {
  index = (index - 1 + imgs.length) % imgs.length;  // Ajuste cíclico
  actualizarImagen();
}

// Función de navegación acíclica
function imgSiguiente() {
  index = (index + 1) % imgs.length;  // Ajuste cíclico
  actualizarImagen();
}

// Función para actualizar la imagen
function actualizarImagen() {
  container.style.backgroundSize = "cover";      // Rellena todo el contenedor
  container.style.backgroundPosition = "center"; // Centra la imagen
  container.style.backgroundImage = `url(${imgs[index]})`; // Asignamos la url de la imagen
}

// Función paraa resetear el temporizador
function resetAutoSlide() {
  autoSlideInterval = setInterval(imgSiguiente, 3000); // Reinicia el temporizador de 3 segundos
}