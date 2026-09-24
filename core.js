// A11y Express — vérifications rapides WCAG 2.2, exécutées dans la page (aucune donnée envoyée). MIT.
export function runChecks(doc, win) {
  const r = [];
  const add = (id, wcag, level, msg, count) => r.push({ id, wcag, level, msg, count });
  const html = doc.documentElement;
  if (!html || !html.getAttribute || !(html.getAttribute('lang') || '').trim()) add('lang', '3.1.1', 'A', 'Attribut lang absent sur <html>', 1);
  const imgs = [...doc.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt'));
  if (imgs.length) add('img-alt', '1.1.1', 'A', 'Images sans attribut alt', imgs.length);
  const hs = [...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
  if (!hs.includes(1)) add('h1', '2.4.6', 'AA', 'Aucun <h1>', 1);
  let skips = 0; for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skips++;
  if (skips) add('h-skip', '1.3.1', 'A', 'Sauts de niveau de titre', skips);
  const empty = [...doc.querySelectorAll('a,button')].filter((e) => !(e.textContent || '').trim() && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby') && !e.getAttribute('title') && !e.querySelector('img[alt]'));
  if (empty.length) add('empty-ctrl', '2.4.4 / 4.1.2', 'A', 'Liens ou boutons sans nom accessible', empty.length);
  const ctrls = [...doc.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]),select,textarea')];
  const unlabeled = ctrls.filter((c) => { const id = c.getAttribute('id'); return !(id && doc.querySelector(`label[for="${id}"]`)) && !c.closest('label') && !c.getAttribute('aria-label') && !c.getAttribute('aria-labelledby'); });
  if (unlabeled.length) add('label', '1.3.1 / 3.3.2', 'A', 'Champs de formulaire sans étiquette', unlabeled.length);
  const ids = {}; let dup = 0; doc.querySelectorAll('[id]').forEach((e) => { const k = e.getAttribute('id'); if (ids[k]) dup++; ids[k] = 1; });
  if (dup) add('dup-id', '4.1.1', 'A', 'Identifiants dupliqués', dup);
  if (win && win.getComputedStyle) {
    const small = [...doc.querySelectorAll('a,button,input,select,textarea,[role=button]')].filter((e) => { const b = e.getBoundingClientRect ? e.getBoundingClientRect() : null; return b && b.width > 0 && b.height > 0 && (b.width < 24 || b.height < 24); });
    if (small.length) add('target', '2.5.8', 'AA', 'Cibles interactives < 24×24 px (à vérifier : exceptions possibles)', small.length);
  }
  if (!doc.querySelector('a[href^="#"]') && !doc.querySelector('main,[role=main]')) add('bypass', '2.4.1', 'A', 'Ni lien d\'évitement ni région main', 1);
  return r;
}
