import { test } from 'node:test'; import assert from 'node:assert/strict'; import { runChecks } from './core.js';
// mini-DOM : suffisant pour les sélecteurs utilisés
function el(tag, attrs = {}, text = '', children = []) { const e = { tagName: tag.toUpperCase(), attrs, textContent: text, children, hasAttribute: (a) => a in attrs, getAttribute: (a) => attrs[a] ?? null, closest: () => null, querySelector: () => null }; children.forEach((c) => (c.parent = e)); return e; }
function doc(nodes, lang) { const all = []; const walk = (n) => { all.push(n); n.children.forEach(walk); }; nodes.forEach(walk);
  const match = (n, sel) => sel.split(',').some((s) => { s = s.trim(); if (s === '[id]') return 'id' in n.attrs; if (s.startsWith('label[for=')) return n.tagName === 'LABEL' && n.attrs.for === s.slice(11, -2); if (s.startsWith('a[href^="#"]')) return n.tagName === 'A' && (n.attrs.href || '').startsWith('#'); if (s === '[role=main]') return n.attrs.role === 'main'; if (s === '[role=button]') return n.attrs.role === 'button'; const base = s.split(':')[0]; return n.tagName === base.toUpperCase() && !(s.includes(':not([type=hidden])') && n.attrs.type === 'hidden'); });
  return { documentElement: { getAttribute: (a) => (a === 'lang' ? lang : null) }, querySelectorAll: (sel) => all.filter((n) => match(n, sel)), querySelector: (sel) => all.find((n) => match(n, sel)) || null }; }
test('page conforme → aucun constat', () => {
  const d = doc([el('h1', {}, 'Titre'), el('main', { id: 'main' }), el('img', { alt: '' }), el('a', { href: '#main' }, 'Aller'), el('label', { for: 'q' }), el('input', { id: 'q' })], 'fr');
  assert.deepEqual(runChecks(d, null), []);
});
test('page défaillante → constats attendus', () => {
  const d = doc([el('h2', {}, 'Sans h1'), el('h4', {}, 'saut'), el('img', {}), el('a', { href: '/x' }, ''), el('input', { id: 'a' }), el('div', { id: 'a' })], '');
  const ids = runChecks(d, null).map((x) => x.id);
  for (const k of ['lang', 'img-alt', 'h1', 'h-skip', 'empty-ctrl', 'label', 'dup-id', 'bypass']) assert.ok(ids.includes(k), k);
});
