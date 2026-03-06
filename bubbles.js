// BUBBLES THAT FALL WHEN YOU CLICK SAVANNAH CRAWFORD

let bubbles = [];
let animating = false;

function launchBubbles(callback) {
  animating = true;
  bubbles = [];

  // CREATE 40 BUBBLES ACROSS THE SCREEN
  for (let i = 0; i < 40; i++) {
    bubbles.push({
      x: Math.random() * window.innerWidth,
      y: -Math.random() * 200,          // start just above screen
      size: Math.random() * 40 + 15,    // random sizes
      speed: Math.random() * 4 + 2,     // random fall speed
      wobble: Math.random() * 0.05,     // side to side drift
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.3
    });
  }

  // CREATE A CANVAS JUST FOR BUBBLES
  let canvas = document.getElementById('bubble-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  let ctx = canvas.getContext('2d');
  let startTime = null;
  let duration = 1400; // how long the animation lasts in ms

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    let elapsed = timestamp - startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach(b => {
      b.y += b.speed;
      b.angle += b.wobble;
      b.x += Math.sin(b.angle) * 1.2; // gentle side drift

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // SHINY GLARE ON EACH BUBBLE
      ctx.beginPath();
      ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.35)`;
      ctx.fill();
    });

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      // ANIMATION DONE — HIDE CANVAS AND GO TO PAGE
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
      animating = false;
      callback();
    }
  }

  requestAnimationFrame(animate);
}