# Site internet HBAS TRANSPORT

Site vitrine statique réalisé d'après le [cahier des charges](docs/cahier-des-charges.md).

**HTML, CSS et JavaScript purs — aucun framework, aucune dépendance, aucun script tiers.**
Il suffit de déposer le dossier sur n'importe quel hébergement web.

---

## Aperçu

| | |
|---|---|
| **Pages** | Accueil (one-page), Mentions légales, Politique de confidentialité |
| **Poids de la page d'accueil** | ~1,39 Mo, 11 requêtes (dont 1,1 Mo de vidéo de fond) |
| **Core Web Vitals** (mesurés) | LCP ~200 ms · CLS 0,0005 |
| **Responsive** | Testé de 320 px à 1920 px, sans débordement |
| **Accessibilité** | Contrastes WCAG AA validés (fonds `rgba` composés, dégradés testés arrêt par arrêt), navigation clavier, libellés de formulaire |
| **Langue** | Français (`fr-BE`) |

### Direction artistique

**Thème sombre**, « nuit sur l'autoroute » : asphalte profond, **dégradés rouges**
de feux arrière sur les titres, motif de chevrons (marquage arrière poids lourds)
en signature, halos discrets. Typographie industrielle **Archivo** (titres),
**Instrument Sans** (texte) et **Martian Mono** (données techniques).

Deux dégradés distincts, à ne pas confondre :

| Variable | Usage | Pourquoi |
|---|---|---|
| `--grad` | **Texte** (titres, via `background-clip`) | Teintes claires, ≥ 4,5:1 sur les fonds sombres |
| `--grad-fill` | **Surfaces** (boutons, liserés) | Volontairement plus sombre : du blanc sur la teinte claire de `--grad` ne dépasserait pas 2:1 |

La classe `.grad` porte un repli `color` : si `background-clip: text` n'est pas
supporté, le titre reste lisible en rouge plein plutôt que de disparaître.

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
    ├── img/                         Visuels de la flotte et de partage
    ├── og/                          Gabarit de l'image de partage
    └── video/                       Vidéo de fond du bandeau
