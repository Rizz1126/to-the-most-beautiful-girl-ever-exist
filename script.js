/* =============================================
   SCRIPT.JS — ROMANTIC BIRTHDAY
   ============================================= */

const state = {
  currentScene: 'countdown',
  musicPlaying: false,
  messageIndex: 0,
  unlocked: false,
};

const countdownMessages = [
  "Some moments are worth waiting for.",
  "Patience, my love.",
  "A little longer, pretty girl.",
  "Your surprise is waiting for midnight.",
  "The best part is coming.",
  "Almost time, baby.",
  "Not yet… but soon.",
  "This story begins on May 26.",
  "You're getting closer ❤️",
  "The universe is preparing something beautiful for you."
];

const passwordWrongMessages = [
  "That's not it, baby 🤍",
  "Almost, my love.",
  "Try again, pretty girl.",
  "You're cute when you try.",
  "Closer ❤️"
];

const messages = [
  "Happy Birthday to the girl who changed my life without even trying.",
  "You are my favorite person, my safest place, and my happiest feeling.",
  "You make my world softer, warmer, and brighter.",
  "I still can't believe someone as beautiful as you exists.",
  "Your smile is still my favorite thing in this world.",
  "You make ordinary days feel magical.",
  "You deserve all the love, happiness, and peace in the universe.",
  "If I could choose again, I would still choose you every single time.",
  "You are genuinely the most amazing person I have ever met.",
  "You are not just beautiful — you are unforgettable.",
  "Thank you for loving me even when I'm difficult.",
  "I'm sorry for every mistake, every misunderstanding, and every moment I hurt you.",
  "No matter what happens, I will always love and care about you deeply.",
  "And today, I hope you truly feel how loved you are.",
  "Happy Birthday, my love ❤️",
];

const missMessages = [
  "Almost there, baby ❤️",
  "Closer…",
  "You already have my heart anyway.",
  "Try again, pretty girl.",
  "My heart only opens for you.",
  "So close, my love 💕",
  "A little more… you can do it ✨",
];

const finalMessage = `You are one of the best things that has ever happened to me.\n\nThank you for staying, for loving me, for being patient with me, and for existing in my life.\n\nI know I'm not perfect, but my feelings for you are real.\n\nNo matter how many birthdays pass, I will always look at you with the same admiration, love, and warmth.\n\nHappy Birthday, my love. ❤️`;

// All media files — new.mp4 replaces bottom center video
const mediaFiles = [
  { src: "photos/WhatsApp Image 2026-05-23 at 10.49.46 PM.jpeg",     type: "image", caption: "That beautiful smile 💕" },
  { src: "photos/WhatsApp Image 2026-05-23 at 10.49.46 PM (2).jpeg", type: "image", caption: "Extraordinary soul ✨" },
  { src: "photos/WhatsApp Image 2026-05-23 at 10.49.46 PM (4).jpeg", type: "image", caption: "Born to light up this world 🌸" },
  { src: "photos/WhatsApp Image 2026-05-23 at 11.02.58 PM.jpeg",     type: "image", caption: "My favorite person ❤️" },
  { src: "photos/WhatsApp Image 2026-05-23 at 11.02.58 PM (1).jpeg", type: "image", caption: "Simply stunning 💖" },
  { src: "photos/WhatsApp Video 2026-05-23 at 10.49.47 PM.mp4",     type: "video", caption: "You & your magic 🌟" },
  { src: "photos/WhatsApp Video 2026-05-23 at 10.49.47 PM (1).mp4", type: "video", caption: "So full of life 💫" },
  { src: "photos/WhatsApp Video 2026-05-23 at 10.49.47 PM (2).mp4", type: "video", caption: "Breathtaking 🌹" },
  { src: "photos/new.mp4",                                           type: "video", caption: "Pure happiness ✨" },
  { src: "photos/WhatsApp Video 2026-05-23 at 10.49.47 PM (4).mp4", type: "video", caption: "This moment, forever 💕" },
];

