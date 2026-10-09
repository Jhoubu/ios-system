// Utilitários compartilhados entre as páginas
const A = 'assets/';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const brl = (n) => 'R$ ' + Math.round(n).toLocaleString('pt-BR');

// Cores do iPhone 18 Pro (fotos oficiais com fundo transparente)
const IPHONE_18_PRO = [
  { name: 'Bordô', hex: '#6E2232', glow: '#8A2638', stage: '#F3E6E8', src: A + '18pro-burgundy.png' },
  { name: 'Glacial', hex: '#AFC3D6', glow: '#6F93B8', stage: '#E8EFF6', src: A + '18pro-glacier.png' },
  { name: 'Prateado', hex: '#E4E4E2', glow: '#8E9096', stage: '#F2F2F4', src: A + '18pro-silver.png' },
  { name: 'Preto', hex: '#2B2C2F', glow: '#3C4048', stage: '#E9E9EC', src: A + '18pro-black.png' }
];

// Grupo de botões com seleção única (role="radio")
function radioGroup(container, items, render, onPick, selected = 0) {
  container.innerHTML = items.map((it, i) => render(it, i)).join('');
  const buttons = $$('[role="radio"]', container);
  const set = (i) => buttons.forEach((b, j) => b.setAttribute('aria-checked', String(i === j)));
  buttons.forEach((b, i) => b.addEventListener('click', () => { set(i); onPick(i); }));
  set(selected);
  return set;
}

// Revelar ao rolar: usa CSS scroll-timeline quando existe; senão, IntersectionObserver
if (!(window.CSS && CSS.supports && CSS.supports('animation-timeline: view()')) && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('io');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  window.addEventListener('DOMContentLoaded', () => $$('.reveal').forEach((el) => io.observe(el)));
}
