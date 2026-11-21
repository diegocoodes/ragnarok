# Fontes e direção visual

Pesquisa e revisão: 21/11/2026.

## Conteúdo

- Guia indicado no briefing: https://roo-global.gitbook.io/guide/game-wiki/valkyrie-feather
- Publicação do mesmo autor no site oficial: https://roglobal.com/guideline/91
- API pública que entrega essa publicação: https://roglobal.com/api/news/91?channel=guideline
- Autor creditado pela fonte: GingerCH#9437, Official Discord Tavern.

As tabelas de ATK, DEF e MIX foram conferidas nas capturas originais e no texto do GitBook. Os conjuntos de 2, 3, 4 e 5 peças também foram conferidos. A fonte escreve “MPATK” em uma linha de Hawk-owl's Eye; o modelo mantém o atributo combinado ATQF/ATQM coerente com a tabela e os demais conjuntos. Não inferimos bônus defensivos ou fórmulas não documentadas.

## Arquivos de imagem

| Arquivo local | Origem e uso |
| --- | --- |
| `prontera.webp`, `prontera-mobile.webp` | Arte promocional oficial de Prontera, fundo principal: https://ro-cdn-sea-cf.roglobal.com/ro-official-sea/prd/resource/2023-03/VVHxrFIDnB_2.jpg |
| `midgard.webp` | Arte promocional oficial de Midgard/castelo, guia: https://ro-cdn-sea-cf.roglobal.com/ro-official-sea/prd/resource/2023-03/dPqeuVjTCn_6.jpg |
| `valkyrie-statue.webp` | PNG com transparência no guia GitBook (upload `5zLMQcsJecqHpmf0am4b`), mesma estátua mostrada na imagem oficial: https://ro-cdn-sea-cf.roglobal.com/ro-official-sea/prd/resource/2023-05/YbsSaAMMtJ_20230515-162701.png |
| `atk-gold.webp` | Recorte do ícone ATK dourado da imagem oficial: https://ro-cdn-sea-cf.roglobal.com/ro-official-sea/prd/resource/2023-05/QMnnMIizAf_20230515-163541.png |
| Demais ícones `atk-*`, `def-*`, `mix-*` | Recortes de ícones da captura oficial de inventário/desmontagem: https://ro-cdn-sea-cf.roglobal.com/ro-official-sea/prd/resource/2023-05/NZXrAcwwsR_20230515-163922.png |

Os ícones representam a categoria, não uma arte individual de cada nome. DEF/MIX dourados reutilizam recortes da categoria porque não há recorte individual confirmado na referência: a raridade verdadeira é indicada por texto e moldura. O acabamento e as estrelas são elementos gráficos do site, não um sistema adicional de raridade do jogo. Não foram geradas artes fictícias. Os cortes e a conversão são feitos em `scripts/assets.mjs`; os originais de pesquisa não são necessários para executar ou compilar o site.

## Tipografia

Foram consultados o logotipo e os materiais no site https://roglobal.com/. A folha CSS oficial consultada (`/assets/imgs/index-XKfKQnP_.css`) usa uma pilha de fontes de sistema para a interface; não foi identificada uma fonte temática oficial redistribuível para o logotipo.

Cinzel foi escolhida como interpretação dos títulos ornamentais e Nunito Sans para os dados, mantendo acentos portugueses. São alternativas, não as fontes oficiais do jogo.

- Cinzel: https://fonts.google.com/specimen/Cinzel
- Nunito Sans: https://fonts.google.com/specimen/Nunito+Sans
- Licenças OFL originais: https://github.com/google/fonts/tree/main/ofl/cinzel e https://github.com/google/fonts/tree/main/ofl/nunitosans

Fontes WOFF2 locais com `font-display: swap`. Imagens locais WebP, tamanhos explícitos e variação do cenário para celular. Sem chamadas à API do jogo durante o uso, sem rastreadores e sem envio de builds a contas externas.