// ============================================
// DOM REFS
// ============================================
const bgMusic       = document.getElementById('bgMusic');
const countdownMusic= document.getElementById('countdownMusic');
const musicControl  = document.getElementById('musicControl');
const musicIcon     = document.getElementById('musicIcon');
const starsCanvas   = document.getElementById('starsCanvas');
const confettiCanvas= document.getElementById('confettiCanvas');
const petalCanvas   = document.getElementById('petalCanvas');
const cursorCanvas  = document.getElementById('cursorCanvas');
const sceneCountdown= document.getElementById('scene-countdown');
const sceneUnlock   = document.getElementById('scene-unlock');
const sceneBirthday = document.getElementById('scene-birthday');
const sceneEnding   = document.getElementById('scene-ending');
const sceneGallery  = document.getElementById('scene-gallery');
const heartLock     = document.getElementById('heartLock');
const keyDrag       = document.getElementById('keyDrag');
const unlockOverlay = document.getElementById('unlockOverlay');
const missText      = document.getElementById('missText');
const subText       = document.getElementById('subText');
const wishContainer = document.getElementById('wishContainer');
const birthdayHeader  = document.getElementById('birthdayHeader');
const endingText    = document.getElementById('endingText');
const galleryBtn    = document.getElementById('galleryBtn');
const featuredFrames = document.getElementById('featuredFrames');
const remainingGallery = document.getElementById('remainingGallery');

// Countdown DOM
const countdownTimer   = document.getElementById('countdownTimer');
const countdownMessage = document.getElementById('countdownMessage');
const openSoonerBtn    = document.getElementById('openSoonerBtn');
const openSoonerWrapper= document.getElementById('openSoonerWrapper');
const enterBtnWrapper  = document.getElementById('enterBtnWrapper');
const enterBtn         = document.getElementById('enterBtn');
const passwordModal    = document.getElementById('passwordModal');
const passwordInput    = document.getElementById('passwordInput');
const passwordSubmit   = document.getElementById('passwordSubmit');
const passwordError    = document.getElementById('passwordError');
const closeModalBtn    = document.getElementById('closeModalBtn');

