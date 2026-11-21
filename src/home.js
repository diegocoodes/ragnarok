export function renderHome({icon,featherImg,byId,feathers}) {
 const categories=[
  {id:'ATK',title:'Ataque',copy:'Potencialize cada golpe.',description:'Ataque físico, mágico e bônus de dano.',art:'knight',icon:'swords',compat:'Estátuas ATK'},
  {id:'DEF',title:'Defesa',copy:'Resista. Permaneça. Vença.',description:'Defesa, redução de dano e HP máximo.',art:'paladin',icon:'shield',compat:'Estátuas DEF'},
  {id:'MIX',title:'Mistas',copy:'Encontre seu equilíbrio.',description:'Atributos ofensivos e defensivos.',art:'wizard',icon:'layers',compat:'Estátuas ATK e DEF'},
 ];
 return `<section class="hero origin-hero">
  <picture class="hero-background"><source media="(max-width:700px)" srcset="assets/images/prontera-mobile.webp"><img src="assets/images/prontera.webp" alt="" width="1800" height="1013" fetchpriority="high"></picture>
  <div class="hero-shade"></div>
  <div class="hero-particles" aria-hidden="true">${Array.from({length:8},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div>
  <div class="hero-inner">
   <div class="hero-copy">
    <div class="eyebrow"><span class="tiny-diamond"></span> RAGNAROK ORIGIN · GUIA & PLANEJADOR</div>
    <h1>Planeje suas<br><em>Valkyrie Feathers</em></h1>
    <p>Cada feather, uma nova possibilidade.<br>Descubra atributos, ative conjuntos e prepare sua próxima conquista em Midgard.</p>
    <div class="hero-actions"><a class="button primary" href="#estatuas">${icon('swords')} Montar uma build</a><a class="button glass" href="#feathers">${icon('feather')} Explorar feathers</a></div>
    <div class="hero-note">${icon('shield')} Um atlas independente. Feito para aventureiros.</div>
   </div>
   <div class="origin-art">
    <div class="magic-halo" aria-hidden="true"><span></span><i>✦</i><i>✦</i><i>✦</i></div>
    <span class="art-word" aria-hidden="true">MIDGARD</span>
    <img class="hero-character" src="assets/images/archbishop.webp" alt="Arcebispa alada em arte oficial de Ragnarok Origin" width="700" height="410" fetchpriority="high">
    <div class="hero-loot">${featherImg(byId.time)}<div><span>VALKYRIE FEATHER</span><b>Time</b><small>ATK <i>·</i> Dourada</small></div></div>
    <div class="art-caption"><span></span> A SUA PRÓXIMA AVENTURA COMEÇA AQUI</div>
   </div>
  </div>
  <div class="hero-cut" aria-hidden="true"></div>
 </section>
 <div class="facts-strip container"><div><strong>23</strong><span>feathers para explorar</span></div><i></i><div><strong>03</strong><span>categorias de feathers</span></div><i></i><div><strong>15</strong><span>conjuntos documentados</span></div><i></i><div>${icon('shield')}<span>Disponível no <b>nível base 45</b></span></div></div>
 <section class="home-section category-section container" data-reveal>
  <div class="section-heading centered"><div><div class="eyebrow">CONHEÇA SEU ARSENAL</div><h2>Escolha o poder da sua build</h2><p>Três categorias. Diferentes caminhos para a sua aventura.</p></div><span class="heading-ornament" aria-hidden="true"></span></div>
  <div class="origin-categories">
   ${categories.map(c=>{
    const items=feathers.filter(f=>f.category===c.id);
    return `<article class="origin-category category-${c.id.toLowerCase()}" data-reveal>
     <div class="category-ribbon">${icon(c.icon)} ${c.id}<span>${items.length} FEATHERS</span></div>
     <div class="category-art"><div class="category-sigil" aria-hidden="true">${icon(c.icon)}</div><img src="assets/images/${c.art}.webp" alt="" width="700" height="850" loading="lazy"><span class="category-art-caption">RAGNAROK ORIGIN</span></div>
     <div class="category-body"><span class="category-kicker">${c.copy}</span><h3>Feathers ${c.id==='MIX'?'':'de '}<em>${c.title}</em></h3><p>${c.description}</p>
      <div class="category-compat">${icon('shield')} ${c.compat}</div>
      <div class="category-rarities">${[['blue','Azul','Azuis'],['purple','Roxa','Roxas'],['gold','Dourada','Douradas']].map(([r,singular,plural])=>{const n=items.filter(f=>f.rarity===r).length;return `<span class="${r}"><i></i><b>${n}</b> ${n===1?singular:plural}</span>`;}).join('')}</div>
      <a class="button category-cta" href="#feathers" data-browse="${c.id}">${icon('feather')} Explorar ${c.title.toLowerCase()}</a>
     </div>
    </article>`;
   }).join('')}
  </div>
 </section>
 <section class="tools-section" data-reveal><div class="container">
  <div class="section-heading"><div><div class="eyebrow">DO INVENTÁRIO À ESTRATÉGIA</div><h2>Prepare-se para o próximo desafio</h2></div><a class="text-link" href="#guia">${icon('book')} Entenda o sistema</a></div>
  <div class="origin-tools">
   ${[
    ['swords','estatuas','Monte suas estátuas','Equipe, substitua e fixe suas feathers.','ATK + DEF','Planejador'],
    ['spark','otimizador','Descubra combinações','Explore builds com as penas que você possui.','PvE / PvP','Otimizador'],
    ['layers','conjuntos','Ative novos conjuntos','Consulte requisitos e bônus documentados.','15 conjuntos','Referência'],
   ].map(([i,r,t,d,meta,label])=>`<a href="#${r}" class="origin-tool" data-reveal><span class="tool-medallion">${icon(i)}</span><span class="tool-description"><small>${label}</small><h3>${t}</h3><p>${d}</p></span><span class="tool-meta"><small>EXPLORE</small><b>${meta}</b></span><span class="tool-open">${icon('plus')} Acessar</span></a>`).join('')}
  </div>
 </div></section>
 <section class="adventure-section container" data-reveal>
  <div class="adventure-art"><img src="assets/images/wizard.webp" alt="Arquimaga em arte oficial de Ragnarok Origin" width="602" height="891" loading="lazy"><span class="adventure-rune" aria-hidden="true">✧</span></div>
  <div class="adventure-copy"><div class="eyebrow">SEU CONHECIMENTO É SEU MELHOR EQUIPAMENTO</div><h2>Uma boa build começa<br>com uma boa escolha.</h2><p>Entenda raridades, estátuas e conjuntos. Depois, transforme o que você aprendeu na sua própria estratégia.</p><div class="actions"><a href="#guia" class="button primary">${icon('book')} Guia do aventureiro</a><a href="#salvas" class="text-link">${icon('save')} Minhas builds</a></div><span class="adventure-note">Seu progresso fica salvo apenas neste navegador.</span></div>
 </section>`;
}

