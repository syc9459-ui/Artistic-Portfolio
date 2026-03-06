// INK DROPS THAT SPLATTER ACROSS SCREEN THEN TRANSITION

function launchInk(callback) {
  let canvas = document.getElementById('bubble-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  let ctx = canvas.getContext('2d');
  let drops = [];
  let startTime = null;
  let duration = 1600;

  // CREATE INK DROPS IN RANDOM SPOTS
  for (let i = 0; i < 25; i++) {
    drops.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 0,
      maxRadius: Math.random() * 80 + 40,
      speed: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.4 + 0.2,
      delay: Math.random() * 400  // each drop starts at a slightly different time
    });
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    let elapsed = timestamp - startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drops.forEach(drop => {
      // WAIT FOR THIS DROP'S DELAY BEFORE STARTING
      if (elapsed < drop.delay) return;

      if (drop.radius < drop.maxRadius) {
        drop.radius += drop.speed;
      }

      // MAIN CIRCLE
      ctx.beginPath();
      ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${drop.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // INNER FILLED BLOB
      ctx.beginPath();
      ctx.arc(drop.x, drop.y, drop.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.3})`;
      ctx.fill();

      // SMALL SPLATTER DOTS AROUND EACH DROP
      for (let i = 0; i < 5; i++) {
        let angle = (i / 5) * Math.PI * 2;
        let sx = drop.x + Math.cos(angle) * (drop.radius * 1.2);
        let sy = drop.y + Math.sin(angle) * (drop.radius * 1.2);
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.6})`;
        ctx.fill();
      }
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