// ============================================
// GLOBAL STARS — twinkling bright/dim
// ============================================
let starsData = [];
function initStars() {
  const ctx = starsCanvas.getContext('2d');
  starsCanvas.width  = window.innerWidth;
  starsCanvas.height = window.innerHeight;

  starsData = Array.from({ length: 300 }, () => {
    const baseAlpha = Math.random() * 0.6 + 0.1;
    return {
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 2.0 + 0.3,
      twinkleSpeed: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      baseAlpha,
      hue: Math.random() * 40 + 330,
      saturation: Math.random() * 30 + 10,
      lightness: Math.random() * 20 + 80,
      gemini: false,
    };
  });

  const gx = starsCanvas.width * 0.78, gy = starsCanvas.height * 0.18;
  const geminiStars = [
    {x: gx - 30, y: gy - 25}, // 0: Pollux Head
    {x: gx + 10, y: gy - 35}, // 1: Castor Head
    {x: gx - 20, y: gy},      // 2: Pollux Neck
    {x: gx + 20, y: gy},      // 3: Castor Neck
    {x: gx - 50, y: gy + 10}, // 4: Pollux Arm
    {x: gx + 50, y: gy - 30}, // 5: Castor Arm
    {x: gx - 20, y: gy + 30}, // 6: Pollux Waist
    {x: gx + 20, y: gy + 30}, // 7: Castor Waist
    {x: gx - 20, y: gy + 55}, // 8: Pollux Knee
    {x: gx - 5,  y: gy + 80}, // 9: Pollux Foot
    {x: gx - 10, y: gy + 60}, // 10: Inner Foot (from Castor Waist)
    {x: gx + 40, y: gy + 50}, // 11: Castor Knee
    {x: gx + 60, y: gy + 70}, // 12: Castor Foot
    {x: gx + 70, y: gy + 45}  // 13: Castor Outer
  ];
  geminiStars.forEach(s => {
    starsData.push({
      x: s.x, y: s.y, r: 2.0,
      twinkleSpeed: 0.3, phase: Math.random() * Math.PI * 2,
      baseAlpha: 0.7, hue: 220, saturation: 30, lightness: 90, gemini: true,
    });
  });

  function drawStars() {
    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    const t = Date.now() * 0.001;

    ctx.save();
    ctx.strokeStyle = 'rgba(255,200,240,0.15)';
    ctx.lineWidth = 0.8;
    const g = starsData.filter(s => s.gemini);
    if (g.length >= 14) {
      ctx.beginPath();
      // Pollux upper
      ctx.moveTo(g[0].x, g[0].y); ctx.lineTo(g[2].x, g[2].y);
      ctx.lineTo(g[4].x, g[4].y);
      // Castor upper
      ctx.moveTo(g[1].x, g[1].y); ctx.lineTo(g[3].x, g[3].y);
      ctx.lineTo(g[5].x, g[5].y);
      // Twin connection
      ctx.moveTo(g[2].x, g[2].y); ctx.lineTo(g[3].x, g[3].y);
      // Pollux body & leg
      ctx.moveTo(g[2].x, g[2].y); ctx.lineTo(g[6].x, g[6].y);
      ctx.lineTo(g[8].x, g[8].y); ctx.lineTo(g[9].x, g[9].y);
      // Castor body & legs
      ctx.moveTo(g[3].x, g[3].y); ctx.lineTo(g[7].x, g[7].y);
      ctx.lineTo(g[10].x, g[10].y); // Inner foot
      ctx.moveTo(g[7].x, g[7].y); ctx.lineTo(g[11].x, g[11].y);
      ctx.lineTo(g[12].x, g[12].y); // Castor foot
      ctx.moveTo(g[11].x, g[11].y); ctx.lineTo(g[13].x, g[13].y); // Castor outer
      ctx.stroke();
    }
    ctx.restore();

    starsData.forEach(s => {
      const twinkle = Math.sin(t * s.twinkleSpeed + s.phase);
      const alpha = s.baseAlpha * (0.15 + 0.85 * (0.5 + 0.5 * twinkle));
      const radiusPulse = s.r * (0.85 + 0.15 * (0.5 + 0.5 * twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, radiusPulse, 0, Math.PI * 2);
      ctx.fillStyle = s.gemini
        ? `rgba(200,220,255,${alpha})`
        : `hsla(${s.hue}, ${s.saturation}%, ${s.lightness}%, ${alpha})`;
      ctx.fill();
      if (alpha > 0.5 && s.r > 1.2) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, radiusPulse * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = s.gemini
          ? `rgba(200,220,255,${alpha * 0.12})`
          : `hsla(${s.hue}, ${s.saturation}%, ${s.lightness}%, ${alpha * 0.1})`;
        ctx.fill();
      }
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
}

// ============================================
// FLOWER PETAL CONFETTI
// ============================================
let petals = [];
let petalActive = false;

function triggerPetalBurst() {
  petalCanvas.width = window.innerWidth;
  petalCanvas.height = window.innerHeight;
  const ctx = petalCanvas.getContext('2d');

  const cx = petalCanvas.width / 2;
  const cy = petalCanvas.height / 2 - 50;

  const petalColors = [
    { fill: '#ffb6d9', stroke: '#e8789a' },
    { fill: '#ffd6e7', stroke: '#ffb3d1' },
    { fill: '#f5d6e8', stroke: '#d4b8e0' },
    { fill: '#ffe0f0', stroke: '#ffcce0' },
    { fill: '#fce4ec', stroke: '#f8bbd0' },
    { fill: '#fff0f5', stroke: '#ffc0cb' },
  ];

  petals = Array.from({ length: 120 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 18 + 6;
    return {
      x: cx,
      y: cy,
      size: Math.random() * 12 + 6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.4,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.05 + 0.02,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      alpha: 1,
    };
  });

  petalActive = true;

  function drawPetal(ctx, x, y, size, rotation, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.6, size * 0.5, 0, size);
    ctx.bezierCurveTo(-size * 0.6, size * 0.5, -size * 0.8, -size * 0.5, 0, -size);
    ctx.closePath();
    ctx.fillStyle = color.fill;
    ctx.fill();
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -size * 0.7);
    ctx.lineTo(0, size * 0.6);
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = 0.3;
    ctx.globalAlpha = alpha * 0.4;
    ctx.stroke();

    ctx.restore();
  }

  function animatePetals() {
    if (!petalActive) return;
    ctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    let activeCount = 0;

    petals.forEach(p => {
      if (p.y > petalCanvas.height + 50) return;
      activeCount++;

      p.wobblePhase += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobblePhase) * 2.5;
      p.vy += 0.3; // Gravity
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
    });

    if (activeCount > 0) {
      requestAnimationFrame(animatePetals);
    } else {
      petalActive = false;
      ctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    }
  }
  animatePetals();
}

// ============================================
// CURSOR HEARTS
// ============================================
let cursorX = window.innerWidth / 2, cursorY = window.innerHeight / 2;
const cursorParticles = [];
const cursorCtx = cursorCanvas.getContext('2d');

function resizeCursorCanvas() {
  cursorCanvas.width  = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
}

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX; cursorY = e.clientY;
  if (Math.random() < 0.25) {
    cursorParticles.push({
      x: cursorX, y: cursorY,
      vx: (Math.random()-0.5)*2, vy: -Math.random()*2-1,
      size: Math.random()*10+6, alpha: 0.85,
      emoji: Math.random()<0.5?'❤️':'💕',
    });
  }
});

