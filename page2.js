function openProject(n) {
  document.querySelectorAll('.nav-thumb').forEach(function(el, i) {
    el.classList.toggle('active', i === n - 1);
  });
  document.querySelectorAll('.project-content').forEach(function(el, i) {
    el.classList.toggle('active', i === n - 1);
  });
  if (n === 5) setTimeout(startDots, 50);
}

// poem
var poem = [
  ["A wicked grin enthralled the innocent,", "But you'll always miss the mark.", "Always miss your shot at your meek attempt of art."],
  ["Trap the young, fool the wise,", "But the ruse, you could see in your eyes.", "Its a job well done, praised by the sick and twisted minds.", "Is it her you think about when your Vow is out of sight?"],
  ["A shining glow on the skin of a child,", "Wise beyond your years.", "But his stare was wild."],
  ["She wipes away her thoughtless tears.", "Not knowing his name, Deceitful Lies.", "His ways wreak havoc on young ones alike."],
  ["He wraps around his arms, a small frame", "His eyes see a desire", "In his heart, a nymphet", "In his mind, a rightful choir."],
  ["When you lay each night, the Moissanite in sight.", "Its the girl that got away, who keeps you up at night."]
];



var poemBody = document.getElementById('poem-body');
poem.forEach(function(stanza) {
  var stanzaEl = document.createElement('div');
  stanzaEl.className = 'poem-stanza';
  stanza.forEach(function(line) {
    var lineEl = document.createElement('span');
    lineEl.className = 'poem-line';
    line.split(' ').forEach(function(word, i, arr) {
      var span = document.createElement('span');
      span.className = 'poem-word';
      span.textContent = word;
      lineEl.appendChild(span);
      if (i < arr.length - 1) lineEl.appendChild(document.createTextNode(' '));
    });
    stanzaEl.appendChild(lineEl);
  });
  poemBody.appendChild(stanzaEl);
});

// colorful dots
var dotsRunning = false, dotsColors = [], COLS = 20, ROWS = 20;

function initDots() {
  var canvas = document.getElementById('dots-canvas');
  canvas.width  = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  dotsColors = [];
  for (var x = 0; x < COLS; x++) {
    dotsColors[x] = [];
    for (var y = 0; y < ROWS; y++) dotsColors[x][y] = null;
  }
  drawDots(canvas, -1, -1, false);
}

function drawDots(canvas, mx, my, pressed) {
  var ctx = canvas.getContext('2d');
  var cw = canvas.width / COLS, ch = canvas.height / ROWS;
  for (var x = 0; x < COLS; x++) {
    for (var y = 0; y < ROWS; y++) {
      var left = x * cw, top = y * ch;
      var hover = mx > left && mx < left + cw && my > top && my < top + ch;
      if (hover && pressed) dotsColors[x][y] = 'hsl(' + Math.floor(Math.random() * 360) + ',70%,65%)';
      ctx.fillStyle = dotsColors[x][y] ? dotsColors[x][y] : hover ? '#c8dcd4' : '#dceae4';
      ctx.fillRect(left, top, cw, ch);
      ctx.strokeStyle = 'rgba(168,196,184,0.4)';
      ctx.strokeRect(left, top, cw, ch);
    }
  }
}

function startDots() {
  if (dotsRunning) return;
  dotsRunning = true;
  initDots();
  var canvas = document.getElementById('dots-canvas');
  var pressed = false;
  canvas.addEventListener('mousedown', function() { pressed = true; });
  canvas.addEventListener('mouseup', function() { pressed = false; });
  canvas.addEventListener('mouseleave', function() { pressed = false; });
  canvas.addEventListener('mousemove', function(e) {
    var r = canvas.getBoundingClientRect();
    drawDots(canvas, (e.clientX - r.left) * (canvas.width / r.width), (e.clientY - r.top) * (canvas.height / r.height), pressed);
  });
  canvas.addEventListener('click', function(e) {
    var r = canvas.getBoundingClientRect();
    drawDots(canvas, (e.clientX - r.left) * (canvas.width / r.width), (e.clientY - r.top) * (canvas.height / r.height), true);
  });
}
