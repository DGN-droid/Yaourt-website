/* global gsap, ScrollTrigger */

const produits = [
  { nom: "YAOURT NATURE", description: "Pot Artisanal Bio", prix: "3,50€", categorie: "nature", sousCategorie: "nature", image: "asset/images/yaourt-nature.jpeg" },
  { nom: "YAOURT FRAISE", description: "Pot Gourmand aux Fruits", prix: "3,80€", categorie: "aromes", sousCategorie: "sans-lactose", image: "asset/images/yaourt-fraise.jpeg" },
  { nom: "YAOURT VANILLE", description: "Pot Crémeux Bourbon", prix: "3,90€", categorie: "dessert", sousCategorie: "fermier", image: "asset/images/yaourt-vanille.jpeg" },
  { nom: "YAOURT GREC", description: "Pot Épais Bio", prix: "4,10€", categorie: "nature", sousCategorie: "grec", image: "asset/images/yaourt-nature.jpeg" },
  { nom: "YAOURT CHÈVRE", description: "Pot Artisanal Fermier", prix: "4,50€", categorie: "nature", sousCategorie: "chevre", image: "asset/images/yaourt-vanille.jpeg" },
  { nom: "YAOURT MANGUE", description: "Pot Exotique Bio", prix: "4,20€", categorie: "aromes", sousCategorie: "brebis", image: "asset/images/yaourt-mangue.jpeg" },
];

const catalogue = [
  { marque: "NATURE BIO", desc: "Pot Artisanal 125g", prix: "3,50€", image: "asset/images/yaourt-nature.jpeg" },
  { marque: "FRAISE GOURMAND", desc: "Pot aux Fruits 125g", prix: "3,80€", image: "asset/images/yaourt-fraise.jpeg" },
  { marque: "VANILLE BOURBON", desc: "Pot Crémeux 125g", prix: "3,90€", image: "asset/images/yaourt-vanille.jpeg" },
  { marque: "GREC ONCTUEUX", desc: "Pot Épais 150g", prix: "4,10€", image: "asset/images/yaourt-nature.jpeg" },
  { marque: "CHÈVRE FERMIER", desc: "Pot Artisanal 125g", prix: "4,50€", image: "asset/images/yaourt-vanille.jpeg" },
  { marque: "MANGUE EXOTIQUE", desc: "Pot Bio 125g", prix: "4,20€", image: "asset/images/yaourt-mangue.jpeg" },
];

const panier = [];
const wishlist = [];
let produitActuel = 0;
let carouselTimer;
let transitionEnCours = false;
let detailSourceElement;
let filtreActif = "nature";
let rechercheActive = "";
let catalogueEnListe = false;

const getHeroElements = () => ({
  hero: document.querySelector(".hero"),
  sidebar: document.querySelector(".hero-sidebar"),
  image: document.querySelector(".product-image-main"),
  title: document.querySelector("#product-title"),
  description: document.querySelector(".hero__description"),
});

/** Transforme un chemin local en valeur CSS pour background-image. */
const asBackgroundImage = (imagePath) => `url("${imagePath}")`;

/** Animation d'entrée de la hero. */
function initHeroAnimation() {
  const { image, title, description } = getHeroElements();
  const secondaryImages = document.querySelectorAll(".product-image-blur-left, .product-image-blur-right");
  gsap.set(image, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
  gsap.set(secondaryImages, { autoAlpha: 0, filter: "blur(8px)" });
  gsap.set([title, description], { autoAlpha: 0, y: 20 });
  gsap.timeline({ defaults: { ease: "power2.out" } })
    .to(image, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 1 })
    .to(secondaryImages, { autoAlpha: 0.35, duration: 0.65, stagger: 0.14 }, 0.28)
    .to([title, description], { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 }, "+=0.3");
}

function appliquerProduit(produit) {
  const { image, title, description } = getHeroElements();
  image.style.backgroundImage = asBackgroundImage(produit.image);
  title.textContent = produit.nom;
  description.innerHTML = `${produit.description} <span aria-hidden="true">|</span> ${produit.prix}`;
}

