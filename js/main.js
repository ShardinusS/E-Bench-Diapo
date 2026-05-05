// ═══ BACKGROUND PARTICLES ═══
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let particles = [];

function resizeBg() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
resizeBg();
window.addEventListener('resize', resizeBg);

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    opacity: Math.random() * 0.4 + 0.1
  });
}

function animateBg() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  // Gradient background
  const grad = bgCtx.createRadialGradient(bgCanvas.width/2, bgCanvas.height/2, 0, bgCanvas.width/2, bgCanvas.height/2, bgCanvas.width*0.7);
  grad.addColorStop(0, 'rgba(13,26,53,1)');
  grad.addColorStop(1, 'rgba(10,15,30,1)');
  bgCtx.fillStyle = grad;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = bgCanvas.width;
    if (p.x > bgCanvas.width) p.x = 0;
    if (p.y < 0) p.y = bgCanvas.height;
    if (p.y > bgCanvas.height) p.y = 0;
    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    bgCtx.fillStyle = `rgba(96,165,250,${p.opacity})`;
    bgCtx.fill();
  });
  requestAnimationFrame(animateBg);
}
animateBg();

// ═══ SLIDESHOW ═══
const slides = document.querySelectorAll('.slide');
const total = slides.length;
let current = 0;
let transitioning = false;

function buildDots() {
  const container = document.getElementById('progress-dots');
  container.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(i);
    container.appendChild(d);
  }
}
buildDots();

function updateUI() {
  document.getElementById('slide-counter').textContent =
    String(current + 1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
  document.getElementById('progress-bar').style.width = ((current + 1) / total * 100) + '%';
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

function goTo(idx) {
  if (transitioning || idx === current) return;
  transitioning = true;
  const dir = idx > current ? 1 : -1;
  if (dir > 0) slides[current].classList.add('exit-left');
  slides[current].style.transform = dir > 0 ? 'translateX(-60px)' : 'translateX(60px)';
  slides[current].style.opacity = '0';
  setTimeout(() => {
    slides[current].classList.remove('active', 'exit-left');
    slides[current].style.transform = '';
    slides[current].style.opacity = '';
    current = idx;
    slides[current].style.transform = dir > 0 ? 'translateX(60px)' : 'translateX(-60px)';
    slides[current].style.opacity = '0';
    slides[current].classList.add('active');
    setTimeout(() => {
      slides[current].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      slides[current].style.transform = 'translateX(0)';
      slides[current].style.opacity = '1';
      setTimeout(() => {
        slides[current].style.transition = '';
        slides[current].style.transform = '';
        slides[current].style.opacity = '';
        transitioning = false;
        onSlideEnter(current);
      }, 650);
    }, 20);
    updateUI();
  }, 500);
}

function navigate(dir) { goTo(Math.max(0, Math.min(total - 1, current + dir))); }

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(-1);
});

// ═══ FULLSCREEN ═══
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    document.getElementById('fullscreen-btn').innerHTML = '<i class="fa-solid fa-xmark"></i> Quitter';
  } else {
    document.exitFullscreen();
    document.getElementById('fullscreen-btn').innerHTML = '<i class="fa-solid fa-expand"></i> Plein écran';
  }
}

// ═══ CHARTS (lazy init) ═══
let chartsDone = false;
function initCharts() {
  if (chartsDone) return;
  chartsDone = true;
  const months = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'];
  const solar = [18,28,52,74,95,110,108,98,70,42,22,14];
  const chartOpts = { responsive: true, plugins: { legend: { display: false } }, scales: {
    x: { ticks: { color: 'rgba(248,250,252,0.5)', font:{size:9} }, grid:{color:'rgba(255,255,255,0.05)'} },
    y: { ticks: { color: 'rgba(248,250,252,0.5)', font:{size:9} }, grid:{color:'rgba(255,255,255,0.05)'} }
  }};
  new Chart(document.getElementById('chart-solar'), {
    type: 'bar',
    data: { labels: months, datasets: [{ data: solar,
      backgroundColor: months.map((_,i) => i < 2 || i > 9 ? 'rgba(37,99,235,0.5)' : 'rgba(16,185,129,0.6)'),
      borderRadius: 5 }]},
    options: { ...chartOpts, plugins:{ ...chartOpts.plugins, tooltip:{callbacks:{label:c=>c.raw+' kWh'}} } }
  });
  new Chart(document.getElementById('chart-autonomy'), {
    type: 'bar',
    data: { labels: ['Veille\ncomplète','Usage\ntypique','USB-C\nplein'], datasets: [{
      data: [5.2, 1.8, 0.8],
      backgroundColor: ['rgba(16,185,129,0.6)','rgba(37,99,235,0.6)','rgba(239,68,68,0.5)'],
      borderRadius: 5
    }]},
    options: { ...chartOpts, indexAxis: 'y', plugins:{ ...chartOpts.plugins, tooltip:{callbacks:{label:c=>c.raw+' jours'}} } }
  });
}

