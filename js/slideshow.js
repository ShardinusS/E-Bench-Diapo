/**
 * E-Bench Slideshow - JavaScript Controller
 * Navigation: flèches, dots, swipe tactile, raccourcis clavier
 */

class Slideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        
        // Éléments DOM
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('dotsContainer');
        this.slideCounter = document.getElementById('slideCounter');
        
        // Variables pour le swipe tactile
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        
        // Initialisation
        this.init();
    }
    
    init() {
        this.createDots();
        this.updateSlide();
        this.addEventListeners();
    }
    
    // Création des indicateurs (dots)
    createDots() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    // Mise à jour de l'affichage
    updateSlide() {
        // Gestion des classes active/inactive
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentIndex) {
                slide.classList.add('active');
            }
        });
        
        // Mise à jour des dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === this.currentIndex) {
                dot.classList.add('active');
            }
        });
        
        // Mise à jour du compteur
        this.slideCounter.textContent = `${this.currentIndex + 1}/${this.totalSlides}`;
    }
    
    // Aller à une slide spécifique
    goToSlide(index) {
        if (index < 0) {
            this.currentIndex = 0;
        } else if (index >= this.totalSlides) {
            this.currentIndex = this.totalSlides - 1;
        } else {
            this.currentIndex = index;
        }
        this.updateSlide();
    }
    
    // Slide suivante
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    // Slide précédente
    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    // Première slide
    firstSlide() {
        this.goToSlide(0);
    }
    
    // Dernière slide
    lastSlide() {
        this.goToSlide(this.totalSlides - 1);
    }
    
    // Ajout des écouteurs d'événements
    addEventListeners() {
        // Boutons de navigation
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Raccourcis clavier
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Swipe tactile
        const container = document.querySelector('.slideshow-container');
        container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Empêcher le menu contextuel sur clic droit
        container.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Double-clic pour plein écran (optionnel)
        container.addEventListener('dblclick', () => this.toggleFullscreen());
    }
    
    // Gestion du clavier
    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'PageUp':
                this.prevSlide();
                break;
            case 'ArrowRight':
            case 'PageDown':
                this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'Home':
                this.firstSlide();
                break;
            case 'End':
                this.lastSlide();
                break;
        }
    }
    
    // Gestion du touch start
    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }
    
    // Gestion du touch end (swipe)
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }
    
    // Détection du swipe
    handleSwipe() {
        const distance = this.touchStartX - this.touchEndX;
        
        if (Math.abs(distance) > this.minSwipeDistance) {
            if (distance > 0) {
                // Swipe vers la gauche -> slide suivante
                this.nextSlide();
            } else {
                // Swipe vers la droite -> slide précédente
                this.prevSlide();
            }
        }
    }
    
    // Mode plein écran
    toggleFullscreen() {
        const container = document.querySelector('.slideshow-container');
        
        if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    new Slideshow();
});
