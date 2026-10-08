/*
WEEK 5 WORKSHOP: MISRECOGNITION MIRROR

This is Step 1 of a sequence of sketches. Each sketch adds one layer to an
interactive machine-vision system:

1. Step 1 receives and displays webcam pixels.
2. Step 2 sends those pixels to MobileNet for classification.
3. Step 3 loads a local JSON dataset beside the classifier.
4. Step 4 matches the model label to a JSON record.
5. The full sketch turns the match into an emoji-based interpretation mirror.
6. The bonus sketch gives the system short-term memory.

In this first sketch, the program has input but no interpretation. The webcam
is a stream of changing pixel data. The program does not know what appears in
the image, and no machine-learning model is involved yet.

Important concepts:
- A video element stores the camera stream.
- A p5.js canvas is where the stream is displayed.
- setup() runs once; draw() repeats continuously.
- createCapture(VIDEO) may require browser permission.
*/

// This variable stores the HTML video element created by p5.js.
let video;

function setup() {
  // setup() runs once when the page loads.
  createCanvas(960, 720);
  // Request live webcam input. The browser may ask for permission.
  video = createCapture(VIDEO);
  video.size(width, height);
  // Hide the separate HTML video element; draw() displays it on the canvas.
  video.hide();
}

function draw() {
  // draw() repeats many times per second and copies the current video frame.
  image(video, 0, 0, width, height);
  fill(0, 160);
  noStroke();
  rect(20, 20, 760, 75, 12);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(20);
  text("STEP 1: WEBCAM INPUT", 40, 38);
  textSize(14);
  text("The camera provides pixels; the system has not classified them yet.", 40, 68);
}
