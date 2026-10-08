/*
WEEK 5 WORKSHOP: MISRECOGNITION MIRROR

Step 2 produced a live MobileNet label. Step 3 adds a local JSON dataset
containing ImageNet-related records.

We are not matching the label yet. We are first checking that two systems can
run at the same time:

webcam -> MobileNet -> label
JSON file -> translation records

The required file is finalImageNetLabelsAndEmojis.json. The JSON file is a
separate source of information. Loading it does not mean that the program has
already found the correct record. The connection between the model label and
the dataset is the main task of Step 4.

preload() is used because p5.js can wait for the file to load before setup()
begins. The success and failure callback functions make the loading state
visible and give useful debugging information.
*/

let video; // The live webcam video.
let classifier; // The ml5.js MobileNet classifier.
let mappings = []; // Records loaded from the JSON dataset.
let currentLabel = "Waiting for classification..."; // Latest model label.
let currentConfidence = 0; // Latest confidence, stored from 0 to 1.
let jsonLoaded = false; // Whether the JSON loaded successfully.
let jsonError = false; // Whether JSON loading failed.

function preload() {
  // p5 waits for loadJSON() before continuing to setup().
  mappings = loadJSON("finalImageNetLabelsAndEmojis.json", jsonLoadedSuccessfully, jsonFailedToLoad);
}

function jsonLoadedSuccessfully(data) {
  // Save the loaded records for later use.
  console.log("JSON loaded successfully.");
  console.log("Number of records:", data.length);
  mappings = data;
  jsonLoaded = true;
}

function jsonFailedToLoad(error) {
  // A failure usually means the filename/path is wrong or the JSON is invalid.
  console.error("Could not load JSON dataset:", error);
  jsonError = true;
  mappings = [];
}

function setup() {
  createCanvas(960, 720);
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", { flipped: true });
  classifier.classifyStart(video, gotResults);
}

function gotResults(results) {
  // Store the latest model output for display.
  if (!results || results.length === 0) return;
  currentLabel = results[0].label;
  currentConfidence = results[0].confidence;
}

function draw() {
  image(video, 0, 0, width, height);
  fill(0, 190);
  noStroke();
  rect(20, 20, 780, 220, 12);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(18);
  text("STEP 3: LOAD THE TRANSLATION DATASET", 40, 42);
  text("Model label: " + currentLabel, 40, 78);
  text("Confidence: " + nf(currentConfidence * 100, 2, 1) + "%", 40, 110);
  if (jsonError) {
    fill(255, 100, 100);
    text("JSON: could not be loaded.", 40, 150);
  } else if (!jsonLoaded) {
    text("JSON: still loading...", 40, 150);
  } else {
    text("JSON records loaded: " + mappings.length, 40, 150);
  }
  text("MobileNet: running", 40, 185);
}
