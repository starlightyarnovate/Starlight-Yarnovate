/*
 * Starlight Yarnovate landing page behaviour.
 * Populates content from window.SITE_CONTENT (js/site-content.js),
 * handles the mobile navigation menu, and sets the footer year.
 */
(function () {
  'use strict';

  var content = window.SITE_CONTENT || {};

  // A value is "unresolved" if it is empty or is a [bracketed] placeholder.
  function isResolved(value) {
    return typeof value === 'string' && value.trim() !== '' && value.trim().charAt(0) !== '[';
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && isResolved(value)) el.textContent = value;
  }

  function setAttr(id, attr, value) {
    var el = document.getElementById(id);
    if (el && value) el.setAttribute(attr, value);
  }

  function applyContent() {
    var brand = content.brand || {};
    var hero = content.hero || {};
    var intro = content.intro || {};
    var gallery = content.gallery || {};
    var learning = content.learning || {};
    var about = content.about || {};
    var contact = content.contact || {};
    var seo = content.seo || {};

    if (seo.title) document.title = seo.title;
    if (isResolved(seo.description)) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', seo.description);
    }

    // Brand
    if (isResolved(brand.logo)) {
      setAttr('brand-logo', 'src', brand.logo);
      setAttr('brand-logo', 'alt', brand.logoAlt);
      var logoEl = document.getElementById('brand-logo');
      if (logoEl) {
        logoEl.removeAttribute('width');
        logoEl.removeAttribute('height');
      }
    }
    setText('footer-tagline', brand.tagline);

    // Contact details (email, phone, WhatsApp) come from the same config values.
    if (isResolved(brand.email)) {
      setAttr('contact-email', 'href', 'mailto:' + brand.email);
      setText('contact-email-text', brand.email);
      document.querySelectorAll('a[href="mailto:starlightyarnovate@gmail.com"]').forEach(function (a) {
        a.setAttribute('href', 'mailto:' + brand.email);
      });
    }
    if (isResolved(brand.phoneDigits)) {
      setAttr('contact-phone', 'href', 'tel:+' + brand.phoneDigits);
      setAttr('contact-whatsapp', 'href', 'https://wa.me/' + brand.phoneDigits);
      document.querySelectorAll('a[href="tel:+919865323502"]').forEach(function (a) {
        a.setAttribute('href', 'tel:+' + brand.phoneDigits);
      });
    }
    if (isResolved(brand.phoneDisplay)) {
      setText('contact-phone-text', brand.phoneDisplay);
      document.querySelectorAll('.footer-contact a[href^="tel:"]').forEach(function (a) {
        a.textContent = brand.phoneDisplay;
      });
    }

    // Hero
    setText('hero-heading', hero.headline);
    var heroLead = document.querySelector('.hero .lead');
    if (heroLead && isResolved(hero.description)) heroLead.textContent = hero.description;
    var heroCta = document.getElementById('hero-cta');
    if (heroCta) {
      if (isResolved(hero.ctaLabel)) heroCta.textContent = hero.ctaLabel;
      if (isResolved(hero.ctaTarget)) heroCta.setAttribute('href', hero.ctaTarget);
    }
    var heroImg = document.getElementById('hero-image');
    if (heroImg && isResolved(hero.image)) {
      heroImg.setAttribute('src', hero.image);
    }

    // Intro
    setText('intro-heading', intro.heading);
    var introP = document.querySelector('[data-content="intro.description"]');
    if (introP && isResolved(intro.description)) introP.textContent = intro.description;

    // Gallery: hidden when there are no items.
    var items = Array.isArray(gallery.items) ? gallery.items.filter(function (it) {
      return it && isResolved(it.src);
    }) : [];
    var creations = document.getElementById('creations');
    var creationsNav = document.querySelector('a[data-section="creations"]');
    if (items.length > 0 && creations) {
      setText('creations-heading', gallery.heading);
      var galleryDesc = document.querySelector('[data-content="gallery.description"]');
      if (galleryDesc && isResolved(gallery.description)) galleryDesc.textContent = gallery.description;
      renderGallery(items);
      creations.hidden = false;
      if (creationsNav) creationsNav.parentElement.hidden = false;
    } else {
      if (creations) creations.hidden = true;
      if (creationsNav) creationsNav.parentElement.hidden = true;
    }

    // Learning
    setText('learning-heading', learning.heading);
    var learningText = isResolved(learning.description) ? learning.description : learning.fallbackDescription;
    setText('learning-description', learningText);

    // About
    setText('about-heading', about.heading);
    var name = about.instructorName;
    if (isResolved(name)) {
      var nameEl = document.getElementById('instructor-name');
      nameEl.textContent = name;
      nameEl.hidden = false;
    }
    var bio = isResolved(about.instructorBiography) ? about.instructorBiography : about.fallbackBiography;
    setText('instructor-bio', bio);

    // Contact
    setText('contact-heading', contact.heading);
    var contactDesc = document.querySelector('[data-content="contact.description"]');
    if (contactDesc && isResolved(contact.description)) contactDesc.textContent = contact.description;

    // Social links: only rendered when verified links exist.
    var social = Array.isArray(content.socialLinks) ? content.socialLinks.filter(function (s) {
      return s && isResolved(s.url) && isResolved(s.label);
    }) : [];
    var socialList = document.getElementById('social-links');
    if (socialList && social.length > 0) {
      social.forEach(function (s) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = s.label;
        li.appendChild(a);
        socialList.appendChild(li);
      });
      socialList.hidden = false;
    }
  }

  function renderGallery(items) {
    var list = document.getElementById('gallery-list');
    if (!list) return;
    list.innerHTML = '';
    items.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'gallery-item';
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 800;
      img.height = 800;
      li.appendChild(img);
      if (item.caption) {
        var cap = document.createElement('p');
        cap.className = 'gallery-caption';
        cap.textContent = item.caption;
        li.appendChild(cap);
      }
      list.appendChild(li);
    });
  }

  function setupNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.nav-toggle-label').textContent = open ? 'Close' : 'Menu';
      nav.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close the menu after choosing a link, or when Escape is pressed.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    // Reset the menu state when the viewport becomes wide.
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  function setYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  applyContent();
  setupNav();
  setYear();
})();
