// Página do produto: configurador do iPhone 18 Pro (preços de exemplo)
(() => {
  const WHATSAPP = '5541000000000'; // [número da loja]
  const st = { cond: 'novo', color: 0, storage: 0, plan: 0 };
  const sizes = ['256 GB', '512 GB', '1 TB'];
  const PRICES = { novo: [10499, 11999, 13499], semi: [8990, 10290, 11590] };
  const STOCK = { novo: ['Pronta entrega', 'Pronta entrega', 'Sob encomenda · 2 dias'], semi: ['1 unidade', '1 unidade', 'Indisponível no momento'] };
  // Fatores de parcelamento (mesmas taxas da referência da iZone)
  const PLANS = [
    { label: 'Pix', n: 1, f: 1 },
    { label: '12x', n: 12, f: 1.149 },
    { label: '18x', n: 18, f: 1.239 },
    { label: '24x', n: 24, f: 1.344 }
  ];

  // Galeria com as 4 cores
  $('#shots').innerHTML = IPHONE_18_PRO.map((c, i) => `<img class="hero-img${i === 0 ? ' on' : ''}" src="${c.src}" alt="iPhone 18 Pro ${c.name}">`).join('');
  const shots = $$('#shots img');

  radioGroup($('#conds'), [{ id: 'novo', label: 'Novo lacrado' }, { id: 'semi', label: 'Seminovo' }],
    (c) => `<button class="seg" role="radio" style="height: 42px; border-radius: 11px; font-size: 14px; font-weight: 600">${c.label}</button>`,
    (i) => { st.cond = i ? 'semi' : 'novo'; renderStorages(); update(); });

  radioGroup($('#colors'), IPHONE_18_PRO,
    (c) => `<button class="swatch dark" role="radio" aria-label="${c.name}" style="width: 44px; height: 44px; background: #FFFFFF"><span style="background: ${c.hex}; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15)"></span></button>`,
    (i) => { st.color = i; update(); });

  function renderStorages() {
    radioGroup($('#storages'), sizes,
      (label, i) => `<button class="option" role="radio" style="min-height: 60px; padding: 0 18px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; text-align: left">
        <span style="display: flex; flex-direction: column; gap: 2px"><strong style="font-size: 16px; font-weight: 600">${label}</strong><span style="font-size: 12px; color: #6E6E73">${STOCK[st.cond][i]}</span></span>
        <span style="font-size: 15px; font-weight: 600">${brl(PRICES[st.cond][i])}</span></button>`,
      (i) => { st.storage = i; update(); }, st.storage);
  }
  renderStorages();

  radioGroup($('#plans'), PLANS,
    (p) => `<button class="chip" role="radio" style="height: 44px; border-radius: 12px; font-size: 14px; font-weight: 600">${p.label}</button>`,
    (i) => { st.plan = i; update(); });

  function update() {
    const semi = st.cond === 'semi';
    const color = IPHONE_18_PRO[st.color];
    const price = PRICES[st.cond][st.storage];
    const plan = PLANS[st.plan];
    const total = price * plan.f;
    const value = plan.n === 1 ? brl(price) : `${plan.n}x de ${brl(total / plan.n)}`;

    shots.forEach((img, j) => img.classList.toggle('on', j === st.color));
    $('#stage').style.backgroundColor = color.stage;
    $('#colorName').textContent = color.name;
    $('#boxColor').textContent = color.name;
    $('#badge').textContent = semi ? 'Seminovo · Grade A' : 'Lacrado';
    $('#badge').style.background = semi ? '#FFF1E6' : '#E3F1E9';
    $('#badge').style.color = semi ? '#9A4515' : '#0F5F3A';
    $('#subtitle').textContent = semi ? 'Seminovo com laudo · bateria 98%' : 'Novo, lacrado, com garantia Apple de 1 ano';
    $('#laudo').hidden = !semi;
    $('#warranty').textContent = semi ? 'Garantia da loja de [90 dias]' : 'Garantia Apple de 1 ano';
    $('#planCaption').textContent = plan.n === 1 ? 'À vista no Pix' : `${plan.n}x no cartão`;
    $('#planValue').textContent = value;
    $('#barValue').textContent = value;
    $('#planNote').textContent = plan.n === 1 ? 'Menor preço. Pagamento confirmado na hora.' : `Total de ${brl(total)} no cartão`;
    $('#summary').textContent = `${color.name} · ${sizes[st.storage]}`;

    const msg = `Olá! Quero reservar o iPhone 18 Pro ${semi ? 'seminovo' : 'novo lacrado'} ${color.name} ${sizes[st.storage]} — ${plan.n === 1 ? 'Pix ' + brl(price) : value}.`;
    $('#whats').href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }
  update();

  $('#share').addEventListener('click', async () => {
    if (navigator.share) { try { await navigator.share({ title: 'iPhone 18 Pro — pinhão.', url: location.href }); } catch (e) {} }
  });
})();
