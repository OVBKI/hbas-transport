# Vidéo du bandeau d'accueil

`hero-camion.mp4` est la vidéo de fond de la page d'accueil : muette, en boucle,
lecture automatique.

## Fichier en place

| Caractéristique | Valeur |
|---|---|
| Résolution | 1366 × 768 (16:9) |
| Durée | 5,9 s |
| Poids | 1,1 Mo |
| Codec | H.264 (`avc1`) — lu par tous les navigateurs courants |
| Audio | Aucune piste (indispensable pour la lecture automatique) |

> **Résolution à surveiller.** 1366 px de large suffit sur un portable, mais sur
> un grand écran (1920 px et plus) l'image est agrandie et peut paraître un peu
> molle. Elle est atténuée par le voile sombre, donc peu visible en pratique —
> mais une source en 1920 px donnerait un meilleur résultat.

## Remplacer la vidéo

Déposez le nouveau fichier sous le nom **`hero-camion.mp4`** : aucune modification
de code n'est nécessaire.

### Recommandations

| Critère | Valeur conseillée |
|---|---|
| Format | MP4 (H.264) |
| Résolution | 1920 × 1080 |
| Durée | 8 à 15 s, avec une boucle propre |
| Poids | **< 3 Mo** — c'est le poste le plus lourd de la page |
| Audio | Aucune piste (une piste audio bloque la lecture automatique sur mobile) |

Compression avec `ffmpeg` (`-an` supprime l'audio) :

```bash
ffmpeg -i source.mp4 -an -vf "scale=1920:-2" \
       -c:v libx264 -crf 30 -preset slow -movflags +faststart \
       hero-camion.mp4
```

`-movflags +faststart` place l'index en tête de fichier : la lecture démarre
sans attendre le téléchargement complet.

### Cadrage

La vidéo est recadrée en `object-fit: cover` : selon le format de l'écran, des
bords sont rognés. Si le sujet se retrouve mal centré, ajustez `object-position`
dans `assets/css/styles.css` (règle `.hero__media > *`) — par exemple
`center 35%` pour privilégier le haut de l'image.

## Comportement prévu

L'illustration `../img/hero-poster.svg` est une couche **toujours présente
derrière** la vidéo. Elle s'affiche :

- instantanément, puis pendant le chargement de la vidéo ;
- si le navigateur ne sait pas lire le fichier ;
- si la lecture automatique est refusée ;
- si le visiteur a activé « réduire les animations » dans son système.

Elle n'est pas gérée par l'attribut `poster` de la balise `<video>` : masquer une
vidéo illisible masquerait aussi son affiche.

La lecture est également mise en pause quand l'onglet passe en arrière-plan.

## Lisibilité du texte

Le voile posé sur la vidéo est calibré pour que le texte du bandeau reste
lisible **quelle que soit la luminosité de la vidéo** — la conformité a été
vérifiée sur le cas extrême d'une vidéo entièrement blanche, à 1440, 1024
et 390 px de large.

Si vous éclaircissez le voile, refaites cette vérification.
