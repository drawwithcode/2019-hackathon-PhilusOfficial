var intro;
var space;
var replay;
var pause;
var volume = 0;
var ballSpeed = -25;

function preload() {
  intro = loadSound("./assets/TG1_bumper.mp3");
  space = loadImage("./assets/space.jpg")
  replay = loadImage("./assets/replay.png")
  pause = loadImage("./assets/pause.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(intro);
  fft = new p5.FFT();
}

function mousePressed() {
  if (intro.isPlaying() && (mouseX > width / 40 && mouseX < width / 40 + width / 17) && (mouseY > width / 40 && mouseY < width / 20 + width / 20)) {
    intro.pause();
  } else if((mouseX > width / 40 && mouseX < width / 40 + width / 17) && (mouseY > width / 40 && mouseY < width / 20 + width / 20)){
    intro.play();
  }
}


function draw() {

  imageMode(CENTER);
  image(space, width / 2, height / 2, width, width / 16 * 9);
  imageMode(CORNER);
  image(replay, width / 10, width / 40, width / 17, width / 20);
  image(pause, width / 40, width / 40, width / 20, width / 20);

  var spectrum = fft.analyze();

  if (intro.isPlaying()) {
    ballSpeed++;
  } else {
    reset = 0;
  }

  noStroke();
  fill(255);
  for (var i = 0; i < spectrum.length; i += 2) {
    let x = map(i, 0, spectrum.length / 2, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / 400, h / 7)
  }

  volume = analyzer.getLevel();
  shadow = map(volume, 0, 1, 50, 0)
  volume = map(volume, 0, 1, 0, height)

  fill(150);
  ellipse(ballSpeed * 4, height / 4 * 2 + 75, shadow, shadow / 2);
  fill('white');
  ellipse(ballSpeed * 4, height / 4 * 2 - volume, 50);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