function afficherProduitSuivant() {
  if (transitionEnCours || document.body.classList.contains("product-detail-open") || document.body.classList.contains("catalog-open")) return;
  const { image, title, description } = getHeroElements();
  transitionEnCours = true;
  produitActuel = (produitActuel + 1) % produits.length;
  gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: () => { transitionEnCours = false; } })
    .to(image, { autoAlpha: 0, filter: "blur(18px)", rotation: -3, scale: 0.96, duration: 0.42 }, 0)
    .to([title, description], { autoAlpha: 0, y: -8, duration: 0.28 }, 0)
    .add(() => appliquerProduit(produits[produitActuel]))
    .set(image, { rotation: 3, scale: 1.05 })
    .to(image, { autoAlpha: 1, filter: "blur(0px)", rotation: 0, scale: 1, duration: 0.72 })
    .to([title, description], { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.05 }, "<+0.08");
}

function startProductCarousel() {
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(afficherProduitSuivant, 3700);
}

function getFilteredProducts() {
  const normalizedSearch = rechercheActive.trim().toLocaleLowerCase("fr");
  return produits.map((produit, index) => ({ produit, fiche: catalogue[index], index })).filter(({ produit, fiche, index }) => {
    const categoryMatch = !filtreActif || filtreActif === "all" || (filtreActif === "bio" && [0, 3, 5].includes(index)) || produit.categorie === filtreActif || produit.sousCategorie === filtreActif;
    const searchable = `${produit.nom} ${produit.description} ${fiche.marque} ${fiche.desc}`.toLocaleLowerCase("fr");
    return categoryMatch && (!normalizedSearch || searchable.includes(normalizedSearch));
  });
}

/** Construit la grille ou la liste depuis le filtre actif. */
function renderProductGrid() {
  const grid = document.querySelector(".catalog-grid");
  const productsToRender = getFilteredProducts();
  grid.classList.toggle("is-list", catalogueEnListe);
  grid.innerHTML = productsToRender.length ? productsToRender.map(({ produit, fiche, index }) => `
    <article class="catalog-card" tabindex="0" role="button" aria-label="Voir ${fiche.marque}" data-product-index="${index}">
      <div class="catalog-card__image catalog__card-image catalog__list-image" style="background-image: url('${fiche.image}'); background-size: cover; background-position: center;"></div>
      <div class="catalog-card__heading"><span>${fiche.marque}</span><span class="catalog-card__price">${fiche.prix}</span></div>
      <p class="catalog-card__description">${fiche.desc}</p>
    </article>
  `).join("") : "<p class=\"catalog-empty\">Aucun yaourt ne correspond à cette sélection.</p>";
}

function initCatalogAnimation() {
  const cards = document.querySelectorAll(".catalog-card");
  gsap.set(cards, { autoAlpha: 0, y: 20 });
  gsap.to(cards, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" });
}

function updateCategoryActiveState(filter) {
  document.querySelectorAll("[data-category]").forEach((link) => {
    const active = link.dataset.category === filter;
    link.classList.toggle("is-active", active);
    link.toggleAttribute("aria-current", active);
  });
  document.querySelectorAll("[data-subcategory]").forEach((link) => {
    const active = link.dataset.subcategory === filter;
    link.classList.toggle("is-current", active);
    link.toggleAttribute("aria-current", active);
  });
}

/** Affiche le catalogue avec la vue et le filtre demandés. */
function showCatalog(event, filter = filtreActif, listView = catalogueEnListe) {
  event?.preventDefault();
  if (transitionEnCours || document.body.classList.contains("product-detail-open")) return;
  filtreActif = filter;
  catalogueEnListe = listView;
  updateCategoryActiveState(filter);
  updateViewToggles();
  renderProductGrid();
  const { hero } = getHeroElements();
  const catalog = document.querySelector(".product-catalog");
  window.clearInterval(carouselTimer);

  if (document.body.classList.contains("catalog-open")) {
    initCatalogAnimation();
    return;
  }
  transitionEnCours = true;
  catalog.style.display = "block";
  catalog.setAttribute("aria-hidden", "false");
  document.body.classList.add("catalog-open");
  gsap.set(catalog, { autoAlpha: 1 });
  gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: () => { transitionEnCours = false; } })
    .to(hero, { autoAlpha: 0, scale: 0.97, duration: 0.38 }, 0)
    .add(initCatalogAnimation, 0.12);
}

