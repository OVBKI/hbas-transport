/* =====================================================================
   HBAS TRANSPORT — Scripts du site
   Aucune dépendance externe. Chargé en `defer`.
   ===================================================================== */
(function () {
  'use strict';

  /* -------------------------------------------------------------
     CONFIGURATION — à personnaliser avant la mise en ligne
     ------------------------------------------------------------- */
  var CONFIG = {
    // URL du service qui reçoit le formulaire (Formspree, Web3Forms,
    // fonction serverless…). Laisser vide pour utiliser le repli e-mail.
    // Exemple : 'https://formspree.io/f/xxxxxxxx'
    formEndpoint: '',

    // Adresse de réception (utilisée par le repli e-mail).
    contactEmail: 'service@hbastransport.com'
  };

  /* -------------------------------------------------------------
     Textes de l'interface, selon la langue de la page
     La langue est lue sur <html lang="…"> : le script est commun aux trois
     versions du site, il n'y a qu'un fichier à maintenir.
     ------------------------------------------------------------- */
  var LANGUE = (document.documentElement.lang || 'fr').slice(0, 2);

  var I18N = {
    fr: {
      champs: { nom: 'Nom', societe: 'Société', telephone: 'Téléphone', email: 'E-mail',
                chargement: 'Lieu de chargement', livraison: 'Lieu de livraison',
                date: 'Date souhaitée', marchandise: 'Type de marchandise',
                poids: 'Poids ou volume', message: 'Message' },
      requis:     'Ce champ est obligatoire.',
      emailKo:    'Adresse e-mail invalide.',
      telKo:      'Numéro de téléphone invalide.',
      consentKo:  'Votre accord est nécessaire pour traiter la demande.',
      corriger:   'Merci de corriger les champs signalés avant l’envoi.',
      envoi:      'Envoi en cours…',
      okTitre:    'Demande envoyée.',
      okTexte:    ' Merci ! Nous revenons vers vous rapidement avec votre devis gratuit.',
      koTitre:    'L’envoi a échoué.',
      koTexte:    ' Merci de réessayer ou de nous contacter par téléphone ou e-mail.',
      mailTitre:  'Votre messagerie s’ouvre',
      mailTexte:  ' avec la demande pré-remplie. Il ne reste qu’à l’envoyer. Vous pouvez aussi nous appeler directement.',
      objet:      'Demande de devis — ',
      signature:  '\n\n— Envoyé depuis le site hbastransport.com',
      carte:      'Localisation de HBAS TRANSPORT'
    },
    en: {
      champs: { nom: 'Name', societe: 'Company', telephone: 'Phone', email: 'Email',
                chargement: 'Loading location', livraison: 'Delivery location',
                date: 'Preferred date', marchandise: 'Type of goods',
                poids: 'Weight or volume', message: 'Message' },
      requis:     'This field is required.',
      emailKo:    'Invalid email address.',
      telKo:      'Invalid phone number.',
      consentKo:  'Your agreement is needed to process the request.',
      corriger:   'Please correct the highlighted fields before sending.',
      envoi:      'Sending…',
      okTitre:    'Request sent.',
      okTexte:    ' Thank you! We will get back to you shortly with your free quote.',
      koTitre:    'Sending failed.',
      koTexte:    ' Please try again, or contact us by phone or email.',
      mailTitre:  'Your email app is opening',
      mailTexte:  ' with the request pre-filled. All that is left is to send it. You can also call us directly.',
      objet:      'Quote request — ',
      signature:  '\n\n— Sent from hbastransport.com',
      carte:      'HBAS TRANSPORT location'
    },
    nl: {
      champs: { nom: 'Naam', societe: 'Bedrijf', telephone: 'Telefoon', email: 'E-mail',
                chargement: 'Laadplaats', livraison: 'Losplaats',
                date: 'Gewenste datum', marchandise: 'Soort goederen',
                poids: 'Gewicht of volume', message: 'Bericht' },
      requis:     'Dit veld is verplicht.',
      emailKo:    'Ongeldig e-mailadres.',
      telKo:      'Ongeldig telefoonnummer.',
      consentKo:  'Uw akkoord is nodig om de aanvraag te behandelen.',
      corriger:   'Gelieve de aangeduide velden te corrigeren voor u verzendt.',
      envoi:      'Bezig met verzenden…',
      okTitre:    'Aanvraag verzonden.',
      okTexte:    ' Bedankt! Wij komen snel bij u terug met uw gratis offerte.',
      koTitre:    'Verzenden mislukt.',
      koTexte:    ' Probeer het opnieuw of neem contact op per telefoon of e-mail.',
      mailTitre:  'Uw e-mailprogramma opent',
      mailTexte:  ' met de vooraf ingevulde aanvraag. U hoeft ze alleen nog te verzenden. U kunt ons ook rechtstreeks bellen.',
      objet:      'Offerteaanvraag — ',
      signature:  '\n\n— Verzonden via hbastransport.com',
      carte:      'Locatie van HBAS TRANSPORT'
    }
  };

  var T = I18N[LANGUE] || I18N.fr;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* -------------------------------------------------------------
     1. En-tête collant
     ------------------------------------------------------------- */
  var header = $('.site-header');
  var toTop  = $('.to-top');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-stuck', y > 24);
    if (toTop)  toTop.classList.toggle('is-on', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* -------------------------------------------------------------
     1 bis. Vidéo de fond du bandeau
     Trois cas à couvrir : le visiteur refuse les animations, le
     navigateur ne sait pas lire le fichier, ou la lecture automatique
     est bloquée. Dans tous les cas l'affiche (`poster`) prend le relais.
     ------------------------------------------------------------- */
  var heroVideo = $('.hero__video');

  if (heroVideo) {
    if (reduceMotion) {
      // Le script est chargé en `defer` : on intervient avant la lecture.
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
      heroVideo.removeAttribute('loop');
    } else {
      heroVideo.addEventListener('error', function () {
        heroVideo.setAttribute('data-failed', 'true');
      });
      // `error` sur <video> ne se déclenche pas pour une source illisible :
      // c'est l'élément <source> qui échoue.
      var src = $('source', heroVideo);
      if (src) src.addEventListener('error', function () {
        heroVideo.setAttribute('data-failed', 'true');
      });

      // Certains navigateurs refusent la lecture automatique : on réessaie,
      // et à défaut on garde l'affiche plutôt qu'une image figée aléatoire.
      var attempt = heroVideo.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(function () { heroVideo.removeAttribute('autoplay'); });
      }

      // Inutile de décoder la vidéo quand l'onglet est en arrière-plan.
      document.addEventListener('visibilitychange', function () {
        if (heroVideo.getAttribute('data-failed')) return;
        if (document.hidden) heroVideo.pause();
        else { var r = heroVideo.play(); if (r && r.catch) r.catch(function () {}); }
      });
    }
  }

  /* -------------------------------------------------------------
     1 ter. Carte : chargement au clic
     L'iframe Google n'est injectée qu'à la demande du visiteur. Chargée
     d'emblée, elle déposerait des cookies Google avant tout consentement
     et imposerait une bannière.
     ------------------------------------------------------------- */
  var mapBtn = $('#map-load');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var carte = mapBtn.closest('.map');
      var frame = document.createElement('iframe');
      frame.src = mapBtn.getAttribute('data-src');
      frame.title = T.carte;
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.setAttribute('allowfullscreen', '');
      carte.innerHTML = '';
      carte.appendChild(frame);
    });
  }

  /* -------------------------------------------------------------
     2. Navigation mobile
     ------------------------------------------------------------- */
  var navToggle = $('.nav-toggle');
  var nav       = $('#nav');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.setAttribute('data-open', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('data-open', String(!open));
      navToggle.setAttribute('aria-expanded', String(!open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 940) closeNav();
    });
  }

  /* -------------------------------------------------------------
     3. Révélation au défilement
     ------------------------------------------------------------- */
  // Le bandeau d'accueil s'anime en CSS dès le chargement (voir styles.css) :
  // on ne l'observe pas, sinon son contenu resterait masqué jusqu'au premier
  // passage de l'observateur.
  var revealables = $$('[data-reveal]').filter(function (el) { return !el.closest('.hero'); });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    // Décalage en cascade pour les enfants d'un même groupe
    $$('[data-stagger]').forEach(function (group) {
      $$('[data-reveal]', group).forEach(function (el, i) {
        el.style.setProperty('--d', Math.min(i, 9));
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------------
     4. Lien de navigation actif (scrollspy)
     ------------------------------------------------------------- */
  var spyLinks = $$('.nav__link[data-spy]');
  var sections = spyLinks
    .map(function (l) { return document.getElementById(l.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        spyLinks.forEach(function (l) {
          l.setAttribute('aria-current', String(l.getAttribute('href') === '#' + entry.target.id));
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* -------------------------------------------------------------
     5. FAQ — une seule réponse ouverte à la fois
     ------------------------------------------------------------- */
  var faqItems = $$('.faq details');
  faqItems.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      faqItems.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* -------------------------------------------------------------
     6. Formulaire de demande de devis
     ------------------------------------------------------------- */
  var form = $('#devis-form');
  if (!form) return;

  var statusBox = $('#form-status');
  var submitBtn = $('#form-submit');

  var LABELS = T.champs;

  function fieldOf(input) { return input.closest('.field'); }

  function setError(input, msg) {
    var f = fieldOf(input);
    if (!f) return;
    f.classList.add('is-invalid');
    var e = $('.err', f);
    if (e) e.textContent = msg;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input) {
    var f = fieldOf(input);
    if (!f) return;
    f.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
  }

  function validateField(input) {
    var v = (input.value || '').trim();

    if (input.required && !v) {
      setError(input, T.requis);
      return false;
    }
    if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) {
      setError(input, T.emailKo);
      return false;
    }
    if (input.type === 'tel' && v && !/^[+0-9][0-9\s().\/-]{6,}$/.test(v)) {
      setError(input, T.telKo);
      return false;
    }
    if (input.type === 'checkbox' && input.required && !input.checked) {
      setError(input, T.consentKo);
      return false;
    }
    clearError(input);
    return true;
  }

  var controls = $$('input, textarea, select', form).filter(function (el) {
    return el.type !== 'hidden' && el.type !== 'submit' && !el.closest('.hp');
  });

  controls.forEach(function (el) {
    el.addEventListener('blur', function () { if (el.value || el.required) validateField(el); });
    el.addEventListener('input', function () { if (fieldOf(el) && fieldOf(el).classList.contains('is-invalid')) validateField(el); });
    el.addEventListener('change', function () { if (el.type === 'checkbox') validateField(el); });
  });

  function showStatus(state, html) {
    if (!statusBox) return;
    statusBox.setAttribute('data-state', state);
    statusBox.innerHTML = html;
    statusBox.setAttribute('role', state === 'err' ? 'alert' : 'status');
  }

  var ICON_OK  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  var ICON_ERR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg>';

  function buildSummary(data) {
    var lines = [];
    Object.keys(LABELS).forEach(function (k) {
      if (data[k]) lines.push(LABELS[k] + ' : ' + data[k]);
    });
    return lines.join('\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Anti-spam : le pot de miel doit rester vide.
    var honey = $('.hp input', form);
    if (honey && honey.value) return;

    var ok = true;
    controls.forEach(function (el) { if (!validateField(el)) ok = false; });

    if (!ok) {
      showStatus('err', ICON_ERR + '<span>' + T.corriger + '</span>');
      var firstBad = $('.field.is-invalid input, .field.is-invalid textarea, .field.is-invalid select', form);
      if (firstBad) { firstBad.focus(); firstBad.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }); }
      return;
    }

    var fd = new FormData(form);
    var data = {};
    fd.forEach(function (v, k) { if (k !== 'website') data[k] = typeof v === 'string' ? v.trim() : v; });

    // --- Repli e-mail si aucun service n'est configuré ---------------
    if (!CONFIG.formEndpoint) {
      var subject = T.objet + (data.nom || '') + (data.societe ? ' (' + data.societe + ')' : '');
      var body = buildSummary(data) + T.signature;
      window.location.href = 'mailto:' + CONFIG.contactEmail +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      showStatus('ok', ICON_OK + '<span><strong>' + T.mailTitre + '</strong>' + T.mailTexte + '</span>');
      return;
    }

    // --- Envoi au service configuré ---------------------------------
    submitBtn.disabled = true;
    var initial = submitBtn.textContent;
    submitBtn.textContent = T.envoi;

    fetch(CONFIG.formEndpoint, {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        controls.forEach(clearError);
        showStatus('ok', ICON_OK + '<span><strong>' + T.okTitre + '</strong>' + T.okTexte + '</span>');
      })
      .catch(function () {
        showStatus('err', ICON_ERR + '<span><strong>' + T.koTitre + '</strong>' + T.koTexte + '</span>');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = initial;
      });
  });

  /* -------------------------------------------------------------
     7. Année courante dans le pied de page
     ------------------------------------------------------------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
