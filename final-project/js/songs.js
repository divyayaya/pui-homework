document.addEventListener("DOMContentLoaded", function () {
  const notes = ["Sā", "Ri", "Gā", "Pā"];
  var currentSelection = 0; //to keep track of the note selected
  firstAnimation = document.getElementById("motion-path-1");
  secondAnimation = document.getElementById("motion-path-2");
  thirdAnimation = document.getElementById("motion-path-3");
  fourthAnimation = document.getElementById("motion-path-4");

  const audioPlayer = document.getElementById("audioPlayer");

  const audioSources = [
    "../assets/audio/Raravenu_Sa.mp3",
    "../assets/audio/Raravenu_Ri.mp3",
    "../assets/audio/Raravenu_Ga.mp3",
    "../assets/audio/Raravenu_Pa.mp3",
  ];

  if (currentSelection == 0) {
    firstAnimation.style.setProperty("visibility", "visible");
    audioPlayer.src = audioSources[currentSelection];
    console.log(audioPlayer.src);
    audioPlayer.play();
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
    pagination: false, //disabling the pagination progress dots
  });

  //a function to restart the animation for each note from the beginning of the path
  function restartAnimation(selectedAnimation) {
    selectedAnimation.style.animationName = "none";
    requestAnimationFrame(() => {
      setTimeout(() => {
        selectedAnimation.style.animationName = "";
      }, 0); //completing the current cycle before moving on to the next
    });
  }

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

  audioPlayer.addEventListener("play", function () {
    if (currentSelection == 0) restartAnimation(firstAnimation);
    if (currentSelection == 1) restartAnimation(secondAnimation);
    if (currentSelection == 2) restartAnimation(thirdAnimation);
    if (currentSelection == 3) restartAnimation(fourthAnimation);
  });
});
