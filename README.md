# E-Bench Diaporama

Banc public connecté et autonome - Présentation interactive du projet E-Bench (3ᵉ place Olympiades STI2D 2024-2025)

## 📋 Plan du diaporama

| Slide | Titre | Type de contenu |
|-------|-------|----------------|
| 1 | **E-Bench** | Page de garde avec titre, sous-titre et badge de récompense |
| 2 | **Problématique** | 3 cartes : Recharge mobile, Information urbaine, Autonomie énergétique |
| 3 | **Notre équipe** | Présentation des 5 membres (Axel, Kenzo, Yohan, Lorenzo, Mathéo) |
| 4 | **Solution proposée** | 3 fonctionnalités clés : Autonomie, Multi-services, Installation modulaire |
| 5 | **Fonctionnalités principales** | 5 services : USB, Écran tactile, Météo, Transports, Actualités |
| 6 | **Conception mécanique (SolidWorks)** | Structure en Pin Douglas, toit solaire, design résistant |
| 7 | **Chaîne d'énergie** | Schéma : Panneau 500W → Régulateur MPPT → Batterie 100Ah → Convertisseurs → Raspberry Pi |
| 8 | **Étude énergétique (MATLAB)** | Graphique interactif Production vs Consommation mensuelle + points clés |
| 9 | **Résultats & limites** | Bilan positif (autonomie confirmée) et limites (consommation Pi, batterie GEL) |
| 10 | **Dimensions & installation** | Dimensions détaillées (2,02m longueur, 1,80m assise, 2m hauteur) |
| 11 | **Composants clés** | Tableau des composants : Panneau, Régulateur, Batterie, Raspberry Pi, Écran |
| 12 | **Perspectives V2** | Améliorations prévues : Pi Zero 2W, Batterie LiFePO4, Module 4G, Délestage intelligent |
| 13 | **Conclusion** | Résumé du projet et remerciements |

## 🎯 Fonctionnalités du diaporama

- **Navigation clavier** : Flèches gauche/droite ou touches Q/D pour naviguer
- **Navigation tactile** : Swipe sur mobile/tablette
- **Navigation par points** : Cliquer sur les points en bas de page
- **Plein écran** : Bouton dédié pour une immersion totale
- **Thème clair/sombre** : Bascule automatique selon les préférences système
- **Graphique interactif** : Visualisation Plotly des données énergétiques MATLAB (slide 8)

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS, Flexbox/Grid, animations
- **JavaScript (Vanilla)** : Logique de navigation, rendu dynamique, graphique Plotly
- **Plotly.js** : Bibliothèque de visualisation de données pour le graphique MATLAB
- **Font Awesome** : Icônes vectorielles
- **Google Fonts** : Polices Space Grotesk et Inter

## 📁 Structure du projet

```
/workspace
├── index.html          # Page principale du diaporama
├── README.md           # Documentation (ce fichier)
├── css/
│   └── style.css       # Feuilles de style complètes
└── js/
    └── slideshow.js    # Logique JavaScript + données des slides + rendu graphique
```

## 🚀 Utilisation

1. Ouvrir `index.html` dans un navigateur web moderne (Chrome, Firefox, Edge, Safari)
2. Naviguer avec les flèches du clavier, les touches Q/D, ou en cliquant sur les points
3. Activer le mode plein écran pour une meilleure expérience
4. Consulter la slide 8 pour voir l'analyse énergétique interactive

## 📊 Données du graphique MATLAB

Le graphique de la slide 8 recrée les données de l'analyse MATLAB originale :

**Consommation :**
- **Au plus BAS** : Janvier (~0,35 kWh/jour) et Décembre (~0,38 kWh/jour) - période hivernale
- **Au plus HAUT** : Juillet (~0,58 kWh/jour) - période estivale
- La consommation varie selon les mois en fonction de l'ensoleillement (coefficient `fm`)
- Moyenne annuelle : ~13-15 W continus

**Production solaire :**
- Calculée selon modèle PV avec panneau 500W monocristallin
- Rendement global : 85% (eta)
- Inclinaison : 37° (optimisée pour latitude 50°)
- Production maximale : Mai-Juillet (journées longues, fort ensoleillement)
- Production minimale : Novembre-Janvier (journées courtes)

**Bilan énergétique :**
- Le système produit plus qu'il ne consomme toute l'année
- Excédent énergétique important en été
- Autonomie hivernale validée : 3-5 jours sans soleil
- Batterie 100Ah GEL 12V pour le stockage

## 👥 Équipe projet

- **Axel** : Programmation, Présentation
- **Kenzo** : Recherche composants, Solutions techniques, Communication
- **Yohan** : Programmation, Modélisation 3D
- **Lorenzo** : Schémas, Plans, Design, Budget
- **Mathéo** : Électrique, Normes, Communication

## 🏆 Récompense

**3ᵉ place aux Olympiades STI2D 2024-2025**

---

*Projet réalisé dans le cadre du cursus STI2D (Sciences et Technologies de l'Industrie et du Développement Durable)*