function updateViewToggles() {
  document.querySelectorAll("[data-catalog-view]").forEach((toggle) => {
    toggle.classList.toggle("is-active", toggle.dataset.catalogView === (catalogueEnListe ? "list" : "grid"));
  });
}

/** Met à jour la fiche, son format et l'état wishlist. */
function updateProductDetail(variant = 0) {
  const produit = produits[produitActuel];
  const detailImage = document.querySelector(".detail-product-image");
  const variantImage = variant === 1 ? produits[(produitActuel + 1) % produits.length].image : produit.image;
  detailImage.style.backgroundImage = asBackgroundImage(variantImage);
  document.querySelector(".detail-price").textContent = produit.prix;
  document.querySelector("#detail-product-title").textContent = produit.nom;
  document.querySelector(".detail-product-heading p").textContent = produit.description.replace(" Bio", "");
  updateWishlistButton();
}

function createImageProxy(source, destination) {
  const sourceRect = source.getBoundingClientRect();
  const destinationRect = destination.getBoundingClientRect();
  const proxy = source.cloneNode(false);
  proxy.className = "product-image-transition";
  proxy.style.backgroundImage = source.style.backgroundImage || getComputedStyle(source).backgroundImage;
  document.body.appendChild(proxy);
  gsap.set(proxy, { x: sourceRect.left, y: sourceRect.top, width: sourceRect.width, height: sourceRect.height });
  return { proxy, destinationRect };
}

/** Ouvre la fiche depuis la hero ou une carte, sans décaler les données. */
function showProductDetail(event, sourceImage = null) {
  event?.preventDefault();
  if (transitionEnCours || document.body.classList.contains("product-detail-open")) return;
  transitionEnCours = true;
  window.clearInterval(carouselTimer);
  const { hero, sidebar, image } = getHeroElements();
  const catalog = document.querySelector(".product-catalog");
  const detail = document.querySelector(".product-detail");
  const detailImage = document.querySelector(".detail-product-image");
  const revealItems = detail.querySelectorAll(".detail-price, .detail-variants, .format-select, .detail-product-heading, .detail-actions, .detail-description, .accordions");
  const openedFromCatalog = document.body.classList.contains("catalog-open");
  detailSourceElement = sourceImage || image;

  updateProductDetail();
  detail.style.display = "grid";
  detail.setAttribute("aria-hidden", "false");
  gsap.set(detail, { autoAlpha: 1 });
  const { proxy, destinationRect } = createImageProxy(detailSourceElement, detailImage);
  gsap.set(detailImage, { autoAlpha: 0 });
  gsap.set(revealItems, { autoAlpha: 0, y: 18 });
  document.body.classList.add("product-detail-open");

  gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: () => { transitionEnCours = false; } })
    .to(openedFromCatalog ? [catalog, sidebar] : [hero, sidebar], { autoAlpha: 0, scale: 0.95, duration: 0.42 }, 0)
    .to(proxy, { x: destinationRect.left, y: destinationRect.top, width: destinationRect.width, height: destinationRect.height, duration: 0.82, ease: "power3.inOut" }, 0.05)
    .set(detailImage, { autoAlpha: 1 })
    .to(revealItems, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.09 }, "-=0.32")
    .add(() => proxy.remove());
}

