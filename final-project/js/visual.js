let song;
let amp;
let fft;
let button;
var minAmplitude = 100;
var maxAmplitude = 1000;
let amplitudeHistory = []; //an array to store the amplitude values

//play/pause otoggle for the song
function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound("./assets/audio/Mohanam.mp3"); //loading the song
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

  translate(width / 2, height / 2); // Move origin to the center
  stroke(random(0, 255), random(0, 255), random(0, 255)); // Random color
  noFill();

  let numSegments = 6; // Number of kaleidoscope segments
  for (let k = 0; k < numSegments; k++) {
    push();
    rotate((360 / numSegments) * k); // Rotate for each segment
    beginShape();
    for (let i = 0; i < 360; i++) {
      const radius = map(amplitudeHistory[i], 0, 1, minAmplitude, maxAmplitude);
      let x = radius * cos(i);
      let y = radius * sin(i);
      vertex(x, y);
    }
    endShape();
    pop();
  }
  stroke(255);
  noFill();

  /*for (var i = 0; i < spectrum.length; i++) {
    var am = spectrum[i];
    var y = map(am, 0, 256, height, 0);
    line(i, height, i, y);
  }*/
  translate(width / 2, height / 2);

  //tracing a shape out of the points
  beginShape();
  stroke(random(0, 255), random(0, 255), random(0, 255)); //random color selected

  for (let i = 0; i < 360; i++) {
    const radius = map(amplitudeHistory[i], 0, 1, minAmplitude, maxAmplitude);

    //drawing a circular waveform
    var x = radius * cos(i);
    var y = radius * sin(i);

    vertex(x, y);
  }
  endShape();

  //updating the circular form
  if (amplitudeHistory.length > 360) {
    amplitudeHistory.splice(0, 1);
  }
}
