var intro;
var space;
var spaceship;
var stop;
var play;
var help = 0;
var volume = 0;
var speed = 0;

function preload() {
  intro = loadSound("./assets/TG1_bumper.mp3");
  space = loadImage("./assets/space.jpg")
  spaceship = loadImage("./assets/spaceship.png")
  stop = loadImage("./assets/stop.png")
  play = loadImage("./assets/play.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(intro);
  fft = new p5.FFT();
}

function mousePressed() {
  if (intro.isPlaying() && (mouseX > width / 10 && mouseX < width / 10 + width / 20) && (mouseY > width / 40 && mouseY < width / 20 + width / 20)) {
    intro.stop();
    speed = 0;
  }

    else if((mouseX > width / 40 && mouseX < width / 40 + width / 20) && (mouseY > width / 40 && mouseY < width / 20 + width / 20)){
    intro.play();
    speed = 0;
  }
}


function draw() {

  imageMode(CENTER);
  image(space, width / 2, height / 2, width, width / 16 * 9);
  imageMode(CORNER);
  image(stop, width / 10, width / 40, width / 20, width / 20);
  image(play, width / 40, width / 40, width / 20, width / 20);

  var spectrum = fft.analyze();

  if (intro.isPlaying()) {
    speed++;
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

  imageMode(CENTER);
  image(spaceship, speed * 4 - 220, height/4*2 - volume, width / 5, width / 5);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
