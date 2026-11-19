# -*- coding: utf-8 -*-
"""Chaînes traduites — contact, formulaire, pied de page et données structurées."""

CONTACT = [

    # ─────────────── En-tête de section ───────────────
    ("Contact &amp; devis", "Contact &amp; quote", "Contact &amp; offerte"),
    ("Demandez votre devis gratuit.", "Request your free quote.", "Vraag uw gratis offerte aan."),
    ("Décrivez votre transport en quelques champs. Plus votre demande est précise,\n        plus notre réponse est rapide — généralement sous 24 h ouvrées.",
     "Describe your shipment in a few fields. The more precise your request,\n        the faster our answer — usually within 24 business hours.",
     "Beschrijf uw transport in enkele velden. Hoe preciezer uw aanvraag,\n        hoe sneller ons antwoord — doorgaans binnen 24 werkuren."),

    # ─────────────── Formulaire ───────────────
    (">Nom <span", ">Name <span", ">Naam <span"),
    (">Société</label>", ">Company</label>", ">Bedrijf</label>"),
    (">Téléphone <span", ">Phone <span", ">Telefoon <span"),
    (">Adresse e-mail <span", ">Email address <span", ">E-mailadres <span"),
    (">Lieu de chargement <span", ">Loading location <span", ">Laadplaats <span"),
    (">Lieu de livraison <span", ">Delivery location <span", ">Losplaats <span"),
    (">Date souhaitée</label>", ">Preferred date</label>", ">Gewenste datum</label>"),
    (">Type de marchandise</label>", ">Type of goods</label>", ">Soort goederen</label>"),
    (">Poids ou volume</label>", ">Weight or volume</label>", ">Gewicht of volume</label>"),
    (">Message</label>", ">Message</label>", ">Bericht</label>"),
    (">Ne pas remplir</label>", ">Do not fill in</label>", ">Niet invullen</label>"),

    ('placeholder="Ville, code postal, pays"', 'placeholder="City, postcode, country"', 'placeholder="Stad, postcode, land"'),
    ('placeholder="Palettes, colis, matériel…"', 'placeholder="Pallets, parcels, equipment…"', 'placeholder="Pallets, pakketten, materiaal…"'),
    ('placeholder="Ex. : 12 palettes — 8 t — 45 m³"', 'placeholder="E.g. 12 pallets — 8 t — 45 m³"', 'placeholder="Bv. 12 pallets — 8 t — 45 m³"'),
    ('placeholder="Contraintes de chargement, horaires, hayon, marchandise particulière…"',
     'placeholder="Loading constraints, time slots, tail lift, special goods…"',
     'placeholder="Laadvoorwaarden, tijdslots, laadklep, bijzondere goederen…"'),

    ("J’accepte que mes données soient utilisées pour traiter ma demande de devis,\n                conformément à la <a href=\"politique-confidentialite.html\">politique de confidentialité</a>.",
     "I agree that my data may be used to process my quote request, in accordance with\n                the <a href=\"privacy-policy.html\">privacy policy</a>.",
     "Ik ga ermee akkoord dat mijn gegevens worden gebruikt om mijn offerteaanvraag te\n                behandelen, overeenkomstig het <a href=\"privacybeleid.html\">privacybeleid</a>."),

    ("Envoyer ma demande", "Send my request", "Mijn aanvraag versturen"),
    ("Devis gratuit · Sans engagement · Réponse sous 24 h ouvrées",
     "Free quote · No obligation · Reply within 24 business hours",
     "Gratis offerte · Vrijblijvend · Antwoord binnen 24 werkuren"),

    # ─────────────── Coordonnées ───────────────
    ("<dt>E-mail</dt>", "<dt>Email</dt>", "<dt>E-mail</dt>"),
    ("<small>Réponse sous 24 h ouvrées</small>", "<small>Reply within 24 business hours</small>", "<small>Antwoord binnen 24 werkuren</small>"),
    ("<dt>Téléphone</dt>", "<dt>Phone</dt>", "<dt>Telefoon</dt>"),
    ("<small>Du lundi au vendredi</small>", "<small>Monday to Friday</small>", "<small>Van maandag tot vrijdag</small>"),
    ("<small>Second numéro</small>", "<small>Second number</small>", "<small>Tweede nummer</small>"),
    ("<dt>Siège social</dt>", "<dt>Registered office</dt>", "<dt>Maatschappelijke zetel</dt>"),
    ("<small>1190 Forest (Bruxelles) — Belgique</small>", "<small>1190 Forest, Brussels — Belgium</small>", "<small>1190 Vorst (Brussel) — België</small>"),
    ("<dt>Zone d’intervention</dt><dd>Belgique &amp; Europe<small>National et international selon destination</small></dd>",
     "<dt>Service area</dt><dd>Belgium &amp; Europe<small>National and international depending on destination</small></dd>",
     "<dt>Werkgebied</dt><dd>België &amp; Europa<small>Nationaal en internationaal afhankelijk van de bestemming</small></dd>"),

    ("Afficher la carte", "Show the map", "Kaart tonen"),
    ("Le chargement de la carte transmet votre adresse IP à Google.",
     "Loading the map sends your IP address to Google.",
     "Door de kaart te laden wordt uw IP-adres naar Google verzonden."),
    ("1190 Forest (Bruxelles)", "1190 Forest, Brussels", "1190 Vorst (Brussel)"),
    ("Localisation de HBAS TRANSPORT", "HBAS TRANSPORT location", "Locatie van HBAS TRANSPORT"),

    # ─────────────── Appel à l'action final ───────────────
    ("Un transport à organiser&nbsp;?", "A shipment to arrange?", "Een transport te regelen?"),
    ("Dites-nous d’où part la marchandise et où elle doit arriver. Nous nous occupons du reste.",
     "Tell us where the goods start and where they need to arrive. We handle the rest.",
     "Zeg ons waar de goederen vertrekken en waar ze moeten aankomen. Wij doen de rest."),

    # ─────────────── Pied de page ───────────────
    ("Société de transport en Belgique. Transport national et international,\n          livraison express, chargements complets et partiels, transport de palettes\n          et distribution.",
     "Transport company in Belgium. National and international transport,\n          express delivery, full and partial loads, pallet transport and\n          distribution.",
     "Transportbedrijf in België. Nationaal en internationaal transport,\n          expreslevering, volledige en deelladingen, palletvervoer en\n          distributie."),
    ("Société de transport en Belgique. Transport national et international, livraison express, chargements complets et partiels, transport de palettes et distribution.",
     "Transport company in Belgium. National and international transport, express delivery, full and partial loads, pallet transport and distribution.",
     "Transportbedrijf in België. Nationaal en internationaal transport, expreslevering, volledige en deelladingen, palletvervoer en distributie."),

    ("<h3>Navigation</h3>", "<h3>Navigation</h3>", "<h3>Navigatie</h3>"),
    ("<h3>Services</h3>", "<h3>Services</h3>", "<h3>Diensten</h3>"),
    ("<h3>Contact</h3>", "<h3>Contact</h3>", "<h3>Contact</h3>"),
    ("Chargements FTL / LTL", "FTL / LTL loads", "FTL / LTL ladingen"),
    ("Mentions légales", "Legal notice", "Juridische vermeldingen"),
    ("Politique de confidentialité", "Privacy policy", "Privacybeleid"),
    ("HBAS TRANSPORT — Tous droits réservés", "HBAS TRANSPORT — All rights reserved", "HBAS TRANSPORT — Alle rechten voorbehouden"),
    ("Belgique · Transport national &amp; international",
     "Belgium · National &amp; international transport",
     "België · Nationaal &amp; internationaal transport"),

    # ─────────────── Navigation (après les libellés plus longs) ───────────────
    (">Accueil</a>", ">Home</a>", ">Home</a>"),
    (">Fonctionnement</a>", ">How we work</a>", ">Werkwijze</a>"),
    (">Nos services</a>", ">Our services</a>", ">Onze diensten</a>"),
    (">Notre flotte</a>", ">Our fleet</a>", ">Ons wagenpark</a>"),

    # ─────────────── Données structurées ───────────────
    ("Société de transport en Belgique : transport national et international, livraison express, chargements complets (FTL) et partiels (LTL), transport de palettes, livraison directe du point A au point B et distribution vers entrepôts, plateformes logistiques, magasins et entreprises.",
     "Transport company in Belgium: national and international transport, express delivery, full (FTL) and partial (LTL) loads, pallet transport, direct point A to point B delivery and distribution to warehouses, logistics platforms, shops and businesses.",
     "Transportbedrijf in België: nationaal en internationaal transport, expreslevering, volledige (FTL) en deelladingen (LTL), palletvervoer, rechtstreekse levering van punt A naar punt B en distributie naar magazijnen, logistieke platformen, winkels en bedrijven."),
    ('"name": "Services de transport"', '"name": "Transport services"', '"name": "Transportdiensten"'),
    ('"name": "Livraison directe du point A au point B"', '"name": "Direct point A to point B delivery"', '"name": "Rechtstreekse levering van punt A naar punt B"'),
    ('"name": "Distribution vers entrepôts, plateformes logistiques, magasins et entreprises"',
     '"name": "Distribution to warehouses, logistics platforms, shops and businesses"',
     '"name": "Distributie naar magazijnen, logistieke platformen, winkels en bedrijven"'),
    ('"name": "Belgique"', '"name": "Belgium"', '"name": "België"'),
    ('"inLanguage": "fr-BE"', '"inLanguage": "en-BE"', '"inLanguage": "nl-BE"'),

    # Questions / réponses du bloc FAQ structuré (sans entités HTML)
    ('"name": "Livrez-vous partout en Belgique ?"', '"name": "Do you deliver throughout Belgium?"', '"name": "Leveren jullie in heel België?"'),
    ('"name": "Effectuez-vous des transports internationaux ?"', '"name": "Do you handle international transport?"', '"name": "Verzorgen jullie internationaal transport?"'),
    ('"name": "Puis-je demander un devis gratuitement ?"', '"name": "Can I request a quote free of charge?"', '"name": "Kan ik gratis een offerte aanvragen?"'),
    ('"name": "Quels types de marchandises transportez-vous ?"', '"name": "What types of goods do you carry?"', '"name": "Welke soorten goederen vervoeren jullie?"'),
    ('"name": "Comment suivre ma livraison ?"', '"name": "How can I track my delivery?"', '"name": "Hoe kan ik mijn levering volgen?"'),
    ('"name": "Quels sont vos délais ?"', '"name": "What are your lead times?"', '"name": "Wat zijn jullie termijnen?"'),
    ('"text": "Oui. Nous livrons partout en Belgique, en Flandre, en Wallonie et à Bruxelles."',
     '"text": "Yes. We deliver throughout Belgium — Flanders, Wallonia and Brussels."',
     '"text": "Ja. Wij leveren in heel België: Vlaanderen, Wallonië en Brussel."'),
    ('"text": "Oui, selon la destination. Contactez-nous avec le lieu de chargement et de livraison : nous vous confirmons rapidement la faisabilité et le délai."',
     '"text": "Yes, depending on the destination. Send us the loading and delivery locations and we will quickly confirm feasibility and lead time."',
     '"text": "Ja, afhankelijk van de bestemming. Bezorg ons de laad- en losplaats en wij bevestigen snel de haalbaarheid en de termijn."'),
    ('"text": "Oui, le devis est gratuit et sans engagement."',
     '"text": "Yes, the quote is free and without obligation."',
     '"text": "Ja, de offerte is gratis en vrijblijvend."'),
    ('"text": "Palettes, marchandises générales, colis, matériel industriel et autres marchandises autorisées."',
     '"text": "Pallets, general goods, parcels, industrial equipment and other permitted goods."',
     '"text": "Pallets, algemene goederen, pakketten, industrieel materiaal en andere toegelaten goederen."'),
    ('"text": "Nous informons nos clients de l\'avancement du transport, du chargement jusqu\'à la confirmation de livraison."',
     '"text": "We keep our clients informed of progress, from loading through to delivery confirmation."',
     '"text": "Wij houden onze klanten op de hoogte van de voortgang, van de belading tot de leveringsbevestiging."'),
    ('"text": "Ils dépendent de la destination et de l\'urgence de la demande. Pour les besoins urgents, notre service express permet un départ dans les meilleurs délais."',
     '"text": "They depend on the destination and how urgent the request is. For urgent needs, our express service allows departure as soon as possible."',
     '"text": "Die hangen af van de bestemming en de urgentie van de aanvraag. Voor dringende opdrachten laat onze expresdienst een vertrek op de kortst mogelijke termijn toe."'),
]
