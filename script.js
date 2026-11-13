(function () {
  var SCREENS = window.SCREENS || {};
  var root = document.documentElement;
  var lang = 'en';

  // ----- App screens ---------------------------------------------------
  // Each .phone names a mock in screens.js; an optional data-screen-si is
  // shown instead when the page is in Sinhala.
  function paint(phone) {
    var key = (lang === 'si' && phone.dataset.screenSi) || phone.dataset.screen;
    if (phone.dataset.painted === key) return;
    phone.innerHTML = SCREENS[key] || '';
    phone.dataset.painted = key;
  }
  function paintAll() {
    document.querySelectorAll('.phone[data-screen]').forEach(paint);
  }

  // ----- Language ------------------------------------------------------
  // English lives in the markup; Sinhala in data-si on the same element.
  var translatable = Array.prototype.slice.call(document.querySelectorAll('[data-si]'));
  translatable.forEach(function (el) { el.dataset.en = el.innerHTML; });

  function setLang(next, remember) {
    lang = next === 'si' ? 'si' : 'en';
    root.lang = lang;
    translatable.forEach(function (el) {
      el.innerHTML = lang === 'si' ? el.dataset.si : el.dataset.en;
    });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    paintAll();
    if (remember) {
      try { localStorage.setItem('lang', lang); } catch (e) { /* private mode */ }
    }
  }

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang, true); });
  });

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* private mode */ }
  var fromUrl = new URLSearchParams(location.search).get('lang');
  var browserSi = (navigator.language || '').toLowerCase().indexOf('si') === 0;
  setLang(fromUrl || saved || (browserSi ? 'si' : 'en'), false);

  // ----- Business type tabs --------------------------------------------
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-type]'));
  var typePhone = document.getElementById('type-phone');

  function selectType(type) {
    tabs.forEach(function (t) {
      var on = t.dataset.type === type;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    document.querySelectorAll('[data-panel]').forEach(function (p) {
      p.hidden = p.dataset.panel !== type;
    });
    typePhone.dataset.screen = type;
    if (type === 'grocery') typePhone.dataset.screenSi = 'grocerySi';
    else delete typePhone.dataset.screenSi;
    paint(typePhone);
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectType(t.dataset.type); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      selectType(next.dataset.type);
    });
  });
  selectType('grocery');
})();
