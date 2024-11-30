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
var currentSelection = 0; //to keep track of the song selected
document.addEventListener("DOMContentLoaded", function () {
  const currentSelectionText = document.getElementById("current-song");
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    rewind: true,
    speed: 500,
    fadeEffect: {
      crossFade: true,
    },
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
    currentSelection = swiper.activeIndex;
    currentSelectionText.innerText = songTitles[currentSelection];
    console.log(currentSelection);
  });
});
