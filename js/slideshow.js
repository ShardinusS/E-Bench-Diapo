/**
 * E-Bench 2026 — Slideshow JavaScript
 * Fullscreen presentation with keyboard and touch navigation
 */

// Slide data
const slides = [
  {
    title: 'E-Bench',
    subtitle: 'Banc public connecté et autonome',
    badge: '🏆 3ᵉ place Olympiades STI2D 2024-2025',
    type: 'hero'
  },
  {
    icon: 'fa-exclamation-triangle',
    title: 'Problématique',
    cards: [
      { icon: 'fa-mobile-alt', title: 'Recharge mobile', desc: 'Besoin de recharger ses appareils en extérieur' },
      { icon: 'fa-info-circle', title: 'Information urbaine', desc: 'Accès aux données de la ville en temps réel' },
      { icon: 'fa-solar-panel', title: 'Autonomie énergétique', desc: 'Fonctionner sans raccordement au réseau électrique' },
      { icon: 'fa-plug', title: 'Installation facile', desc: 'Solution plug & play déployable rapidement' }
    ],
    type: 'cards'
  },
  {
    icon: 'fa-users',
    title: 'Notre équipe',
    members: [
      { icon: 'fa-cog', role: 'Mécanique', desc: 'Conception SolidWorks' },
      { icon: 'fa-bolt', role: 'Électrique', desc: 'Système d\'alimentation' },
      { icon: 'fa-code', role: 'Informatique', desc: 'Développement logiciel' },
      { icon: 'fa-chart-line', role: 'Énergétique', desc: 'Étude MATLAB' },
      { icon: 'fa-project-diagram', role: 'Chef de projet', desc: 'Coordination globale' }
    ],
    type: 'team'
  },
  {
    icon: 'fa-lightbulb',
    title: 'Solution proposée',
    features: [
      { icon: 'fa-sun', title: 'Autonomie énergétique', desc: 'Panneau solaire intégré pour une alimentation 100% renouvelable' },
      { icon: 'fa-layer-group', title: 'Multi-services', desc: 'Recharge USB, écran tactile, données environnementales et transports' },
      { icon: 'fa-plug-circle-check', title: 'Plug & Play', desc: 'Installation rapide sans travaux de raccordement électrique' }
    ],
    type: 'features'
  },
  {
    icon: 'fa-star',
    title: 'Fonctionnalités principales',
    services: [
      { icon: 'fab fa-usb', title: 'Recharge USB', desc: 'Ports USB-A et USB-C disponibles' },
      { icon: 'fa-touchscreen', title: 'Écran tactile', desc: 'Interface interactive 7 pouces' },
      { icon: 'fa-cloud-sun', title: 'Météo', desc: 'Données météorologiques en temps réel' },
      { icon: 'fa-bus', title: 'Transports', desc: 'Horaires de bus en direct' },
      { icon: 'fa-leaf', title: 'Pollution', desc: 'Qualité de l\'air locale' },
      { icon: 'fa-newspaper', title: 'Actualités', desc: 'Infos locales et événements' }
    ],
    type: 'services'
  },
  {
    icon: 'fa-drafting-compass',
    title: 'Conception mécanique (SolidWorks)',
    specs: [
      '<strong>Structure:</strong> Pin Douglas traité',
      '<strong>Toit:</strong> Panneau solaire intégré',
      '<strong>Piliers:</strong> Support structurel renforcé',
      '<strong>Design:</strong> Moderne et résistant aux intempéries'
    ],
    hasImage: true,
    type: 'split'
  },
  {
    icon: 'fa-project-diagram',
    title: 'Chaîne d\'énergie',
    chain: [
      { icon: 'fa-solar-panel', label: 'Panneau 500W' },
      { icon: 'fa-microchip', label: 'Régulateur MPPT' },
      { icon: 'fa-car-battery', label: 'Batterie 100Ah' },
      { icon: 'fa-plug', label: 'Convertisseurs DC-DC' },
      { icon: 'fa-computer', label: 'Raspberry Pi + Écran + USB' }
    ],
    type: 'chain'
  },
  {
    icon: 'fa-chart-area',
    title: 'Étude énergétique (MATLAB)',
    chartLabel: 'Analyse saisonnière : Été / Hiver / Mi-saison',
    points: [
      'Bilan énergétique validé',
      'Autonomie hivernale : 3-5 jours',
      'Consommation moyenne : ~13-15 W'
    ],
    type: 'chart'
  },
  {
    icon: 'fa-clipboard-check',
    title: 'Résultats & limites',
    results: {
      positive: [
        'Autonomie énergétique confirmée',
        'Fonctionnement multi-services opérationnel',
        'Structure mécanique robuste'
      ],
      warning: [
        'Consommation Raspberry Pi à optimiser',
        'Batterie GEL (poids, durée de vie)',
        'Module 4G non intégré'
      ]
    },
    type: 'results'
  },
  {
    icon: 'fa-ruler-combined',
    title: 'Dimensions & installation',
    dimensions: [
      { icon: 'fa-arrows-alt-h', value: 'Longueur: 2 m' },
      { icon: 'fa-arrows-alt-v', value: 'Hauteur: 2 m' },
      { icon: 'fa-depth', value: 'Profondeur: 60 cm' }
    ],
    installation: 'Fixation par platines boulonnées au sol',
    type: 'dimensions'
  },
  {
    icon: 'fa-microchip',
    title: 'Composants clés',
    components: [
      { name: 'Panneau solaire', spec: '500W monocristallin', icon: 'fa-solar-panel' },
      { name: 'Régulateur MPPT', spec: 'Victron Energy', icon: 'fa-microchip' },
      { name: 'Batterie', spec: '100Ah GEL 12V', icon: 'fa-car-battery' },
      { name: 'Calculateur', spec: 'Raspberry Pi 3B', icon: 'fab fa-raspberry-pi' },
      { name: 'Écran', spec: '7 pouces tactile', icon: 'fa-tv' }
    ],
    type: 'table'
  },
  {
    icon: 'fa-rocket',
    title: 'Perspectives V2',
    upgrades: [
      { icon: 'fa-microchip', title: 'Raspberry Pi Zero 2W', desc: 'Réduction de la consommation électrique' },
      { icon: 'fa-battery-full', title: 'Batterie LiFePO4', desc: 'Meilleure durée de vie et poids réduit' },
      { icon: 'fa-signal', title: 'Module 4G intégré', desc: 'Connectivité autonome partout' },
      { icon: 'fa-power-off', title: 'Délestage intelligent', desc: 'Priorité à l\'écran en cas de faible batterie' }
    ],
    type: 'upgrades'
  },
  {
    icon: 'fa-trophy',
    title: 'Conclusion',
    content: [
      '<strong>E-Bench</strong> est un projet innovant récompensé aux Olympiades STI2D 2024-2025.',
      'Ce banc public connecté et autonome répond aux besoins urbains modernes :'
    ],
    list: [
      'Recharge mobile écologique',
      'Information citoyenne en temps réel',
      'Autonomie énergétique complète'
    ],
    thanks: 'Merci de votre attention !',
    type: 'conclusion'
  }
];

