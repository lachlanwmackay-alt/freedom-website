// Freedom Church website behaviour
(function () {
  var GIVE_URL = 'https://give.tithe.ly/?formId=726afcbb-5a01-4f6f-bc2b-d625d4ca6867';

  /* ---------- Giving ----------
     Give buttons are Tithely's own buttons (class "tithely-give-button"), so Tithely's
     give.js opens its giving pop-up. If give.js can't load, open Tithely in a window. */
  function fallbackGive(e) {
    if (e) e.preventDefault();
    var w = 480, h = 760;
    var l = Math.max(0, (screen.width - w) / 2), t = Math.max(0, (screen.height - h) / 2);
    var win = window.open(GIVE_URL, 'freedomGive', 'popup=yes,width=' + w + ',height=' + h + ',left=' + l + ',top=' + t);
    if (!win) location.href = GIVE_URL;
  }

  /* ---------- Clicks ---------- */
  document.addEventListener('click', function (e) {
    var g = e.target.closest('.tithely-give-button');
    if (g) { if (!window.__tithelyReady) fallbackGive(e); return; }

    // Ministries dropdown: tap to open on phones, tap elsewhere to close
    var btn = e.target.closest('.fc-dd > button');
    document.querySelectorAll('.fc-dd.open').forEach(function (d) {
      if (!btn || d !== btn.parentElement) { d.classList.remove('open'); d.querySelector('button').setAttribute('aria-expanded', 'false'); }
    });
    if (btn) {
      var dd = btn.parentElement, isOpen = !dd.classList.contains('open');
      dd.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.fc-dd.open').forEach(function (d) { d.classList.remove('open'); });
  });

  // Link straight to giving: freedomcco.com/#give
  window.addEventListener('load', function () {
    if (location.hash !== '#give') return;
    var g = document.querySelector('.tithely-give-button');
    if (window.__tithelyReady && g) setTimeout(function () { g.click(); }, 300);
    else fallbackGive();
  });
})();
