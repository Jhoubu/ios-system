# brag-plan — pinhão. (vitrine digital para revendas Apple)

**Formato:** vertical 1080×1920, 30fps, ~21s · **Tom:** polished (premium, confiante, estilo lançamento Apple, sem piada)
**Público:** donos de revenda de iPhone (loja de bairro, revenda de Instagram, loja de shopping) que hoje vendem por catálogo no WhatsApp.

## Respostas rápidas
- **O que é:** uma loja online com cara de Apple Store, feita para o celular, que fecha a venda no WhatsApp da revenda.
- **Para quem / o que faz:** revendas de iPhone; o cliente configura o aparelho, avalia o usado como entrada e chega no WhatsApp com a mensagem pronta.
- **Diferencial:** seminovo com laudo, simulador de troca e fechamento no WhatsApp — o que importa para quem revende de verdade.
- **Claim mais forte:** "Sua loja merece parecer uma Apple Store." (do próprio README)
- **Gancho visual:** o iPhone 18 Pro real do site trocando de cor sobre preto, com o glow acompanhando.
- **UI real a mostrar:** `produto.html` (cor → 512 GB → 24x, preço muda), `avaliar.html` (modelo/armazenamento/bateria → estimativa), mensagem do WhatsApp gerada pelo próprio código do site.
- **Legenda de compartilhamento:** ver `share-copy.txt`.

## Ângulo
O celular nunca sai da tela: é a jornada do cliente da revenda, do primeiro toque ao WhatsApp, em uma tomada só. As páginas são o site real rodando num iframe dentro de um iPhone; os toques são cliques de verdade nos botões do site.

## Identidade
Geist 800–900, tracking -0.05em; Geist Mono para etiquetas. Preto #050505 → branco/cinza Apple → verde pinheiro #0F3D2E no final. Cobre #C8632B em detalhes (ponto do logo, numeração).

## Storyboard (21,0s)
| # | Tempo | Cena | Texto na tela | Movimento | Som |
|---|---|---|---|---|---|
| 1 | 0,0–3,4 | **Gancho.** Preto. iPhone 18 Pro (asset real) flutuando, troca Bordô → Glacial, glow muda junto. | "Sua revenda de iPhone merece parecer uma **Apple Store.**" | texto sobe em duas linhas; foto escala devagar | pad entra, primeira nota do arpejo |
| 2 | 3,4–6,6 | **Revelação.** Celular sobe do rodapé com a home real (`index.html`); hero trocando de cor; rola até o mosaico. | rótulo mono "01 · VITRINE" + "Sua vitrine, no celular do cliente." | fundo vira #F5F5F7; celular desliza para cima | whoosh suave |
| 3 | 6,6–11,0 | **Configurar.** `produto.html`: toque em Glacial → 512 GB → 24x. Preço atualiza. | "02 · CONFIGURAR" + "Cor, memória e parcela. Preço na hora." | dedo (círculo) toca; tela rola | ticks afinados no tom |
| 4 | 11,0–15,4 | **Avaliar.** `avaliar.html`: toque 256 GB → bateria "85% a 89%" → rola até o cartão preto com a estimativa. | "03 · AVALIAR" + "O usado vira entrada. Na hora." | toque + rolagem | ticks |
| 5 | 15,4–18,4 | **WhatsApp.** Tela de conversa; a mensagem gerada pelo site é "digitada" e enviada. | "04 · FECHAR" + "Chega no seu WhatsApp, pronto." | balão sobe, ✓✓ | "pop" no tom |
| 6 | 18,4–21,0 | **Outro.** Verde pinheiro. Logo-gota + frase final. | "Sua marca. Suas cores. **Seu domínio.**" / "Vitrine digital para revendas de iPhone." | celular sai; texto entra em degraus | acorde final, cauda de reverb |

Transições internas da tela: sai a página antiga (fade p/ branco), entra a nova — nunca dupla exposição.
