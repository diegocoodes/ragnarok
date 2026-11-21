# Valkyrie Atlas

Guia e planejador independente de Valkyrie Feathers para Ragnarok Origin, em português do Brasil.

## Executar

Requer Node.js 22 ou superior.

```sh
npm install
npm run dev
```

Abra `http://127.0.0.1:4173`. Use um servidor HTTP: módulos JavaScript e o worker não funcionam corretamente abrindo o HTML diretamente pelo explorador de arquivos.

```sh
npm run check
npm test
npm run build
```

A saída estática fica em `dist/`. Não exige backend, conta ou chave de API. Builds e inventário ficam no `localStorage`; arquivos JSON são o backup portátil.

## Estrutura

- `src/data.js`: catálogo, atributos, raridades, conjuntos, guia e data de revisão.
- `src/engine.js`: compatibilidade, validação, contagem de conjuntos, somas e busca.
- `src/optimizer-worker.js`: busca fora da thread da interface.
- `src/app.js`: navegação, filtros, planejador, inventário, comparação e arquivos.
- `src/styles.css`: tema, molduras, raridades, responsividade e movimento reduzido.
- `assets/images/`: artes e recortes oficiais convertidos para WebP.
- `assets/fonts/`: Cinzel, Nunito Sans e licenças OFL.
- `tests/engine.test.mjs`: testes das regras e das limitações da fonte.
- `scripts/qa.mjs`: verificação real dos fluxos no Microsoft Edge instalado, via Playwright.

Para executar a verificação de interface, deixe o servidor rodando e execute `node scripts/qa.mjs`. Capturas e arquivos temporários ficam em `.local/qa/`, ignorado no Git. O script exige o Microsoft Edge; em outro ambiente, ajuste o canal de navegador.

## Dados e limites

Fonte: [Valkyrie Feather](https://roo-global.gitbook.io/guide/game-wiki/valkyrie-feather), também [publicada no site oficial](https://roglobal.com/guideline/91). Revisão: 21/11/2026. São 23 feathers e 15 conjuntos. Os nomes em inglês, inclusive a grafia “Viture”, foram preservados.

Somamos valores base de Tier 1 e bônus fixos de conjuntos ATK. Os modificadores percentuais são exibidos separadamente, sem presumir sua fórmula. Valores de conjuntos DEF, tiers superiores, bônus de evolução de estátua, prioridades de subconjuntos e a tabela completa de desbloqueios não estão documentados nessa referência. A interface sinaliza essas lacunas.

A ativação exige a composição exata de raridades documentada, com um conjunto por estátua. O planejador permite até seis estátuas e cinco espaços por estátua como limite da ferramenta; não é uma afirmação sobre o máximo de desbloqueios do jogo. A referência não confirma restrições de repetir nomes de feather dentro de uma estátua; o planejador controla compatibilidade e quantidades, sem inferir essa regra. Confira regras adicionais no seu servidor.

O otimizador usa busca em feixe, limitada a 180 estados por etapa na interface. Preserva posições fixadas e quantidades do inventário. Os pesos por objetivo estão em `engine.js`; o índice não equivale a dano final ou poder de combate. Modificadores percentuais de conjuntos ficam fora da pontuação. Uma preferência de conjunto adiciona 1.000 pontos por estátua ATK que o ativa. Não há garantia de ótimo global.

Para atualizar dados, confronte as tabelas da fonte, edite `data.js`, atualize `REVIEWED` e execute os testes. Nunca extrapole valores de tiers sem uma fonte verificável.

## Identidade e créditos

Consulte [docs/SOURCES.md](docs/SOURCES.md). As imagens do jogo pertencem aos seus titulares. Este projeto não implica afiliação, patrocínio ou licença de redistribuição comercial da Gravity. As licenças das fontes estão em `assets/fonts/`.
