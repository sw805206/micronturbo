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

  /* Crossing the breakpoint swaps the panel between an absolute overlay and an
     inline block. An open panel left over from the other layout reads as stuck,
     so both layouts start closed after a resize. */
  function closeDropdowns(root) {
    var open = root.querySelectorAll('.mt-has-dropdown.is-open');
    for (var i = 0; i < open.length; i++) {
      open[i].classList.remove('is-open');
      var link = open[i].querySelector(':scope > a');
      if (link) { link.setAttribute('aria-expanded', 'false'); }
    }
  }

  /* Dropdown. The parent is a real link and stays one: Enter is left alone so
     it navigates to the hub page, because the panel lists only the two SKUs and
     intercepting Enter would leave the hub with no keyboard route. Space and
     Down open instead — both are the conventional disclosure keys.

     Below MOBILE_MAX the panel is inline inside the burger overlay, so there is
     no hover behaviour to add and none is added; the same toggle serves both. */
  function wireDropdowns(root) {
    var parents = root.querySelectorAll('.mt-has-dropdown');

    for (var i = 0; i < parents.length; i++) {
      (function (parent) {
        var link = parent.querySelector(':scope > a');
        var panel = parent.querySelector(':scope > .mt-dd');
        if (!link || !panel) { return; }

        var items = panel.querySelectorAll('a');

        function setOpen(open) {
          parent.classList.toggle('is-open', open);
          link.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        function isOpen() {
          return link.getAttribute('aria-expanded') === 'true';
        }

        function focusItem(index) {
          if (!items.length) { return; }
          var i = (index + items.length) % items.length;
          items[i].focus();
        }

        function indexOfActive() {
          for (var i = 0; i < items.length; i++) {
            if (items[i] === document.activeElement) { return i; }
          }
          return -1;
        }

        link.addEventListener('keydown', function (e) {
          if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();          /* else the page scrolls */
            setOpen(!isOpen());
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
            focusItem(0);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
            focusItem(items.length - 1);
          }
          /* Enter is deliberately not handled — the link navigates. */
        });

        panel.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            focusItem(indexOfActive() + 1);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            focusItem(indexOfActive() - 1);
          } else if (e.key === 'Home') {
            e.preventDefault();
            focusItem(0);
          } else if (e.key === 'End') {
            e.preventDefault();
            focusItem(items.length - 1);
          }
        });

        /* Escape closes and returns focus to the parent, from anywhere inside.
           Bound on the parent so it does not fight the burger's own Escape. */
        parent.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && isOpen()) {
            e.stopPropagation();
            setOpen(false);
            link.focus();
          }
        });

        /* Tab out closes. focusout fires before focus lands, so the check is
           deferred a tick; relatedTarget is null on a click-away in some
           browsers, which the contains() test already covers. */
        parent.addEventListener('focusout', function () {
          window.setTimeout(function () {
            if (!parent.contains(document.activeElement)) { setOpen(false); }
          }, 0);
        });

        /* Pointer: hover opens on the desktop layout only. Below MOBILE_MAX the
           panel is inline and the caret is the control. */
        parent.addEventListener('mouseenter', function () {
          if (window.innerWidth > MOBILE_MAX) { setOpen(true); }
        });

        parent.addEventListener('mouseleave', function () {
          if (window.innerWidth > MOBILE_MAX) { setOpen(false); }
        });

        /* A tap on the caret toggles rather than navigating; a tap on the word
           follows the link. Gives touch users both routes from one control. */
        link.addEventListener('click', function (e) {
          if (e.target.closest('.mt-dd__caret')) {
            e.preventDefault();
            setOpen(!isOpen());
          }
        });
      }(parents[i]));
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

    /* The caret toggles a dropdown in place and must not close the panel it
       just opened; every other link is a navigation and does close it. */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.mt-dd__caret')) { return; }
      if (e.target.closest('a')) { setOpen(false); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > MOBILE_MAX) { setOpen(false); }
      closeDropdowns(root);
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
      wireDropdowns(headerSlot);
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
