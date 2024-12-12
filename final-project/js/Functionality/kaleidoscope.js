import { getCurrentSelection } from "./utils.js";
let song;
let amp;
let fft;

var minAmplitude = 80;
var maxAmplitude = 800;
let amplitudeHistory = []; //an array to store the amplitude values
let songNumber;

//storing the paths to all audio sources in a single array
const songSources = [
  "../assets/audio/Rāgās/Mohanam.mp3",
  "../assets/audio/Rāgās/Kalyani.mp3",
  "../assets/audio/Rāgās/Shankarabharanam.mp3",
  "../assets/audio/Rāgās/Malahari.mp3",
  "../assets/audio/Rāgās/Saveri.mp3",
  "../assets/audio/Rāgās/Kamas.mp3",
  "../assets/audio/Rāgās/Bhairavi.mp3",
];

window.preload = preload;
window.setup = setup;
window.draw = draw;

function preload() {
  songNumber = getCurrentSelection();

  song = loadSound(songSources[songNumber]); //retrieving the song based on the selection made by the user
}

function setup() {
  describe(
    "A dynamic background which portrays a kaleidoscope at different points in time of a song. The kaleidoscope has 6 segments and responds to the music played by changing its form.",
    FALLBACK
  );
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  describeElement(
    "button",
    "A button to toggle between playing and pausing music"
  );
  const audioControlsDiv = createDiv("");
  audioControlsDiv.id("audioControlsDiv");
  const audioControls = createButton("Play");
  audioControls.parent(audioControlsDiv);
  audioControls.id("audioControls");
  audioControls.attribute("aria-label", "Play audio"); //adding ARIA label for better accessibility
  audioControls.attribute("role", "button"); //specifying the role of the button
  audioControls.addClass("pause");

  audioControls.mouseClicked(() => {
    if (audioControls.hasClass("pause")) {
      audioControls.removeClass("pause");
      song.pause();
      audioControls.addClass("play");
      audioControls.html("Play");
      audioControls.attribute("aria-label", "Play audio");
    } else if (audioControls.hasClass("play")) {
      audioControls.removeClass("play");
      song.play();
      audioControls.addClass("pause");
      audioControls.html("Pause");
      audioControls.attribute("aria-label", "Pause audio");
    }
  });
  audioControls.attribute("tabindex", "0"); //to access play/pause button using keyboard
  audioControls.elt.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      audioControls.elt.click();
    }
  });
  window.addEventListener("resize", windowResized);

  amp = new p5.Amplitude(); //creating an amplitude object
  fft = new p5.FFT(0, 256); //creating an FFT object
}
function windowResized() {
  //adjusting size of canvas for responsiveness
  resizeCanvas(windowWidth, windowHeight);
}

//function to dynamically update the position of kaleidoscope elements for responsiveness
function getCoordinates() {
  const currentX = [
    0,
    windowWidth / 2,
    windowWidth,
    0,
    windowWidth / 2,
    windowWidth,
  ];
  const currentY = [
    0,
    windowHeight / 2,
    windowHeight,
    windowHeight / 4,
    windowHeight / 2,
    (3 * windowHeight) / 5,
  ];
  return { currentX, currentY };
}

function draw() {
  window.addEventListener("resize", windowResized);
  const { currentX: xPositions, currentY: yPositions } = getCoordinates();
  describeElement("Background", "A black background.");
  background(0);
  let amplitude = amp.getLevel();
  var spectrum = fft.analyze();
  amplitudeHistory.push(amplitude);

  stroke(255);
  noFill();
  let numSegments = 6; //Number of kaleidoscope segments
  describe(
    "The kaleidoscope segments begin as 6 circles which transform according to changes in frequency and amplitude of the music.",
    FALLBACK
  );
  for (let i = 0; i < numSegments; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < numSegments; k++) {
        push();
        translate(xPositions[i], yPositions[j]); //Moving origin of each element to different parts of the screen
        rotate((360 / numSegments) * k); //Rotating for each segment

        //tracing a shape out of the points
        beginShape();
        for (let i = 0; i < 360; i++) {
          const freqIndex = i % spectrum.length; // Map angle to frequency index
          const freqValue = spectrum[freqIndex]; // Get frequency value (0-255)
          const radius =
            amplitudeHistory[i] !== undefined
              ? map(amplitudeHistory[i], 0, 1, minAmplitude, maxAmplitude)
              : minAmplitude; //for unexpected values, assuming minimum amplitude

          //mapping frequency to stroke weight
          const thickness = map(freqValue, 0, 255, 1, 10);
          strokeWeight(thickness);
          stroke(255);
          //drawing a circular waveform
          let x = radius * cos(i);
          let y = radius * sin(i);
          vertex(x, y);
        }
        endShape();
        pop();
      }
    }
  }

  stroke(255);
  noFill();

  //updating the circular form
  if (amplitudeHistory.length > 360) {
    amplitudeHistory.splice(0, 1);
  }
}
