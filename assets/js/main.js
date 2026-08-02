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
    contactEmail: 'contact@hbas-transport.be'
  };

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
  var revealables = $$('[data-reveal]');

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

  var LABELS = {
    nom: 'Nom', societe: 'Société', telephone: 'Téléphone', email: 'E-mail',
    chargement: 'Lieu de chargement', livraison: 'Lieu de livraison',
    date: 'Date souhaitée', marchandise: 'Type de marchandise',
    poids: 'Poids ou volume', message: 'Message'
  };

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
      setError(input, 'Ce champ est obligatoire.');
      return false;
    }
    if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) {
      setError(input, 'Adresse e-mail invalide.');
      return false;
    }
    if (input.type === 'tel' && v && !/^[+0-9][0-9\s().\/-]{6,}$/.test(v)) {
      setError(input, 'Numéro de téléphone invalide.');
      return false;
    }
    if (input.type === 'checkbox' && input.required && !input.checked) {
      setError(input, 'Votre accord est nécessaire pour traiter la demande.');
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
      showStatus('err', ICON_ERR + '<span>Merci de corriger les champs signalés avant l’envoi.</span>');
      var firstBad = $('.field.is-invalid input, .field.is-invalid textarea, .field.is-invalid select', form);
      if (firstBad) { firstBad.focus(); firstBad.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }); }
      return;
    }

    var fd = new FormData(form);
    var data = {};
    fd.forEach(function (v, k) { if (k !== 'website') data[k] = typeof v === 'string' ? v.trim() : v; });

    // --- Repli e-mail si aucun service n'est configuré ---------------
    if (!CONFIG.formEndpoint) {
      var subject = 'Demande de devis — ' + (data.nom || '') + (data.societe ? ' (' + data.societe + ')' : '');
      var body = buildSummary(data) + '\n\n— Envoyé depuis le site hbas-transport';
      window.location.href = 'mailto:' + CONFIG.contactEmail +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      showStatus('ok', ICON_OK + '<span><strong>Votre messagerie s’ouvre</strong> avec la demande pré-remplie. Il ne reste qu’à l’envoyer. Vous pouvez aussi nous appeler directement.</span>');
      return;
    }

    // --- Envoi au service configuré ---------------------------------
    submitBtn.disabled = true;
    var initial = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours…';

    fetch(CONFIG.formEndpoint, {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        controls.forEach(clearError);
        showStatus('ok', ICON_OK + '<span><strong>Demande envoyée.</strong> Merci ! Nous revenons vers vous rapidement avec votre devis gratuit.</span>');
      })
      .catch(function () {
        showStatus('err', ICON_ERR + '<span><strong>L’envoi a échoué.</strong> Merci de réessayer ou de nous contacter par téléphone ou e-mail.</span>');
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
