let x = 0;
let y;
let img;
let speedX = 4;
let speedY = 2;
let stars = [];
let myFont;
let backButton;

const W = 120;
const H = 50;

function preload() {
  img = loadImage('nyan_cat_png.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  y = height / 2;
  img.resize(W, H);
  createStars();
}

function createStars() {
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      blue: random() > 0.5,
      twinkleSpeed: random(1, 3)
    });
  }
}

function draw() {
  background(0, 35);


  noStroke();
  for (let s of stars) {
    let b = 150 + 105 * sin(frameCount * s.twinkleSpeed * 0.05);
    fill(s.blue ? color(150, 200, b) : color(b));
    circle(s.x, s.y, s.size);
  }


  let dx = x + W / 2 - mouseX;
  let dy = y + H / 2 - mouseY;
  let dist = sqrt(dx * dx + dy * dy);
  let fleeRadius = 150;

  if (dist < fleeRadius && dist > 0) {
    let force = (fleeRadius - dist) / fleeRadius;
    speedX += (dx / dist) * force * 1.2;
    speedY += (dy / dist) * force * 1.2;
  }


  let speed = sqrt(speedX * speedX + speedY * speedY);
  let maxSpeed = 10;
  if (speed > maxSpeed) {
    speedX = (speedX / speed) * maxSpeed;
    speedY = (speedY / speed) * maxSpeed;
  }


  x += speedX;
  y += speedY;


  if (x < 0) {
    x = 0;
    speedX = abs(speedX);
  }
  if (x + W > width) {
    x = width - W;
    speedX = -abs(speedX);
  }
  if (y < 0) {
    y = 0;
    speedY = abs(speedY);
  }
  if (y + H > height) {
    y = height - H;
    speedY = -abs(speedY);
  }
  
  push();
  if (speedX < 0) {
    translate(x + W, y);
    scale(-1, 1);
    image(img, 0, 0);
  } else {
    image(img, x, y);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);}
