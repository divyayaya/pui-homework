import { setCurrentSelection } from "./utils.js";
//an array storing all the song titles
const songTitles = [
  "Mohanam",
  "Kalyāni",
  "Shankarābharanam",
  "Malahāri",
  "Sāveri",
  "Kamās",
  "Bhairavi",
];
document.addEventListener("DOMContentLoaded", function () {
  const page = document.title;
  if (page === "Catalog") {
    const currentSelectionText = document.getElementById("current-song");
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      rewind: true,
      speed: 500,
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: "auto",

      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
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
    currentSelectionText.innerText = songTitles[swiper.activeIndex];
    //detecting song selection based on card change
    swiper.on("slideChange", function () {
      setCurrentSelection(swiper.activeIndex); //setting current selected song
      currentSelectionText.innerText = songTitles[swiper.activeIndex];
    });
  }
});
