// Página de categorias: produtos fictícios só para exemplificar
(() => {
  const CATS = [
    { id: 'todos', label: 'Todos' },
    { id: 'iphone', label: 'iPhone', img: 'nav-iphone.png' },
    { id: 'mac', label: 'Mac', img: 'nav-mac.png' },
    { id: 'ipad', label: 'iPad', img: 'nav-ipad.png' },
    { id: 'watch', label: 'Apple Watch', img: 'nav-watch.png' },
    { id: 'airpods', label: 'AirPods', img: 'nav-airpods.png' },
    { id: 'acessorios', label: 'Acessórios', img: 'nav-accessories.png' }
  ];
  const TITLES = {
    todos: ['Loja.', 'Tudo o que tem na vitrine.'],
    iphone: ['iPhone.', 'Novos lacrados e seminovos com laudo.'],
    mac: ['Mac.', 'Para trabalhar, estudar e criar.'],
    ipad: ['iPad.', 'Leve na mochila, forte no dia a dia.'],
    watch: ['Apple Watch.', 'Saúde e treino no pulso.'],
    airpods: ['AirPods.', 'Som que acompanha você.'],
    acessorios: ['Acessórios.', 'Capas, carregadores e AirTag.']
  };

  // [cat, nome, detalhe, preço no Pix, imagem, condição]
  const P = [
    ['iphone', 'iPhone 18 Pro 256 GB', 'Bordô', 10499, '18pro-burgundy.png', 'novo'],
    ['iphone', 'iPhone 18 Pro 256 GB', 'Glacial', 10499, '18pro-glacier.png', 'novo'],
    ['iphone', 'iPhone 18 Pro 512 GB', 'Prateado', 11999, '18pro-silver.png', 'novo'],
    ['iphone', 'iPhone 18 Pro 1 TB', 'Preto', 13499, '18pro-black.png', 'novo'],
    ['iphone', 'iPhone Duo 512 GB', 'Preto', 15999, 'duo.png', 'novo'],
    ['iphone', 'iPhone Air 256 GB', 'Azul-céu', 8499, 'air-skyblue.png', 'novo'],
    ['iphone', 'iPhone 17 256 GB', 'Lavanda', 6299, '17-lavender.png', 'novo'],
    ['iphone', 'iPhone 17 256 GB', 'Sálvia', 6299, '17-sage.png', 'novo'],
    ['iphone', 'iPhone 17e 128 GB', 'Rosa', 4999, '17e-pink.png', 'novo'],
    ['iphone', 'iPhone 18 Pro 256 GB', 'Prateado · bateria 100%', 8990, '18pro-silver.png', 'semi'],
    ['iphone', 'iPhone 17 Pro 256 GB', 'Preto · bateria 96%', 6990, '18pro-black.png', 'semi'],
    ['iphone', 'iPhone 17 128 GB', 'Sálvia · bateria 94%', 4590, '17-sage.png', 'semi'],
    ['iphone', 'iPhone 16 Pro 128 GB', 'Glacial · bateria 89%', 4290, '18pro-glacier.png', 'semi'],
    ['iphone', 'iPhone 16 128 GB', 'Rosa · bateria 91%', 3390, '17e-pink.png', 'semi'],
    ['mac', 'MacBook Air M5 13"', 'Azul-céu · 16 GB · 512 GB', 9999, 'mba.png', 'novo'],
    ['mac', 'MacBook Air M5 13"', 'Estelar · 16 GB · 256 GB', 8499, 'mba.png', 'novo'],
    ['mac', 'MacBook Air M5 15"', 'Meia-noite · 24 GB · 512 GB', 11999, 'mba.png', 'novo'],
    ['mac', 'MacBook Pro M5 14"', 'Preto-espacial · 24 GB · 1 TB', 17999, 'mbp.png', 'novo'],
    ['mac', 'MacBook Pro M5 Pro 16"', 'Prateado · 48 GB · 1 TB', 26999, 'mbp.png', 'novo'],
    ['mac', 'MacBook Air M3 13"', 'Meia-noite · 8 GB · 256 GB', 5490, 'mba.png', 'semi'],
    ['ipad', 'iPad Air M4 11"', 'Roxo · 128 GB · Wi-Fi', 5999, 'ipadair.png', 'novo'],
    ['ipad', 'iPad Air M4 13"', 'Azul · 256 GB · Wi-Fi', 8299, 'ipadair.png', 'novo'],
    ['ipad', 'iPad Air M4 11"', 'Estelar · 256 GB · 5G', 7899, 'ipadair.png', 'novo'],
    ['ipad', 'iPad Air M2 11"', 'Cinza · 128 GB · Wi-Fi', 3790, 'ipadair.png', 'semi'],
    ['watch', 'Apple Watch Series 12 46 mm', 'Alumínio · pulseira esportiva', 4299, 'watch-s12.png', 'novo'],
    ['watch', 'Apple Watch Series 12 42 mm', 'Alumínio · pulseira loop', 3999, 'watch-s12.png', 'novo'],
    ['watch', 'Apple Watch Ultra 4', 'Titânio natural · pulseira trail', 8999, 'watch-ultra.png', 'novo'],
    ['watch', 'Apple Watch Ultra 4', 'Titânio preto · pulseira oceano', 8999, 'watch-ultra.png', 'novo'],
    ['watch', 'Apple Watch Ultra 2', 'Titânio · bateria 92%', 4890, 'watch-ultra.png', 'semi'],
    ['airpods', 'AirPods Pro 3', 'Estojo USB-C com MagSafe', 2299, 'appro3.png', 'novo'],
    ['airpods', 'AirPods Max', 'Laranja', 4999, 'apmax-orange.png', 'novo'],
    ['airpods', 'AirPods Max', 'Roxo', 4999, 'apmax-purple.png', 'novo'],
    ['airpods', 'AirPods Max', 'Roxo · com caixa', 3290, 'apmax-purple.png', 'semi'],
    ['acessorios', 'AirTag', 'Pacote com 1', 299, 'nav-airtags.png', 'novo'],
    ['acessorios', 'AirTag', 'Pacote com 4', 999, 'nav-airtags.png', 'novo'],
    ['acessorios', 'Capa com MagSafe', 'iPhone 18 Pro', 449, 'nav-accessories.png', 'novo'],
    ['acessorios', 'Carregador USB-C 35 W', 'Duas portas', 499, 'nav-accessories.png', 'novo']
  ].map(([cat, name, detail, price, img, cond]) => ({ cat, name, detail, price, img, cond }));

  const params = new URLSearchParams(location.search);
  const st = {
    cat: CATS.some((c) => c.id === params.get('cat')) ? params.get('cat') : 'todos',
    cond: ['novo', 'semi'].includes(params.get('cond')) ? params.get('cond') : 'todos',
    q: '',
    sort: 'relevancia'
  };

  const count = (cat, cond = 'todos') => P.filter((p) => (cat === 'todos' || p.cat === cat) && (cond === 'todos' || p.cond === cond)).length;

  // Lateral (desktop): categorias com contagem e subníveis Novos/Seminovos
  function renderSide() {
    $('#side').innerHTML = CATS.map((c) => {
      const on = st.cat === c.id;
      const subs = c.id === 'todos' ? '' : ['novo', 'semi'].filter((k) => count(c.id, k)).map((k) => `
        <a href="?cat=${c.id}&cond=${k}" data-cat="${c.id}" data-cond="${k}" class="side-sub${on && st.cond === k ? ' on' : ''}">${k === 'novo' ? 'Novos' : 'Seminovos'} <span>(${count(c.id, k)})</span></a>`).join('');
      return `<a href="?cat=${c.id}" data-cat="${c.id}" data-cond="todos" class="side-link${on && st.cond === 'todos' ? ' on' : ''}">${c.label} <span>(${count(c.id)})</span></a>${on ? subs : ''}`;
    }).join('');
  }

  // Chips (celular): categorias em trilho horizontal
  function renderChips() {
    $('#chips').innerHTML = CATS.map((c) => `
      <a href="?cat=${c.id}" data-cat="${c.id}" data-cond="todos" class="chip" aria-checked="${st.cat === c.id}" style="flex: 0 0 auto; height: 40px; padding: 0 16px; border-radius: 999px; display: flex; align-items: center; font-size: 14px; font-weight: 500; text-decoration: none">${c.label}</a>`).join('');
  }

  function renderGrid() {
    const q = st.q.trim().toLowerCase();
    let list = P.filter((p) => (st.cat === 'todos' || p.cat === st.cat) && (st.cond === 'todos' || p.cond === st.cond)
      && (!q || (p.name + ' ' + p.detail).toLowerCase().includes(q)));
    if (st.sort === 'menor') list = [...list].sort((a, b) => a.price - b.price);
    if (st.sort === 'maior') list = [...list].sort((a, b) => b.price - a.price);

    const [t, s] = TITLES[st.cat];
    $('#title').innerHTML = `${t} <span style="color: #8E8E93">${st.cond === 'semi' ? 'Seminovos com laudo e garantia.' : st.cond === 'novo' ? 'Lacrados, com nota fiscal.' : s}</span>`;
    $('#crumb').textContent = st.cat === 'todos' ? 'Loja' : `Loja › ${CATS.find((c) => c.id === st.cat).label}`;
    $('#result').textContent = list.length === 1 ? 'Mostrando 1 produto' : `Mostrando ${list.length} produtos`;

    $('#grid').innerHTML = list.length ? list.map((p) => `
      <a href="produto.html" class="card lift zoom">
        <span class="badge ${p.cond}">${p.cond === 'semi' ? 'Seminovo' : 'Novo'}</span>
        <div class="card-img"><img src="${A + p.img}" alt="${p.name}" loading="lazy"></div>
        <div style="display: flex; flex-direction: column; gap: 3px">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.3">${p.name}</h3>
          <span style="font-size: 13px; color: #6E6E73">${p.detail}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px; margin-top: auto">
          <strong style="font-size: 18px; letter-spacing: -0.02em">${brl(p.price)} <span style="font-size: 12px; font-weight: 500; color: #1F8A4C">no Pix</span></strong>
          <span style="font-size: 12px; color: #6E6E73">ou 12x de ${brl(p.price * 1.149 / 12)}</span>
        </div>
      </a>`).join('') : `
      <div style="grid-column: 1 / -1; padding: 64px 20px; text-align: center; color: #6E6E73; display: flex; flex-direction: column; gap: 8px; align-items: center">
        <strong style="font-size: 20px; color: #111111">Nenhum produto encontrado.</strong>
        <span>Tente outra busca ou fale com a gente no WhatsApp.</span>
      </div>`;
  }

  function renderAll() { renderSide(); renderChips(); renderGrid(); syncCond(); }

  // Filtro Novos / Seminovos
  const setCond = radioGroup($('#cond'), [['todos', 'Todos'], ['novo', 'Novos'], ['semi', 'Seminovos']],
    (it) => `<button class="seg" role="radio" style="height: 36px; padding: 0 14px; border-radius: 999px; font-size: 14px; font-weight: 500">${it[1]}</button>`,
    (i) => { st.cond = ['todos', 'novo', 'semi'][i]; push(); renderSide(); renderGrid(); },
    ['todos', 'novo', 'semi'].indexOf(st.cond));
  function syncCond() { setCond(['todos', 'novo', 'semi'].indexOf(st.cond)); }

  function push() {
    const u = new URLSearchParams();
    if (st.cat !== 'todos') u.set('cat', st.cat);
    if (st.cond !== 'todos') u.set('cond', st.cond);
    history.replaceState(null, '', u.toString() ? '?' + u : location.pathname);
  }

  // Cliques nas categorias sem recarregar a página
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-cat]');
    if (!a) return;
    e.preventDefault();
    st.cat = a.dataset.cat;
    st.cond = a.dataset.cond;
    push();
    renderAll();
  });

  $('#q').addEventListener('input', (e) => { st.q = e.target.value; renderGrid(); });
  $('#sort').addEventListener('change', (e) => { st.sort = e.target.value; renderGrid(); });

  renderAll();
})();
