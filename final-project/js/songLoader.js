import { getCurrentSelection } from "./utils.js";
import { pathData } from "./pathData.js";
var currentSelection = 0;
console.log("from songs.js: " + currentSelection);
const audioSources = [
  "../assets/audio/Raravenu_Sa.mp3",
  "../assets/audio/Raravenu_Ri.mp3",
  "../assets/audio/Raravenu_Ga.mp3",
  "../assets/audio/Raravenu_Pa.mp3",
];
const firstAnimation = document.querySelector("#motion-path-1");
const secondAnimation = document.querySelector("#motion-path-2");
const thirdAnimation = document.querySelector("#motion-path-3");
const fourthAnimation = document.querySelector("#motion-path-4");
const audioPlayer = document.getElementById("audioPlayer");

audioPlayer.src = audioSources[currentSelection];
console.log(audioPlayer.src);
audioPlayer.play();

//a function to restart the animation for each note from the beginning of the path
function restartAnimation(selectedAnimation) {
  selectedAnimation.style.animationName = "none";
  requestAnimationFrame(() => {
    setTimeout(() => {
      selectedAnimation.style.animationName = "";
    }, 0); //completing the current cycle before moving on to the next
  });
}
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: false, //disabling the pagination progress dots
  // for accessibility purposes: keyboard navigation enbaled
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  keyboard: {
    enabled: true,
  },
});
swiper.on("slideChange", function () {
  currentSelection = swiper.activeIndex;
  console.log(currentSelection);
  audioPlayer.src = audioSources[currentSelection];
  console.log(audioPlayer.src);
  audioPlayer.play();

  if (currentSelection == 0) {
    firstAnimation.style.setProperty("visibility", "visible");
    secondAnimation.style.setProperty("visibility", "hidden");
    thirdAnimation.style.setProperty("visibility", "hidden");
    fourthAnimation.style.setProperty("visibility", "hidden");
    restartAnimation(firstAnimation);
  }
  if (currentSelection == 1) {
    firstAnimation.style.setProperty("visibility", "hidden");
    secondAnimation.style.setProperty("visibility", "visible");
    thirdAnimation.style.setProperty("visibility", "hidden");
    fourthAnimation.style.setProperty("visibility", "hidden");
    restartAnimation(secondAnimation);
  }

  if (currentSelection == 2) {
    firstAnimation.style.setProperty("visibility", "hidden");
    secondAnimation.style.setProperty("visibility", "hidden");
    thirdAnimation.style.setProperty("visibility", "visible");
    fourthAnimation.style.setProperty("visibility", "hidden");
    restartAnimation(thirdAnimation);
  }

  if (currentSelection == 3) {
    firstAnimation.style.setProperty("visibility", "hidden");
    secondAnimation.style.setProperty("visibility", "hidden");
    thirdAnimation.style.setProperty("visibility", "hidden");
    fourthAnimation.style.setProperty("visibility", "visible");
    restartAnimation(fourthAnimation);
  }
});

const song = pathData[getCurrentSelection()];
console.log("from songs.js: " + getCurrentSelection());
document.addEventListener("DOMContentLoaded", function () {
  const noteDescription = document.querySelector(".swiper-wrapper");
  noteDescription.innerHtml = `
              <div class="swiper-slide"><h1>${song.notes[0]}</h1></div>
              <div class="swiper-slide"><h1>${song.notes[1]}</h1></div>
              <div class="swiper-slide"><h1>${song.notes[2]}</h1></div>
              <div class="swiper-slide"><h1>${song.notes[3]}</h1></div>
            
          `;
  const firstAnimation = document.getElementById("motion-path-1");
  const secondAnimation = document.getElementById("motion-path-2");
  const thirdAnimation = document.getElementById("motion-path-3");
  const fourthAnimation = document.getElementById("motion-path-4");

  firstAnimation.style.setProperty("visibility", "visible");
  firstAnimation.style.setProperty("offset-path", `path('${song.paths[0]}')`);
  console.log(firstAnimation.style.offsetPath);
  secondAnimation.style.setProperty("offset-path", `path('${song.paths[1]}')`);
  thirdAnimation.style.setProperty("offset-path", `path('${song.paths[2]}')`);
  fourthAnimation.style.setProperty("offset-path", `path('${song.paths[3]}')`);
});
