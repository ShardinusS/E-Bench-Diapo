# Documentation technique - E-Bench Diaporama

## 📝 Contexte du projet

Ce projet consiste en un diaporama HTML/CSS/JavaScript interactif pour présenter le projet **E-Bench**, un banc public connecté et autonome ayant remporté la 3ᵉ place aux Olympiades STI2D 2024-2025.

### Origine de la demande

L'utilisateur avait initialement un fichier HTML (`04-ebench-matlab-analysis.html`) contenant des graphiques générés par MATLAB montrant l'analyse énergétique du projet (production solaire vs consommation mensuelle). L'objectif était d'intégrer ces graphiques directement dans le diaporama plutôt que d'avoir un fichier séparé.

---

## 🔧 Travail réalisé

### 1. Analyse du fichier MATLAB original

Le fichier `04-ebench-matlab-analysis.html` contenait :
- Un graphique "Production vs Consommation mensuelle" (ID: `ch-bilan-monthly`)
- Données calculées par MATLAB avec :
  - Facteurs mensuels de production (`fm`)
  - Jours équivalents par mois (`jm`)
  - Puissance de charge constante (`Pl = 14.5W`)
  - Panneau solaire 500W avec rendement 85%
  - Inclinaison de 37°, latitude 50°

### 2. Intégration du graphique dans le diaporama

#### Modifications apportées à `js/slideshow.js` :

**a) Ajout de la propriété `chartId` à la slide 8 :**
```javascript
{
  icon: 'fa-chart-area',
  title: 'Étude énergétique (MATLAB)',
  chartId: 'matlab-chart',  // ← Ajouté
  points: [...],
  type: 'chart'
}
```

**b) Création du conteneur de graphique dans `renderSlide()` :**
```javascript
case 'chart':
  content = `
    <div class="slide-content">
      <h2><i class="fas ${slide.icon}"></i> ${slide.title}</h2>
      <div class="chart-container" id="${slide.chartId || ''}" style="width:100%;height:500px;"></div>
      ...
    </div>
  `;
```

**c) Implémentation de la fonction `renderMatlabChart()` :**
Cette fonction recrée entièrement le graphique MATLAB en utilisant Plotly.js :
- Reproduction des calculs de puissance PV (fonction `pvPow()`)
- Calcul de l'énergie produite et consommée (intégration trapézoïdale)
- Adaptation au thème clair/sombre
- Configuration responsive avec Plotly

**d) Déclenchement du rendu au changement de slide :**
```javascript
function goToSlide(index) {
  // ...
  const currentSlideData = slides[currentSlide];
  if (currentSlideData.chartId && currentSlideData.type === 'chart') {
    setTimeout(() => renderMatlabChart(currentSlideData.chartId), 100);
  }
}
```

#### Modifications apportées à `index.html` :

**Ajout de la bibliothèque Plotly.js dans le `<head>` :**
```html
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
```

#### Modifications apportées à `css/style.css` :

**Ajout du style pour le conteneur de graphique :**
```css
.chart-container {
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
  padding: 1rem;
}
```

### 3. Suppression du fichier HTML MATLAB

Une fois l'intégration terminée et vérifiée, le fichier `04-ebench-matlab-analysis.html` a été supprimé car il n'était plus nécessaire.

---

## 🎨 Choix techniques

### Pourquoi Plotly.js ?

1. **Compatibilité** : Reproduit fidèlement les graphiques MATLAB
2. **Interactivité** : Zoom, survol, export intégrés
3. **Responsive** : S'adapte automatiquement à la taille du conteneur
4. **Theming** : Support natif des thèmes clair/sombre
5. **Léger** : Chargement via CDN, pas d'installation requise

### Architecture du code

- **Vanilla JavaScript** : Pas de framework pour garder le projet léger et simple
- **Données séparées** : Tableau `slides` contenant toute la configuration
- **Rendu dynamique** : Fonction `renderSlide()` qui génère le HTML selon le type
- **Modularité** : Fonction `renderMatlabChart()` indépendante et réutilisable

### Algorithme de calcul PV

