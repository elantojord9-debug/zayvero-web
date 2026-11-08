(async function(){
"use strict";
const $=id=>document.getElementById(id);if(!$("pl-results"))return;
const query=$("pl-query"),city=$("pl-city"),admission=$("pl-access"),interest=$("pl-type"),results=$("pl-results"),count=$("pl-count");
let cities;
try{const r=await fetch("/weekend-data.json",{cache:"no-cache"});if(!r.ok)throw Error("data");cities=(await r.json()).cities; if(!Array.isArray(cities))throw Error("data")}
catch{count.textContent="Directory data is unavailable. Use the featured venues and city guides below.";return}
const places=cities.flatMap(c=>c.spots.map(s=>({...s,cityName:c.name,citySlug:c.slug,cityPath:c.path,state:c.state})));
function element(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
function link(label,href){const a=element("a","",label);a.href=href;if(/^https?:/.test(href)){a.target="_blank";a.rel="noopener noreferrer"}return a;}
function render(){
 const term=query.value.trim().toLowerCase(),selected=city.value,type=interest.value,access=admission.value;
 let matched=places.filter(p=>(selected==="all"||p.citySlug===selected)&&(access==="all"||p.access===access)&&
 (type==="all"||type==="outdoors"&&p.outdoors||type==="culture"&&!p.outdoors||type==="family"&&p.family)&&
 (!term||(p.name+" "+p.cityName+" "+p.area+" "+p.description).toLowerCase().includes(term)));
 results.replaceChildren();count.textContent=matched.length+" place"+(matched.length===1?"":"s")+" match your filters.";
 if(!matched.length){results.append(element("p","tv-place-empty","No verified editorial profiles match. Try a different city or filter."));return}
 for(const p of matched){
 const card=element("article","tv-place-card");const eyebrow=element("div","tv-place-card-top");
 eyebrow.append(element("span","",p.cityName+", "+p.state.replaceAll("-"," ")),element("span","tv-place-badge",p.access==="free"?"Free entry":p.access==="ticketed"?"Ticketed":"Check admission"));
 const title=element("h2","",p.name),area=element("p","tv-place-area",p.area+" · "+p.type);
 const desc=element("p","",p.description),note=element("p","tv-place-fineprint",p.note);
 const actions=element("div","tv-place-card-actions");
 actions.append(link("Official venue ↗",p.official),link("Google Maps ↗","https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.name+", "+p.cityName+", "+p.state)),link("City guide ↗",p.cityPath));
 card.append(eyebrow,title,area,desc,note,actions);results.append(card);
 }
}
[query,city,admission,interest].forEach(x=>x.addEventListener(x===query?"input":"change",render));
$("tv-place-static")?.setAttribute("hidden","");
render();
})();