function drawCursor() {
  cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
  cursorCtx.beginPath(); cursorCtx.arc(cursorX, cursorY, 6, 0, Math.PI*2);
  cursorCtx.fillStyle = 'rgba(255,150,200,0.85)'; cursorCtx.fill();
  cursorCtx.beginPath(); cursorCtx.arc(cursorX, cursorY, 3, 0, Math.PI*2);
  cursorCtx.fillStyle = 'white'; cursorCtx.fill();
  for (let i = cursorParticles.length-1; i >= 0; i--) {
    const p = cursorParticles[i];
    p.x += p.vx; p.y += p.vy; p.alpha -= 0.025; p.size *= 0.97;
    if (p.alpha <= 0) { cursorParticles.splice(i,1); continue; }
    cursorCtx.globalAlpha = p.alpha;
    cursorCtx.font = `${p.size}px serif`;
    cursorCtx.fillText(p.emoji, p.x-p.size/2, p.y);
    cursorCtx.globalAlpha = 1;
  }
  requestAnimationFrame(drawCursor);
}

// ============================================
// FLOATING HEARTS BG
// ============================================
function spawnFloatingHeart(container) {
  const heart = document.createElement('span');
  heart.className = 'float-heart';
  heart.textContent = ['❤️','💕','💗','💖','💓'][Math.floor(Math.random()*5)];
  const size = Math.random()*20+10;
  heart.style.fontSize = size+'px';
  heart.style.left = Math.random()*100+'vw';
  heart.style.bottom = '-40px';
  const dur = Math.random()*8+6;
  heart.style.animationDuration = dur+'s';
  heart.style.opacity = Math.random()*0.6+0.2;
  container.appendChild(heart);
  setTimeout(() => heart.remove(), dur*1000);
}

function startFloatingHearts(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  spawnFloatingHeart(c);
  setInterval(() => spawnFloatingHeart(c), 600);
}

function spawnBurstHeart(container) {
  const heart = document.createElement('span');
  heart.className = 'float-heart';
  heart.textContent = ['❤️','💕','💗','💖','✨'][Math.floor(Math.random()*5)];
  const size = Math.random()*30+14;
  heart.style.fontSize = size+'px';
  heart.style.left = (30+Math.random()*40)+'vw';
  heart.style.bottom = '40%';
  const dur = Math.random()*3+2;
  heart.style.animationDuration = dur+'s';
  container.appendChild(heart);
  setTimeout(() => heart.remove(), dur*1000);
}

// ============================================
// CONFETTI
// ============================================
let confettiPieces = [];
let confettiActive = false;

function initConfetti() {
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  const ctx = confettiCanvas.getContext('2d');
  const colors = ['#ffb3d1','#f5d08a','#d4b8e0','#ff8fb1','#e8c97b','#c9836a','#ffffff','#ffcfe8'];
  confettiPieces = Array.from({length:120}, () => ({
    x: Math.random()*confettiCanvas.width,
    y: Math.random()*-confettiCanvas.height,
    w: Math.random()*10+5, h: Math.random()*5+3,
    color: colors[Math.floor(Math.random()*colors.length)],
    rotation: Math.random()*Math.PI*2,
    rotSpeed: (Math.random()-0.5)*0.1,
    vx: (Math.random()-0.5)*2, vy: Math.random()*2+1,
    alpha: Math.random()*0.6+0.4,
  }));
  function draw() {
    if (!confettiActive) { ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height); return; }
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    confettiPieces.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.rotation+=p.rotSpeed;
      if (p.y>confettiCanvas.height+20) { p.y=-20; p.x=Math.random()*confettiCanvas.width; }
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rotation);
      ctx.globalAlpha=p.alpha; ctx.fillStyle=p.color;
      ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ============================================
