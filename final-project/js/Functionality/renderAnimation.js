import { getCurrentSelection } from "./utils.js";
import { pathData } from "../Data/pathData.js";

const song = pathData[getCurrentSelection()];
var swiper;
// Declare a Promise for Swiper initialization
var resolveSwiper;
export const swiperPromise = new Promise((resolve) => {
  resolveSwiper = resolve;
});
document.addEventListener("DOMContentLoaded", function () {
  const noteDescription = document.querySelector(".swiper-wrapper");
  noteDescription.innerHTML = `
              <div class="swiper-slide"><h1>${song.notes[0]}</h1></div>
              <div class="swiper-slide"><h1>${song.notes[1]}</h1></div>
              <div class="swiper-slide"><h1>${song.notes[2]}</h1></div>
              <div class="swiper-slide"><h1>${song.notes[3]}</h1></div>
            
          `;
  swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
    },
  });
  resolveSwiper(swiper);
  const pathVisualization = document.querySelector(".animated-notes");

  pathVisualization.innerHTML = `<div class="path-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="280"
            height="100"
            viewBox="0 0 200 100"
            fill="none"
            class="path-4"
          >
            <path
              d="${song.paths[3]}"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />

            <text x="140" y="12" fill="white" font-size="15">${song.notes[3]}</text>
            Sorry, your browser does not support inline SVG.
          </svg>
          <div id="motion-path-4"></div>
        </div>
        <div class="path-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="280"
            height="100"
            viewBox="0 0 200 100"
            fill="none"
            class="path-3"
          >
            <path
              d="${song.paths[2]}"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />

            <text x="140" y="12" fill="white" font-size="15">${song.notes[2]}</text>
            Sorry, your browser does not support inline SVG.
          </svg>
          <div id="motion-path-3"></div>
        </div>
        <div class="path-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="280"
            height="100"
            viewBox="0 0 200 100"
            fill="none"
            class="path-2"
          >
            <path
              d="${song.paths[1]}"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />

            <text x="150" y="12" fill="white" font-size="15">${song.notes[1]}</text>
            Sorry, your browser does not support inline SVG.
          </svg>
          <div id="motion-path-2"></div>
        </div>
        <div class="path-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="280"
            height="100"
            viewBox="0 0 200 100"
            fill="none"
          >
            <path
              d="${song.paths[0]}"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />

            <text x="160" y="12" fill="white" font-size="15">${song.notes[0]}</text>
            Sorry, your browser does not support inline SVG.
          </svg>
          <div id="motion-path-1"></div>
        </div>`;
});
