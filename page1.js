// floating bubbles for page 1
var canvas = document.getElementById('float-canvas');
var ctx    = canvas.getContext('2d');
var W, H, bubbles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function makeBubble() {
  return {
    x: Math.random() * W, y: Math.random() * H,
    r: 12 + Math.random() * 48,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.35,
    alpha: 0.05 + Math.random() * 0.1,
    phase: Math.random() * Math.PI * 2
  };
}
for (var i = 0; i < 22; i++) bubbles.push(makeBubble());

function drawBubbles() {
  ctx.clearRect(0, 0, W, H);
  bubbles.forEach(function(b) {
    b.phase += 0.007;
    b.x += b.vx; b.y += b.vy;
    if (b.x < -b.r) b.x = W + b.r;
    if (b.x > W + b.r) b.x = -b.r;
    if (b.y < -b.r) b.y = H + b.r;
    if (b.y > H + b.r) b.y = -b.r;
    var r = b.r + Math.sin(b.phase) * 2.5;
    ctx.beginPath();
    ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,' + b.alpha + ')';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(b.x - r * 0.28, b.y - r * 0.28, r * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + (b.alpha * 0.7) + ')';
    ctx.fill();
  });
  requestAnimationFrame(drawBubbles);
}
drawBubbles();