/** Retour explicite à la hero, quelle que soit la vue d'origine. */
function goBackToHero() {
  if (transitionEnCours) return;
  transitionEnCours = true;
  const { hero, sidebar, image } = getHeroElements();
  const catalog = document.querySelector(".product-catalog");
  const detail = document.querySelector(".product-detail");
  const detailImage = document.querySelector(".detail-product-image");
  const revealItems = detail.querySelectorAll(".detail-price, .detail-variants, .format-select, .detail-product-heading, .detail-actions, .detail-description, .accordions");
  const { proxy, destinationRect } = createImageProxy(detailImage, image);
  gsap.set(image, { autoAlpha: 0 });

  gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: () => {
    detail.style.display = "none";
    detail.setAttribute("aria-hidden", "true");
    catalog.style.display = "none";
    catalog.setAttribute("aria-hidden", "true");
    document.body.classList.remove("product-detail-open", "catalog-open");
    proxy.remove();
    transitionEnCours = false;
    startProductCarousel();
  } })
    .to(revealItems, { autoAlpha: 0, y: 12, duration: 0.22, stagger: 0.03 }, 0)
    .to(proxy, { x: destinationRect.left, y: destinationRect.top, width: destinationRect.width, height: destinationRect.height, duration: 0.76, ease: "power3.inOut" }, 0.08)
    .to(detail, { autoAlpha: 0, duration: 0.25 }, 0.35)
    .to(catalog, { autoAlpha: 0, duration: 0.2 }, 0)
    .set([hero, sidebar], { autoAlpha: 1, scale: 0.95 })
    .to([hero, sidebar], { autoAlpha: 1, scale: 1, duration: 0.42 }, "-=0.18")
    .set(image, { autoAlpha: 1 })
    .add(() => { detailImage.style.removeProperty("opacity"); });
}