```

---

## ⚠️ À compléter avant la mise en ligne

Ces éléments sont des **valeurs de remplacement** volontairement visibles :

| Quoi | Où | Valeur actuelle |
|---|---|---|
| **Redirection e-mail** | à configurer chez le registrar du domaine (voir § 1 bis) | `info@` → `hbas-transport@hotmail.com` |
| **Numéro de téléphone** | mêmes fichiers | `+32 (0)XXX XX XX XX` |
| **Infos légales** (BCE, TVA, siège, hébergeur, licence) | `mentions-legales.html` | surlignées en orange |
| **Adresse pour Google Maps** | `index.html`, section contact | carte désactivée |

> Astuce : recherchez `XXX` dans le projet pour retrouver ce qui reste à compléter.

### 1. Brancher le formulaire de devis

Ouvrez `assets/js/main.js` et renseignez `CONFIG` en haut du fichier :

```js
var CONFIG = {
  formEndpoint: 'https://formspree.io/f/xxxxxxxx',  // votre service
  contactEmail: 'info@hbastransport.com'
};
```

**Sans `formEndpoint`**, le site fonctionne quand même : à l'envoi, la messagerie
du visiteur s'ouvre avec la demande pré-remplie. C'est un repli fonctionnel,
mais un vrai service (Formspree, Web3Forms, fonction serverless…) est recommandé
en production.

Le formulaire intègre déjà : validation des champs, messages d'erreur en français,
pot de miel anti-spam et case de consentement RGPD.

---

### 1 bis. Faire arriver les demandes sur la boîte Hotmail

L'adresse **affichée sur le site est `info@hbastransport.com`** — c'est celle que
voient les visiteurs, dans la section contact, les mentions légales et les données
structurées. La boîte réellement relevée peut être une autre.

> ⚠️ **Rien de tout cela ne se règle dans le code du site.** Une redirection
> d'e-mails se configure chez le fournisseur du domaine ou du service de
> formulaire. Les fichiers du site ne peuvent pas la mettre en place.

Deux chemins, cumulables :

#### A. Le formulaire livre directement dans la boîte Hotmail

Le service de formulaire décide seul du destinataire. Dans Formspree, Web3Forms
ou équivalent, mettez **`hbas-transport@hotmail.com`** comme destinataire, puis
collez la clé du formulaire dans `formEndpoint`.

Avantage : ça marche immédiatement, même sans hébergement e-mail sur le domaine.
Limite : ça ne couvre **que** le formulaire. Une personne qui écrit directement à
`info@hbastransport.com` — l'adresse affichée partout sur le site — n'arrivera
nulle part tant que le point B n'est pas fait.

#### B. Une redirection sur le domaine (nécessaire pour couvrir tout le reste)

Chez le registrar / hébergeur du domaine `hbastransport.com` (Combell, One.com,
OVH, Gandi…), cherchez **« Alias e-mail », « Redirection » ou « Forward »** et
créez :

```
info@hbastransport.com   →   hbas-transport@hotmail.com
```

C'est en général **gratuit** et ne demande pas de vraie boîte aux lettres : un
alias de redirection suffit. Comptez quelques minutes à quelques heures de
propagation.

**Trois points à ne pas rater :**

1. **Le spam.** Un message redirigé arrive chez Hotmail avec l'expéditeur
   d'origine mais depuis un autre serveur, ce qui casse la vérification SPF.
   Ajoutez `info@hbastransport.com` aux **expéditeurs approuvés** dans Outlook.com
   et surveillez le dossier Courrier indésirable les premiers jours.

2. **Répondre.** Une réponse partirait par défaut depuis l'adresse Hotmail, ce
   qui fait perdre le bénéfice de l'adresse professionnelle. Dans Outlook.com,
   ajoutez `info@hbastransport.com` comme adresse d'envoi
   (*Paramètres → Courrier → Synchroniser la messagerie*) pour répondre depuis
   l'adresse du domaine.

3. **Cohérence.** L'adresse affichée doit rester `info@hbastransport.com`
   partout : mentions légales, données structurées et fiche Google Business
   Profile. Une adresse Hotmail visible sur un site d'entreprise dessert la
   crédibilité — et Google pénalise les incohérences de coordonnées.

### 2. Visuels

Les **trois véhicules de la flotte** sont en place : rendus fournis par le
client, découpés depuis une planche unique et exportés en WebP (avec repli
JPEG via `<picture>`).

| Fichier | État |
|---|---|
| `img/vehicule-leger.webp` / `.jpg` | ✅ rendu du véhicule 20 m³ |
| `img/porteur-19t.webp` / `.jpg` | ✅ rendu du porteur 19 t |
| `img/semi-40t.webp` / `.jpg` | ✅ rendu du semi-remorque 40 t |
| `img/hero-poster.svg` | illustration de repli du bandeau, sous la vidéo |
| `img/logo.webp` / `.png` | ✅ logo officiel, fond détouré |
| `img/favicon-32.png`, `favicon-180.png`, `apple-touch-icon.png` | ✅ icônes de navigateur, issues du logo |

Les trois visuels partagent un **cadre de 1255 × 307 px (≈ 4:1)**, et les cartes
de la flotte reprennent ce ratio exact — aucun recadrage, donc aucun véhicule
tronqué. Les écarts de taille sont volontairement conservés : le semi-remorque
occupe plus de place dans son cadre que l'utilitaire.

> **Pour remplacer un véhicule ou en ajouter un**, exportez au même ratio
> (1255 × 307) sur le même fond (dégradé `#11141A` → `#161A20`) : le visuel se
> fondra dans la carte sans réglage. Un autre ratio nécessiterait d'ajuster
> `aspect-ratio` sur `.rig__media` dans `assets/css/styles.css`.

L'image de partage (`img/og-image.png`) est un PNG 1200 × 630 généré depuis le
gabarit [`assets/og/template.html`](assets/og/README.md) — rien à faire, sauf si
vous modifiez la charte.

Conservez les noms de fichiers pour n'avoir aucun code à modifier — ou ajustez
les `src` et les attributs `alt` dans `index.html`.

**Vidéo du bandeau** : déjà en place (`assets/video/hero-camion.mp4`).
Pour la remplacer ou ajuster le cadrage, voir
[`assets/video/README.md`](assets/video/README.md).

#### Le logo

Le logo officiel est en place, **fond blanc détouré** (remplissage depuis les
bords : le blanc intérieur du badge est conservé, seul le fond extérieur est
rendu transparent).

| Emplacement | Taille | Pourquoi |
|---|---|---|
| En-tête | 46 px de haut (40 au défilement) | En dessous de ~80 px le ruban « H.B.A.S TRANSPORT » n'est plus lisible : le libellé typographique à côté prend le relais. |
| Pied de page | 92 px | Le ruban se lit à cette taille, le libellé typographique devient redondant et est masqué. |
| Icône de navigateur | 32 / 180 px | Cadrée sur le disque, le ruban qui déborde est coupé pour gagner des pixels utiles. |

