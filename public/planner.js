(async function(){
"use strict";
const form=document.getElementById("troviora-plan-form");
if(!form)return;
const citySel=document.getElementById("plan-city"),moodSel=document.getElementById("plan-mood"),paceSel=document.getElementById("plan-pace");
const list=document.getElementById("plan-result-list"),title=document.getElementById("plan-result-title"),summary=document.getElementById("plan-result-summary");
const maps=document.getElementById("plan-maps-link"),copy=document.getElementById("plan-copy-link"),status=document.getElementById("plan-copy-status");
let cities;
try{
 const response=await fetch("/planner-data.json",{cache:"force-cache"});
 if(!response.ok)throw Error("Cannot read directory data");
 cities=await response.json();
}catch(error){
 title.textContent="City plans are unavailable";
 summary.textContent="Please explore the city guides while we restore this feature.";
 return;
}
const params=new URLSearchParams(location.search);
if(cities.some(c=>c.slug===params.get("city")))citySel.value=params.get("city");
if(["mix","outdoors","culture"].includes(params.get("mood")))moodSel.value=params.get("mood");
if(["one","two","three"].includes(params.get("pace")))paceSel.value=params.get("pace");
const outdoor=/(park|outdoor|water|coast|lake|beach|trail|nature|garden|river|pier)/i;
const cultural=/(museum|art|culture|historic|history|center|science|landmark|market|architecture)/i;
function score(spot,mood){
 const words=spot.name+" "+spot.type+" "+spot.description;
 if(mood==="outdoors")return outdoor.test(words)?3:0;
 if(mood==="culture")return cultural.test(words)?3:0;
 return 1;
}
function render(){
 const city=cities.find(c=>c.slug===citySel.value)||cities[0];
 const mood=moodSel.value,pace=paceSel.value,count=pace==="one"?1:pace==="three"?3:2;
 let sorted=city.spots.map((spot,index)=>({...spot,index,score:score(spot,mood)})).sort((a,b)=>b.score-a.score||a.index-b.index);
 const picks=sorted.slice(0,count);
 title.textContent="Your "+city.name+" day plan";
 summary.textContent=(mood==="outdoors"?"Outdoor-focused":mood==="culture"?"Culture-focused":"A balanced")+
 " selection of "+picks.length+(picks.length===1?" place":" places")+". Check a live map for distances; this is a suggested order, not a travel-time estimate.";
 list.replaceChildren();
 for(let i=0;i<picks.length;i++){
  const p=picks[i];const wrap=document.createElement("article");wrap.className="tv-plan-stop";
  const nr=document.createElement("span");nr.className="tv-plan-number";nr.textContent=String(i+1).padStart(2,"0");
  const body=document.createElement("div");
  const typ=document.createElement("small");typ.textContent=p.type;
  const h3=document.createElement("h3");h3.textContent=p.name;
  const text=document.createElement("p");text.textContent=p.description;
  const links=document.createElement("div");links.className="tv-plan-links";
  if(p.official){const official=document.createElement("a");official.href=p.official;official.target="_blank";official.rel="noopener noreferrer";official.textContent="Official visitor info ↗";links.append(official);}
  const map=document.createElement("a");map.href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.name+" "+city.name+" "+city.state);map.target="_blank";map.rel="noopener noreferrer";map.textContent="Map this place ↗";links.append(map);
  body.append(typ,h3,text,links);wrap.append(nr,body);list.append(wrap);
 }
 let link;
 if(picks.length===1)link="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(picks[0].name+" "+city.name+" "+city.state);
 else{
  const coords=p=>encodeURIComponent(p.name+", "+city.name+", "+city.state);
  link="https://www.google.com/maps/dir/?api=1&origin="+coords(picks[0])+"&destination="+coords(picks[picks.length-1]);
  if(picks.length>2)link+="&waypoints="+picks.slice(1,-1).map(coords).join("%7C");
 }
 maps.href=link;maps.textContent=picks.length===1?"See this place on Google Maps ↗":"See suggested order on Google Maps ↗";
 const q=new URLSearchParams({city:city.slug,mood,pace});history.replaceState(null,"","/planner/?"+q.toString());
 status.textContent="";
}
form.addEventListener("submit",event=>{event.preventDefault();render();document.querySelector(".tv-plan-results").scrollIntoView({behavior:"smooth",block:"start"});});
copy.addEventListener("click",async()=>{
 const link=location.href;
 try{await navigator.clipboard.writeText(link);status.textContent="Shareable plan link copied!";}catch{status.textContent="Share this link: "+link;}
});
render();
})();