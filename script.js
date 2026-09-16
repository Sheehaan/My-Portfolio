/* =========================================================
   ALL YOUR CONTENT LIVES HERE.
   Edit the text inside the quotes " " below. Save the file,
   refresh the page in your browser — that's it, no build step.

   IMAGES:
   1. Make a folder called "images" right next to index.html.
   2. Put your photos/logos/posters in that folder.
   3. Point to them like:  img: "images/aurelia-logo.jpg"
   (Web links like "https://..." also work if you prefer those.)
   ========================================================= */
const DATA = {
  name: "Sheehanul Islam",
  role: "Designer, creator and writer.",
  availability: "Available for freelance work",
  tagline: "I build visual identities, graphics, lyrics and stories that turn ideas into something people actually feel.",
  bio: "I'm a designer and writer working where images and language meet. My work usually begins with a conversation — a brand looking for its voice, a feeling that needs a shape, a line that won't leave me alone until it's written down. I've built logos for small studios, drawn posters and layouts, and filled notebooks with lyrics and stories.",

  portraitImg: "images/portrait.jpg",
  portraitCaption: "Studio, late afternoon",

  contactNote: "Whether it's a logo, a poster, or a story that needs telling — I'd love to hear about it.",
  emailHref: "mailto:hello@example.com",
  emailLabel: "Email me",
  footerRole: "Designer · Creator · Storyteller",

  // Social icons shown in the Contact section, in this order.
  // icon options: instagram, facebook, linkedin, behance, dribbble, pinterest, email
  social: [
    { name: "Instagram", url: "https://instagram.com/sheehan.rn?stkn=cGFqeDJleHdrN3Bo", icon: "instagram" },
    { name: "Behance",   url: "https://behance.net/sheehaanulislamrne/projects",   icon: "behance" },
    { name: "LinkedIn",  url: "https://linkedin.com/in/sheehaan-ul-islam-a17b7b3b1?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: "linkedin" },
    { name: "Facebook",  url: "https://facebook.com/share/19DySCuioT/",  icon: "facebook" },
    { name: "Pinterest", url: "https://pin.it/3ZPcRfamb", icon: "pinterest" },
    { name: "Email",     url: "mailto:sheehaanulislam@gmail.com", icon: "email" }
  ],

  // --------------------------------------------------------
  // The 4 sections. Add as many items as you like inside each
  // "items" array — just copy an existing { ... } block, add a
  // comma after the previous one, and fill in your own details.
  // --------------------------------------------------------
  categories: {
    logo: {
      label: "Logo Design",
      items: [
        {
          title: "Aurelia Coffee House",
          meta: "Logo Design — 2025",
          desc: "A monogram identity built around warmth and paper.",
          img: "images/logo-aurelia.jpg"
        }
      ]
    },
    graphic: {
      label: "Graphic Design",
      items: [
        {
          title: "RIFF Film Festival",
          meta: "Graphic Design — 2025",
          desc: "A typographic poster series printed in two inks.",
          img: "images/graphic-riff.jpg"
        }
      ]
    },
    lyrics: {
      label: "Lyrics",
      items: [
        {
          // "img" is optional for lyrics — leave it out for a text-only card,
          // or add one (e.g. a mood photo) if you want an image on the card.
          title: "Paper Boats",
          meta: "Lyrics — 2026",
          desc: "We folded the evening into something that floats.",
          // "content" is the FULL lyrics — shown when the card is clicked.
          // Use \n for a line break, \n\n for a new verse/paragraph.
          content: "We folded the evening into something that floats,\nand let the small rain carry it away.\n\nVerse two goes here — replace with your real lyrics.\nLine two of verse two.\n\nChorus — replace with your real lyrics.\nLine two of chorus."
        }
      ]
    },
    story: {
      label: "Story",
      items: [
        {
          title: "The Long Way Home",
          meta: "Story — 2026",
          desc: "A short story about taking the slow road on purpose.",
          content: "Write your full story here.\n\nUse a blank line to start a new paragraph, like this one.\n\nKeep going for as long as the story needs — the card will scroll if it's long."
        }
      ]
    }
  }
};

let activeCategory = null;

/* ---------- simple text fields bound with data-field ---------- */
function bindSimpleFields() {
  document.querySelectorAll("[data-field]").forEach(el => {
    const field = el.dataset.field;
    if (field === "portraitImg") return;
    if (DATA[field] !== undefined) el.textContent = DATA[field];
  });
  const portraitImg = document.querySelector('img[data-field="portraitImg"]');
  if (portraitImg) portraitImg.src = DATA.portraitImg;
  document.getElementById("emailBtn").setAttribute("href", DATA.emailHref);
}

/* ---------- category tiles ---------- */
const CATEGORY_ICONS = {
  logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l7 4v6c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7l7-4z"/><path d="M9.5 12.5l1.8 1.8 3.2-3.6"/></svg>',
  graphic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M3 14l4.5-4 3 3L16 8l5 5"/><circle cx="8" cy="8" r="1.4"/></svg>',
  lyrics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.3"/><circle cx="16.5" cy="16" r="2.3"/></svg>',
  story: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13z"/></svg>'
};

function renderCategoryTiles() {
  const grid = document.getElementById("categoryGrid");
  grid.innerHTML = "";
  Object.entries(DATA.categories).forEach(([key, cat]) => {
    const btn = document.createElement("button");
    btn.className = "category-tile" + (activeCategory === key ? " active" : "");
    btn.innerHTML = `
      <span class="category-tile__icon">${CATEGORY_ICONS[key] || ""}</span>
      <span class="category-tile__title">${escapeHTML(cat.label)}</span>
      <span class="category-tile__count">${cat.items.length} item${cat.items.length === 1 ? "" : "s"}</span>
      <span class="category-tile__arrow">→</span>`;
    btn.addEventListener("click", () => openCategory(key));
    grid.appendChild(btn);
  });
}

function openCategory(key) {
  activeCategory = key;
  renderCategoryTiles();
  renderItemGrid();
  document.getElementById("categoryPanel").hidden = false;
  document.getElementById("categoryPanelTitle").textContent = DATA.categories[key].label;
  document.getElementById("categoryPanel").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeCategory() {
  activeCategory = null;
  document.getElementById("categoryPanel").hidden = true;
  renderCategoryTiles();
}

/* ---------- item cards within a category ---------- */
function renderItemGrid() {
  const grid = document.getElementById("itemGrid");
  grid.innerHTML = "";
  if (!activeCategory) return;
  const cat = DATA.categories[activeCategory];

  cat.items.forEach((item) => {
    const card = document.createElement("div");
    const hasImage = !!item.img;
    card.className = "item-card" + (hasImage ? "" : " item-card--text");
    card.innerHTML = `
      ${hasImage ? `<div class="item-card__media"><img src="${escapeAttr(item.img)}" alt="${escapeAttr(item.title)}"></div>` : ""}
      <div class="item-card__body">
        <p class="item-card__meta">${escapeHTML(item.meta || "")}</p>
        <h4 class="item-card__title">${escapeHTML(item.title)}</h4>
        <p class="item-card__desc">${escapeHTML(item.desc || "")}</p>
        ${item.content ? `<span class="item-card__readmore">Read full ${activeCategory === "lyrics" ? "lyrics" : "story"} →</span>` : ""}
      </div>`;
    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);
  });
}

/* ---------- detail modal (click a card to open) ---------- */
function openModal(item) {
  const modal = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  content.innerHTML = `
    ${item.img ? `<div class="modal-media"><img src="${escapeAttr(item.img)}" alt="${escapeAttr(item.title)}"></div>` : ""}
    <p class="modal-meta">${escapeHTML(item.meta || "")}</p>
    <h3 class="modal-title">${escapeHTML(item.title)}</h3>
    ${item.content
      ? `<p class="modal-text">${escapeHTML(item.content)}</p>`
      : `<p class="modal-desc">${escapeHTML(item.desc || "")}</p>`}
  `;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").hidden = true;
  document.body.style.overflow = "";
}

/* ---------- social icons ---------- */
const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 8h-2a2 2 0 0 0-2 2v10M8 13h6"/><path d="M15 3H9a6 6 0 0 0-6 6v6a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V9a6 6 0 0 0-6-6z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/><path d="M12 16v-3a2 2 0 0 1 4 0v3"/></svg>',
  behance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 7h6M2 7v10h5a3 3 0 0 0 0-6H2m3 0h1.5a2 2 0 0 0 0-4H2"/><path d="M14 15.5a3.5 3.5 0 0 0 6.9-1H14a3.5 3.5 0 0 0 6.5 2"/><path d="M14 11h6"/></svg>',
  dribbble: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M4 9c4 1.5 12 1 16-1M4.5 16c4-3 11-3.5 15 0M8 3.5c3 4 4 9 3 16.5"/></svg>',
  pinterest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9.5 19c1-3 1.8-6 2.3-8.3a2.3 2.3 0 1 1 3 2c-.3 1.4-1.3 2.3-2.5 2.3M9 12.5a3 3 0 0 1 5.8-1"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
};

function renderSocialRow() {
  const row = document.getElementById("socialRow");
  row.innerHTML = "";
  DATA.social.forEach(item => {
    const a = document.createElement("a");
    a.className = "social-icon";
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.title = item.name;
    a.innerHTML = ICONS[item.icon] || ICONS.email;
    row.appendChild(a);
  });
}

/* ---------- helpers ---------- */
function escapeHTML(str) {
  return String(str ?? "").replace(/[&<>"]/g, s => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[s]));
}
function escapeAttr(str) { return escapeHTML(str); }

/* ---------- init ---------- */
function init() {
  bindSimpleFields();
  renderCategoryTiles();
  renderSocialRow();

  document.getElementById("categoryPanelClose").addEventListener("click", closeCategory);
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

init();