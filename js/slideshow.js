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
      { icon: 'fa-solar-panel', title: 'Autonomie énergétique', desc: 'Fonctionner sans raccordement au réseau électrique' }
    ],
    type: 'cards'
  },
  {
    icon: 'fa-users',
    title: 'Notre équipe',
    membersTop: [
      { icon: 'fa-code', role: 'Programmation, Présentation', name: 'Axel', desc: '' },
      { icon: 'fa-search', role: 'Recherche composants, Solutions techniques', name: 'Kenzo', desc: 'Présentation, Communication' },
      { icon: 'fa-cube', role: 'Programmation, Modélisation 3D', name: 'Yohan', desc: '' }
    ],
    membersBottom: [
      { icon: 'fa-drafting-compass', role: 'Schémas, Plans, Design', name: 'Lorenzo', desc: 'Budget, Recherche composants' },
      { icon: 'fa-bolt', role: 'Électrique, Normes', name: 'Mathéo', desc: 'Communication' }
    ],
    type: 'team'
  },
  {
    icon: 'fa-lightbulb',
    title: 'Solution proposée',
    features: [
      { icon: 'fa-sun', title: 'Autonomie énergétique', desc: 'Panneau solaire intégré pour une alimentation 100% renouvelable' },
      { icon: 'fa-layer-group', title: 'Multi-services', desc: 'Recharge USB, écran tactile, données environnementales et transports' },
      { icon: 'fa-tools', title: 'Installation modulaire', desc: 'Structure en bois à construire, assemblage sur site' }
    ],
    type: 'features'
  },
  {
    icon: 'fa-star',
    title: 'Fonctionnalités principales',
    services: [
      { icon: 'fab fa-usb', title: 'Recharge USB', desc: 'Ports USB-A et USB-C disponibles' },
      { icon: 'fa-tv', title: 'Écran tactile', desc: 'Interface interactive 7 pouces' },
      { icon: 'fa-cloud-sun', title: 'Météo', desc: 'Données météorologiques en temps réel' },
      { icon: 'fa-bus', title: 'Transports', desc: 'Horaires de bus en direct' },
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
    chartId: 'matlab-chart',
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
      { icon: 'fa-arrows-alt-h', value: 'Longueur totale: 2,02 m (avec piliers)' },
      { icon: 'fa-bed', value: 'Assise: 1,80 m' },
      { icon: 'fa-arrows-alt-v', value: 'Hauteur max: 2 m (sans panneau)' }
    ],
    installation: 'Fixation par platines boulonnées au sol pour déplacement facile',
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
            <div class="team-top">
              ${slide.membersTop.map(member => `
                <div class="team-member">
                  <i class="fas ${member.icon}"></i>
                  <h4>${member.role}</h4>
                  <p class="member-name">${member.name}</p>
                  <p>${member.desc}</p>
                </div>
              `).join('')}
            </div>
            <div class="team-bottom">
              ${slide.membersBottom.map(member => `
                <div class="team-member">
                  <i class="fas ${member.icon}"></i>
                  <h4>${member.role}</h4>
                  <p class="member-name">${member.name}</p>
                  <p>${member.desc}</p>
                </div>
              `).join('')}
            </div>
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
          <div class="chart-container" id="${slide.chartId || ''}" style="width:100%;height:500px;"></div>
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
  
  // Render chart if current slide has a chart
  const currentSlideData = slides[currentSlide];
  if (currentSlideData.chartId && currentSlideData.type === 'chart') {
    setTimeout(() => renderMatlabChart(currentSlideData.chartId), 100);
  }
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

// ═══════════════ MATLAB CHART RENDERER ═══════════════
function renderMatlabChart(chartId = 'matlab-chart'){
  const chartEl = document.getElementById(chartId);
  if(!chartEl) return;
  
  // Data from MATLAB analysis (04-ebench-matlab-analysis.html)
  const MO=['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
  const fm=[0.35,0.40,0.42,0.48,0.52,0.55,0.58,0.55,0.50,0.45,0.40,0.38];
  const jp=[1,1,1,1,1,1,1,1,1,1,1,1];
  const Pl=14.5;
  const jm=[16,17,19,21,23,24,25,24,21,18,16,15];
  const lat=50,alt=0,tilt=37,Pn=500,eta=0.85;
  const hrs=Array.from({length:289},(_,i)=>4+i*0.1);
  
  function pvPow(h,d,lat,lon,tilt,Pn,eta){
    const B=2*Math.PI*(d-1)/365;
    const delta=(0.006918-0.399912*Math.cos(B)+0.070257*Math.sin(B)-0.006758*Math.cos(2*B)+0.000907*Math.sin(2*B)-0.002697*Math.cos(3*B)+0.00148*Math.sin(3*B))*180/Math.PI;
    const phi=lat*Math.PI/180,dec=delta*Math.PI/180;
    const ws=Math.acos(-Math.tan(phi)*Math.tan(dec))*180/Math.PI;
    const sr=12-ws/15,ss=12+ws/15;
    const Gsc=1367,I0=Gsc*(1.00011+0.034221*Math.cos(B)+0.00128*Math.sin(B)+0.000719*Math.cos(2*B)+0.000077*Math.sin(2*B));
    const powers=[],directs=[],diffuses=[];
    for(let hr of h){
      if(hr<sr||hr>ss){powers.push(0);directs.push(0);diffuses.push(0);continue;}
      const omega=(hr-12)*15*Math.PI/180;
      let sinAlpha=Math.sin(phi)*Math.sin(dec)+Math.cos(phi)*Math.cos(dec)*Math.cos(omega);
      sinAlpha=Math.max(0,Math.min(1,sinAlpha));
      const alpha=Math.asin(sinAlpha)*180/Math.PI;
      const cosThetaT=sinAlpha*Math.cos(tilt*Math.PI/180)+Math.cos(alpha)*Math.sin(tilt*Math.PI/180);
      const m=1/(sinAlpha+0.0001),m0=1.5;
      let Ib=I0*Math.exp(-0.14*m),Id=I0*0.1*(1-Math.exp(-0.25*(m-m0)));
      Ib=Math.max(0,Ib),Id=Math.max(0,Id);
      const Rb=Math.max(0,cosThetaT/(sinAlpha+0.0001)),Gt=Ib*Rb+Id*(1+Math.cos(tilt*Math.PI/180))/2;
      const Pinst=Pn*(Gt/1000)*eta,pwr=Pinst*(0.4+0.6*Math.random());
      powers.push(pwr);directs.push(Ib*Rb);diffuses.push(Id);}
    return{hours:h,powers,direct:directs,diffuse:diffuses};
  }
  
  function trapz(x,y){let s=0;for(let i=1;i<x.length;i++)s+=(x[i]-x[i-1])*(y[i]+y[i-1])/2;return s;}
  
  const Ec=[],Er=[],Em_arr=[],Eb_arr=[];
  for(let m=0;m<12;m++){const{powers}=pvPow(hrs,jm[m],lat,0,tilt,Pn,eta);const ec=trapz(hrs,powers),er=ec*fm[m];Ec.push(ec);Er.push(er);const cm=Pl*24;Em_arr.push(cm*jp[m]);Eb_arr.push(er*jp[m]-cm*jp[m])}
  const Ept=Er.map((e,i)=>e*jp[i]);
  
  const isDark=document.documentElement.getAttribute('data-theme')!=='light';
  const bgColor=isDark?'#0D1220':'#FAF6F0';
  const textColor=isDark?'#8899B4':'#4A5568';
  const gridColor=isDark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)';
  
  const traceProd={x:MO,y:Ept.map(e=>e/1000),name:'Production',type:'bar',marker:{color:'#00D4A0'}};
  const traceCons={x:MO,y:Em_arr.map(e=>e/1000),name:'Consommation',type:'bar',marker:{color:'#EF4444'}};
  
  const layout={
    title:'Production vs Consommation mensuelle',
    paper_bgcolor:bgColor,
    plot_bgcolor:bgColor,
    font:{color:textColor,family:'Space Grotesk'},
    barmode:'group',
    xaxis:{title:'',tickangle:0,gridcolor:gridColor,linecolor:gridColor},
    yaxis:{title:'Énergie (kWh)',gridcolor:gridColor,linecolor:gridColor},
    margin:{t:50,b:40,l:50,r:20},
    showlegend:true,
    legend:{x:0,y:1.1,orientation:'h'}
  };
  
  const config={responsive:true,displayModeBar:false,scrollZoom:false};
  Plotly.newPlot(chartId,[traceProd,traceCons],layout,config);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initSlideshow();
  // Render chart on first slide if needed
  setTimeout(() => renderMatlabChart(), 500);
});