> À 16 px (onglet de navigateur), le logo devient nécessairement confus : c'est
> un badge détaillé, pas une icône. Un **monogramme simplifié** — les initiales
> ou la silhouette du camion seule — donnerait un bien meilleur résultat à cette
> taille, si le graphiste peut en fournir un.

> ⚠️ Le logo écrit **« H.B.A.S TRANSPORT »** (avec points) alors que le site
> écrit partout **« HBAS TRANSPORT »**. À trancher pour uniformiser : titres,
> balise `title`, données structurées et mentions légales suivent la seconde
> forme.

### 3. Ajouter un véhicule à la flotte

Dupliquez un bloc `<article class="rig">` dans la section `#flotte` de `index.html` :

```html
<article class="rig" data-reveal="zoom">
  <div class="rig__media">
    <span class="rig__badge">Catégorie</span>
    <picture>
      <source srcset="assets/img/mon-vehicule.webp" type="image/webp">
      <img src="assets/img/mon-vehicule.jpg" width="1255" height="307"
           loading="lazy" decoding="async" alt="Description du véhicule">
    </picture>
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

Le visuel occupe une bande pleine largeur en haut de la carte, le texte se
répartit ensuite sur deux colonnes. Pensez à ajouter le service correspondant
dans les **données structurées** en bas de `index.html`.

---

## Mise en ligne sur Vercel

Le domaine du site est **`hbastransport.com`** (apex, sans `www`) — c'est la
forme retenue dans les balises `canonical`, l'Open Graph, le `sitemap.xml`,
le `robots.txt` et les données structurées. Pour passer à `www`, remplacez
`https://hbastransport.com` par `https://www.hbastransport.com` dans ces
mêmes fichiers, et inversez la redirection dans Vercel.

### Déploiement

Le site est statique : dans Vercel, importez le dépôt, **framework preset
« Other »**, aucune commande de build, répertoire de sortie à la racine.

### Domaine — sans casser la messagerie

Le domaine est enregistré via Google Workspace, qui sert aussi la messagerie
professionnelle. **Site et e-mail cohabitent** : ce sont des types
d'enregistrements DNS différents.

Dans *Vercel → Settings → Domains*, ajoutez `hbastransport.com` **et**
`www.hbastransport.com` (celui-ci en redirection vers le premier). Vercel
affiche alors les enregistrements à créer chez le registrar — typiquement :

| Nom | Type | Valeur |
|---|---|---|
| `@` | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com` |

> Utilisez les valeurs **affichées par Vercel**, pas celles recopiées ici :
> elles peuvent changer.

> 🚨 **Ne changez pas les serveurs de noms (nameservers) vers Vercel.**
> L'hébergement DNS basculerait chez Vercel et les enregistrements **MX
> disparaîtraient** : la messagerie professionnelle tomberait aussitôt.
> Ajoutez uniquement les enregistrements A et CNAME.

**À ne jamais supprimer**, sous peine de casser la messagerie :

- les enregistrements **MX** (routage Google Workspace) ;
- les **TXT** de SPF, DKIM (`google._domainkey`) et DMARC (`_dmarc`) ;
- le TXT de vérification de domaine Google.

Le certificat HTTPS est émis automatiquement par Vercel dès la propagation DNS.

### En-têtes HTTP

[`vercel.json`](vercel.json) définit la politique de cache et quelques en-têtes
de sécurité :

| Chemin | Cache | Pourquoi |
|---|---|---|
| `assets/fonts/` | 1 an, `immutable` | Les polices ne changent jamais sous le même nom. |
| `assets/img/`, `assets/video/` | 1 jour + `stale-while-revalidate` | Assez long pour éviter de retélécharger la vidéo de 1,1 Mo à chaque visite, assez court pour qu'un remplacement de visuel soit vu rapidement. |
| `assets/css/`, `assets/js/` | revalidation systématique | Les noms de fichiers ne sont pas versionnés : un cache long figerait une correction pendant des jours. |

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

Le bandeau d'accueil fait exception : son contenu s'anime en CSS **dès le
chargement**, sans passer par l'observateur. Le faire attendre retardait
l'affichage du titre de près d'une seconde — mauvais pour le visiteur comme
pour le LCP.

Conformément aux recommandations d'ergonomie, un seul élément anime son dégradé
en continu (le titre du bandeau) : multiplier les animations permanentes
fatigue l'œil et peut gêner les personnes sensibles au mouvement.

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
