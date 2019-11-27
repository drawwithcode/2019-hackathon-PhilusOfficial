var intro;
var space;
var volume = 0;
var ballSpeed=-25;

function preload() {
  intro = loadSound("./assets/TG1_bumper.mp3");
  space = loadImage("./assets/space.jpg")
  replay = loadImage("./assets/replay.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(intro);
  fft = new p5.FFT();
}

function mousePressed() {
  if (intro.isPlaying()) {
    intro.pause();
  } else{
    intro.play();
  }
}


function draw() {
  var replay = image(replay, width/20, width/20, width/17, width/20);
  replay.mousePressed(function() {
    if (intro.isPlaying()) {
      intro.pause();
    } else{
      intro.play();
    }
  });

  imageMode(CENTER);
  image(space, width/2, height/2, width, width/16*9);

  var spectrum = fft.analyze();

  if (intro.isPlaying()) {
    ballSpeed++;
  } else {
    reset = 0;
  }

  noStroke();
  fill(255);
  for (var i = 0; i< spectrum.length; i+=2){
    let x = map(i, 0, spectrum.length/2, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width/400, h/7)
  }

  volume = analyzer.getLevel();
  shadow = map(volume, 0, 1, 50, 0)
  volume = map(volume, 0, 1, 0, height)

  fill(150);
  ellipse(ballSpeed*4, height/4*2+75, shadow, shadow/2);
  fill('white');
  ellipse(ballSpeed*4, height/4*2 - volume, 50);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
