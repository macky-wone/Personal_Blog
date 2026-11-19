# Portfolio — Macky Mamadou Wone

> **Étudiant Ingénieur en Génie Informatique & Télécommunications**  
> Institut Polytechnique de Saint-Louis (**IPSL — Université Gaston Berger**, Sénégal)  
> *Diplôme d’Ingénieur prévu en 2027*

---

[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern_Design-1572b6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)

Ce dépôt contient le code source de mon portfolio professionnel interactif, conçu et développé en **React** et **TypeScript** avec **Vite**, intégrant les dernières normes du Web moderne (View Transitions directionnelles, modales natives `<dialog>` top-layer, dark/light theme, schémas d'architectures interactifs).

---

## 🚀 Fonctionnalités du Portfolio

- **Navigation Dual-Mode** :
  - **Mode Scroll continu** : Défilement fluide de toutes les sections avec détection de la section active via `IntersectionObserver`.
  - **Mode Slides (Diapositives)** : Navigation scénarisée utilisant la **View Transitions API** (`types: ['forward' | 'backward']`) pour des transitions directionnelles fluides.
- **Thème Sombre / Clair** : Bascule dynamique avec adaptation automatique des contrastes, des cartes et des effets de halo lumineux.
- **Visualisations d'Architectures Interactives** :
  - **NetSim Pro** : Schéma réseau avec simulation de synchronisation collaborative en temps réel (CRDT via Yjs).
  - **Compilateur SGN** : Pipeline d'analyse lexicale (Flex), syntaxique (Bison) et génération d'AST en C.
  - **VPN IPsec Hub-and-Spoke** : Topologie WAN d'entreprise reliant 1 site central et 12 sites distants (72 tunnels).
  - **Pipeline OCR & MRZ** : Flux complet d'extraction CNI combinant PaddleOCR, bindings natifs Rust (PyO3/Maturin) et FastAPI.
- **Aperçu et Téléchargement du CV** : Consultation directe du CV PDF dans une fenêtre modale native `<dialog>` avec support du *light dismiss* (fermeture au clic sur l'arrière-plan ou touche Échap).
- **Copie rapide des contacts** : Boutons de copie en un clic de l'adresse email et du numéro de téléphone.

---

## 🛠️ Stack Technique

### Frontend & Architecture
- **Framework & Langage** : React 19, TypeScript
- **Outillage de Build** : Vite 6, TSConfig Bundler
- **Styling** : CSS moderne (variables CSS, glassmorphism, flexbox & bento grids)
- **Web Platform APIs** :
  - `<dialog>` natif avec attribut `closedby="any"` et containment de scroll (`overscroll-behavior: contain`)
  - CSS `@starting-style` et `transition-behavior: allow-discrete` pour les animations top-layer
  - `document.startViewTransition` pour les transitions directionnelles

---

## 📂 Structure du Projet

```text
Personal_Blog/
├── public/
│   ├── assets/                      # Arrière-plans et ressources visuelles
│   └── CV_Macky_Mamadou_Wone-3.pdf  # CV PDF à jour
├── src/
│   ├── components/
│   │   ├── CvModal.tsx              # Modale de consultation du CV
│   │   ├── ProjectModal.tsx         # Modale détaillée des projets
│   │   └── ProjectVisual.tsx        # Schémas et diagrammes d'architecture SVG
│   ├── data/
│   │   └── cvData.ts                # Données structurées (expériences, projets, compétences, etc.)
│   ├── utils/
│   │   └── modernWeb.ts             # Helpers View Transitions & Dialog Top-Layer
│   ├── App.tsx                      # Composant principal du portfolio
│   ├── main.tsx                     # Point d'entrée de l'application React
│   └── types.ts                     # Définitions TypeScript
├── index.css                        # Design System complet (Dark & Light)
├── index.html                       # Document HTML racine
├── package.json                     # Scripts et dépendances npm
├── tsconfig.json                    # Configuration TypeScript
└── vite.config.ts                   # Configuration Vite
```

---

## 💻 Démarrage Local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18+ recommandée)
- `npm` ou `pnpm` / `yarn`

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/macky-wone/Personal_Blog.git
cd Personal_Blog

# Installer les dépendances
npm install
```

### Lancement du serveur de développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

### Compilation pour la production
```bash
npm run build
```
Les fichiers optimisés et minifiés sont générés dans le dossier `dist/`.

### Prévisualisation du build de production
```bash
npm run preview
```

---

## 📌 Projets Phares Présentés

1. **NetSim Pro** *(Projet Solo — 2026)*
   - Éditeur collaboratif de topologies réseau façon Packet Tracer / GNS3.
   - Synchronisation sans conflit en temps réel grâce aux CRDTs (**Yjs**), WebSockets (**Socket.io**) et export natif au format `.gns3`.
   - Stack : `React, Node.js, Express, PostgreSQL, Prisma, Yjs`.

2. **Compilateur SGN** *(Projet en équipe de 3 — 2026)*
   - Compilateur complet pour un langage dédié à la gestion de notes scolaires.
   - Analyseur lexical (**Flex**), analyseur syntaxique LALR (**Bison**), Arbre Syntaxique Abstrait (AST) et table des symboles.
   - Stack : `Langage C, Flex, Bison`.

3. **VPN IPsec Hub-and-Spoke** *(Architecture Réseau & Sécurité — 2026)*
   - Interconnexion sécurisée d'un site central avec 12 sites distants.
   - Déploiement de 72 tunnels IPsec avec mécanisme de bascule automatique (*failover*).
   - Outil : `Cisco Packet Tracer`.

4. **Pipeline OCR CNI & MRZ** *(Stage Baamtu Technologies — 2026)*
   - Extraction automatique de données sur Cartes Nationales d'Identité (Sénégal & Côte d'Ivoire).
   - Détection et reconnaissance de texte avec **PaddleOCR**, module natif haute performance en **Rust** via **PyO3/Maturin** pour le décodage MRZ, API REST **FastAPI** et interface **Streamlit**.

---

## 📬 Contact & Liens

- **Nom** : Macky Mamadou Wone
- **Email** : [wonemacky@gmail.com](mailto:wonemacky@gmail.com)
- **Téléphone** : [+221 78 613 47 46](tel:+221786134746)
- **Localisation** : Saint-Louis / Ndioum, Sénégal
- **Formation** : 3e année Cycle Ingénieur — Informatique & Télécoms (IPSL — UGB)

---

*Fait avec passion par Macky Mamadou Wone.*

