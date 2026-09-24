// A11y Express — quick WCAG 2.2 checks, run inside the page (no data is sent). MIT.
export function runChecks(doc, win) {
  const r = [];
  const add = (id, wcag, level, msg, count) => r.push({ id, wcag, level, msg, count });
  const html = doc.documentElement;
  if (!html || !html.getAttribute || !(html.getAttribute('lang') || '').trim()) add('lang', '3.1.1', 'A', 'Missing lang attribute on <html>', 1);
  const imgs = [...doc.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt'));
  if (imgs.length) add('img-alt', '1.1.1', 'A', 'Images without an alt attribute', imgs.length);
  const hs = [...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
  if (!hs.includes(1)) add('h1', '2.4.6', 'AA', 'No <h1>', 1);
  let skips = 0; for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skips++;
  if (skips) add('h-skip', '1.3.1', 'A', 'Skipped heading levels', skips);
  const empty = [...doc.querySelectorAll('a,button')].filter((e) => !(e.textContent || '').trim() && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby') && !e.getAttribute('title') && !e.querySelector('img[alt]'));
  if (empty.length) add('empty-ctrl', '2.4.4 / 4.1.2', 'A', 'Links or buttons without an accessible name', empty.length);
  const ctrls = [...doc.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]),select,textarea')];
  // Label ↔ control association without CSS concatenation: DOM `labels` property when available, otherwise strict comparison of the for attribute.
  const labelsFor = [...doc.querySelectorAll('label[for]')];
  const hasLabel = (c) => { if (c.labels && c.labels.length) return true; const id = c.getAttribute('id'); return !!id && labelsFor.some((l) => l.getAttribute('for') === id); };
  const unlabeled = ctrls.filter((c) => !hasLabel(c) && !c.closest('label') && !c.getAttribute('aria-label') && !c.getAttribute('aria-labelledby'));
  if (unlabeled.length) add('label', '1.3.1 / 3.3.2', 'A', 'Form fields without a label', unlabeled.length);
  const ids = {}; let dup = 0; doc.querySelectorAll('[id]').forEach((e) => { const k = e.getAttribute('id'); if (ids[k]) dup++; ids[k] = 1; });
  if (dup) add('dup-id', '4.1.1', 'A', 'Duplicate ids', dup);
  if (win && win.getComputedStyle) {
    const small = [...doc.querySelectorAll('a,button,input,select,textarea,[role=button]')].filter((e) => { const b = e.getBoundingClientRect ? e.getBoundingClientRect() : null; return b && b.width > 0 && b.height > 0 && (b.width < 24 || b.height < 24); });
    if (small.length) add('target', '2.5.8', 'AA', 'Interactive targets smaller than 24×24 px (check manually: exceptions apply)', small.length);
  }
  if (!doc.querySelector('a[href^="#"]') && !doc.querySelector('main,[role=main]')) add('bypass', '2.4.1', 'A', 'No skip link and no main landmark', 1);
  return r;
}
