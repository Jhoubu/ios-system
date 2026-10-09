// Página inicial
(() => {
  // Faixa de vantagens (duplicada para o loop contínuo)
  const ticker = ['Desconto no Pix', 'Parcele em até 24x', 'Retire hoje no Batel', 'Seminovos com laudo', 'Seu usado vale como entrada', 'Nota fiscal em todas as vendas', 'Configuração grátis do aparelho novo', 'Assistência técnica com garantia'];
  $('#ticker').innerHTML = ticker.concat(ticker).map((t) => `<span class="tick">${t}<i></i></span>`).join('');

  // Destaque: iPhone 18 Pro trocando de cor sozinho
  let hero = 0;
  let paused = false;
  const heroImgs = $('#heroImgs');
  heroImgs.innerHTML = IPHONE_18_PRO.map((c, i) => `<img class="hero-img${i === 0 ? ' on' : ''}" src="${c.src}" alt="iPhone 18 Pro ${c.name}"${i ? ' loading="lazy"' : ''}>`).join('');
  const imgs = $$('img', heroImgs);
  const setDot = radioGroup(
    $('#heroDots'),
    IPHONE_18_PRO,
    (c) => `<button class="swatch" role="radio" aria-label="${c.name}"><span style="background:${c.hex}"></span></button>`,
    (i) => { paused = true; show(i); }
  );
  function show(i) {
    hero = i;
    imgs.forEach((img, j) => img.classList.toggle('on', j === i));
    setDot(i);
    $('#heroName').textContent = IPHONE_18_PRO[i].name;
    $('#heroGlow').style.backgroundColor = IPHONE_18_PRO[i].glow;
  }
  setInterval(() => { if (!paused && !document.hidden) show((hero + 1) % IPHONE_18_PRO.length); }, 3800);

  // Categorias
  const cats = [
    ['iPhone', 'nav-iphone.png', 'loja.html?cat=iphone'], ['Mac', 'nav-mac.png', 'loja.html?cat=mac'], ['iPad', 'nav-ipad.png', 'loja.html?cat=ipad'],
    ['Apple Watch', 'nav-watch.png', 'loja.html?cat=watch'], ['AirPods', 'nav-airpods.png', 'loja.html?cat=airpods'], ['AirTag', 'nav-airtags.png', 'loja.html?cat=acessorios'],
    ['Acessórios', 'nav-accessories.png', 'loja.html?cat=acessorios'], ['Seminovos', '17-lavender.png', 'loja.html?cond=semi']
  ];
  $('#cats').innerHTML = cats.map(([label, img, href]) => `
    <a href="${href}" class="lift" style="flex: 1 0 116px; display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 8px 16px; border-radius: 22px; background: #F5F5F7; color: #111111; text-decoration: none; font-size: 14px; font-weight: 500">
      <img src="${A + img}" alt="" style="width: 104px; height: 68px; object-fit: contain">
      <span>${label}</span>
    </a>`).join('');

  // Lançamentos (preços de exemplo)
  const latest = [
    { tag: 'NOVO', name: 'iPhone 18 Pro', desc: 'Bordô, Glacial, Prateado e Preto.', price: 10499, img: '18pro-burgundy.png', href: 'produto.html' },
    { tag: 'NOVO', name: 'iPhone Duo', desc: 'O iPhone que abre e vira tela grande.', price: 15999, img: 'duo.png' },
    { tag: 'NOVO', name: 'Apple Watch Ultra 4', desc: 'Para quem vai mais longe.', price: 8999, img: 'watch-ultra.png' },
    { tag: 'FINO DE VERDADE', name: 'iPhone Air', desc: 'O iPhone mais fino até hoje.', price: 8499, img: 'air-skyblue.png' },
    { tag: 'MAIS VENDIDO', name: 'iPhone 17', desc: 'Cinco cores. Uma escolha fácil.', price: 6299, img: '17-sage.png' },
    { tag: 'NOVO', name: 'AirPods Pro 3', desc: 'Cancelamento de ruído ativo.', price: 2299, img: 'appro3.png' },
    { tag: 'PRA COMEÇAR', name: 'iPhone 17e', desc: 'O essencial do iPhone.', price: 4999, img: '17e-pink.png' }
  ];
  $('#latest').innerHTML = latest.map((p) => `
    <article class="lift zoom" style="flex: 0 0 min(300px, 78vw); background: #FFFFFF; border-radius: 26px; padding: 26px 24px 24px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.04)">
      <span style="font-size: 12px; font-weight: 700; color: #B4531F; letter-spacing: 0.02em">${p.tag}</span>
      <div style="height: 250px; display: flex; align-items: center; justify-content: center; overflow: hidden">
        <img src="${A + p.img}" alt="${p.name}" loading="lazy" style="max-width: 100%; max-height: 250px; height: auto">
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px">
        <h3 style="margin: 0; font-size: 21px; font-weight: 700; letter-spacing: -0.02em">${p.name}</h3>
        <p style="margin: 0; font-size: 14px; color: #6E6E73; line-height: 1.4">${p.desc}</p>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; gap: 10px">
        <span style="display: flex; flex-direction: column"><span style="font-size: 12px; color: #6E6E73">a partir de</span><strong style="font-size: 18px">${brl(p.price)}</strong></span>
        <a href="${p.href || '#'}" style="height: 40px; padding: 0 18px; border-radius: 999px; background: #0F3D2E; color: #FFFFFF; font-size: 14px; font-weight: 600; text-decoration: none; display: flex; align-items: center">Comprar</a>
      </div>
    </article>`).join('');
  const rail = $('#latest');
  $('#prev').addEventListener('click', () => rail.scrollBy({ left: -rail.clientWidth * 0.8 }));
  $('#next').addEventListener('click', () => rail.scrollBy({ left: rail.clientWidth * 0.8 }));

  // Guias e novidades
  const posts = [
    { kind: 'COMPARATIVO', read: '6 min', title: 'iPhone 18 Pro ou 17 Pro: vale a troca agora?', bg: '#F3E6E8', img: '18pro-burgundy.png', blend: 'normal' },
    { kind: 'GUIA', read: '4 min', title: 'Como ler a saúde da bateria antes de comprar um seminovo', bg: '#E9F7EF', img: '17-sage.png', blend: 'normal' },
    { kind: 'ESCOLHA CERTA', read: '5 min', title: 'Apple Watch Series 12 ou Ultra 4: qual combina com você', bg: '#F5F5F7', img: 'watch-s12.png', blend: 'normal' }
  ];
  $('#posts').innerHTML = posts.map((g) => `
    <a href="#" class="lift zoom reveal" style="display: flex; flex-direction: column; border-radius: 24px; overflow: hidden; background: #FFFFFF; border: 1px solid #ECECEF; color: #111111; text-decoration: none">
      <div style="height: 240px; background: ${g.bg}; display: flex; align-items: center; justify-content: center; overflow: hidden">
        <img src="${A + g.img}" alt="" loading="lazy" style="max-width: 78%; max-height: 210px; height: auto">
      </div>
      <div style="padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 10px; flex: 1">
        <span style="font-family: 'Geist Mono', ui-monospace, monospace; font-size: 12px; color: #6E6E73">${g.kind} · ${g.read}</span>
        <strong style="font-size: 21px; line-height: 1.2; letter-spacing: -0.025em">${g.title}</strong>
        <span style="margin-top: auto; padding-top: 4px; font-size: 15px; font-weight: 600; color: #0F3D2E">Ler guia ›</span>
      </div>
    </a>`).join('');
  // Os cards gerados por JS também entram na animação de revelar
  if (document.documentElement.classList.contains('io')) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    $$('#posts .reveal').forEach((el) => io.observe(el));
  }

  // Instagram (faixa contínua)
  const insta = [
    ['#F3E6E8', '18pro-burgundy.png', 'normal'], ['#FFD60A', 'apmax-purple.png', 'normal'], ['#E9E1FF', '17-lavender.png', 'normal'],
    ['#FFFFFF', 'watch-s12.png', 'normal'], ['#0F3D2E', '18pro-silver.png', 'normal'], ['#F5F5F7', 'ipadair.png', 'normal'],
    ['#FBE3D6', '17e-pink.png', 'normal'], ['#111111', 'apmax-orange.png', 'normal']
  ];
  $('#insta').innerHTML = insta.concat(insta).map(([bg, img, blend]) => `
    <div class="zoom" style="width: clamp(150px, 18vw, 240px); height: clamp(150px, 18vw, 240px); margin-right: 12px; border-radius: 22px; background: ${bg}; border: 1px solid #F0F0F2; display: grid; place-items: center; overflow: hidden; flex: 0 0 auto">
      <img src="${A + img}" alt="" loading="lazy" style="max-width: 78%; max-height: 78%; height: auto; mix-blend-mode: ${blend}">
    </div>`).join('');

  // Newsletter (demonstração)
  $('#news').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.innerHTML = '<strong style="font-size: 18px">Pronto! Você vai receber as novidades.</strong>';
  });
})();
