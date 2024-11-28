document.addEventListener("DOMContentLoaded", function () {
  const currentSelectionText = document.getElementById("current-song");
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
    pagination: false, //disabling the pagination progress dots
  });
});
