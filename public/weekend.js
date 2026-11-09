(async function(){
"use strict";
const $=id=>document.getElementById(id);
const form=$("weekend-form");if(!form)return;
const sel={city:$("wk-city"),date:$("wk-date"),budget:$("wk-budget"),interest:$("wk-interest"),days:$("wk-days"),pace:$("wk-pace")};
const out=$("wk-days-list"),message=$("wk-message"),h=$("wk-head"),summary=$("wk-summary"),savedBox=$("wk-saved-list");
const STORE="troviora_weekend_plans_v1";let database;
try{const r=await fetch("/weekend-data.json",{cache:"no-cache"});if(!r.ok)throw Error("Request failed");database=(await r.json()).cities;if(!Array.isArray(database))throw Error("Invalid city list")}
catch{h.textContent="The weekend planner is temporarily unavailable";summary.textContent="Please use our city guides while we restore these suggestions.";form.querySelector("button[type=submit]").disabled=true;return;}
const safe=(sel,valid,otherwise)=>valid.includes(sel)?sel:otherwise;
const dateValid=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!isNaN(Date.parse(d+"T12:00:00Z"));
const nextSaturday=()=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+(6-d.getDay()+7)%7);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
const qs=new URLSearchParams(location.search);
sel.city.value=safe(qs.get("city"),database.map(x=>x.slug),sel.city.value);
sel.budget.value=safe(qs.get("budget"),["free","50","100","flex"],"free");
sel.interest.value=safe(qs.get("interest"),["all","outdoors","culture","family","pets"],"all");
sel.days.value=safe(qs.get("days"),["1","2","3"],"2");
sel.pace.value=safe(qs.get("pace"),["1","2","3"],"2");
sel.date.value=dateValid(qs.get("start"))?qs.get("start"):nextSaturday();
const settings=()=>({city:sel.city.value,start:sel.date.value,budget:sel.budget.value,interest:sel.interest.value,days:Number(sel.days.value),pace:Number(sel.pace.value)});
const create=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!=null)el.textContent=text;return el};
const mapsUrl=(places,city,state)=>{const coords=p=>encodeURIComponent(p.name+", "+city+", "+state);
 if(places.length===1)return "https://www.google.com/maps/search/?api=1&query="+coords(places[0]);
 let url="https://www.google.com/maps/dir/?api=1&origin="+coords(places[0])+"&destination="+coords(places[places.length-1])+"&travelmode=walking";
 if(places.length>2)url+="&waypoints="+places.slice(1,-1).map(coords).join("%7C");
 return url;
};
const buttonLink=(text,href)=>{const a=create("a","",text);a.href=href;a.target="_blank";a.rel="noopener noreferrer";return a};
const cityBySlug=slug=>database.find(c=>c.slug===slug)||database[0];
function eligibility(p,opts){
 if(opts.budget==="free"&&p.access!=="free")return false;
 if(opts.interest==="outdoors"&& !p.outdoors)return false;
 if(opts.interest==="culture"&&p.outdoors)return false;
 if(opts.interest==="family"&&!p.family)return false;
 if(opts.interest==="pets"&&!p.petVerified)return false;
 return true;
}
function rank(p,opts){
 let n=0;
 if(p.access==="free")n+=opts.budget==="free"?6:3;
 if(opts.interest==="all"){if(p.outdoors)n+=2;else n+=1}
 if(opts.interest==="culture"&&!p.outdoors)n+=3;
 if(opts.interest==="family"&&p.family)n+=3;
 if(opts.interest==="outdoors"&&p.outdoors)n+=3;
 if(opts.interest==="pets"&&p.outdoors)n+=3;
 if(opts.budget!=="free"&&p.access==="ticketed")n+=1;
 return n;
}
let mostRecent=null;
function render(){
 const opts=settings(),city=cityBySlug(opts.city);
 let candidates=city.spots.filter(p=>eligibility(p,opts)).map((p,i)=>({...p,original:i,rank:rank(p,opts)}));
 candidates.sort((a,b)=>b.rank-a.rank||a.original-b.original);
 const max=Math.min(candidates.length,opts.days*opts.pace);const picks=candidates.slice(0,max);
 const groups=Array.from({length:opts.days},()=>[]);
 for(let j=0;j<picks.length;j++)groups[j%opts.days].push(picks[j]);
 mostRecent={city,opts,groups};
 const budget=opts.budget==="free"?"no-admission":opts.budget==="flex"?"flexible-budget":"budget-aware";
 h.textContent=city.name+" weekend planner";
 summary.textContent=picks.length+" "+(picks.length===1?"place":"places")+" across "+opts.days+" "+(opts.days===1?"day":"days")+" · "+budget+" ideas. Check operators for actual dates, fees and open hours.";
 out.replaceChildren();
 const warning=create("p","tv-weekend-disclaimer",opts.interest==="pets"?"Only locations with verified official on-leash dog rules are shown. Check policies again before traveling.":opts.budget==="free"?"Free general admission does not include transport, parking or optional extras.":"These are suggestions only: Troviora has no current ticket prices and cannot verify that paid entries fit your budget.");
 out.append(warning);
 for(let day=0;day<opts.days;day++){
  const section=create("section","tv-weekend-day");const box=create("div","tv-weekend-day-head");
  const label=create("div","", "DAY "+(day+1));const dat=new Date(opts.start+"T12:00:00");
  dat.setDate(dat.getDate()+day);const shown=isNaN(dat.getTime())?"Your chosen date":dat.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric",year:"numeric"});
  const heading=create("h3","",shown);box.append(label,heading);section.append(box);
  if(!groups[day].length){section.append(create("p","tv-weekend-empty","No additional matching locations are available in our curated directory for this day. Try fewer days or another filter; we will not invent places."));out.append(section);continue;}
  for(let i=0;i<groups[day].length;i++){
   const p=groups[day][i],item=create("article","tv-weekend-stop");
   const top=create("div","tv-weekend-stop-meta"),nr=create("span","",String(i+1).padStart(2,"0")+" · "+p.area),label=create("span","tv-weekend-access",p.access==="free"?"Free general entry":p.access==="ticketed"?"Paid admission":"Check admission");
   top.append(nr,label);
   const title=create("h4","",p.name),description=create("p","",p.description),note=create("p","tv-weekend-note","Before visiting: "+p.note);
   const actions=create("div","tv-weekend-place-links");
   actions.append(buttonLink("Official website ↗",p.official),buttonLink("Find on map ↗","https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.name+", "+city.name+", "+city.state)));
   item.append(top,title,description,note,actions);section.append(item);
  }
  section.append(buttonLink("Open this day's suggested route in Google Maps ↗",mapsUrl(groups[day],city.name,city.state)));
  out.append(section);
 }
 const guide=create("p","tv-weekend-guide-link");guide.append("Want more details? ",Object.assign(create("a","","Read the "+city.name+" city guide ↗"),{href:city.path}));out.append(guide);
 const params=new URLSearchParams({city:opts.city,start:opts.start,budget:opts.budget,interest:opts.interest,days:String(opts.days),pace:String(opts.pace)});
 history.replaceState(null,"","/weekend/?"+params.toString());
 message.textContent="";
}
form.addEventListener("submit",e=>{e.preventDefault();render();$(".tv-weekend-outcome").scrollIntoView({behavior:"smooth",block:"start"})});
$("wk-copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(location.href);message.textContent="Shareable link copied."}catch{message.textContent="Copy this address: "+location.href}});
$("wk-print").addEventListener("click",()=>window.print());
const readSaved=()=>{try{const p=JSON.parse(localStorage.getItem(STORE)||"[]");return Array.isArray(p)?p.filter(o=>o&&typeof o.city==="string").slice(0,30):[]}catch{return []}};
function save(items){try{localStorage.setItem(STORE,JSON.stringify(items.slice(0,20)));return true}catch{return false}}
function refreshSaved(){
 savedBox.replaceChildren();const saved=readSaved();
 if(!saved.length){savedBox.append(create("p","tv-weekend-empty","No saved itineraries yet. Build your weekend and select Save to keep a plan on this device."));return;}
 for(let i=0;i<saved.length;i++){
 const plan=saved[i],city=cityBySlug(plan.city),wrap=create("div","tv-weekend-saved");
 const title=create("strong","",city.name+" · "+(plan.start||"Weekend"));
 const info=create("span","",plan.days+" day(s), "+plan.interest+" · "+(plan.budget==="free"?"free entry":plan.budget==="flex"?"flexible budget":"$"+plan.budget+" preference"));
 const load=create("button","","Open plan");load.type="button";load.addEventListener("click",()=>{sel.city.value=safe(plan.city,database.map(x=>x.slug),sel.city.value);if(dateValid(plan.start))sel.date.value=plan.start;sel.budget.value=safe(plan.budget,["free","50","100","flex"],"free");sel.interest.value=safe(plan.interest,["all","outdoors","culture","family","pets"],"all");sel.days.value=safe(String(plan.days),["1","2","3"],"2");sel.pace.value=safe(String(plan.pace),["1","2","3"],"2");render();$(".tv-weekend-outcome").scrollIntoView({behavior:"smooth",block:"start"})});
 const remove=create("button","tv-weekend-remove","Remove");remove.type="button";remove.setAttribute("aria-label","Remove saved plan for "+city.name+" "+plan.start);remove.addEventListener("click",()=>{const p=readSaved();p.splice(i,1);save(p);refreshSaved()});
 wrap.append(title,info,load,remove);savedBox.append(wrap);
 }
}
$("wk-save").addEventListener("click",()=>{const opts=settings();const all=readSaved().filter(x=>JSON.stringify(x)!==JSON.stringify(opts));all.unshift(opts);message.textContent=save(all)?"Saved in this browser. Use Saved weekend plans below to open or delete it.":"This browser could not save the plan. You can copy its shareable link instead.";refreshSaved();});
render();refreshSaved();
})();