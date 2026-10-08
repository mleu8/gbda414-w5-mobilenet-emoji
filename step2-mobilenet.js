/*
WEEK 5 WORKSHOP: MISRECOGNITION MIRROR

Step 1 displayed webcam pixels. Step 2 adds MobileNet, a pretrained image-
classification model supplied through ml5.js.

Pipeline so far:
webcam image -> MobileNet -> label and confidence

MobileNet does not return a perfect description of reality. It returns a
prediction based on patterns learned from its training data. The confidence
value is also a model score, not a guarantee that the label is correct.

This sketch does not load the JSON translation dataset yet. That happens in
Step 3. At this stage, focus on the difference between the raw camera input,
the classifier object, the label returned by the classifier, and the
confidence associated with that label.
*/

let video; // Stores the live webcam video.
let classifier; // Stores the ml5.js MobileNet classifier.
let currentLabel = "Waiting for classification..."; // Latest model label.
let currentConfidence = 0; // Latest confidence, stored from 0 to 1.
let modelLoaded = false; // Used by the interface to describe model status.

function setup() {
  createCanvas(960, 720);
  // A mirrored webcam behaves like a mirror for the participant.
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();
  // Create the pretrained MobileNet classifier.
  classifier = ml5.imageClassifier("MobileNet", { flipped: true });
  // classifyStart() repeatedly sends webcam frames to MobileNet.
  modelLoaded = true;
  classifier.classifyStart(video, gotResults);
}

function gotResults(results) {
  // results is an array; results[0] is normally the highest-confidence result.
  if (!results || results.length === 0) return;
  currentLabel = results[0].label;
  currentConfidence = results[0].confidence;
}

function draw() {
  image(video, 0, 0, width, height);
  fill(0, 190);
  noStroke();
  rect(20, 20, 780, 200, 12);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(18);
  text("STEP 2: MOBILENET CLASSIFICATION", 40, 42);
  if (!modelLoaded) {
    textSize(24);
    text("Loading MobileNet...", 40, 82);
    return;
  }
  textSize(18);
  text("MobileNet label:", 40, 82);
  textSize(28);
  text(currentLabel, 40, 115, 680, 45);
  textSize(18);
  text("Confidence: " + nf(currentConfidence * 100, 2, 1) + "%", 40, 175);
}
