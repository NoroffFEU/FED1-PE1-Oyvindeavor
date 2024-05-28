import { getThreeLatestPosts } from "../utils/dataFetching.mjs";

export function updateCarousel(indexChange) {
  const carouselContainer = document.querySelector(".carousel-container");
  let currentIndex = parseInt(carouselContainer.dataset.currentIndex) || 0;
  const totalSlides = carouselContainer.children.length;
  currentIndex = (currentIndex + indexChange + totalSlides) % totalSlides;
  carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  carouselContainer.dataset.currentIndex = currentIndex;
}


export async function handleCarousel() {
  try {
    // Fetch the latest posts
    const blogPosts = await getThreeLatestPosts();
    console.log("Latest blog posts fetched:", blogPosts);

    // Select carousel elements
    const carouselLinks = document.querySelectorAll(".carousel-item a");
    const carouselImages = document.querySelectorAll(".carouselImg");
    const carouselTitles = document.querySelectorAll(".carousel-text h1, .carousel-text h2");

    blogPosts.forEach((post, index) => {
      // Check if the carousel elements exist for the current index
      if (carouselLinks[index] && carouselImages[index] && carouselTitles[index]) {
        // Update the link with the blog post ID
        carouselLinks[index].href = `/blogpost.html?id=${post.id}`;

        // Update the image source and alt text
        carouselImages[index].src = post.media.url;
        carouselImages[index].alt = post.media.alt || 'Blog post image';  // Provide default alt text if none exists

        // Update the carousel title
        carouselTitles[index].textContent = post.title;
      } else {
        console.error(`No carousel element found for index ${index}.`);
      }
    });

    // Handle cases where there are fewer posts than carousel elements
    for (let i = blogPosts.length; i < carouselLinks.length; i++) {
      console.error(`No blog post available for carousel element at index ${i}.`);
      
      carouselLinks[i].href = "#";
      if (carouselImages[i]) {
        carouselImages[i].src = "";
        carouselImages[i].alt = "";
      }
      if (carouselTitles[i]) {
        carouselTitles[i].textContent = "";
      }
    }

  } catch (error) {
    console.error("Error updating carousel:", error);
  }
}

export function initCarousel() {
  handleCarousel();
  console.log("initCarousel");
}

export function nextSlide() {
  updateCarousel(1);
}

export function prevSlide() {
  updateCarousel(-1);
}