let currentSlide = 0;
let isFullScreen = false;

// Initialize slideshow
function initSlideshow() {
  const container = document.getElementById('slideshow');
  const dotsContainer = document.getElementById('dotsContainer');
  const totalSlidesEl = document.getElementById('totalSlides');
  
  totalSlidesEl.textContent = slides.length;
  
  // Generate slides
  slides.forEach((slide, index) => {
    const slideEl = document.createElement('div');
    slideEl.className = `slide${index === 0 ? ' active' : ''}`;
    slideEl.innerHTML = renderSlide(slide);
    container.appendChild(slideEl);
    
    // Generate dots
    const dot = document.createElement('button');
    dot.className = `dot${index === 0 ? ' active' : ''}`;
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });
  
  updateCounter();
}

// Render slide content based on type
function renderSlide(slide) {
  let content = '';
  
  switch(slide.type) {
    case 'hero':
      content = `
        <div class="slide-content" style="text-align: center;">
          <h1>${slide.title}</h1>
          <p class="subtitle">${slide.subtitle}</p>
          <div class="badge">${slide.badge}</div>
        </div>
      `;
      break;
      
    case 'cards':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="cards-grid">
            ${slide.cards.map(card => `
              <div class="card">
                <i class="fas ${card.icon}"></i>
                <h3>${card.title}</h3>
                <p>${card.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
      
    case 'team':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="team-grid">
            ${slide.members.map(member => `
              <div class="team-member">
                <i class="fas ${member.icon}"></i>
                <h4>${member.role}</h4>
                <p>${member.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
      
    case 'features':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="features-list">
            ${slide.features.map(feature => `
              <div class="feature-item">
                <i class="fas ${feature.icon}"></i>
                <div>
                  <h3>${feature.title}</h3>
                  <p>${feature.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
      
    case 'services':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="services-grid">
            ${slide.services.map(service => `
              <div class="service-card">
                <i class="fas ${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
      
    case 'split':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="content-split">
            <div class="text-content">
              <ul class="specs-list">
                ${slide.specs.map(spec => `<li>${spec}</li>`).join('')}
              </ul>
            </div>
            <div class="image-placeholder">
              <i class="fas fa-cube"></i>
              <p>Modèle 3D SolidWorks</p>
            </div>
          </div>
        </div>
      `;
      break;
      
    case 'chain':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="energy-chain">
            ${slide.chain.map((item, i) => `
              <div class="chain-item">
                <i class="fas ${item.icon}"></i>
                <p>${item.label}</p>
              </div>
              ${i < slide.chain.length - 1 ? '<i class="fas fa-arrow-right"></i>' : ''}
            `).join('')}
          </div>
        </div>
      `;
      break;
      
    case 'chart':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="chart-placeholder">
            <i class="fas fa-chart-line"></i>
            <p>${slide.chartLabel}</p>
          </div>
          <div class="key-points">
            ${slide.points.map(point => `
              <div class="point">
                <i class="fas fa-check-circle"></i>
                <span>${point}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
      
    case 'results':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="results-grid">
            <div class="result-card positive">
              <h3><i class="fas fa-thumbs-up"></i> Validé</h3>
              <ul>
                ${slide.results.positive.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="result-card warning">
              <h3><i class="fas fa-exclamation-circle"></i> Limites actuelles</h3>
              <ul>
                ${slide.results.warning.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
      break;
      
    case 'dimensions':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="dimensions-box">
            ${slide.dimensions.map(dim => `
              <div class="dimension">
                <i class="fas ${dim.icon}"></i>
                <span>${dim.value}</span>
              </div>
            `).join('')}
          </div>
          <div class="installation-note">
            <i class="fas fa-tools"></i>
            <p>${slide.installation}</p>
          </div>
        </div>
      `;
      break;
      
    case 'table':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <table class="components-table">
            <thead>
              <tr>
                <th>Composant</th>
                <th>Spécification</th>
              </tr>
            </thead>
            <tbody>
              ${slide.components.map(comp => `
                <tr>
                  <td><i class="fas ${comp.icon}"></i> ${comp.name}</td>
                  <td>${comp.spec}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;
      
    case 'upgrades':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="upgrades-list">
            ${slide.upgrades.map(upgrade => `
              <div class="upgrade-item">
                <i class="fas ${upgrade.icon}"></i>
                <div>
                  <h4>${upgrade.title}</h4>
                  <p>${upgrade.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
      
    case 'conclusion':
      content = `
        <div class="slide-content">
          <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
          <div class="conclusion-text">
            ${slide.content.map(p => `<p>${p}</p>`).join('')}
            <ul>
              ${slide.list.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p class="thanks">${slide.thanks}</p>
          </div>
        </div>
      `;
      break;
  }
  
  return content;
}

// Navigation functions
function goToSlide(index) {
  const slideElements = document.querySelectorAll('.slide');
  const dotElements = document.querySelectorAll('.dot');
  
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  
  slideElements[currentSlide].classList.remove('active');
  dotElements[currentSlide].classList.remove('active');
  
  currentSlide = index;
  
  slideElements[currentSlide].classList.add('active');
  dotElements[currentSlide].classList.add('active');
  
  updateCounter();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function updateCounter() {
  document.getElementById('currentSlide').textContent = currentSlide + 1;
}

// Fullscreen toggle
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      isFullScreen = true;
      updateFullScreenButton();
    }).catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen().then(() => {
      isFullScreen = false;
      updateFullScreenButton();
    });
  }
}

function updateFullScreenButton() {
  const btn = document.querySelector('.nav-link[onclick="toggleFullScreen()"]');
  if (btn) {
    const icon = btn.querySelector('i');
    if (isFullScreen) {
      icon.classList.remove('fa-expand');
      icon.classList.add('fa-compress');
    } else {
      icon.classList.remove('fa-compress');
      icon.classList.add('fa-expand');
    }
  }
}

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', () => {
  isFullScreen = !!document.fullscreenElement;
  updateFullScreenButton();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowRight':
    case ' ':
    case 'Enter':
      e.preventDefault();
      nextSlide();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      prevSlide();
      break;
    case 'Home':
      e.preventDefault();
      goToSlide(0);
      break;
    case 'End':
      e.preventDefault();
      goToSlide(slides.length - 1);
      break;
    case 'f':
    case 'F':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        toggleFullScreen();
      }
      break;
    case 'Escape':
      if (isFullScreen) {
        document.exitFullscreen();
      }
      break;
  }
});

// Touch navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

// Auto-hide cursor when inactive
let cursorTimeout;
document.addEventListener('mousemove', () => {
  document.body.style.cursor = 'default';
  clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(() => {
    document.body.style.cursor = 'none';
  }, 3000);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initSlideshow);