La fonction `pvPow()` implémente un modèle photovoltaïque complet :
1. Calcul de la déclinaison solaire (formule de Cooper)
2. Calcul de l'angle horaire du lever/coucher du soleil
3. Position solaire (hauteur, azimut) pour chaque heure
4. Irradiance directe et diffuse (modèle atmosphérique simple)
5. Facteur d'incidence sur plan incliné
6. Puissance instantanée avec rendement système

---

## 📊 Résultat final

### Slide 8 - Étude énergétique (MATLAB)

Le graphique affiche :
- **Barres vertes** : Production solaire mensuelle (kWh)
- **Barres rouges** : Consommation mensuelle (kWh)
- **Axe X** : Mois de Janvier à Décembre
- **Axe Y** : Énergie en kWh
- **Légende** : Interactive en haut du graphique
- **Tooltip** : Valeurs exactes au survol

Les données montrent :
- Une production maximale en été (Juin-Juillet)
- Une consommation relativement constante
- Un bilan énergétique positif toute l'année

---

## 🚀 Utilisation

### Navigation
- **Flèches gauche/droite** : Changer de slide
- **Touches Q/D** : Alternative AZERTY
- **Swipe tactile** : Mobile/tablette
- **Points en bas** : Navigation directe
- **F5** : Rafraîchir la page
- **Échap** : Quitter le plein écran

### Personnalisation

Pour modifier le graphique :
1. Ouvrir `js/slideshow.js`
2. Modifier les constantes dans `renderMatlabChart()` :
   - `Pn` : Puissance nominale du panneau (W)
   - `eta` : Rendement système
   - `tilt` : Inclinaison (degrés)
   - `lat` : Latitude (degrés)
   - `Pl` : Puissance de charge (W)

Pour ajouter une slide :
1. Ajouter un objet dans le tableau `slides`
2. Choisir un `type` existant ou créer un nouveau cas dans `renderSlide()`

---

## 📁 Fichiers modifiés/créés

| Fichier | Action | Description |
|---------|--------|-------------|
| `README.md` | Modifié | Documentation complète avec plan du diaporama |
| `js/slideshow.js` | Modifié | Ajout fonction `renderMatlabChart()` + logique de rendu |
| `index.html` | Modifié | Ajout CDN Plotly.js |
| `css/style.css` | Modifié | Styles `.chart-container` |
| `04-ebench-matlab-analysis.html` | Supprimé | Devenu inutile après intégration |

---

## 🐛 Problèmes rencontrés et solutions

### Problème 1 : Graphique vide
**Symptôme** : Rectangle vide sur la slide 8  
**Cause** : La fonction `renderMatlabChart()` n'était pas appelée au bon moment  
**Solution** : Ajout du `setTimeout()` dans `goToSlide()` pour attendre que le DOM soit prêt

### Problème 2 : Thème non respecté
**Symptôme** : Graphique toujours en mode clair  
**Cause** : Non-détection de l'attribut `data-theme`  
**Solution** : Vérification de `document.documentElement.getAttribute('data-theme')`

### Problème 3 : Données incorrectes
**Symptôme** : Valeurs différentes de MATLAB  
**Cause** : Erreur dans les formules de conversion  
**Solution** : Relecture des équations et division par 1000 pour Wh → kWh

---

## 💡 Améliorations possibles

1. **Animation** : Faire apparaître les barres progressivement
2. **Export** : Bouton pour télécharger le graphique en PNG/PDF
3. **Comparaison** : Ajouter une ligne de bilan net (production - consommation)
4. **Données réelles** : Importer des mesures réelles depuis un fichier JSON
5. **Multi-graphiques** : Ajouter d'autres vues (puissance instantanée, etc.)

---

## 📚 Ressources utilisées

- [Plotly.js Documentation](https://plotly.com/javascript/)
- [NREL PVWatts Calculator](https://pvwatts.nrel.gov/) - Pour validation des calculs
- [Solar Position Algorithm](https://midcdmz.nrel.gov/spa/) - Formules de position solaire
- Font Awesome 6 - Icônes
- Google Fonts - Space Grotesk & Inter

---

*Auteur : Assistant IA*  
*Date : Avril 2025*  
*Projet : E-Bench Diaporama - Olympiades STI2D 2024-2025*
