/* partials.js — fetches the header and footer fragments and injects them.
   Loaded by every page with <script src="partials.js" defer></script>.

   Which partials file to fetch is derived from the page's own filename, never
   configured per page: a page ending -zh.html fetches partials-zh.html, every
   other page fetches partials.html. See SCOPE.md section 3.

   The page supplies <div id="mt-header"></div> and <div id="mt-footer"></div>.
   A page missing them gets no header or footer and no error. */

(function () {
  'use strict';

  var MOBILE_MAX = 768;

  function currentFile() {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1);
    return file === '' ? 'index.html' : file;
  }

  function partialsFor(file) {
    return /-zh\.html$/.test(file) ? 'partials-zh.html' : 'partials.html';
  }

  function markActive(root, file) {
    var links = root.querySelectorAll('.mt-nav__list a');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('href') === file) {
        links[i].classList.add('is-current');
        links[i].setAttribute('aria-current', 'page');
      }
    }
  }

  function wireBurger(root) {
    var burger = root.querySelector('.mt-burger');
    var nav = root.querySelector('.mt-nav');
    if (!burger || !nav) { return; }

    function setOpen(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('mt-nav-open', open);
    }

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        burger.focus();
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setOpen(false); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > MOBILE_MAX) { setOpen(false); }
    });
  }

  function fillYear(root) {
    var slot = root.querySelector('[data-mt-year]');
    if (slot) { slot.textContent = String(new Date().getFullYear()); }
  }

  function inject(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var headerTpl = doc.getElementById('mt-header-tpl');
    var footerTpl = doc.getElementById('mt-footer-tpl');
    var headerSlot = document.getElementById('mt-header');
    var footerSlot = document.getElementById('mt-footer');

    if (headerSlot && headerTpl) {
      headerSlot.appendChild(document.importNode(headerTpl.content, true));
      markActive(headerSlot, currentFile());
      wireBurger(headerSlot);
    }
    if (footerSlot && footerTpl) {
      footerSlot.appendChild(document.importNode(footerTpl.content, true));
      fillYear(footerSlot);
    }
  }

  /* cache: 'no-cache' revalidates; it does not disable caching. The partials
     are a separate request from the page that displays them, so their cache
     entries expire independently — a stale copy injects an old header into a
     current page, and the mismatch is invisible from the server, where both
     files are correct. GitHub Pages serves them with max-age=600, so that
     window is ten minutes wide after every nav change. The server sends an
     ETag, so an unchanged file costs one conditional request and a 304 with
     no body. */
  fetch(partialsFor(currentFile()), { cache: 'no-cache' })
    .then(function (r) {
      if (!r.ok) { throw new Error('partials ' + r.status); }
      return r.text();
    })
    .then(inject)
    .catch(function (err) {
      console.error('[partials] ' + err.message);
    });

})();