// DRAG & DROP UNLOCK
// ============================================
function initDragUnlock() {
  const key = keyDrag;
  let isDragging=false, offsetX=0, offsetY=0, missTimeout=null;

  function getLockCenter() {
    const r=heartLock.getBoundingClientRect();
    return {x:r.left+r.width/2, y:r.top+r.height/2};
  }

  function showMissMessage() {
    missText.textContent = missMessages[Math.floor(Math.random()*missMessages.length)];
    missText.classList.add('show');
    clearTimeout(missTimeout);
    missTimeout = setTimeout(() => missText.classList.remove('show'), 3000);
  }

  key.addEventListener('mousedown', (e) => {
    isDragging=true;
    const r=key.getBoundingClientRect();
    offsetX=e.clientX-r.left-r.width/2; offsetY=e.clientY-r.top-r.height/2;
    key.style.position='fixed'; key.style.zIndex='100';
    key.style.animation='none'; key.style.cursor='grabbing';
    subText.style.opacity='0.4'; e.preventDefault();
  });
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    key.style.left=(e.clientX-offsetX-key.offsetWidth/2)+'px';
    key.style.top=(e.clientY-offsetY-key.offsetHeight/2)+'px';
    const lc=getLockCenter();
    const dist=Math.hypot(e.clientX-lc.x, e.clientY-lc.y);
    heartLock.classList.toggle('near', dist<80);
  });
  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging=false; heartLock.classList.remove('near');
    const lc=getLockCenter();
    if (Math.hypot(e.clientX-lc.x, e.clientY-lc.y)<70) {
      triggerUnlock();
    } else {
      key.style.position=''; key.style.zIndex=''; key.style.left='';
      key.style.top=''; key.style.animation=''; key.style.cursor='grab';
      subText.style.opacity='1'; showMissMessage();
    }
  });
  key.addEventListener('touchstart', (e) => {
    isDragging=true;
    const t=e.touches[0], r=key.getBoundingClientRect();
    offsetX=t.clientX-r.left-r.width/2; offsetY=t.clientY-r.top-r.height/2;
    key.style.position='fixed'; key.style.zIndex='100'; key.style.animation='none';
    e.preventDefault();
  },{passive:false});
  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const t=e.touches[0];
    key.style.left=(t.clientX-offsetX-key.offsetWidth/2)+'px';
    key.style.top=(t.clientY-offsetY-key.offsetHeight/2)+'px';
    const lc=getLockCenter();
    heartLock.classList.toggle('near', Math.hypot(t.clientX-lc.x, t.clientY-lc.y)<80);
    e.preventDefault();
  },{passive:false});
  document.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging=false; heartLock.classList.remove('near');
    const t=e.changedTouches[0], lc=getLockCenter();
    if (Math.hypot(t.clientX-lc.x, t.clientY-lc.y)<80) {
      triggerUnlock();
    } else {
      key.style.position=''; key.style.zIndex=''; key.style.left='';
      key.style.top=''; key.style.animation=''; subText.style.opacity='1'; showMissMessage();
    }
  });
}

// ============================================
// TRIGGER UNLOCK — smooth elegant transition
// ============================================
function triggerUnlock() {
  if (state.unlocked) return;
  state.unlocked = true;
  heartLock.classList.add('near');
  startMusic();

  // Phase 1: gentle warm glow from center
  setTimeout(() => {
    unlockOverlay.classList.add('phase1');
  }, 400);

  // Phase 2: fade to dark smoothly
  setTimeout(() => {
    unlockOverlay.classList.remove('phase1');
    unlockOverlay.classList.add('phase2');
  }, 2200);

  // Switch scene while screen is dark
  setTimeout(() => {
    sceneUnlock.classList.remove('active');
    sceneUnlock.style.pointerEvents = 'none';
    sceneBirthday.classList.add('active');
    sceneBirthday.style.pointerEvents = 'all';
    state.currentScene = 'birthday';
    onSceneEnter('birthday');
  }, 3200);

  // Phase 3: fade out to reveal birthday
  setTimeout(() => {
    unlockOverlay.classList.remove('phase2');
    unlockOverlay.classList.add('phase3');
  }, 3600);

  setTimeout(() => {
    unlockOverlay.classList.remove('phase3');
  }, 5200);
}

// ============================================
// SCENE TRANSITIONS
// ============================================
function transitionToScene(sceneName) {
  const scenes = { countdown:sceneCountdown, unlock:sceneUnlock, birthday:sceneBirthday, ending:sceneEnding, gallery:sceneGallery };
  Object.values(scenes).forEach(el => { el.classList.remove('active'); el.style.pointerEvents='none'; });
  setTimeout(() => {
    const t = scenes[sceneName];
    t.classList.add('active'); t.style.pointerEvents='all';
    state.currentScene = sceneName;
    onSceneEnter(sceneName);
  }, 400);
}

function onSceneEnter(name) {
  if (name==='birthday') {
    confettiActive=true;
    petalActive=true;
    petalActive=true;
    startParticles('particlesBg');
    showBirthdayReveal();
  }
  if (name==='ending') {
    confettiActive=false;
    petalActive=false;
    startParticles('endingParticles');
    animateEndingText();
  }
  if (name==='gallery') {
    startParticles('galleryParticles');
    buildGallery();
  }
}

