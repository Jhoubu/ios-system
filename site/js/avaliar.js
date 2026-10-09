// Avaliação do usado (valores de referência de exemplo)
(() => {
  const WHATSAPP = '5541000000000'; // [número da loja]
  const NEW_PRICE = 10499; // iPhone 18 Pro 256 GB no Pix
  const st = { model: 4, storage: 0, bat: 0, cond: 0 };
  const MODELS = [
    ['iPhone 17 Pro Max', 7200], ['iPhone 17 Pro', 6400], ['iPhone 17', 4300],
    ['iPhone 16 Pro Max', 5200], ['iPhone 16 Pro', 4500], ['iPhone 16', 3300],
    ['iPhone 15 Pro Max', 4100], ['iPhone 15 Pro', 3500], ['iPhone 15', 2600]
  ];
  const STORAGES = [['128 GB', 1], ['256 GB', 1.08], ['512 GB', 1.16]];
  const BATS = [['90% ou mais', 1], ['85% a 89%', 0.95], ['80% a 84%', 0.9], ['Abaixo de 80%', 0.8]];
  const CONDS = [
    ['Impecável', 'Sem riscos visíveis na tela ou na traseira', 1],
    ['Marcas leves de uso', 'Riscos finos ou pequenas marcas nas bordas', 0.9],
    ['Tela ou traseira trincada', 'Funciona, mas tem vidro quebrado', 0.65]
  ];
  const round50 = (n) => 'R$ ' + (Math.round(n / 50) * 50).toLocaleString('pt-BR');
  const chip = (h) => (it) => `<button class="chip" role="radio" style="min-height: ${h}px; padding: 6px 8px; border-radius: 14px; font-size: 14px; font-weight: 500; line-height: 1.2">${it[0]}</button>`;

  radioGroup($('#models'), MODELS, chip(52), (i) => { st.model = i; update(); }, st.model);
  radioGroup($('#storages'), STORAGES, chip(48), (i) => { st.storage = i; update(); });
  radioGroup($('#bats'), BATS, chip(48), (i) => { st.bat = i; update(); });
  radioGroup($('#conds'), CONDS,
    (c) => `<button class="option" role="radio" style="min-height: 60px; padding: 10px 16px; border-radius: 16px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 2px; text-align: left">
      <strong style="font-size: 15px; font-weight: 600">${c[0]}</strong><span style="font-size: 13px; color: #6E6E73">${c[1]}</span></button>`,
    (i) => { st.cond = i; update(); });

  function update() {
    const v = MODELS[st.model][1] * STORAGES[st.storage][1] * BATS[st.bat][1] * CONDS[st.cond][2];
    const low = v * 0.93;
    const high = v * 1.03;
    const summary = `${MODELS[st.model][0]} ${STORAGES[st.storage][0]}`;
    $('#summary').textContent = summary;
    $('#range').textContent = `${round50(low)} – ${round50(high)}`;
    $('#rest').textContent = round50(NEW_PRICE - high);
    const msg = `Olá! Quero agendar a avaliação do meu ${summary}, bateria ${BATS[st.bat][0]}, estado: ${CONDS[st.cond][0]}. Estimativa do site: ${round50(low)} – ${round50(high)}.`;
    $('#whats').href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }
  update();
})();