export function renderFooter({icon,SOURCE,REVIEWED}){
 return `<footer class="site-footer origin-footer"><div class="container footer-grid">
  <div class="footer-about"><a href="#inicio" class="brand"><span class="brand-mark">${icon('feather')}</span><span>VALKYRIE <b>ATLAS</b><small>RAGNAROK ORIGIN</small></span></a><p>Seu guia para transformar feathers em estratégia. Feito para a comunidade de Midgard.</p><span class="footer-seal">${icon('shield')} FERRAMENTA INDEPENDENTE</span></div>
  <div class="footer-links"><h3>Seu arsenal</h3><a href="#feathers">Catálogo de feathers</a><a href="#estatuas">Planejador de estátuas</a><a href="#conjuntos">Bônus de conjuntos</a></div>
  <div class="footer-links"><h3>Sua estratégia</h3><a href="#otimizador">Otimizador de builds</a><a href="#salvas">Minhas builds</a><a href="#guia">Guia rápido</a></div>
  <div class="footer-links"><h3>Explore com confiança</h3><a href="${SOURCE}" target="_blank" rel="noopener noreferrer">Fonte dos dados</a><a href="#fontes">Imagens e créditos</a><span>Conteúdo revisado em ${REVIEWED}</span></div>
 </div><div class="container footer-bottom"><p>Ragnarok Origin e suas artes pertencem aos respectivos titulares. Sem vínculo com a Gravity.</p><span>FEITO PARA A SUA PRÓXIMA AVENTURA</span></div></footer>`;
}
