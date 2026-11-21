import {byId,sets,statueTypes} from './data.js';
export const compatible=(type,id)=>Boolean(byId[id] && statueTypes[type]?.accepts.includes(byId[id].category));
export const emptyStatue=(type,id=crypto.randomUUID())=>({id,type,slots:Array(5).fill(null),locked:Array(5).fill(false)});
export const emptyBuild=()=>({version:1,name:'Minha build',statues:[emptyStatue('ATK'),emptyStatue('DEF')]});
export function rarityCounts(slots){const counts={blue:0,purple:0,gold:0};for(const id of slots)if(byId[id])counts[byId[id].rarity]++;return counts;}
export function matchingSet(slots){const c=rarityCounts(slots);return sets.find(s=>Object.keys(c).every(k=>s.requirements[k]===c[k]))||null;}
const add=(a,b)=>{for(const [k,v]of Object.entries(b))a[k]=(a[k]||0)+v;return a;};
export function evaluate(build){
 const base={},fixed={},active=[],pending=[];
 for(const st of build.statues){for(const id of st.slots)if(byId[id])add(base,byId[id].stats);const set=matchingSet(st.slots);if(set){if(set.confirmedFor.includes(st.type)){add(fixed,set.stats);active.push({statueId:st.id,set});}else pending.push({statueId:st.id,set});}}
 const totals=add({...base},fixed);for(const k in totals)totals[k]=Math.round(totals[k]*10000)/10000;
 return {base,fixed,totals,active,pending,used:usage(build),count:build.statues.flatMap(s=>s.slots).filter(Boolean).length};
}
export function usage(build){const counts={};for(const st of build.statues)for(const id of st.slots)if(id)counts[id]=(counts[id]||0)+1;return counts;}
export function validateBuild(input){
 if(!input||input.version!==1||typeof input.name!=='string'||input.name.length>120||!Array.isArray(input.statues)||!input.statues.length||input.statues.length>6)throw Error('Arquivo inválido: use uma build exportada pelo Valkyrie Atlas.');
 const ids=new Set();const statues=input.statues.map(st=>{if(!st||typeof st.id!=='string'||ids.has(st.id)||!statueTypes[st.type]||!Array.isArray(st.slots)||st.slots.length>5||st.slots.length<0||!Array.isArray(st.locked)||st.locked.length!==st.slots.length)throw Error('Configuração de estátuas inválida.');ids.add(st.id);const slots=st.slots.map(id=>{if(id!==null&&(typeof id!=='string'||!compatible(st.type,id)))throw Error('A build contém uma feather desconhecida ou incompatível.');return id;});if(st.locked.some(v=>typeof v!=='boolean'))throw Error('Fixações inválidas.');return {id:st.id,type:st.type,slots,locked:[...st.locked]};});
 return {version:1,name:input.name.trim()||'Build importada',statues};
}
const weights={
 attack:{atk:4,ignoreP:1,ignoreM:1,dmg:20,str:1,dex:1,int:1},
 defense:{pdef:4,mdef:4,hp:.05,vit:1,mitigation:20,pveMit:1,pvpMit:1},
 pve:{atk:2,pdef:1,mdef:1,hp:.02,pve:5,pveMit:4,ignoreP:1,ignoreM:1,dmg:10,mitigation:10},
 pvp:{atk:2,pdef:1,mdef:1,hp:.02,pvp:5,pvpMit:4,ignoreP:1,ignoreM:1,dmg:10,mitigation:10},
 balanced:{atk:2,pdef:2,mdef:2,hp:.03,pve:2,pveMit:2,pvp:2,pvpMit:2,ignoreP:1,ignoreM:1,dmg:10,mitigation:10},
};
export function score(build,goal='balanced',preferred=''){
 const e=evaluate(build),w=weights[goal]||weights.balanced;let n=Object.entries(e.totals).reduce((a,[k,v])=>a+v*(w[k]||0),0);
 if(preferred)n+=e.active.filter(x=>x.set.id===preferred).length*1000;
 return Math.round(n*100)/100;
}
export function optimize({build,inventory,goal='balanced',allowed=sets.map(s=>s.id),preferred='',beamWidth=240}){
 const clean=validateBuild(build),initial=structuredClone(clean);
 for(const st of initial.statues)st.slots=st.slots.map((id,i)=>st.locked[i]?id:null);
 const used=usage(initial);
 for(const [id,n]of Object.entries(used))if(n>(inventory[id]||0))throw Error(`Inventário insuficiente para a feather fixada ${byId[id].name}.`);
 const positions=initial.statues.flatMap((st,si)=>st.slots.flatMap((_,i)=>st.locked[i]?[]:[{si,i}]));
 let beam=[{build:initial,used}];let truncated=false;
 for(const {si,i}of positions){
  const next=[];
  for(const state of beam){const options=Object.keys(inventory).filter(id=>compatible(state.build.statues[si].type,id)&&(state.used[id]||0)<inventory[id]);
   for(const id of [...options,null]){const b=structuredClone(state.build);b.statues[si].slots[i]=id;const u={...state.used};if(id)u[id]=(u[id]||0)+1;next.push({build:b,used:u});}
  }
  const unique=new Map();for(const state of next){const k=state.build.statues.map(st=>st.slots.filter(Boolean).slice().sort().join(',')).join('|');if(!unique.has(k))unique.set(k,state);}
  const candidates=[...unique.values()];candidates.sort((a,b)=>score(b.build,goal,preferred)-score(a.build,goal,preferred)||evaluate(b.build).count-evaluate(a.build).count);
  if(candidates.length>beamWidth)truncated=true;beam=candidates.slice(0,beamWidth);
 }
 const results=beam.filter(({build:b})=>{const e=evaluate(b);return [...e.active,...e.pending].every(x=>allowed.includes(x.set.id));}).map(({build:b})=>({build:b,score:score(b,goal,preferred),evaluation:evaluate(b)})).sort((a,b)=>b.score-a.score||b.evaluation.count-a.evaluation.count).slice(0,5);
 if(!results.length||results.every(r=>r.evaluation.count===0))throw Error('Nenhuma combinação disponível. Informe seu inventário e confira os espaços e conjuntos permitidos.');
 return {results,truncated,slots:positions.length+Object.values(used).reduce((a,b)=>a+b,0)};
}
