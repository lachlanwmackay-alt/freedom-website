// Freedom Church website behaviour
(function () {
  var GIVE_URL = 'https://give.tithe.ly/?formId=726afcbb-5a01-4f6f-bc2b-d625d4ca6867';

  // Opens Tithely's giving pop-up. Falls back to a pop-up window if Tithely's script didn't load.
  function give(e) {
    if (e) e.preventDefault();
    var b = document.getElementById('tithely-trigger');
    // window.__tithelyReady is set when Tithely's give.js finishes loading
    if (b && window.__tithelyReady) { b.click(); return; }
    var w = 480, h = 760;
    var l = Math.max(0, (screen.width - w) / 2), t = Math.max(0, (screen.height - h) / 2);
    var win = window.open(GIVE_URL, 'freedomGive', 'popup=yes,width=' + w + ',height=' + h + ',left=' + l + ',top=' + t);
    if (!win) location.href = GIVE_URL;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href="#give"]');
    if (a) { give(e); return; }

    // Ministries dropdown: tap to open on phones, tap elsewhere to close
    var btn = e.target.closest('.fc-dd > button');
    document.querySelectorAll('.fc-dd.open').forEach(function (d) {
      if (!btn || d !== btn.parentElement) { d.classList.remove('open'); d.querySelector('button').setAttribute('aria-expanded', 'false'); }
    });
    if (btn) {
      var dd = btn.parentElement, open = !dd.classList.contains('open');
      dd.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.fc-dd.open').forEach(function (d) { d.classList.remove('open'); });
  });

  // Link straight to giving: freedomcco.com/#give
  window.addEventListener('load', function () { if (location.hash === '#give') give(); });
})();
