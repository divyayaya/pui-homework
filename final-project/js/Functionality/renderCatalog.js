import { imageData } from "../Data/imageData.js";
document.addEventListener("DOMContentLoaded", function () {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  let content = ""; // Create an empty string to append HTML content to
  for (let i = 0; i < imageData.length; i++) {
    content += `<div class="swiper-slide">
    <a href="./content/pathVisualization.html">
        <img
          src=${imageData[i].image}
          alt=${imageData[i].altText}
        >
      </a> </div>`;
  }
  swiperWrapper.innerHTML = content;
});