// ═══ 3D BENCH (Three.js) ═══
let threeInit = false;
function init3D() {
  if (threeInit) return;
  threeInit = true;
  const canvas = document.getElementById('bench-3d');
  const wrap = document.getElementById('bench-3d-wrap');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
  camera.position.set(2.5, 1.8, 3);
  camera.lookAt(0, 0.3, 0);

  // Lights
  scene.add(new THREE.AmbientLight(0x334466, 1.2));
  const dLight = new THREE.DirectionalLight(0x6699ff, 2);
  dLight.position.set(3, 5, 3);
  scene.add(dLight);
  const gLight = new THREE.DirectionalLight(0x00ff88, 0.5);
  gLight.position.set(-2, 2, -2);
  scene.add(gLight);

  const mat = c => new THREE.MeshPhongMaterial({ color: c, shininess: 40 });

  // Bench legs
  const legGeo = new THREE.BoxGeometry(0.08, 0.9, 0.08);
  [[-0.7,-1],[0.7,-1],[-0.7,1],[0.7,1]].forEach(([x,z]) => {
    const leg = new THREE.Mesh(legGeo, mat(0x8B6914));
    leg.position.set(x, -0.05, z*0.3);
    scene.add(leg);
  });

  // Seat planks
  for (let i = -3; i <= 3; i++) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.1), mat(0xA0784A));
    plank.position.set(0, 0.42, i * 0.115);
    scene.add(plank);
  }

  // Backrest
  for (let i = -2; i <= 2; i++) {
    const br = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 0.08), mat(0xA0784A));
    br.position.set(0, 0.85, -0.35 + i * 0.1);
    scene.add(br);
  }

  // Backrest supports
  [-0.65, 0.65].forEach(x => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.06), mat(0x7A5A30));
    s.position.set(x, 0.65, -0.3);
    scene.add(s);
  });

  // Solar panel frame
  const panelFrame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.03, 0.8), mat(0x333344));
  panelFrame.position.set(0, 1.35, -0.1);
  panelFrame.rotation.x = -0.65;
  scene.add(panelFrame);

  // Panel cells
  const cellMat = new THREE.MeshPhongMaterial({ color: 0x1a2a5a, emissive: 0x001133, shininess: 90 });
  const panel = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.02, 0.72), cellMat);
  panel.position.set(0, 1.38, -0.12);
  panel.rotation.x = -0.65;
  scene.add(panel);

  // Control box
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.2), mat(0x1a2a4a));
  box.position.set(-0.6, 0.2, -0.28);
  scene.add(box);

  // Screen
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.02), new THREE.MeshPhongMaterial({ color: 0x001144, emissive: 0x002288, shininess: 100 }));
  screen.position.set(-0.6, 0.25, -0.17);
  scene.add(screen);

  // USB ports indicator
  const usb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.02), mat(0x334466));
  usb.position.set(0.55, 0.45, -0.28);
  scene.add(usb);

  // Orbit controls (manual)
  let isDragging = false, prevX = 0, prevY = 0;
  let rotY = 0, rotX = 0.2;
  const group = new THREE.Group();
  scene.children.slice(2).forEach(c => group.add(c));
  scene.add(group);

  canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    rotY += (e.clientX - prevX) * 0.01;
    rotX += (e.clientY - prevY) * 0.005;
    rotX = Math.max(-0.5, Math.min(0.8, rotX));
    prevX = e.clientX; prevY = e.clientY;
  });

  function render() {
    requestAnimationFrame(render);
    if (!isDragging) rotY += 0.004;
    group.rotation.y = rotY;
    group.rotation.x = rotX;
    renderer.render(scene, camera);
  }
  render();
}

