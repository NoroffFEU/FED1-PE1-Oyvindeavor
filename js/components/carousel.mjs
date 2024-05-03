function updateCarousel(indexChange) {
  const carouselContainer = document.querySelector('.carousel-container');
  let currentIndex = parseInt(carouselContainer.dataset.currentIndex) || 0;
  const totalSlides = carouselContainer.children.length;

  currentIndex = (currentIndex + indexChange + totalSlides) % totalSlides;

  carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  carouselContainer.dataset.currentIndex = currentIndex;
}

export function nextSlide() {
  updateCarousel(1);
  console.log('nextSlide');
}

export function prevSlide() {
  updateCarousel(-1);
  console.log('prevSlide');
}