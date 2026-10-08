let video;

function setup() {
  createCanvas(960, 720);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);
  fill(0, 160);
  noStroke();
  rect(20, 20, 760, 75, 12);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(20);
  text("STEP 1: WEBCAM IMPUT", 40, 38);
  textSize(14);
}