// ============================================
// BIRTHDAY REVEAL — Title then Nazz BD-style wishes
// ============================================
function showBirthdayReveal() {
  birthdayHeader.style.opacity='0';
  birthdayHeader.style.display='block';
  wishContainer.style.display='none';

  // Fade in title
  setTimeout(() => {
    birthdayHeader.style.transition='opacity 1.8s ease, transform 1.8s ease';
    birthdayHeader.style.transform='translateY(0)';
    birthdayHeader.style.opacity='1';
    triggerPetalBurst();
  }, 500);

  // After showing, fade out title then start wishes
  setTimeout(() => {
    birthdayHeader.style.transition='opacity 1.2s ease';
    birthdayHeader.style.opacity='0';
    setTimeout(() => {
      birthdayHeader.style.display='none';
      wishContainer.style.display='flex';
      startWishesSequence();
    }, 1200);
  }, 5500);
}

// ============================================
// WISHES — Nazz BD style: promise-based, one at a time
// ============================================
async function startWishesSequence() {
  for (let i = 0; i < messages.length; i++) {
    await showWish(messages[i], i === messages.length - 1);
  }
  // All wishes done — transition to ending
  setTimeout(() => {
    transitionToScene('ending');
  }, 600);
}

function showWish(text, isLast) {
  return new Promise((resolve) => {
    const wishEl = document.createElement('div');
    wishEl.className = 'wish-item';
    wishEl.innerText = text;

    wishContainer.appendChild(wishEl);

    // Force reflow before adding visible class
    wishEl.offsetHeight;

    // Fade in with scale
    requestAnimationFrame(() => {
      wishEl.classList.add('visible');
    });

    // Display time: last message stays much longer
    const displayTime = isLast ? 5500 : 2800;

    setTimeout(() => {
      // Fade out with scale + float up
      wishEl.classList.remove('visible');
      wishEl.classList.add('fading');

      setTimeout(() => {
        wishEl.remove();
        resolve();
      }, 700);
    }, displayTime);
  });
}

// ============================================
// ENDING TEXT (scrollable scene)
// ============================================
function animateEndingText() {
  endingText.textContent='';
  endingText.classList.remove('visible');

  // Replace newlines with <br> preserving paragraphs
  const formattedText = finalMessage.replace(/\n\n/g, ' <br><br> ').replace(/\n/g, ' <br> ');
  const words = formattedText.split(' ').filter(w => w.length > 0);

  setTimeout(() => {
    endingText.classList.add('visible');

    words.forEach((word, index) => {
      if (word === '<br><br>' || word === '<br>') {
        const br = document.createElement('br');
        if (word === '<br><br>') {
          endingText.appendChild(document.createElement('br'));
          endingText.appendChild(document.createElement('br'));
        } else {
          endingText.appendChild(br);
        }
      } else {
        const span = document.createElement('span');
        span.className = 'word-span';
        span.innerHTML = word + '&nbsp;';
        span.style.animationDelay = `${index * 0.15}s`;
        endingText.appendChild(span);
      }
    });
  }, 800);

  const totalTime = 800 + (words.length * 150) + 1500;
  setTimeout(() => { galleryBtn.style.display='inline-block'; }, totalTime);
}

function goToGallery() { transitionToScene('gallery'); }

// ============================================
// GALLERY — Featured 4 frames + remaining grid (new.mp4 at bottom center)
// ============================================
function buildGallery() {
  buildFeaturedFrames();
  buildRemainingGallery();
}

