const places=[{"name": "Houston", "state": "Texas", "url": "/texas/houston/"}, {"name": "Dallas", "state": "Texas", "url": "/texas/dallas/"}, {"name": "Austin", "state": "Texas", "url": "/texas/austin/"}, {"name": "Miami", "state": "Florida", "url": "/florida/miami/"}, {"name": "Orlando", "state": "Florida", "url": "/florida/orlando/"}, {"name": "Tampa", "state": "Florida", "url": "/florida/tampa/"}, {"name": "Los Angeles", "state": "California", "url": "/california/los-angeles/"}, {"name": "San Diego", "state": "California", "url": "/california/san-diego/"}, {"name": "San Francisco", "state": "California", "url": "/california/san-francisco/"}, {"name": "New York City", "state": "New York", "url": "/new-york/new-york-city/"}, {"name": "Atlanta", "state": "Georgia", "url": "/georgia/atlanta/"}, {"name": "Chicago", "state": "Illinois", "url": "/illinois/chicago/"}];
const q=document.getElementById("city-q"),state=document.getElementById("state-pick"),out=document.getElementById("search-results");
function render(){if(!q||!state||!out)return;let term=q.value.toLowerCase().trim(),s=state.value;out.replaceChildren();let list=places.filter(c=>(!s||c.state===s)&&(!term||(c.name+" "+c.state).toLowerCase().includes(term)));if(!list.length){let p=document.createElement("p");p.textContent="No published guide matches yet. Try another city or state.";out.append(p)}for(let c of list){let a=document.createElement("a");a.href=c.url;let pin=document.createElement("span");pin.textContent="⌖";let strong=document.createElement("strong");strong.textContent=c.name;let subtitle=document.createElement("span");subtitle.textContent=c.state;let arrow=document.createElement("span");arrow.textContent="↗";a.append(pin,strong,subtitle,arrow);out.append(a)}}
if(q&&state){q.addEventListener("input",render);state.addEventListener("change",render);render()}
const menu=document.getElementById("mobile-menu"),nav=document.getElementById("site-nav");if(menu&&nav){menu.addEventListener("click",()=>{let open=nav.classList.toggle("cl-nav-open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"✕":"☰"});}
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{let f=b.getAttribute("data-filter");document.querySelectorAll("[data-filter]").forEach(t=>{t.classList.toggle("cl-selected",t===b);t.setAttribute("aria-pressed",String(t===b))});document.querySelectorAll("[data-spot-type]").forEach(c=>c.hidden=f!=="All places"&&c.getAttribute("data-spot-type")!==f)}));

/* Troviora visitor interaction: city filters and browser-local saved places. */
(() => {
  "use strict";
  const q = document.getElementById("city-q");
  const state = document.getElementById("state-pick");
  const cities = typeof places !== "undefined" ? places : [];
  const byPath = new Map(cities.map(c => [c.url, c]));
  function filterCityCards() {
    if (!q || !state) return;
    const term = q.value.toLowerCase().trim();
    const chosen = state.value;
    for (const card of document.querySelectorAll(".cl-city-grid a.cl-city")) {
      let loc;
      try { loc = new URL(card.href, location.href).pathname; } catch { continue; }
      const city = byPath.get(loc);
      const visible = !!city && (!term || (city.name + " " + city.state).toLowerCase().includes(term)) && (!chosen || chosen === city.state);
      card.hidden = !visible;
    }
  }
  if (q && state) {
    q.addEventListener("input", filterCityCards);
    state.addEventListener("change", filterCityCards);
    filterCityCards();
  }
  const KEY = "troviora_saved_v1";
  let saved = [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(raw)) saved = raw.filter(x => x && typeof x.url === "string" && typeof x.name === "string").slice(0, 75);
  } catch {}
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch {}
    repaint();
  }
  function repaint() {
    for (const count of document.querySelectorAll("[data-saved-count]")) count.textContent = String(saved.length);
    for (const button of document.querySelectorAll("button[data-save]")) {
      const url = button.dataset.url, name = button.dataset.name;
      const active = saved.some(x => x.url === url && x.name === name);
      button.classList.toggle("is-saved", active);
      button.setAttribute("aria-pressed", String(active));
      button.textContent = active ? "♥ Saved" : (button.classList.contains("tv-save-hero") ? "♡ Save this city" : "♡ Save this place");
    }
    const list = document.querySelector("[data-saved-list]");
    if (!list) return;
    list.replaceChildren();
    if (!saved.length) {
      const p = document.createElement("p");
      p.className = "tv-saved-empty";
      p.textContent = "No saved places yet. Explore a city and tap 'Save' to build your personal shortlist.";
      list.append(p);
      return;
    }
    for (const entry of saved) {
      const wrap = document.createElement("div");
      wrap.className = "tv-saved-item";
      const a = document.createElement("a");
      a.href = entry.url;
      const title = document.createElement("strong"); title.textContent = entry.name;
      const caption = document.createElement("span"); caption.textContent = entry.city || "City guide";
      a.append(title, caption);
      const remove = document.createElement("button");
      remove.type = "button"; remove.textContent = "✕";
      remove.setAttribute("aria-label", "Remove " + entry.name + " from saved places");
      remove.dataset.removeSaved = entry.url;
      remove.dataset.removeName = entry.name;
      wrap.append(a, remove);
      list.append(wrap);
    }
  }
  const drawer = document.getElementById("tv-saved-drawer");
  const overlay = document.querySelector(".tv-drawer-overlay");
  let priorFocus;
  function showDrawer() {
    priorFocus = document.activeElement;
    if (!drawer || !overlay) return;
    drawer.hidden = overlay.hidden = false;
    document.body.style.overflow = "hidden";
    const close = drawer.querySelector("[data-close-saved]");
    close?.focus();
  }
  function hideDrawer() {
    if (!drawer || !overlay) return;
    drawer.hidden = overlay.hidden = true;
    document.body.style.overflow = "";
    priorFocus?.focus?.();
  }
  document.addEventListener("click", async event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const open = target.closest("[data-open-saved]");
    if (open) { showDrawer(); return; }
    const close = target.closest("[data-close-saved]");
    if (close) { hideDrawer(); return; }
    const remove = target.closest("[data-remove-saved]");
    if (remove) {
      saved = saved.filter(item => item.url !== remove.dataset.removeSaved || item.name !== remove.dataset.removeName);
      persist(); return;
    }
    const save = target.closest("button[data-save]");
    if (save) {
      const entry = {url:save.dataset.url, name:save.dataset.name, city:save.dataset.city || ""};
      const index = saved.findIndex(item => item.url === entry.url && item.name === entry.name);
      if (index >= 0) saved.splice(index, 1);
      else saved.push(entry);
      persist(); return;
    }
    const share = target.closest("[data-share]");
    if (share) {
      const current = location.href;
      try {
        if (navigator.share) { await navigator.share({title:document.title,url:current}); return; }
        if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(current);share.textContent = "Link copied ✓"; return; }
      } catch {}
      share.textContent = "Share this page: " + current;
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && drawer && !drawer.hidden) hideDrawer();
  });
  repaint();
})();
