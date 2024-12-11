import { getCurrentSelection } from "./utils.js";
import { pathData } from "./pathData.js";
import { swiperPromise } from "./renderAnimation.js";
import { noteData } from "./noteData.js";
let currentSelection = 0;
const audioSources = []; //to store the audio sources matching notes of the rāgā
let firstAnimation, secondAnimation, thirdAnimation, fourthAnimation;

const song = pathData[getCurrentSelection()]; //getting path data stored according to user selection
song.notes.forEach((note) => {
  //for every note in the rendition, obtaining the audio source from noteData.js
  const matchingNote = noteData.find((data) => data.note === note);
  if (matchingNote) {
    //pushing the found audio it to the array audioSources
    audioSources.push(matchingNote.audio);
  }
});
const audioPlayer = document.getElementById("audioPlayer");

//a function to restart the animation for each note from the beginning of the path
function restartAnimation(selectedAnimation) {
  selectedAnimation.style.animationName = "none";
  requestAnimationFrame(() => {
    setTimeout(() => {
      selectedAnimation.style.animationName = "";
    }, 0); //completing the current cycle before moving on to the next
  });
}

//eliminating asynchronous functioning of swiper instance by waiting for renderAnimation.js complete initialization
swiperPromise
  .then((swiper) => {
    firstAnimation = document.querySelector("#motion-path-1"); //animation container asscoiated with first path
    secondAnimation = document.querySelector("#motion-path-2"); //animation container asscoiated with second path
    thirdAnimation = document.querySelector("#motion-path-3"); //animation container asscoiated with third path
    fourthAnimation = document.querySelector("#motion-path-4"); //animation container asscoiated with fourth path

    //by default, first path animation is visible to the user
    firstAnimation.style.setProperty("visibility", "visible");

    //retrieving the stored paths for each rāgā and animating the ball along that path
    firstAnimation.style.setProperty("offset-path", `path('${song.paths[0]}')`);
    secondAnimation.style.setProperty(
      "offset-path",
      `path('${song.paths[1]}')`
    );
    thirdAnimation.style.setProperty("offset-path", `path('${song.paths[2]}')`);
    fourthAnimation.style.setProperty(
      "offset-path",
      `path('${song.paths[3]}')`
    );

    //if the play button on the audio player is pressed, the animation restarts from the beginging of the note's path
    audioPlayer.addEventListener("play", function () {
      if (currentSelection == 0) restartAnimation(firstAnimation);
      if (currentSelection == 1) restartAnimation(secondAnimation);
      if (currentSelection == 2) restartAnimation(thirdAnimation);
      if (currentSelection == 3) restartAnimation(fourthAnimation);
    });

    //playing audio for the note that the user is currently viewing
    audioPlayer.src = audioSources[currentSelection];
    audioPlayer.play();

    //a function to update the audio source and visible animation when user changes note selection
    swiper.on("slideChange", function () {
      currentSelection = swiper.activeIndex;
      audioPlayer.src = audioSources[currentSelection];
      audioPlayer.play();

      //changing the visibility of animations based on user's current note selection
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
  })
  .catch((error) => {
    console.error("Error occured:", error);
  });
