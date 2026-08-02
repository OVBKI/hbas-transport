# Vidéos

Déposez ici la vidéo du bandeau principal, nommée **`hero-camion.mp4`**
(camion en mouvement : autoroute, chargement, livraison).

Puis, dans `index.html`, section `.hero__media` :

1. supprimez la balise `<img>` ;
2. décommentez le bloc `<video>`.

## Recommandations

| Critère | Valeur conseillée |
|---|---|
| Format | MP4 (H.264) — ajouter WebM en complément si possible |
| Résolution | 1920 × 1080 |
| Durée | 8 à 15 s, en boucle propre |
| Poids | **< 3 Mo** (essentiel pour le temps de chargement) |
| Audio | Aucune piste audio (la vidéo est muette) |

Exemple de compression avec `ffmpeg` :

```bash
ffmpeg -i source.mp4 -an -vf "scale=1920:-2" -c:v libx264 -crf 30 -preset slow -movflags +faststart hero-camion.mp4
```
