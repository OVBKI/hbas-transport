# Site internet HBAS TRANSPORT

Site vitrine statique réalisé d'après le [cahier des charges](docs/cahier-des-charges.md).

**HTML, CSS et JavaScript purs — aucun framework, aucune dépendance, aucun script tiers.**
Il suffit de déposer le dossier sur n'importe quel hébergement web.

---

## Aperçu

| | |
|---|---|
| **Pages** | Accueil (one-page), Mentions légales, Politique de confidentialité |
| **Poids de la page d'accueil** | ~242 Ko, 9 requêtes |
| **Core Web Vitals** (mesurés) | LCP 200 ms · CLS 0,0005 |
| **Responsive** | Testé de 320 px à 1920 px, sans débordement |
| **Accessibilité** | Contrastes WCAG AA validés, navigation clavier, libellés de formulaire |
| **Langue** | Français (`fr-BE`) |

### Direction artistique

Thème clair et lumineux inspiré de la **signalétique routière** : papier chaud,
encre profonde, **orange haute visibilité** (gilets et marquages arrière poids lourds),
motif de chevrons en signature. Typographie industrielle **Archivo** (titres),
**Instrument Sans** (texte) et **Martian Mono** (données techniques).

---

## Démarrage

```bash
# depuis ce dossier
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Aucune étape de compilation : les fichiers sont servis tels quels.

---

## Structure

```
.
├── index.html                       Page d'accueil (toutes les sections)
├── mentions-legales.html
├── politique-confidentialite.html
├── robots.txt
├── sitemap.xml
├── docs/
│   └── cahier-des-charges.md    Cahier des charges d'origine
└── assets/
    ├── css/
    │   ├── styles.css               Feuille de style principale (commentée par section)
    │   └── fonts.css                Déclarations @font-face locales
    ├── js/
    │   └── main.js                  Navigation, animations, validation du formulaire
    ├── fonts/                       Polices auto-hébergées (woff2)
    ├── img/                         Illustrations SVG (à remplacer par des photos)
    └── video/                       Emplacement de la vidéo du bandeau
```

---

## ⚠️ À compléter avant la mise en ligne

Ces éléments sont des **valeurs de remplacement** volontairement visibles :

| Quoi | Où | Valeur actuelle |
|---|---|---|
| **Adresse e-mail** | `index.html`, `mentions-legales.html`, `politique-confidentialite.html`, `assets/js/main.js` | `contact@hbas-transport.be` |
| **Numéro de téléphone** | mêmes fichiers | `+32 (0)XXX XX XX XX` |
| **Nom de domaine** | balises `canonical`, Open Graph, `sitemap.xml`, `robots.txt` | `www.hbas-transport.be` |
| **Infos légales** (BCE, TVA, siège, hébergeur, licence) | `mentions-legales.html` | surlignées en orange |
| **Adresse pour Google Maps** | `index.html`, section contact | carte désactivée |
| **Logo** | SVG intégré dans l'en-tête et le pied de page | chevrons génériques |
| **Photos** | `assets/img/` | illustrations SVG |

> Astuce : recherchez `hbas-transport.be` et `XXX` dans le projet pour tout retrouver.

### 1. Brancher le formulaire de devis

Ouvrez `assets/js/main.js` et renseignez `CONFIG` en haut du fichier :

```js
var CONFIG = {
  formEndpoint: 'https://formspree.io/f/xxxxxxxx',  // votre service
  contactEmail: 'contact@hbas-transport.be'
};
```

**Sans `formEndpoint`**, le site fonctionne quand même : à l'envoi, la messagerie
du visiteur s'ouvre avec la demande pré-remplie. C'est un repli fonctionnel,
mais un vrai service (Formspree, Web3Forms, fonction serverless…) est recommandé
en production.

Le formulaire intègre déjà : validation des champs, messages d'erreur en français,
pot de miel anti-spam et case de consentement RGPD.

### 2. Remplacer les visuels

Les illustrations SVG livrées sont de qualité correcte mais restent des
**substituts** : de vraies photos de la flotte transformeront la crédibilité du site.

| Fichier | À remplacer par |
|---|---|
| `img/hero-poster.svg` | Photo de camion en mouvement (autoroute), ~1920 px |
| `img/vehicule-leger.svg` | Photo du véhicule 20 m³ |
| `img/porteur-19t.svg` | Photo du porteur 19 t |
| `img/semi-40t.svg` | Photo du semi-remorque 40 t |
| `img/og-image.svg` | Idéalement un **PNG 1200×630** (certains réseaux sociaux ignorent le SVG) |

Conservez les noms de fichiers pour n'avoir aucun code à modifier — ou ajustez
les `src` et les attributs `alt` dans `index.html`.

**Vidéo du bandeau** : voir [`assets/video/README.md`](assets/video/README.md).

### 3. Ajouter un véhicule à la flotte

Dupliquez un bloc `<article class="rig">` dans la section `#flotte` de `index.html` :