/** Ramène immédiatement les liens globaux à la page d'accueil. */
function showHero(event) {
  event?.preventDefault();
  if (document.body.classList.contains("product-detail-open")) {
    goBackToHero();
    return;
  }
  const { hero, sidebar } = getHeroElements();
  const catalog = document.querySelector(".product-catalog");
  document.body.classList.remove("catalog-open");
  catalog.style.display = "none";
  catalog.setAttribute("aria-hidden", "true");
  gsap.to([hero, sidebar], { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" });
  startProductCarousel();
}

function initAccordions() {
  const items = document.querySelectorAll(".accordion-item");
  items.forEach((item) => item.querySelector(".accordion-trigger").addEventListener("click", () => {
    const trigger = item.querySelector(".accordion-trigger");
    const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
    items.forEach((otherItem) => {
      const otherTrigger = otherItem.querySelector(".accordion-trigger");
      const panel = otherItem.querySelector(".accordion-panel");
      if (otherItem === item && shouldOpen) {
        panel.hidden = false;
        gsap.fromTo(panel, { height: 0, autoAlpha: 0 }, { height: "auto", autoAlpha: 1, duration: 0.35, ease: "power2.out" });
        otherTrigger.setAttribute("aria-expanded", "true");
      } else if (otherTrigger.getAttribute("aria-expanded") === "true") {
        gsap.to(panel, { height: 0, autoAlpha: 0, duration: 0.25, onComplete: () => { panel.hidden = true; gsap.set(panel, { clearProps: "height,opacity" }); } });
        otherTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }));
}

function updateCart() {
  const count = document.querySelector(".cart-count");
  const list = document.querySelector(".cart-items");
  const empty = document.querySelector(".cart-empty");
  const total = document.querySelector("[data-cart-total]");
  const checkout = document.querySelector("[data-checkout]");
  count.textContent = panier.length;
  count.setAttribute("aria-label", `${panier.length} produit${panier.length > 1 ? "s" : ""} dans le panier`);
  list.innerHTML = panier.map((item, index) => `<div class="cart-item"><span>${item.nom} · ${item.format}</span><span class="cart-item__price">${item.prix}</span><button class="cart-item__remove" type="button" aria-label="Retirer ${item.nom} du panier" data-remove-cart-item="${index}">×</button></div>`).join("");
  empty.hidden = panier.length > 0;
  const amount = panier.reduce((sum, item) => sum + Number(item.prix.replace("€", "").replace(",", ".")), 0);
  total.textContent = `${amount.toFixed(2).replace(".", ",")}€`;
  checkout.disabled = panier.length === 0;
}

function showToast(message) {
  const toast = document.querySelector(".toast");
  toast.textContent = message;
  gsap.killTweensOf(toast);
  gsap.timeline().to(toast, { autoAlpha: 1, y: 0, duration: 0.2 }).to(toast, { autoAlpha: 0, y: 15, duration: 0.25, delay: 2 });
}

function addCurrentProductToCart() {
  const format = document.querySelector(".format-select select").value;
  panier.push({ ...produits[produitActuel], format });
  updateCart();
  gsap.fromTo(".cart-count", { scale: 1 }, { scale: 1.45, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" });
  showToast("Produit ajouté au panier");
}

function openCart() {
  const drawer = document.querySelector(".cart-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  backdrop.hidden = false;
  drawer.setAttribute("aria-hidden", "false");
  gsap.to(backdrop, { autoAlpha: 1, duration: 0.2 });
  gsap.to(drawer, { xPercent: -100, duration: 0.35, ease: "power3.out" });
}

function closeCart() {
  const drawer = document.querySelector(".cart-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  drawer.setAttribute("aria-hidden", "true");
  gsap.to(drawer, { xPercent: 0, duration: 0.3, ease: "power2.in" });
  gsap.to(backdrop, { autoAlpha: 0, duration: 0.2, onComplete: () => { backdrop.hidden = true; } });
}

/** Retire une ligne du panier sans affecter les autres produits. */
function removeCartItem(index) {
  const removedProduct = panier.splice(index, 1)[0];
  updateCart();
  showToast(`${removedProduct.nom} retiré du panier`);
}

/** Simule la validation d'une commande puis vide le panier local. */
function placeOrder() {
  if (!panier.length) return;
  panier.length = 0;
  updateCart();
  closeCart();
  showToast("Commande confirmée — merci !");
}

function updateWishlistButton() {
  const button = document.querySelector("[data-wishlist-toggle]");
  const selected = wishlist.includes(produitActuel);
  button.textContent = selected ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(selected));
  button.setAttribute("aria-label", selected ? "Retirer de la wishlist" : "Ajouter à la wishlist");
}

function toggleWishlist() {
  const index = wishlist.indexOf(produitActuel);
  if (index === -1) wishlist.push(produitActuel); else wishlist.splice(index, 1);
  updateWishlistButton();
  showToast(index === -1 ? "Produit ajouté à la wishlist" : "Produit retiré de la wishlist");
}

function toggleSearch() {
  const panel = document.querySelector(".header-search");
  const input = document.querySelector("[data-header-search-input]");
  const opening = panel.getAttribute("aria-hidden") === "true";
  panel.setAttribute("aria-hidden", String(!opening));
  gsap.to(panel, { width: opening ? 250 : 0, autoAlpha: opening ? 1 : 0, duration: 0.25, ease: "power2.out", onComplete: () => { if (opening) input.focus(); } });
}

function toggleLanguageMenu() {
  const toggle = document.querySelector("[data-language-toggle]");
  const menu = document.querySelector(".language-dropdown");
  const open = menu.hidden;
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  if (open) gsap.fromTo(menu, { autoAlpha: 0, y: -5 }, { autoAlpha: 1, y: 0, duration: 0.18 });
}

/** Tous les écouteurs sont initialisés de façon centralisée après le DOM. */
function initEventListeners() {
  document.querySelector(".button-pill").addEventListener("click", showProductDetail);
  document.querySelector(".detail-back").addEventListener("click", goBackToHero);
  document.querySelector("[data-home-link]").addEventListener("click", showHero);
  document.querySelectorAll("[data-nav-filter]").forEach((link) => link.addEventListener("click", (event) => showCatalog(event, link.dataset.navFilter)));
  document.querySelectorAll("[data-category]").forEach((link) => link.addEventListener("click", (event) => showCatalog(event, link.dataset.category)));
  document.querySelectorAll("[data-subcategory]").forEach((link) => link.addEventListener("click", (event) => showCatalog(event, link.dataset.subcategory)));
  document.querySelectorAll("[data-catalog-view]").forEach((toggle) => toggle.addEventListener("click", (event) => {
    const filter = toggle.closest(".hero") ? "all" : filtreActif;
    showCatalog(event, filter, toggle.dataset.catalogView === "list");
  }));
  document.querySelector("[data-search-toggle]").addEventListener("click", toggleSearch);
  document.querySelector("[data-header-search-input]").addEventListener("input", (event) => { rechercheActive = event.target.value; showCatalog(null, filtreActif, catalogueEnListe); });
  document.querySelector(".sidebar-search input").addEventListener("input", (event) => { rechercheActive = event.target.value; showCatalog(null, filtreActif, catalogueEnListe); });
  document.querySelector("[data-cart-toggle]").addEventListener("click", openCart);
  document.querySelector("[data-cart-close]").addEventListener("click", closeCart);
  document.querySelector(".drawer-backdrop").addEventListener("click", closeCart);
  document.querySelector(".cart-items").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-cart-item]");
    if (removeButton) removeCartItem(Number(removeButton.dataset.removeCartItem));
  });
  document.querySelector("[data-checkout]").addEventListener("click", placeOrder);
  document.querySelector("[data-add-to-cart]").addEventListener("click", addCurrentProductToCart);
  document.querySelector("[data-wishlist-toggle]").addEventListener("click", toggleWishlist);
  document.querySelectorAll("[data-variant]").forEach((swatch) => swatch.addEventListener("click", () => {
    document.querySelectorAll("[data-variant]").forEach((item) => { const active = item === swatch; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
    updateProductDetail(Number(swatch.dataset.variant));
  }));
  document.querySelector(".format-select select").addEventListener("change", () => showToast("Format mis à jour"));
  document.querySelector("[data-language-toggle]").addEventListener("click", toggleLanguageMenu);
  document.querySelectorAll("[data-language]").forEach((option) => option.addEventListener("click", () => {
    document.querySelector(".language-current").textContent = option.dataset.language;
    document.querySelector(".language-dropdown").hidden = true;
    document.querySelector("[data-language-toggle]").setAttribute("aria-expanded", "false");
  }));
  document.querySelector("[data-wishlist-link]").addEventListener("click", (event) => { event.preventDefault(); showToast(`${wishlist.length} produit${wishlist.length > 1 ? "s" : ""} dans votre wishlist`); });
  document.querySelector("[data-blog-link]").addEventListener("click", (event) => { event.preventDefault(); showToast("Le journal arrive bientôt"); });
  const grid = document.querySelector(".catalog-grid");
  grid.addEventListener("click", (event) => { const card = event.target.closest(".catalog-card"); if (card) { produitActuel = Number(card.dataset.productIndex); showProductDetail(null, card.querySelector(".catalog-card__image")); } });
  grid.addEventListener("keydown", (event) => { const card = event.target.closest(".catalog-card"); if (card && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); produitActuel = Number(card.dataset.productIndex); showProductDetail(null, card.querySelector(".catalog-card__image")); } });
  grid.addEventListener("mouseover", (event) => { const image = event.target.closest(".catalog-card__image"); if (image) gsap.to(image, { scale: 1.03, boxShadow: "0 12px 27px rgba(0, 0, 0, 0.09)", duration: 0.2 }); });
  grid.addEventListener("mouseout", (event) => { const image = event.target.closest(".catalog-card__image"); if (image && !image.contains(event.relatedTarget)) gsap.to(image, { scale: 1, boxShadow: "0 0 0 rgba(0, 0, 0, 0)", duration: 0.2 }); });
}

function init() {
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
  renderProductGrid();
  updateCart();
  updateWishlistButton();
  document.querySelector(".review-count").textContent = Math.floor(Math.random() * 41) + 10;
  initHeroAnimation();
  initAccordions();
  initEventListeners();
  startProductCarousel();
}

document.addEventListener("DOMContentLoaded", init);
