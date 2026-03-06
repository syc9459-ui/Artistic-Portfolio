// shared cursor + floating bubbles for page 1 and page 2
(function() {
  // inject cursor elements
  var dot  = document.createElement('div'); dot.className  = 'cursor-dot';  dot.id = 'cur-dot';
  var ring = document.createElement('div'); ring.className = 'cursor-ring'; ring.id = 'cur-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });

  function tickCursor() {
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tickCursor);
  }
  tickCursor();

  document.addEventListener('mouseover', function(e) {
    var t = e.target;
    if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.tagName === 'IMG' || t.tagName === 'CANVAS' || t.classList.contains('nav-thumb') || t.classList.contains('menu-item')) {
      ring.style.width  = '44px';
      ring.style.height = '44px';
      ring.style.borderColor = 'rgba(255,255,255,0.9)';
      dot.style.transform = 'translate(-50%,-50%) scale(1.6)';
    } else {
      ring.style.width  = '28px';
      ring.style.height = '28px';
      ring.style.borderColor = 'rgba(255,255,255,0.6)';
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    }
  });
})();
