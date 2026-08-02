# Cahier des charges — Site internet **HBAS TRANSPORT**

> Site vitrine moderne, professionnel et rassurant présentant l'entreprise HBAS TRANSPORT
> et permettant aux clients de la contacter facilement pour leurs besoins en transport.

| | |
|---|---|
| **Client** | HBAS TRANSPORT |
| **Type de projet** | Site vitrine (one-page enrichi ou multi-pages) |
| **Version du document** | 1.0 |
| **Date** | 2026 |
| **Langue principale** | Français |
| **Zone d'activité** | Belgique — transport national & international |

---

## Sommaire

1. [Contexte et objectifs](#1-contexte-et-objectifs)
2. [Cible et personas](#2-cible-et-personas)
3. [Identité visuelle et style](#3-identité-visuelle-et-style)
4. [Arborescence du site](#4-arborescence-du-site)
5. [Contenu détaillé de la page d'accueil](#5-contenu-détaillé-de-la-page-daccueil)
6. [Formulaire de contact / demande de devis](#6-formulaire-de-contact--demande-de-devis)
7. [Pied de page & pages légales](#7-pied-de-page--pages-légales)
8. [Spécifications techniques](#8-spécifications-techniques)
9. [Référencement (SEO)](#9-référencement-seo)
10. [Performance, accessibilité & responsive](#10-performance-accessibilité--responsive)
11. [Contenus à fournir par le client](#11-contenus-à-fournir-par-le-client)
12. [Livrables](#12-livrables)
13. [Évolutivité](#13-évolutivité)
14. [Critères de recette (validation)](#14-critères-de-recette-validation)

---

## 1. Contexte et objectifs

HBAS TRANSPORT est une société de transport de marchandises assurant des livraisons
**nationales et internationales** pour une clientèle de professionnels. L'entreprise
souhaite se doter d'un site internet vitrine afin de :

- **Présenter** l'entreprise, ses services et sa flotte de véhicules ;
- **Rassurer** les prospects (fiabilité, sécurité, respect des délais, professionnalisme) ;
- **Générer des contacts qualifiés** via un formulaire de demande de devis ;
- **Être visible sur Google** sur les recherches liées au transport en Belgique.

### Objectifs mesurables

| Objectif | Indicateur | Cible |
|---|---|---|
| Générer des demandes de devis | Formulaires envoyés / mois | Suivi mensuel |
| Être trouvé sur Google | Positionnement sur les mots-clés cibles | Top 3 pages locales |
| Rassurer et convertir | Taux de conversion visiteur → contact | Optimisé en continu |
| Expérience fluide | Temps de chargement (LCP) | < 2,5 s |

---

## 2. Cible et personas

**Clientèle principale : professionnels (B2B).**

- **Responsable logistique / supply chain** — cherche un transporteur fiable pour
  des livraisons régulières (palettes, distribution entrepôts/plateformes/magasins).
- **PME / industriel** — besoin ponctuel ou récurrent de transport de marchandises,
  chargements complets (FTL) ou partiels (LTL).
- **Donneur d'ordre international** — expéditions vers ou depuis la Belgique,
  transport dédié point A → point B sans rupture de charge.

**Attentes communes :** confiance, réactivité, devis rapide et gratuit, suivi de livraison,
respect des délais et sécurité des marchandises.

---

## 3. Identité visuelle et style

### Direction artistique

- **Thème clair et lumineux** — fond blanc / gris très clair dominant, sensation
  d'espace, de propreté et de sérieux.
- Design **moderne, fluide et professionnel**.
- Grandes **photos et vidéos de camions en mouvement** (autoroute, chargement,
  livraison, logistique) en plein cadre (hero, sections immersives).
- **Animations discrètes au défilement** (apparition en fondu / translation légère
  des blocs, compteurs, révélation d'icônes) — jamais intrusives.
- Interface **entièrement responsive** : ordinateur, tablette, smartphone.
- **Chargement rapide** (images optimisées, chargement différé).

### Palette suggérée (à valider)

| Rôle | Couleur | Usage |
|---|---|---|
| Fond principal | Blanc `#FFFFFF` / gris clair `#F5F7FA` | Arrière-plans, sensation lumineuse |
| Couleur d'accent | Bleu confiance `#1E5AA8` (ou couleur logo) | Boutons, liens, titres, icônes |
| Accent secondaire | Orange/ambre `#F2A413` | Appels à l'action (« Demander un devis ») |
| Texte | Gris anthracite `#1F2933` | Corps de texte, titres |

> ⚠️ La palette définitive sera calée sur le **logo et la charte** fournis par HBAS TRANSPORT.

### Typographie

- Police **sans-serif moderne et lisible** (ex. Inter, Poppins, Montserrat) ;
- Hiérarchie claire : titres impactants, corps de texte confortable (≥ 16 px).

### Ton éditorial

Professionnel, direct, rassurant. Met en avant la **fiabilité**, la **sécurité** et
le **respect des délais**.

---

## 4. Arborescence du site

Site conçu en **page d'accueil unique enrichie (one-page)** avec navigation par ancres,
complétée par les **pages légales**. Une évolution multi-pages reste possible.

```
Accueil (page unique)
├── Hero (bandeau principal)
├── Présentation
├── Nos services
├── Notre flotte
├── Comment nous fonctionnons
├── Pourquoi choisir HBAS TRANSPORT ?
├── FAQ
└── Contact (formulaire + coordonnées + carte)

Pages annexes
├── Mentions légales
└── Politique de confidentialité
```

**Menu de navigation (header collant / sticky) :**
`Accueil` · `Nos services` · `Notre flotte` · `FAQ` · `Contact`
+ bouton d'action mis en avant : **« Demander un devis »**.

---

## 5. Contenu détaillé de la page d'accueil

### 5.1 Bandeau principal (Hero)

- **Média** : image ou **vidéo d'un camion en mouvement** en plein écran (avec fallback
  image pour mobile / connexions lentes).
- **Titre :** `HBAS TRANSPORT`
- **Sous-titre :** *Votre partenaire de confiance pour le transport national et international.*
- **Boutons (call-to-action) :**
  - `Demander un devis` (bouton principal → ancre formulaire de contact)
  - `Nous contacter` (bouton secondaire → coordonnées / formulaire)

### 5.2 Présentation

> HBAS TRANSPORT propose des solutions de transport fiables, rapides et sécurisées pour
> les professionnels. Nous assurons des livraisons nationales et internationales en adaptant
> nos moyens de transport aux besoins de chaque client. Notre priorité est le respect des
> délais, la sécurité des marchandises et la satisfaction de nos partenaires.

Mise en page : texte + visuel logistique, éventuellement quelques **chiffres-clés**
animés (années d'expérience, livraisons réalisées, etc. — à fournir).

### 5.3 Nos services

Présentation en **grille de cartes**, chaque service avec **icône** (et image optionnelle) :

| Service | Description courte |
|---|---|
| **Transport national** | Livraisons partout en Belgique. |
| **Transport international** | Expéditions selon la destination. |
| **Livraison express** | Solutions rapides et prioritaires. |
| **Transport dédié** | Un véhicule réservé à votre marchandise. |
| **Livraison directe A → B** | Sans rupture de charge, du point A au point B. |
| **Chargements complets (FTL)** | Camion entier pour un seul client. |
| **Chargements partiels (LTL)** | Mutualisation, volumes partiels. |
| **Transport de palettes** | Marchandises palettisées. |
| **Distribution** | Entrepôts, plateformes logistiques, magasins et entreprises. |

### 5.4 Notre flotte

Présentation de chaque véhicule avec **photo dédiée**, titre et caractéristiques.

**Véhicule léger**
- Volume : **20 m³**
- Livraison rapide
- Colis et palettes
- Livraison de proximité et longue distance, national et international

**Porteur 2 essieux — MMA 19 tonnes**
- Distribution régionale
- Chargements industriels
- Livraisons multi-clients

**Semi-remorque 3 essieux — MMA 40 tonnes**
- Transport longue distance
- Transport national et international
- Marchandises palettisées
- Gros volumes : **90 m³**

> 🔧 **Évolutivité :** le composant « flotte » doit permettre d'**ajouter facilement
> de nouveaux véhicules** à l'avenir (structure de données réutilisable).

### 5.5 Comment nous fonctionnons

Frise / parcours en **7 étapes**, chacune illustrée par une **icône** :

1. Le client nous contacte.
2. Nous analysons la demande.
3. Nous envoyons un devis.
4. Validation de la mission.
5. Chargement de la marchandise.
6. Livraison du point A au point B.
7. Confirmation de la livraison.

### 5.6 Pourquoi choisir HBAS TRANSPORT ?

Grille d'arguments avec icônes :

- Respect des délais
- Livraison sécurisée
- Communication rapide
- Disponibilité
- Flexibilité
- Tarifs compétitifs
- Suivi des transports
- Professionnalisme
- Service personnalisé

### 5.7 Questions fréquentes (FAQ)

Accordéon (questions dépliables) — **balisage structuré `FAQPage` pour le SEO** :

| Question | Réponse |
|---|---|
| Livrez-vous partout en Belgique ? | Oui. |
| Effectuez-vous des transports internationaux ? | Oui, selon la destination. |
| Puis-je demander un devis gratuitement ? | Oui, le devis est gratuit et sans engagement. |
| Quels types de marchandises transportez-vous ? | Palettes, marchandises générales, colis, matériel industriel et autres marchandises autorisées. |
| Comment suivre ma livraison ? | Nous informons nos clients de l'avancement du transport. |
| Quels sont vos délais ? | Ils dépendent de la destination et de l'urgence de la demande. |

---

## 6. Formulaire de contact / demande de devis

Section **Contact** avec un formulaire structuré. Champs :

| Champ | Type | Obligatoire |
|---|---|---|
| Nom | Texte | ✅ |
| Société | Texte | — |
| Téléphone | Tél. | ✅ |
| Adresse e-mail | E-mail | ✅ |
| Lieu de chargement | Texte | ✅ |
| Lieu de livraison | Texte | ✅ |
| Date souhaitée | Date | — |
| Type de marchandise | Texte | — |
| Poids ou volume | Texte / nombre | — |
| Message | Zone de texte | — |

- **Bouton :** `Envoyer ma demande`
- **Validation** des champs côté client (formats e-mail / téléphone) + **anti-spam**
  (honeypot ou reCAPTCHA).
- **Envoi** : e-mail vers l'adresse de l'entreprise + message de confirmation à l'utilisateur.
- **RGPD** : case de consentement + lien vers la politique de confidentialité.

**Coordonnées à afficher également :**

- **Adresse e-mail** : *(à fournir)*
- **Numéro de téléphone** : *(à fournir)*
- **Carte Google Maps** intégrée (si adresse disponible).

---

## 7. Pied de page & pages légales

**Pied de page (footer)** avec liens de navigation :

`Accueil` · `Nos services` · `Notre flotte` · `FAQ` · `Contact` · `Mentions légales` · `Politique de confidentialité`

+ coordonnées (e-mail, téléphone), éventuellement réseaux sociaux et **numéro d'entreprise (BCE/TVA)**.

**Pages légales à prévoir :**

- **Mentions légales** — raison sociale, numéro d'entreprise (BCE), TVA, adresse, contact, hébergeur.
- **Politique de confidentialité** — conforme **RGPD** (données collectées via le formulaire,
  finalité, durée de conservation, droits des personnes).

---

## 8. Spécifications techniques

| Élément | Choix recommandé |
|---|---|
| **Type** | Site vitrine statique / rendu rapide |
| **Technologies** | HTML5, CSS3, JavaScript — ou framework moderne (Next.js / Astro) |
| **Formulaire** | Envoi e-mail (service type Formspree, ou back-end léger / fonction serverless) |
| **Hébergement** | Hébergement web rapide avec **HTTPS** (certificat SSL) |
| **Nom de domaine** | À réserver (ex. `hbas-transport.be`) |
| **Compatibilité navigateurs** | Chrome, Firefox, Safari, Edge (2 dernières versions) |
| **Analytics** | Suivi d'audience respectueux de la vie privée (ex. Plausible / Matomo / GA4) |

---

## 9. Référencement (SEO)

Le site doit être optimisé pour apparaître sur Google. **Mots-clés cibles :**

`Transport Belgique` · `Transport national` · `Transport international` · `Transport express`
· `Livraison palettes` · `Semi-remorque` · `Porteur 19 tonnes` · `Véhicule utilitaire 20 m³`
· `Société de transport` · `Transporteur Belgique` · `Logistique` · `Livraison point A vers point B`

### Actions SEO on-page

- **Balises `<title>` et `<meta description>`** uniques et optimisées ;
- **Structure Hn** cohérente (un seul `H1` = *HBAS TRANSPORT* / thématique) ;
- **URL propres**, textes riches en mots-clés naturels ;
- **Attributs `alt`** descriptifs sur toutes les images (camions, flotte…) ;
- **Données structurées Schema.org** : `LocalBusiness` / `MovingCompany`,
  `FAQPage`, coordonnées (NAP) ;
- **Sitemap.xml** + **robots.txt** ;
- **Open Graph / Twitter Cards** pour le partage sur les réseaux ;
- **SEO local** : cohérence Nom-Adresse-Téléphone, fiche **Google Business Profile** recommandée ;
- **Performance = SEO** : voir section 10.

---

## 10. Performance, accessibilité & responsive

### Performance

- **Images optimisées** (WebP/AVIF, dimensions adaptées) et **lazy-loading** ;
- **Vidéo hero** compressée + image de repli sur mobile ;
- Minification CSS/JS, mise en cache, CDN ;
- Objectif **Core Web Vitals** : LCP < 2,5 s · CLS < 0,1 · INP < 200 ms.

### Responsive

- **Mobile-first**, adaptation fluide ordinateur / tablette / smartphone ;
- Menu **hamburger** sur mobile, boutons tactiles confortables.

### Accessibilité

- Contrastes suffisants (WCAG AA), navigation clavier, `alt` sur images,
  labels de formulaire explicites.

---

## 11. Contenus à fournir par le client

Pour finaliser le site, HBAS TRANSPORT devra transmettre :

- [ ] **Logo** (format vectoriel de préférence) et charte / couleurs éventuelles ;
- [ ] **Photos des véhicules** (véhicule léger 20 m³, porteur 19 t, semi-remorque 40 t) ;
- [ ] **Photos / vidéos** de camions en mouvement, chargement, livraison ;
- [ ] **Coordonnées** : adresse e-mail, téléphone, adresse (pour Google Maps) ;
- [ ] **Informations légales** : raison sociale, numéro d'entreprise (BCE), TVA, hébergeur ;
- [ ] **Chiffres-clés** éventuels (années d'expérience, nb de livraisons, zones desservies) ;
- [ ] Validation des textes de présentation, services et FAQ.

---

## 12. Livrables

- Site vitrine responsive **conforme au présent cahier des charges** ;
- Code source (HTML/CSS/JS ou projet framework) et documentation de mise à jour ;
- Formulaire de contact fonctionnel (envoi e-mail + anti-spam) ;
- Pages **Mentions légales** et **Politique de confidentialité** ;
- Optimisations SEO (balises, données structurées, sitemap, robots.txt) ;
- Mise en ligne sur l'hébergement + nom de domaine + HTTPS ;
- Guide simple pour **ajouter un nouveau véhicule** à la flotte.

---

## 13. Évolutivité

Le site doit être conçu pour évoluer :

- Ajout de **nouveaux véhicules** dans la section flotte sans refonte ;
- Ajout de **nouveaux services** ;
- Possibilité d'ajouter ultérieurement : blog / actualités, page « À propos »,
  témoignages clients, espace multilingue (FR / NL / EN pour l'international).

---

## 14. Critères de recette (validation)

Le site sera considéré comme conforme si :

- [ ] Toutes les sections décrites (§5 à §7) sont présentes et complètes ;
- [ ] Le design est **clair, lumineux, moderne** et cohérent avec le logo ;
- [ ] Le site est **responsive** et testé sur mobile, tablette et ordinateur ;
- [ ] Le **formulaire** envoie correctement les demandes et gère les erreurs ;
- [ ] Les **animations au défilement** sont fluides et discrètes ;
- [ ] Les **Core Web Vitals** sont au vert (LCP < 2,5 s) ;
- [ ] Les **balises SEO** et données structurées sont en place ;
- [ ] Les **pages légales** (RGPD) sont publiées ;
- [ ] Le site est en **HTTPS** avec un nom de domaine dédié.

---

*Document rédigé pour cadrer la création du site vitrine HBAS TRANSPORT.
La maquette graphique définitive et la palette seront calées sur le logo et les
visuels fournis par le client.*
