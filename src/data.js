// Valores da tabela do guia, sem extrapolação de tiers ou fórmulas.
export const SOURCE = 'https://roo-global.gitbook.io/guide/game-wiki/valkyrie-feather';
export const REVIEWED = '21/11/2026';
export const rarity = { blue: 'Azul', purple: 'Roxa', gold: 'Dourada' };
export const labels = { atk:'ATQF / ATQM', pdef:'DEFF', mdef:'DEFM', hp:'HP máximo', str:'FOR', dex:'DES', int:'INT', vit:'VIT', ignoreP:'Ignorar DEFF', ignoreM:'Ignorar DEFM', pve:'Bônus de dano PvE', pvp:'Bônus de dano PvP', pveMit:'Redução de dano PvE', pvpMit:'Redução de dano PvP', dmg:'Dano físico / mágico', mitigation:'Redução física / mágica' };
export const percentKeys = ['dmg','mitigation'];
const f = (name,category,rarity,stats) => ({id:name.toLowerCase(), name,category,rarity,stats,tier:1});
export const feathers = [
 f('Fury','ATK','blue',{atk:1}),
 f('Valor','ATK','purple',{str:1,atk:1}),
 f('Glory','ATK','purple',{dex:1,atk:1}),
 f('Faith','ATK','purple',{int:1,atk:1}),
 f('Sky','ATK','gold',{atk:2,ignoreP:2,ignoreM:1}),
 f('Day','ATK','gold',{ignoreP:4,ignoreM:1,pve:12}),
 f('Time','ATK','gold',{pve:17,atk:7,ignoreP:6,ignoreM:2}),
 f('Space','ATK','gold',{pvp:8,atk:7,ignoreP:6,ignoreM:2}),
 f('Vigor','DEF','blue',{pdef:1}),
 // A fonte escreve "Viture"; preservado para rastreabilidade.
 f('Viture','DEF','purple',{vit:1,hp:20}),
 f('Mercy','DEF','purple',{pdef:2,hp:20}),
 f('Soul','DEF','purple',{pdef:2,mdef:1}),
 f('Terra','DEF','gold',{pdef:2,mdef:1,hp:33}),
 f('Night','DEF','gold',{pdef:4,mdef:1,pveMit:12}),
 f('Nature','DEF','gold',{pveMit:17,pdef:6,mdef:2,hp:108}),
 f('Divine','DEF','gold',{pvpMit:8,pdef:6,mdef:2,hp:108}),
 f('Equity','MIX','blue',{hp:10}),
 f('Grace','MIX','purple',{atk:1,hp:20}),
 f('Justice','MIX','purple',{pdef:2,atk:1}),
 f('Truth','MIX','purple',{dmg:0.23,atk:1}),
 f('Order','MIX','purple',{mitigation:0.23,pdef:2}),
 f('Light','MIX','gold',{pvp:11,pvpMit:11,atk:9,dmg:0.28}),
 f('Dark','MIX','gold',{pvp:11,pvpMit:11,atk:9,mitigation:0.28}),
];
export const byId = Object.fromEntries(feathers.map(f=>[f.id,f]));
const s=(id,name,blue,purple,gold,atk,pvp=0,attack=0,pve=0,pvpBoost=0)=>({id,name,requirements:{blue,purple,gold},pieces:blue+purple+gold,stats:{atk,...(pvp?{pvp}: {})},modifiers:{attack,pve,pvp:pvpBoost},confirmedFor:['ATK']});
export const sets=[
 s('cry',"Nightingale's Cry",1,1,0,21),
 s('song',"Nightingale's Song",0,2,0,24),
 s('sorrow',"Nightingale's Sorrow",0,1,1,34,0,30),
 s('eye',"Hawk-owl's Eye",1,2,0,34),
 s('flight',"Hawk-owl's Flight",0,3,0,35),
 s('dance',"Hawk-owl's Dance",0,2,1,36,0,30),
 s('will',"Hawk-owl's Will",0,1,2,46,20,30,80),
 s('pierce',"Eagle's Pierce",1,3,0,37),
 s('contention',"Eagle's Contention",0,3,1,37,0,30),
 s('raid',"Eagle's Raid",0,2,2,47,33,30,80),
 s('might',"Eagle's Might",0,1,3,47,33,30,80),
 s('edge',"Raven's Edge",0,4,1,38,0,30),
 s('plunder',"Raven's Plunder",0,3,2,53,63,30,80),
 s('prestige',"Raven's Prestige",0,2,3,68,66,30,80),
 s('hour',"Raven's Hour",0,1,4,78,69,30,80,80),
];
export const statueTypes={ATK:{name:'Estátua de ataque',accepts:['ATK','MIX']},DEF:{name:'Estátua de defesa',accepts:['DEF','MIX']}};
export const goals={pve:'PvE',pvp:'PvP',attack:'Ataque',defense:'Defesa',balanced:'Equilibrado'};
export const guide=[
 ['O que são Valkyrie Feathers?','O sistema é liberado no nível base 45. As feathers concedem atributos quando encaixadas nas estátuas. O avanço do personagem libera mais estátuas e espaços. Confirme no jogo quais você já desbloqueou.'],
 ['Categoria e raridade são a mesma coisa?','São informações diferentes. ATK, DEF e MIX determinam os atributos e a compatibilidade. O fundo azul, roxo ou dourado indica a raridade. A pena vermelha identifica ATK; a escura, DEF; a branca, MIX.'],
 ['Como escolher a estátua?','Estátuas ATK recebem ATK e MIX. Estátuas DEF recebem DEF e MIX. Os espaços disponíveis aumentam com o nível base; o guia não oferece uma tabela completa de desbloqueios. Ajuste os espaços do planejador de acordo com sua conta.'],
 ['Como ativar um conjunto?','Combine as raridades exigidas dentro da mesma estátua. Apenas um bônus de conjunto pode ficar ativo por estátua. O planejador mostra as combinações exatas documentadas de 2 a 5 peças; regras de prioridade para subconjuntos não foram inferidas.'],
 ['Como funciona a promoção?','A promoção consome feathers idênticas e moedas de Éden. O custo aumenta com o tier e com a raridade. Evoluir as penas equipadas de forma uniforme também ajuda a elevar o tier da estátua. Os valores de tiers superiores e os bônus de evolução da estátua precisam de validação e não são extrapolados aqui.'],
 ['Como desmontar e reutilizar materiais?','No jogo, abra Mochila › Estátua, selecione a feather e escolha Desmontar. Você recebe Statue Down Feathers, trocáveis por outras feathers na loja do sistema. Avalie os atributos que sua classe utiliza antes de desmontar.'],
 ['Onde conseguir feathers?','Azuis: Hellheim e Loja de Feathers da Estátua. Roxas: essas fontes, vendas da guilda e Expedição da Guilda. Douradas: as mesmas atividades e a Loja RO, com Zeny ou Nyan Berries. Disponibilidade e traduções podem variar por região.'],
 ['Como interpretar os resultados deste site?','A soma usa os valores base (Tier 1) da referência e bônus fixos dos conjuntos ATK. Modificadores percentuais de conjunto aparecem separados, pois o guia não detalha a fórmula de aplicação. Os conjuntos DEF não têm valores documentados nessa referência. A pontuação é uma heurística de planejamento, não o poder de combate do jogo.'],
];
