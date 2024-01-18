'use strict';
const btnCierra = document.querySelector('#btn-cierra');
const btnRetrocede = document.querySelector('#btn-retrocede');
const btnAdelanta = document.querySelector('#btn-adelanta');
const galeria = document.querySelector('#galeria');
const lightbox = document.querySelector('#contenedor-principal');
const imagenPrincipal = document.querySelector('#img-principal');

const ACCESS_KEY = 'c1w_d3xuOiMkZmj2A7iP0QmUQ-W8TjZ4rQGh2ObyepY';

async function getImages() {
  let indice = 0;
  try {
    const res = await fetch('https://api.unsplash.com/photos', {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
      }
    });
    const data = await res.json();
    const urls = data.map((photo) => photo.urls.small);
    urls.forEach((url) => {
      const imgElement = document.createElement('img');
      imgElement.classList.add('image');
      imgElement.src = url;
      imgElement.addEventListener('click', abreLightbox);
      imgElement.id = indice++;

      galeria.appendChild(imgElement);
    });
  } catch (error) {
    console.error(error);
  }
}

let posicion = 0;
const abreLightbox = (event) => {
  imagenPrincipal.src = event.target.src;
  lightbox.style.display = 'flex';
  posicion = event.target.id;
};

const adelantaImagen = () => {
  let imagenesGal = document.querySelectorAll('.image');
  // Incrementa el índice para obtener la siguiente imagen
  posicion++;
  // Verifica si el índice se ha salido del rango
  if (posicion >= imagenesGal.length) {
    // Si es así, vuelve al principio
    posicion = 0;
  }

  // Actualiza la imagen principal si hay imágenes en la galería
  if (imagenesGal.length > 0) {
    imagenPrincipal.src = imagenesGal[posicion].src;
  }
};

// Agrega un evento de clic al botón de adelante
btnAdelanta.addEventListener('click', adelantaImagen);

btnCierra.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

getImages();
