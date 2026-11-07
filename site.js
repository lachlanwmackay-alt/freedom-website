// Freedom Church website behaviour
(function () {
  var GIVE_URL = 'https://give.tithe.ly/?formId=726afcbb-5a01-4f6f-bc2b-d625d4ca6867';

  /* ---------- Giving pop-up (Tithely form inside a slide-out panel) ---------- */
  var css = '' +
    '#fc-give{position:fixed;inset:0;z-index:1000;display:flex;justify-content:flex-end;visibility:hidden;pointer-events:none}' +
    '#fc-give.open{visibility:visible;pointer-events:auto}' +
    '#fc-give .fc-give-bg{position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;margin:0;cursor:pointer;background:rgba(45,42,40,.55);opacity:0;transition:opacity .3s ease}' +
    '#fc-give.open .fc-give-bg{opacity:1}' +
    '#fc-give .fc-give-panel{position:relative;width:100%;max-width:640px;height:100%;height:100dvh;overflow:hidden;background:#F3F2EE;color:#3D3937;box-shadow:-20px 0 60px rgba(45,42,40,.25);padding:16px clamp(14px,3vw,28px) 16px;box-sizing:border-box;display:flex;flex-direction:column;gap:12px;transform:translateX(100%);transition:transform .4s cubic-bezier(.2,.7,.2,1);font-family:"DM Sans",system-ui,sans-serif}' +
    '#fc-give.open .fc-give-panel{transform:none}' +
    '#fc-give .fc-give-top{display:flex;justify-content:space-between;align-items:center;gap:16px}' +
    '#fc-give .fc-give-top p{margin:0;font-size:14px;font-weight:700;letter-spacing:.22em;text-transform:uppercase}' +
    '#fc-give .fc-give-x{width:44px;height:44px;border:0;background:transparent;color:#3D3937;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;border-radius:50%}' +
    '#fc-give .fc-give-x:hover{background:#E4E1DC}' +
    '#fc-give h2{margin:0;font-family:Anton,Impact,sans-serif;font-weight:400;font-size:clamp(34px,4.4vw,48px);line-height:.95;text-transform:uppercase}' +
    '#fc-give h2 span{font-family:"Instrument Serif",Georgia,serif;font-style:italic;text-transform:none;color:#4C5A3D}' +
    '#fc-give .fc-give-lead{margin:0;font-size:16px;line-height:1.5}' +
    '#fc-give .fc-give-frame{position:relative;flex:1 1 auto;min-height:0;border:1px solid rgba(61,57,55,.18);border-radius:16px;overflow:hidden;background:#fff}' +
    '#fc-give .fc-give-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff;opacity:0;transition:opacity .25s ease}' +
    '#fc-give .fc-give-frame.loaded iframe{opacity:1}' +
    '#fc-give .fc-give-frame.loaded .fc-give-loading{display:none}' +
    '#fc-give .fc-give-loading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:#5E5753}' +
    '#fc-give .fc-give-foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 16px;font-size:14px;line-height:1.5}' +
    '#fc-give .fc-give-foot p{margin:0}' +
    '#fc-give .fc-give-foot a{color:#3D3937}' +
    '@media (max-height:700px){#fc-give .fc-give-lead{display:none}}' +
    
    'body.fc-give-lock{overflow:hidden}';

  var drawer, frame, lastFocus;

  function build() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    drawer = document.createElement('div');
    drawer.id = 'fc-give';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML =
      '<button class="fc-give-bg" type="button" tabindex="-1" aria-label="Close giving"></button>' +
      '<div class="fc-give-panel" role="dialog" aria-modal="true" aria-labelledby="fc-give-title">' +
        '<div class="fc-give-top"><p>Freedom Christian Co</p>' +
          '<button class="fc-give-x" type="button" aria-label="Close giving">' +
            '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          '</button></div>' +
        '<h2 id="fc-give-title">Give with <span>purpose.</span></h2>' +
        '<p class="fc-give-lead">Thank you for supporting the life and ministry of Freedom. Choose your preferred fund below, including Tithes &amp; Offerings.</p>' +
        '<div class="fc-give-frame"><span class="fc-give-loading">Loading secure giving…</span>' +
          '<iframe title="Give to Freedom Church with Tithely" allow="payment *"></iframe></div>' +
        '<div class="fc-give-foot"><p><a href="' + GIVE_URL + '" target="_blank" rel="noopener">Open Tithe.ly in a new window ↗</a></p>' +
        '<p><strong>Bank transfer:</strong> Freedom Christian Co · BSB 034-130 · Acc 295121</p></div>' +
      '</div>';
    document.body.appendChild(drawer);
    frame = drawer.querySelector('iframe');
    frame.addEventListener('load', function () {
      if (frame.getAttribute('src')) frame.parentNode.classList.add('loaded');
    });
    drawer.querySelector('.fc-give-bg').addEventListener('click', close);
    drawer.querySelector('.fc-give-x').addEventListener('click', close);
  }

  function open(e) {
    if (e) e.preventDefault();
    if (!drawer) build();
    if (!frame.getAttribute('src')) frame.setAttribute('src', GIVE_URL);
    lastFocus = document.activeElement;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('fc-give-lock');
    setTimeout(function () { drawer.querySelector('.fc-give-x').focus(); }, 60);
  }

  function close() {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('fc-give-lock');
    if (location.hash === '#give') { try { history.replaceState(null, '', location.pathname + location.search); } catch (err) {} }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- Clicks ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href="#give"], a[href$="/#give"]');
    if (a) { open(e); return; }

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
    if (drawer && drawer.classList.contains('open')) { close(); return; }
    document.querySelectorAll('.fc-dd.open').forEach(function (d) { d.classList.remove('open'); });
  });

  // Link straight to giving: freedomcco.com/#give
  if (location.hash === '#give') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { open(); });
    else open();
  }
})();
