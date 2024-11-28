// Variable for handpose model
let handpose;
// Variable to store the video feed
let video;
// Array for hand point predictions
let predictions = [];

// Define the path using the specified points
let path = [
  { x: 20.67611198425293, y: 222.2511962890625 },
  { x: 51.469180297851565, y: 221.489111328125 },
  { x: 81.5281982421875, y: 214.65874023437502 },
  { x: 108.2205078125, y: 201.26287841796875 },
  { x: 137.11574707031252, y: 192.65999755859377 },
  { x: 154.93333740234377, y: 168.68564453125 },
  { x: 176.12343750000002, y: 160.768212890625 },
  { x: 204.26590576171876, y: 149.29007568359376 },
  { x: 226.1790283203125, y: 131.97650146484375 },
  { x: 255.42995605468752, y: 126.82042236328125 },
  { x: 275.148779296875, y: 104.66524658203126 },
  { x: 280.029443359375, y: 105.20341186523439 },
  { x: 309.95791015625, y: 105.26541748046876 },
  { x: 317.416015625, y: 80.68994750976563 },
  { x: 313.7037841796875, y: 100.43085327148438 },
  { x: 343.18742675781255, y: 103.66539916992188 },
  { x: 351.8732421875, y: 85.87185668945312 },
  { x: 379.19865722656255, y: 94.2565185546875 },
  { x: 404.8782958984375, y: 79.02222290039063 },
  { x: 413.14645996093753, y: 49.70237731933594 },
];

// Current index in the path
let pathIndex = 0;
// Define a distance threshold for snapping
let threshold = 20;

function setup() {
  // Create the canvas
  createCanvas(640, 480);
  // Capture the video feed and set it to the width and height of the current canvas
  video = createCapture(VIDEO);
  video.size(width, height);

  // Print to let us know that the handpose model is loading
  print("loading");
  // Call modelReady() when it is loaded
  handpose = ml5.handpose(video, modelReady);
  // Hide the video element, and just show the canvas
  video.hide();
}

// When the model is ready, a message appears in the console, and it predicts where each landmark should be placed
function modelReady() {
  console.log("Model ready!");
  // When handpose is ready, do the detection
  handpose.on("predict", function (results) {
    predictions = results;
  });
}

function draw() {
  // Render the video feed
  image(video, 0, 0, width, height);
  // Draw the predefined path
  drawPath();
  // Draw the ball along the path based on the index finger's position
  moveBallAlongPath();
}

// Function to draw the predefined path
function drawPath() {
  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();
}

// Function to move the ball along the path based on index finger position
function moveBallAlongPath() {
  if (predictions.length > 0) {
    let prediction = predictions[0];
    let x = prediction.annotations.indexFinger[3][0];
    let y = prediction.annotations.indexFinger[3][1];
    print("Finger position:", x, y);

    // Check if the index finger is close to the current path point
    let target = path[pathIndex];
    let d = dist(x, y, target.x, target.y);

    if (d < threshold) {
      // Move to the next point if close enough
      pathIndex = (pathIndex + 1) % path.length;
    }

    // Draw the ball at the current path point
    noStroke();
    fill(0, 255, 0);
    ellipse(target.x, target.y, 33, 33);
  }
}
