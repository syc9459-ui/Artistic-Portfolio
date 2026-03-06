const sketch = (p) => {

  let waves = [];
  let mouseX = -9999;
  let mouseY = -9999;

  class Wave {
    constructor() {
      this.yPosition = p.random(0.70, 0.97);
      this.amplitude = p.random(10, 28);
      this.frequency = p.random(0.004, 0.016);
      this.speed     = p.random(0.25, 0.85);
      this.opacity   = p.random(15, 55);
      this.offset    = p.random(p.TWO_PI);
    }

    draw(time) {
      p.noFill();
      p.stroke(255, 255, 255, this.opacity);
      p.strokeWeight(2);
      p.beginShape();

      for (let x = 0; x <= p.width; x += 4) {
        let centerY = this.yPosition * p.height;
        let distance = p.dist(x, centerY, mouseX, mouseY);
        let pull = p.map(p.constrain(distance, 0, 220), 0, 220, 42, 0);
        let direction = centerY < mouseY ? -1 : 1;
        let y = centerY
              + p.sin(x * this.frequency + time * this.speed + this.offset) * this.amplitude
              + direction * pull;
        p.vertex(x, y);
      }

      p.endShape();
    }
  }

  p.setup = () => {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    document.body.insertBefore(canvas.elt, document.body.firstChild);
    canvas.elt.style.position = 'fixed';
    canvas.elt.style.top = '0';
    canvas.elt.style.left = '0';
    canvas.elt.style.zIndex = '0';
    canvas.elt.style.pointerEvents = 'none';

    for (let i = 0; i < 7; i++) {
      waves.push(new Wave());
    }
  };

  p.draw = () => {
  
    if (!document.getElementById('home').classList.contains('active')) {
      p.clear();
      return;
    }

    p.background(168, 196, 184);
    let time = p.millis() / 1000;
    waves.forEach(wave => wave.draw(time));
  };

  p.mouseMoved = () => {
    mouseX = p.mouseX;
    mouseY = p.mouseY;
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

};

new p5(sketch);