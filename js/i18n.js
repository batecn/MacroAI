(function () {
  'use strict';

  var DEFAULT_LANG = 'zh';
  var STORAGE_KEY = 'macroai-lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  var translations = {};

  function fetchTranslations(lang) {
    return fetch('/locales/' + lang + '.json')
      .then(function (r) { if (!r.ok) throw Error(); return r.json(); })
      .catch(function () { return {}; });
  }

  function renderTextNodes() {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n');
      var text = translations[key];
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', text);
        } else {
          el.textContent = text;
        }
      }
    }
  }

  function renderImages() {
    var imgs = document.querySelectorAll('[data-i18n-src]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var key = img.getAttribute('data-i18n-src');
      img.src = 'assets/screenshots/' + currentLang + '/' + key;
    }
  }

  function renderAttributes() {
    var nodes = document.querySelectorAll('[data-i18n-title]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n-title');
      el.title = translations[key] || '';
    }
  }

  function updateToggle() {
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = translations['nav.lang'] || (currentLang === 'zh' ? 'English' : '中文');
  }

  function renderHrefs() {
    var nodes = document.querySelectorAll('[data-i18n-href]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n-href');
      var href = translations[key];
      if (href) el.setAttribute('href', href);
    }
  }

  function apply() {
    renderTextNodes();
    renderImages();
    renderAttributes();
    renderHrefs();
    updateToggle();
    document.documentElement.lang = currentLang;
    document.dispatchEvent(new CustomEvent('i18n-ready', { detail: { lang: currentLang } }));
  }

  function setLang(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    fetchTranslations(lang).then(function (data) { translations = data; apply(); });
  }

  function toggleLang() { setLang(currentLang === 'zh' ? 'en' : 'zh'); }

  function init() {
    fetchTranslations(currentLang).then(function (data) {
      translations = data;
      apply();
      var btn = document.getElementById('lang-toggle');
      if (btn) btn.addEventListener('click', toggleLang);
    });
  }

  window.MacroAI18n = { setLang: setLang, t: function (k) { return translations[k] || k; } };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();