function buildFeaturedFrames() {
  featuredFrames.innerHTML = '';

  const photos = mediaFiles.filter(m => m.type === 'image');
  const videos = mediaFiles.filter(m => m.type === 'video');

  // Find the specific photos requested for the featured polaroid frames
  const photoLeft = mediaFiles.find(m => m.caption && m.caption.toLowerCase().includes('born to light up this world')) || photos[0];
  const photoRight = mediaFiles.find(m => m.caption && m.caption.toLowerCase().includes('favorite person')) || photos[1];

  // [photo(tall), video(short), video(short), photo(tall)]
  const featured = [
    { ...photoLeft, layout: 'tall' },
    { ...videos[0], layout: 'short' },
    { ...videos[1], layout: 'short' },
    { ...photoRight, layout: 'tall' },
  ];

  const ornamentEmojis = ['🎀','⭐','💫','🌸'];
  const ropeColors = ['#c9836a','#e8c97b','#d4b8e0','#ffb3d1'];

  featured.forEach((media, i) => {
    const frame = document.createElement('div');
    frame.className = `featured-frame ${media.layout}`;
    frame.style.animationDelay = `${i * 0.3}s`;
    frame.style.setProperty('--swing-delay', `${i * 0.5}s`);

    const ropeColor = ropeColors[i % ropeColors.length];
    const ornament = ornamentEmojis[i % ornamentEmojis.length];

    let mediaEl = '';
    if (media.type === 'video') {
      mediaEl = `<video class="hang-media" src="${media.src}" autoplay muted loop playsinline></video>`;
    } else {
      mediaEl = `<img class="hang-media" src="${media.src}" alt="${media.caption}" loading="lazy" />`;
    }

    frame.innerHTML = `
      <div class="rope" style="background: linear-gradient(to bottom, ${ropeColor}cc, ${ropeColor}44);"></div>
      <div class="rope-ornament">${ornament}</div>
      <div class="hang-card">
        ${mediaEl}
        <div class="hang-caption">${media.caption}</div>
      </div>
    `;

    featuredFrames.appendChild(frame);

    frame.style.opacity = '0';
    frame.style.transform = 'translateY(-40px)';
    setTimeout(() => {
      frame.style.transition = `opacity 1s ease ${i*0.2}s, transform 1s ease ${i*0.2}s`;
      frame.style.opacity = '1';
      frame.style.transform = 'translateY(0)';
    }, 200);
  });

  buildGallery._featuredSrcs = featured.map(f => f.src);
}

function buildRemainingGallery() {
  remainingGallery.innerHTML = '';

  const featuredSrcs = buildGallery._featuredSrcs || [];
  const remaining = mediaFiles.filter(m => !featuredSrcs.includes(m.src));

  // Render remaining items
  remaining.forEach((media, i) => {
    const item = createRemainingItem(media, i);
    remainingGallery.appendChild(item);
  });
}

function createRemainingItem(media, i) {
  const item = document.createElement('div');
  item.className = 'remaining-item';
  item.style.animationDelay = `${i * 0.15 + 0.8}s`;

  let mediaEl = '';
  if (media.type === 'video') {
    mediaEl = `<video class="remaining-media" src="${media.src}" autoplay muted loop playsinline></video>`;
  } else {
    mediaEl = `<img class="remaining-media" src="${media.src}" alt="${media.caption}" loading="lazy" />`;
  }

  item.innerHTML = `
    <div class="remaining-card">
      ${mediaEl}
      <div class="remaining-caption">${media.caption}</div>
    </div>
  `;

  return item;
}

// ============================================
// FLOATING PARTICLES
// ============================================
function startParticles(containerId) {
  const c=document.getElementById(containerId);
  if (!c) return;
  function spawn() {
    const p=document.createElement('span'); p.className='float-heart';
    p.textContent=['❤️','💕','💗','✨','🌸','💖','⭐'][Math.floor(Math.random()*7)];
    const size=Math.random()*18+8; p.style.fontSize=size+'px';
    p.style.left=Math.random()*100+'vw'; p.style.bottom='-30px';
    const dur=Math.random()*10+6; p.style.animationDuration=dur+'s';
    p.style.opacity=Math.random()*0.5+0.15;
    c.appendChild(p); setTimeout(()=>p.remove(), dur*1000);
  }
  spawn(); setInterval(spawn, 800);
}

// ============================================
// COUNTDOWN
// ============================================
let countdownInterval;
let messageInterval;

