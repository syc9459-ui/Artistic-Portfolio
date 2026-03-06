var catImg = new Image();
catImg.src = 'nyan_cat_png.png';

new p5(function(p) {
  var x, y, stars = [];
  var speedX = 4, speedY = 2;
  var W = 120, H = 50;

  p.setup = function() {
    var cnv = p.createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('cat-container');
    x = p.width / 2;
    y = p.height / 2;
    for (var i = 0; i < 150; i++) {
      stars.push({
        x: p.random(0, window.innerWidth),
        y: p.random(0, window.innerHeight),
        size: p.random(1, 4),
        blue: p.random() > 0.5,
        twinkleSpeed: p.random(1, 3)
      });
    }
  };

  p.draw = function() {
    p.background(0, 35);
    p.noStroke();
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var b = 150 + 105 * p.sin(p.frameCount * s.twinkleSpeed * 0.05);
      p.fill(s.blue ? p.color(150, 200, b) : p.color(b));
      p.circle(s.x, s.y, s.size);
    }

    var dx = x + W / 2 - p.mouseX;
    var dy = y + H / 2 - p.mouseY;
    var d = p.sqrt(dx * dx + dy * dy);
    var fleeRadius = 150;

    if (d < fleeRadius && d > 0) {
      var force = (fleeRadius - d) / fleeRadius;
      speedX += (dx / d) * force * 1.2;
      speedY += (dy / d) * force * 1.2;
    }

    var speed = p.sqrt(speedX * speedX + speedY * speedY);
    if (speed > 10) { speedX = (speedX / speed) * 10; speedY = (speedY / speed) * 10; }

    x += speedX;
    y += speedY;

    if (x < 0)           { x = 0;           speedX =  Math.abs(speedX); }
    if (x + W > p.width) { x = p.width - W; speedX = -Math.abs(speedX); }
    if (y < 0)           { y = 0;            speedY =  Math.abs(speedY); }
    if (y + H > p.height){ y = p.height - H; speedY = -Math.abs(speedY); }

    p.push();
    if (speedX < 0) {
      p.translate(x + W, y);
      p.scale(-1, 1);
      p.drawingContext.drawImage(catImg, 0, 0, W, H);
    } else {
      p.drawingContext.drawImage(catImg, x, y, W, H);
    }
    p.pop();
  };

  p.windowResized = function() {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
}, 'cat-container');