```html
<article class="rig" data-reveal="zoom">
  <div class="rig__media">
    <span class="rig__badge">Catégorie</span>
    <img src="assets/img/mon-vehicule.jpg" width="800" height="450" loading="lazy"
         decoding="async" alt="Description du véhicule">
  </div>
  <div class="rig__body">
    <h3>Nom du véhicule</h3>
    <p class="rig__tag">Usage principal</p>
    <div class="rig__specs">
      <span class="is-key">Caractéristique mise en avant</span>
      <span>Autre caractéristique</span>
    </div>
    <ul>
      <li>Point fort</li>
    </ul>
  </div>
</article>
```

L'alternance gauche/droite des images est automatique. Pensez à ajouter le
service correspondant dans les **données structurées** en bas de `index.html`.

---

## Référencement

Déjà en place :

- balises `title` / `description` optimisées sur les mots-clés cibles ;
- un seul `H1`, hiérarchie `Hn` cohérente, `alt` descriptifs ;
- **données structurées** `MovingCompany` / `LocalBusiness`, `WebSite` et `FAQPage`
  (bloc JSON-LD en fin de `index.html`) ;
- Open Graph et Twitter Cards ;
- `sitemap.xml` et `robots.txt`.

Après la mise en ligne :

1. remplacer le domaine de remplacement partout ;
2. compléter l'adresse dans le JSON-LD (`address`) — essentiel pour le SEO local ;
3. déclarer le site dans la **Google Search Console** et soumettre le sitemap ;
4. créer une fiche **Google Business Profile** avec des coordonnées identiques
   à celles du site (cohérence Nom-Adresse-Téléphone).

---

## Choix techniques

**Polices auto-hébergées.** Elles ne passent pas par le CDN Google Fonts : aucune
adresse IP de visiteur n'est transmise à un tiers (point sensible du RGPD en
Europe) et il n'y a aucune requête vers un domaine externe.
Archivo, Instrument Sans et Martian Mono sont sous licence SIL Open Font 1.1.

**Aucun cookie, aucun traceur.** Le site n'a pas besoin de bannière de
consentement en l'état. Si vous ajoutez Google Maps ou un outil de statistiques,
complétez la politique de confidentialité et prévoyez une bannière.

**Animations respectueuses.** Les révélations au défilement utilisent
`IntersectionObserver` et sont entièrement désactivées si le visiteur a activé
« réduire les animations » dans son système.

---

## Mise en ligne

Le site étant statique, il fonctionne partout : hébergement mutualisé (FTP),
Netlify, Vercel, Cloudflare Pages, GitHub Pages…

Vérifiez simplement que :

- le **HTTPS** est actif (certificat SSL) ;
- le domaine sans `www` redirige vers le domaine avec `www` (ou l'inverse), de
  façon cohérente avec les balises `canonical` ;
- la compression **gzip/brotli** est activée ;
- les fichiers de `assets/fonts/` et `assets/img/` sont servis avec un cache long.
