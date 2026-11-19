#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Génère les versions anglaise (`en/`) et néerlandaise (`nl/`) du site à partir
des pages françaises de la racine, qui font autorité.

    python3 tools/build-i18n.py

La correspondance est **insensible aux espaces** : un paragraphe réparti sur
plusieurs lignes dans le HTML est reconnu à partir de son texte sur une ligne
dans les tables de traduction. Les remplacements vont du plus long au plus
court, pour qu'une chaîne courte n'entame jamais une chaîne longue qui la
contient.

En fin de traitement, le script vérifie qu'aucune chaîne source française ne
subsiste dans les fichiers produits, et s'arrête si c'est le cas.
"""

import re
import sys
import pathlib

RACINE = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RACINE / 'tools'))

from strings_home import ACCUEIL          # noqa: E402
from strings_contact import CONTACT       # noqa: E402
from strings_legal import LEGAL           # noqa: E402

BASE = "https://hbastransport.com"

# page source → (nom du fichier en EN, nom du fichier en NL)
PAGES = {
    'index.html':                     ('index.html',          'index.html'),
    'mentions-legales.html':          ('legal-notice.html',   'juridische-vermeldingen.html'),
    'politique-confidentialite.html': ('privacy-policy.html', 'privacybeleid.html'),
}

# URL canonique de chaque page, par langue
CANONIQUES = {
    'index.html':                     {'fr': '/', 'en': '/en/', 'nl': '/nl/'},
    'mentions-legales.html':          {'fr': '/mentions-legales.html',
                                       'en': '/en/legal-notice.html',
                                       'nl': '/nl/juridische-vermeldingen.html'},
    'politique-confidentialite.html': {'fr': '/politique-confidentialite.html',
                                       'en': '/en/privacy-policy.html',
                                       'nl': '/nl/privacybeleid.html'},
}

TABLE = ACCUEIL + CONTACT + LEGAL


def motif(source: str) -> re.Pattern:
    """Reconnaît `source` quels que soient les espaces et retours à la ligne."""
    morceaux = [re.escape(m) for m in source.split()]
    return re.compile(r'\s+'.join(morceaux))


# Du plus long au plus court : évite qu'une chaîne courte entame une longue.
TRIEE = sorted(TABLE, key=lambda e: len(e[0]), reverse=True)
MOTIFS = [(motif(fr), fr, en, nl) for fr, en, nl in TRIEE]


def traduire(html: str, langue: str) -> tuple[str, int]:
    i = 1 if langue == 'en' else 2
    total = 0
    for pat, _fr, en, nl in MOTIFS:
        html, n = pat.subn(lambda _m, v=(en, nl)[i - 1]: v.replace('\\', '\\\\'), html)
        total += n
    return html, total


def rechemin(html: str, langue: str) -> str:
    """Adapte les chemins : les pages traduites vivent dans un sous-dossier."""
    for attr in ('href', 'src', 'srcset', 'content'):
        html = html.replace(f'{attr}="assets/', f'{attr}="../assets/')
    cible_ml  = PAGES['mentions-legales.html'][0 if langue == 'en' else 1]
    cible_pdc = PAGES['politique-confidentialite.html'][0 if langue == 'en' else 1]
    html = html.replace('href="mentions-legales.html"', f'href="{cible_ml}"')
    html = html.replace('href="politique-confidentialite.html"', f'href="{cible_pdc}"')
    # l'URL absolue de l'image de partage ne doit pas être réécrite
    html = html.replace(f'content="{BASE}/../assets/', f'content="{BASE}/assets/')
    return html


def entete(html: str, page: str, langue: str) -> str:
    html = html.replace('<html lang="fr">', f'<html lang="{langue}">', 1)
    # canonique de la langue produite
    html = re.sub(r'<link rel="canonical" href="[^"]+">',
                  f'<link rel="canonical" href="{BASE}{CANONIQUES[page][langue]}">', html, count=1)
    # langue active dans le sélecteur
    html = html.replace(' hreflang="fr" lang="fr" aria-current="true"', ' hreflang="fr" lang="fr"')
    html = html.replace(f' hreflang="{langue}" lang="{langue}"',
                        f' hreflang="{langue}" lang="{langue}" aria-current="true"')
    return html


def verifier(html: str, langue: str) -> list[str]:
    """Signale toute chaîne source française encore présente.

    Les entrées dont la traduction est identique au français (« Distribution »,
    « Contact », « Volume 20 m³ »…) sont ignorées : le motif source matche
    forcément encore, et ce n'est pas une anomalie.
    """
    restants = []
    for pat, fr, en, nl in MOTIFS:
        cible = en if langue == 'en' else nl
        if cible == fr:
            continue
        if pat.search(html):
            restants.append(fr[:70])
    return restants


def main() -> int:
    souci = False
    for langue in ('en', 'nl'):
        dossier = RACINE / langue
        dossier.mkdir(exist_ok=True)
        for page, (nom_en, nom_nl) in PAGES.items():
            src = (RACINE / page).read_text()
            out, n = traduire(src, langue)
            out = rechemin(out, langue)
            out = entete(out, page, langue)
            nom = nom_en if langue == 'en' else nom_nl
            (dossier / nom).write_text(out)

            restants = verifier(out, langue)
            etat = '✓' if not restants else f'✗ {len(restants)} non traduite(s)'
            print(f'  {langue}/{nom:30} {n:4} remplacements   {etat}')
            for r in restants[:6]:
                print(f'       reste : « {r} »')
                souci = True
    print('\n' + ('Des chaînes françaises subsistent — voir ci-dessus.' if souci
                  else 'Aucune chaîne source française ne subsiste dans les fichiers générés.'))
    return 1 if souci else 0


if __name__ == '__main__':
    raise SystemExit(main())