// ═══ SLIDE ENTER HOOK ═══
function onSlideEnter(idx) {
  const activeSlideId = slides[idx]?.id;
  if (activeSlideId === 'slide-16') initCharts();
  if (activeSlideId === 'slide-9') init3D();
}
// Init if starting on those slides
onSlideEnter(0);
updateUI();

// ═══ EXCEL VIEWER (Slide 4) ═══
let budgetViewerVisible = false;
let budgetInputBound = false;

function setBudgetMessage(msg, isError = false) {
  const msgEl = document.getElementById('budget-viewer-msg');
  if (!msgEl) return;
  msgEl.textContent = msg;
  msgEl.style.color = isError ? '#f87171' : '';
}

function bindBudgetInput() {
  if (budgetInputBound) return;
  const input = document.getElementById('input-excel');
  if (!input) return;
  input.addEventListener('change', function(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        const html = XLSX.utils.sheet_to_html(sheet);
        const tableContainer = document.getElementById('table-container');
        if (!tableContainer) {
          setBudgetMessage("Conteneur d'affichage introuvable.", true);
          return;
        }
        tableContainer.innerHTML = html;

        const tabs = document.getElementById('budget-sheet-tabs');
        if (tabs) {
          tabs.innerHTML = '';
          workbook.SheetNames.forEach((name) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = name;
            btn.style.cssText = 'padding:6px 10px;border-radius:999px;border:1px solid rgba(0,212,160,0.2);background:rgba(0,212,160,0.08);color:#00D4A0;font-size:12px;cursor:pointer;';
            btn.onclick = () => {
              const selectedSheet = workbook.Sheets[name];
              tableContainer.innerHTML = XLSX.utils.sheet_to_html(selectedSheet);
              setBudgetMessage(`Feuille active: ${name}`);
            };
            tabs.appendChild(btn);
          });
        }

        setBudgetMessage(`Fichier chargé: ${file.name}`);
        const wrap = document.getElementById('budget-viewer-wrap');
        if (wrap) wrap.style.display = 'block';
        budgetViewerVisible = true;
        const toggleBtn = document.getElementById('budget-viewer-toggle');
        if (toggleBtn) {
          toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Masquer le budget';
        }
      } catch (err) {
        setBudgetMessage("Erreur de lecture Excel. Vérifie le format (.xlsx/.xls).", true);
      }
    };
    reader.readAsArrayBuffer(file);
  });
  budgetInputBound = true;
}

function bindBudgetActions() {
  const toggleBtn = document.getElementById('budget-viewer-toggle');
  const input = document.getElementById('input-excel');
  const downloadLink = document.getElementById('budget-download-link');

  if (toggleBtn && input && toggleBtn.tagName === 'BUTTON') {
    toggleBtn.addEventListener('click', () => {
      const wrap = document.getElementById('budget-viewer-wrap');
      if (wrap && wrap.style.display === 'none') {
        budgetViewerVisible = true;
        wrap.style.display = 'block';
      }
      // The "Afficher" action now directly opens the Excel picker.
      input.click();
    });
  }

  if (downloadLink) {
    downloadLink.addEventListener('click', () => {
      setBudgetMessage("Si rien ne s'ouvre, vérifie l'extension réelle du fichier (ex: Budget_Projet.xlsx) et son emplacement à la racine.");
    });
  }
}

async function toggleBudgetViewer() {
  const wrap = document.getElementById('budget-viewer-wrap');
  const toggleBtn = document.getElementById('budget-viewer-toggle');
  if (!wrap || !toggleBtn) return;
  budgetViewerVisible = !budgetViewerVisible;
  wrap.style.display = budgetViewerVisible ? 'block' : 'none';
  toggleBtn.innerHTML = budgetViewerVisible
    ? '<i class="fa-solid fa-eye-slash"></i> Masquer le budget'
    : '<i class="fa-solid fa-table"></i> Importer et afficher Excel';
  bindBudgetInput();
  const tableContainer = document.getElementById('table-container');
  const hasLoadedSheet = !!(tableContainer && tableContainer.innerHTML.trim());
  if (budgetViewerVisible && !hasLoadedSheet) {
    setBudgetMessage("Importe un fichier Excel pour l'afficher ici.");
  }
}

bindBudgetInput();
bindBudgetActions();
