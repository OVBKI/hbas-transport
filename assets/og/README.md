# Image de partage (Open Graph)

`template.html` est la **source** de `../img/og-image.png` (1200 × 630) — l'aperçu
affiché quand le site est partagé sur les réseaux, dans une messagerie ou sur Slack.

## Pourquoi un PNG et non un SVG

Facebook, LinkedIn, WhatsApp et Slack **ignorent les images SVG** : un aperçu en SVG
ne s'affiche pas du tout. Le PNG est donc obligatoire ici.

## Pourquoi un gabarit HTML et non un SVG à coordonnées fixes

La première version plaçait le texte à des coordonnées calculées. Avec la vraie
police Archivo — plus large que le substitut utilisé pour les calculs — le titre
débordait et passait sous l'illustration : on lisait « HBAS TRANSP ».

En HTML, le texte se dimensionne seul : le problème ne peut plus se produire.

## Régénérer l'image

Après toute modification du gabarit (ou de la charte) :

```bash
# 1. servir le site localement
python3 -m http.server 8000

# 2. capturer le gabarit (nécessite Playwright)
npx playwright screenshot \
  --viewport-size=1200,630 \
  --wait-for-timeout=600 \
  http://localhost:8000/assets/og/template.html \
  assets/img/og-image.png
```

Vérifiez ensuite que rien n'est tronqué — en particulier le titre et les
étiquettes, qui s'allongent si vous changez le texte ou la police.

## Contraintes à respecter

| Critère | Valeur |
|---|---|
| Dimensions | **1200 × 630** (ratio 1,91:1) |
| Poids | < 1 Mo (limite technique : 8 Mo) |
| Texte | Gros et contrasté — l'aperçu est souvent affiché en petit |
| Marge de sécurité | Évitez le texte à moins de 40 px des bords |

Les dimensions sont déclarées dans `index.html` (`og:image:width` / `og:image:height`)
pour que l'aperçu s'affiche sans attendre le téléchargement complet de l'image.
Pensez à les mettre à jour si vous changez le format.
