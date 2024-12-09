import { getCurrentSelection } from "./utils.js";
let song;
let amp;
let fft;
let button;
var minAmplitude = 80;
var maxAmplitude = 800;
let amplitudeHistory = []; //an array to store the amplitude values

//storing the paths to all songs in a single array
const songSources = [
  "../assets/audio/Mohanam.mp3",
  "../assets/audio/Kalyani.mp3",
  "../assets/audio/Shankarabharanam.mp3",
  "../assets/audio/Malahari.mp3",
  "../assets/audio/Saveri.mp3",
  "../assets/audio/Kamas.mp3",
  "../assets/audio/Bhairavi.mp3",
];

window.preload = preload;
window.setup = setup;
window.draw = draw;

//play/pause toggle for the song
function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  const songNumber = getCurrentSelection();
  console.log(songNumber);
  song = loadSound(songSources[songNumber]); //retrieving the song based on the selection made by the user
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude(); //creating an amplitude object
  fft = new p5.FFT(0, 256); //creating an FFT object
}

function draw() {
  background(0);
  let amplitude = amp.getLevel();
  var spectrum = fft.analyze();
  amplitudeHistory.push(amplitude);

  //translate(width / 2, height / 2); //Moving origin to the center
  stroke(random(0, 255), random(0, 255), random(0, 255)); //Random color
  noFill();
  const xPositions = [0, width / 2, width, 0, width / 2, width];
  const yPositions = [
    0,
    height / 2,
    height,
    height / 4,
    height / 2,
    (3 * height) / 5,
  ];
  let numSegments = 6; //Number of kaleidoscope segments
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
          const radius = map(
            amplitudeHistory[i],
            0,
            1,
            minAmplitude,
            maxAmplitude
          );

          // Map frequency value to colors
          const r = map(freqValue, 0, 255, 50, 255); // Red intensity
          const g = map(freqValue, 0, 255, 100, 200); // Green intensity
          const b = map(freqValue, 0, 255, 150, 255); // Blue intensity
          stroke(r, g, b);
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