function initCountdown() {
  startParticles('countdownParticles');

  // Rotate messages
  let msgIdx = 0;
  countdownMessage.textContent = countdownMessages[msgIdx];
  countdownMessage.classList.add('visible');

  messageInterval = setInterval(() => {
    countdownMessage.classList.remove('visible');
    setTimeout(() => {
      msgIdx = (msgIdx + 1) % countdownMessages.length;
      countdownMessage.textContent = countdownMessages[msgIdx];
      countdownMessage.classList.add('visible');
    }, 2000);
  }, 6000);

  // Target time: May 26, 2026 00:00:00 Algeria Time (UTC+1)
  // Which is May 25, 2026 23:00:00 UTC
  const targetDate = new Date(Date.UTC(2026, 4, 25, 23, 0, 0)).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      clearInterval(messageInterval);
      countdownTimer.textContent = "00 DAYS : 00 HOURS : 00 MINUTES : 00 SECONDS";
      
      if (openSoonerWrapper) {
        openSoonerWrapper.style.display = 'none';
      }

      countdownMessage.classList.remove('visible');
      setTimeout(() => {
        countdownMessage.textContent = "Happy Birthday, my love! ❤️";
        countdownMessage.classList.add('visible');
      }, 1000);

      if (enterBtnWrapper) {
        enterBtnWrapper.style.display = 'block';
        enterBtnWrapper.offsetHeight; // trigger reflow
        enterBtnWrapper.classList.add('show');
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => n.toString().padStart(2, '0');
    countdownTimer.textContent = `${pad(days)} DAYS : ${pad(hours)} HOURS : ${pad(minutes)} MINUTES : ${pad(seconds)} SECONDS`;
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);

  // Enter button logic
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      unlockFromCountdown();
    });
  }

  // Modal logic
  openSoonerBtn.addEventListener('click', () => {
    passwordModal.classList.add('show');
    passwordInput.focus();
  });

  closeModalBtn.addEventListener('click', () => {
    passwordModal.classList.remove('show');
    passwordError.textContent = '';
    passwordInput.value = '';
  });

  passwordSubmit.addEventListener('click', checkPassword);
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
  });

  function checkPassword() {
    const val = passwordInput.value.replace(/\s+/g, '').toLowerCase();
    if (val === 'iloveyoutothemoonandback,mywife') {
      passwordError.style.color = '#fff';
      passwordError.textContent = "Correct, my love ✨";
      setTimeout(() => {
        passwordModal.classList.remove('show');
        unlockFromCountdown();
      }, 1000);
    } else {
      passwordError.style.color = 'var(--pink-deep)';
      passwordError.textContent = passwordWrongMessages[Math.floor(Math.random() * passwordWrongMessages.length)];
    }
  }
}

function unlockFromCountdown() {
  clearInterval(countdownInterval);
  clearInterval(messageInterval);
  state.unlocked = true;

  // Visual Transition
  unlockOverlay.classList.add('phase1'); // Add soft glow/flash
  
  if (!state.musicPlaying) {
    startMusic();
  }

  setTimeout(() => {
    unlockOverlay.classList.remove('phase1');
    unlockOverlay.classList.add('phase2'); // black screen
  }, 1500);

  setTimeout(() => {
    sceneCountdown.classList.remove('active');
    sceneCountdown.style.pointerEvents = 'none';
    
    sceneUnlock.classList.add('active');
    sceneUnlock.style.pointerEvents = 'all';
    state.currentScene = 'unlock';
    
    // Fade into unlock scene
    unlockOverlay.classList.remove('phase2');
    unlockOverlay.classList.add('phase3');
    setTimeout(() => {
      unlockOverlay.classList.remove('phase3');
      state.unlocked = false; // Reset unlock state for the key drag puzzle
    }, 1500);
  }, 2500);
}

// ============================================
// MUSIC
// ============================================
function startMusic() {
  const targetMusic = bgMusic;
  targetMusic.volume = 0.4;
  targetMusic.play().then(() => {
    state.musicPlaying = true;
    musicIcon.textContent = '🎵';
  }).catch(() => {
    document.addEventListener('click', () => {
      targetMusic.play().then(() => { state.musicPlaying=true; musicIcon.textContent='🎵'; });
    }, { once: true });
  });
}

function toggleMusic() {
  const currentMusic = bgMusic;
  if (state.musicPlaying) {
    currentMusic.pause(); state.musicPlaying=false; musicIcon.textContent='🔇';
  } else {
    currentMusic.play(); state.musicPlaying=true; musicIcon.textContent='🎵';
  }
}

// ============================================
// WINDOW RESIZE
// ============================================
window.addEventListener('resize', () => {
  starsCanvas.width=window.innerWidth; starsCanvas.height=window.innerHeight;
  if(confettiCanvas){confettiCanvas.width=window.innerWidth; confettiCanvas.height=window.innerHeight;}
  if(petalCanvas){petalCanvas.width=window.innerWidth; petalCanvas.height=window.innerHeight;}
  resizeCursorCanvas();
});

// ============================================
// INIT
// ============================================
function init() {
  resizeCursorCanvas();
  initStars();
  initConfetti();
  initDragUnlock();
  initCountdown();
  drawCursor();
  startFloatingHearts('floatingHeartsBg');

  // Attempt to start music
  startMusic();

  sceneCountdown.classList.add('active');
  sceneCountdown.style.pointerEvents='all';
}

window.addEventListener('DOMContentLoaded', init);
