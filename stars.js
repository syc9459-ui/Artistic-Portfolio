

function launchStars(callback) {
  let canvas = document.getElementById('bubble-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  let ctx = canvas.getContext('2d');
  let stars = [];
  let startTime = null;
  let duration = 1600;

  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;

  
  for (let i = 0; i < 120; i++) {
    let angle = Math.random() * Math.PI * 2;
    let speed = Math.random() * 12 + 4;
    stars.push({
      x: centerX,
      y: centerY,
      angle: angle,
      speed: speed,
      length: Math.random() * 8 + 2,   // tail length
      opacity: Math.random() * 0.8 + 0.2,
      size: Math.random() * 2 + 0.5
    });
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    let elapsed = timestamp - startTime;



    
    ctx.fillStyle = 'rgba(168, 196, 184, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      star.speed += 0.4; // ACCELERATE over time

    
      let tailX = star.x - Math.cos(star.angle) * star.length * (star.speed * 0.4);
      let tailY = star.y - Math.sin(star.angle) * star.length * (star.speed * 0.4);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(star.x, star.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.lineWidth = star.size;
      ctx.stroke();
    });

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
      callback();
    }
  }

  requestAnimationFrame(animate);
}
