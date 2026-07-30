/* global gsap, ScrollTrigger */

const EUR_TO_CFA_RATE = 655;
const FCFA_STEP = 50;
let currentLang = "fr";

const translations = {
  fr: {
    nav: {
      yaourt: "YAOURT",
      dessert: "DESSERT",
      plats: "PLATS",
      wishlist: "Wishlist",
      blog: "Blog",
      search: "Rechercher",
      cart: "Panier",
      language: "FR",
      home: "Yaourt, accueil",
    },
    hero: {
      eyebrow: "Collection essentielle",
      button: "Voir plus",
      empty: "Aucun produit ne correspond à cette sélection.",
    },
    detail: {
      back: "← Retour",
      chooseFormat: "Choisir le format",
      formatLabel: "Format :",
      formats: ["Format : 125g", "Format : 150g", "Format : 200g"],
      addToCart: "Ajouter au panier",
      wishlistAdd: "Ajouter à la wishlist",
      wishlistRemove: "Retirer de la wishlist",
      accordion: ["Détails", "Livraison et Retours", "Avis"],
      accordionContent: [
        "Ingrédients : lait entier bio fermenté. Lait collecté en France. À conserver entre 0°C et 6°C.",
        "Livraison réfrigérée sous 48 h. Les retours sont possibles pour tout produit non ouvert, selon nos conditions.",
        "Nos clients apprécient sa texture crémeuse, son goût franc et sa simplicité.",
      ],
      close: "Fermer le panier",
      searchPlaceholder: "RECHERCHER",
      cartTitle: "Panier",
      cartEmpty: "Votre panier est vide.",
      checkout: "Passer commande",
      checkoutTitle: "Veuillez nous écrire pour passer votre commande",
      checkoutSubtitle: "Notre équipe vous répond rapidement pour confirmer votre commande.",
      priceTotal: "Total",
      formatUpdated: "Format mis à jour",
      productCountLabel: (count) => `${count} produit${count > 1 ? "s" : ""} dans le panier`,
      reviewPrefix: "Avis",
    },
    toasts: {
      addedToCart: "Produit ajouté au panier",
      removedFromWishlist: "Produit retiré de la wishlist",
      addedToWishlist: "Produit ajouté à la wishlist",
      formatUpdated: "Format mis à jour",
      orderPlaced: "Commande confirmée — merci !",
      itemRemoved: (name) => `${name} retiré du panier`,
    },
    catalog: {
      empty: "Aucun produit ne correspond à cette sélection.",
    },
    misc: {
      openSearch: "Rechercher",
      searchPlaceholder: "RECHERCHER",
      reviewLabel: "Avis",
      detailsTitle: "Détails",
    },
  },
  en: {
    nav: {
      yaourt: "YOGURT",
      dessert: "DESSERT",
      plats: "PLATES",
      wishlist: "Wishlist",
      blog: "Blog",
      search: "Search",
      cart: "Cart",
      language: "EN",
      home: "Seton’s Delight, home",
    },
    hero: {
      eyebrow: "Essential collection",
      button: "View more",
      empty: "No product matches this selection.",
    },
    detail: {
      back: "← Back",
      chooseFormat: "Choose the format",
      formatLabel: "Format :",
      formats: ["Format : 125g", "Format : 150g", "Format : 200g"],
      addToCart: "Add to cart",
      wishlistAdd: "Add to wishlist",
      wishlistRemove: "Remove from wishlist",
      accordion: ["Details", "Delivery & Returns", "Reviews"],
      accordionContent: [
        "Ingredients: whole organic fermented milk. Milk collected in France. Keep between 0°C and 6°C.",
        "Refrigerated delivery within 48 hours. Returns are possible for any unopened product, as per our conditions.",
        "Our customers appreciate its creamy texture, its straightforward taste, and its simplicity.",
      ],
      close: "Close cart",
      searchPlaceholder: "SEARCH",
      cartTitle: "Cart",
      cartEmpty: "Your cart is empty.",
      checkout: "Checkout",
      checkoutTitle: "Please message us to place your order",
      checkoutSubtitle: "Our team will reply quickly to confirm your order.",
      priceTotal: "Total",
      formatUpdated: "Format updated",
      productCountLabel: (count) => `${count} product${count > 1 ? "s" : ""} in the cart`,
      reviewPrefix: "Reviews",
    },
    toasts: {
      addedToCart: "Product added to cart",
      removedFromWishlist: "Product removed from wishlist",
      addedToWishlist: "Product added to wishlist",
      formatUpdated: "Format updated",
      orderPlaced: "Order confirmed — thank you!",
      itemRemoved: (name) => `${name} removed from cart`,
    },
    catalog: {
      empty: "No product matches this selection.",
    },
    misc: {
      openSearch: "Search",
      searchPlaceholder: "SEARCH",
      reviewLabel: "Reviews",
      detailsTitle: "Details",
    },
  },
};

const productTextMap = {
  "YAOURT NATURE": { fr: { nom: "YAOURT NATURE", description: "Pot Artisanal Bio", longDescription: "Un yaourt nature au lait entier bio, lentement brassé pour une texture généreuse, douce et délicatement acidulée." }, en: { nom: "NATURAL YOGURT", description: "Artisanal Pot", longDescription: "A creamy whole-milk organic yogurt, slowly blended for a rich, smooth, gently tangy texture." } },
  "YAOURT À BOIRE": { fr: { nom: "YAOURT À BOIRE", description: "Boisson Lactée Fraîche", longDescription: "Une boisson lactée accessible, fluide et rafraîchissante pour une pause légère." }, en: { nom: "DRINKABLE YOGURT", description: "Fresh Dairy Drink", longDescription: "A light, refreshing dairy drink offering a smooth, easy-to-enjoy daily sip." } },
  "POTS DE YAOURT": { fr: { nom: "POTS DE YAOURT", description: "Assortiment Artisanal", longDescription: "Un assortiment de pots artisanaux, généreux et doux pour chaque moment gourmand." }, en: { nom: "YOGURT CUPS", description: "Artisanal Selection", longDescription: "A curated selection of artisan cups with a rich, balanced, creamy character." } },
  "CRÊPES MAISON": { fr: { nom: "CRÊPES MAISON", description: "Crêpes Fines Traditionnelles", longDescription: "Des crêpes maison à la pâte souple et parfumée, servies dans un esprit généreux et simple." }, en: { nom: "HOMEMADE CRÊPES", description: "Traditional Fine Pancakes", longDescription: "A homemade crêpe selection with a soft, fragrant batter and a warm handmade feel." } },
  "CRÊPES GOURMANDES": { fr: { nom: "CRÊPES GOURMANDES", description: "Crêpes Roulées", longDescription: "Des crêpes gourmandes roulées pour un service généreux et visuellement équilibré." }, en: { nom: "GOURMET CRÊPES", description: "Rolled Pancakes", longDescription: "Rich rolled pancakes made for a soft, indulgent and neatly presented service." } },
  "CRÊPE CHOCOLAT": { fr: { nom: "CRÊPE CHOCOLAT", description: "Crêpe Nappée de Chocolat", longDescription: "Une crêpe généreusement nappée de chocolat, douce et fondante à chaque bouchée." }, en: { nom: "CHOCOLATE CRÊPE", description: "Chocolate-Coated Pancake", longDescription: "A generously chocolate-covered pancake, silky and indulgent from the first bite." } },
  "SABLÉS CHOCOLAT VANILLE": { fr: { nom: "SABLÉS CHOCOLAT VANILLE", description: "Biscuits Pur Beurre", longDescription: "Des sablés aux notes de chocolat et vanille, fondants et généreux en beurre." }, en: { nom: "CHOCOLATE VANILLA COOKIES", description: "Pure Butter Biscuits", longDescription: "Butter-rich cookies with notes of chocolate and vanilla, softly indulgent and balanced." } },
  "BROCHETTES DE VIANDE": { fr: { nom: "BROCHETTES DE VIANDE", description: "Brochettes de Bœuf Grillées", longDescription: "Des brochettes de bœuf grillées, généreuses et parfumées pour un plat de caractère." }, en: { nom: "MEAT SKEWERS", description: "Grilled Beef Skewers", longDescription: "Grilled beef skewers with deep smoky aroma and a bold, satisfying finish." } },
  "BROCHETTES GRILLÉES": { fr: { nom: "BROCHETTES GRILLÉES", description: "Brochettes de Viande Grillée", longDescription: "Des brochettes grillées à l’assemblage simple, parfumées et bien dorées." }, en: { nom: "GRILLED SKEWERS", description: "Grilled Meat Skewers", longDescription: "A grilled skewer selection with a smoky finish and a hearty feel." } },
  "BROCHETTES LÉGUMES": { fr: { nom: "BROCHETTES LÉGUMES", description: "Brochettes Végétariennes", longDescription: "Des brochettes végétariennes à la cuisson précise, colorées et généreuses en légumes." }, en: { nom: "VEGETABLE SKEWERS", description: "Vegetarian Skewers", longDescription: "Colorful grilled vegetable skewers that stay vibrant, fresh and generous in flavor." } },
  "BROCHETTES VIANDE LÉGUMES": { fr: { nom: "BROCHETTES VIANDE LÉGUMES", description: "Brochettes Mixtes Grillées", longDescription: "Un mélange harmonieux de viande et légumes, grillé pour un goût bien fondant." }, en: { nom: "MEAT & VEG SKEWERS", description: "Mixed Grilled Skewers", longDescription: "A harmonious blend of meat and vegetables, grilled for a mellow, well-balanced taste." } },
  "GOMBO": { fr: { nom: "GOMBO", description: "Sauce Gombo Traditionnelle", longDescription: "Une sauce gombo traditionnelle, riche et parfumée pour un repas chaleureux." }, en: { nom: "GOMBO", description: "Traditional Gombo Sauce", longDescription: "A rich traditional gombo sauce, fragrant and velvety for a warm meal." } },
  "GOMBO À EMPORTER": { fr: { nom: "GOMBO À EMPORTER", description: "Sauce Gombo à Emporter", longDescription: "La même richesse du gombo, pensée pour une dégustation à emporter." }, en: { nom: "TAKEAWAY GOMBO", description: "Takeaway Gombo Sauce", longDescription: "The same rich gombo profile, made for a convenient takeaway experience." } },
  "GRATIN DE PÂTES": { fr: { nom: "GRATIN DE PÂTES", description: "Gratin Maison", longDescription: "Un gratin de pâtes au cœur fondant, généreux et réconfortant à la casserole." }, en: { nom: "PASTA GRATIN", description: "Homestyle Gratin", longDescription: "A comforting baked pasta gratin with a creamy, mellow center and homemade warmth." } },
  "PÂTES AUX SAUCISSES": { fr: { nom: "PÂTES AUX SAUCISSES", description: "Pâtes Gourmandes", longDescription: "Des pâtes généreuses servies avec des saucisses à la saveur rassasiante." }, en: { nom: "SAUSAGE PASTA", description: "Savory Pasta", longDescription: "Hearty pasta served with sausages for a satisfying, rich and flavorful plate." } },
  "PÂTES AUX LÉGUMES": { fr: { nom: "PÂTES AUX LÉGUMES", description: "Pâtes Sautées aux Légumes", longDescription: "Des pâtes sautées aux légumes, légères et colorées dans une préparation rapide." }, en: { nom: "VEGETABLE PASTA", description: "Sautéed Vegetable Pasta", longDescription: "Sautéed pasta with vegetables, lively, colorful and balanced for everyday comfort." } },
  "PENNE SAUCE CRÉMEUSE": { fr: { nom: "PENNE SAUCE CRÉMEUSE", description: "Penne à la Crème", longDescription: "Des penne à la sauce crémeuse, lisses et généreuses dans un service réconfortant." }, en: { nom: "CREAMY PENNE", description: "Creamy Penne", longDescription: "Penne in a silky creamy sauce, smooth and deeply comforting in every forkful." } },
  "POISSON SAUCE TOMATE": { fr: { nom: "POISSON SAUCE TOMATE", description: "Poisson Mijoté", longDescription: "Un poisson mijoté à la sauce tomate, généreux, parfumé et équilibré." }, en: { nom: "FISH IN TOMATO SAUCE", description: "Slow-Cooked Fish", longDescription: "Slow-cooked fish in tomato sauce, rich in aroma and balanced in every bite." } },
  "RIZ AUX LÉGUMES": { fr: { nom: "RIZ AUX LÉGUMES", description: "Riz Sauté aux Légumes", longDescription: "Un riz sauté aux légumes, bien parfumé et prêt à accueillir une assiette équilibrée." }, en: { nom: "VEGETABLE RICE", description: "Sautéed Rice with Veg", longDescription: "A fragrant vegetable rice dish with a bright, balanced and wholesome profile." } },
  "RIZ AUX LÉGUMES 2": { fr: { nom: "RIZ AUX LÉGUMES 2", description: "Riz aux Légumes Variante", longDescription: "Une variante de riz aux légumes, savoureuse et légère pour un accueil rapide." }, en: { nom: "VEGETABLE RICE VARIATION", description: "Vegetable Rice Variant", longDescription: "A lighter vegetable rice variation, flavorful and easy to enjoy." } },
  "RIZ AU POULET": { fr: { nom: "RIZ AU POULET", description: "Riz Épicé au Poulet", longDescription: "Un riz épicé au poulet, généreux en arômes et impeccable pour les repas maison." }, en: { nom: "CHICKEN RICE", description: "Spiced Chicken Rice", longDescription: "A richly spiced chicken rice dish with bold flavors and a comforting finish." } },
  "RIZ AVEC LÉGUMES": { fr: { nom: "RIZ AVEC LÉGUMES", description: "Riz Complet aux Légumes", longDescription: "Un riz complet aux légumes, naturel et généreux dans son équilibre calorique." }, en: { nom: "VEGGIE RICE", description: "Whole Rice with Vegetables", longDescription: "A wholesome rice dish with vegetables, balanced, natural and generously textured." } },
  "RIZ AVEC LÉGUMES 2": { fr: { nom: "RIZ AVEC LÉGUMES 2", description: "Riz aux Légumes Variante", longDescription: "Une seconde variante de riz complet aux légumes, au parfum soigné et stable." }, en: { nom: "VEGGIE RICE VARIATION", description: "Vegetable Rice Variant", longDescription: "A second wholesome rice variation with a smooth, well-seasoned finish." } },
  "RIZ JAUNE": { fr: { nom: "RIZ JAUNE", description: "Riz Parfumé au Curcuma", longDescription: "Un riz jaune parfumé au curcuma, généreux et naturellement coloré." }, en: { nom: "YELLOW RICE", description: "Turmeric Rice", longDescription: "A fragrant turmeric yellow rice, naturally colorful and richly aromatic." } },
  "RIZ JOLLOF": { fr: { nom: "RIZ JOLLOF", description: "Riz Jollof Traditionnel", longDescription: "Un riz jollof traditionnel au profil aromatique maîtrisé et généreux." }, en: { nom: "JOLLOF RICE", description: "Traditional Jollof Rice", longDescription: "A traditional jollof rice with a well-balanced aromatic profile and a rich, inviting feel." } },
  "SALADE COMPOSÉE": { fr: { nom: "SALADE COMPOSÉE", description: "Salade Fraîcheur", longDescription: "Une salade composée légère, vivante et colorée, pensée pour l’équilibre et la fraîcheur." }, en: { nom: "COMPOSED SALAD", description: "Fresh Salad", longDescription: "A lively, colorful composed salad built for lightness and freshness." } },
  "SALADE DE LÉGUMES": { fr: { nom: "SALADE DE LÉGUMES", description: "Salade Fraîche", longDescription: "Une salade de légumes fraîche et monocrome, pensée comme fondation de repas simples." }, en: { nom: "VEGETABLE SALAD", description: "Fresh Salad", longDescription: "A crisp vegetable salad designed as a clean, simple and refreshing meal base." } },
  "SALADE DE PÂTES": { fr: { nom: "SALADE DE PÂTES", description: "Salade de Pâtes Fraîche", longDescription: "Une salade de pâtes fraîche et généreuse, parfaite pour un repas léger et rassasiant." }, en: { nom: "PASTA SALAD", description: "Fresh Pasta Salad", longDescription: "A fresh and generous pasta salad built for a light, satisfying and easy meal." } },
  "SALADE MULTICOLORE": { fr: { nom: "SALADE MULTICOLORE", description: "Salade de Légumes Variés", longDescription: "Une salade multicolore aux légumes variés, vivante et pleine de fraîcheur." }, en: { nom: "MULTICOLORE SALAD", description: "Assorted Vegetable Salad", longDescription: "A multicolor assorted vegetable salad, vivid, fresh and pleasantly varied in taste." } },
  "SPAGHETTI SAUCE TOMATE": { fr: { nom: "SPAGHETTI SAUCE TOMATE", description: "Spaghetti Maison", longDescription: "Un spaghetti maison à la sauce tomate, classique, doux et rassasiant." }, en: { nom: "SPAGHETTI IN TOMATO SAUCE", description: "Homestyle Spaghetti", longDescription: "A classic homemade spaghetti with tomato sauce, comforting, mellow and satisfying." } },
};

function formatCfaPrice(amount) {
  return `${new Intl.NumberFormat("fr-FR").format(Math.round(amount / FCFA_STEP) * FCFA_STEP)} FCFA`;
}

function parseCfaPrice(value) {
  return Number(String(value).replace(/\s/g, "").replace("FCFA", ""));
}

function getLocalizedText(product, field = "nom", lang = currentLang) {
  const data = productTextMap[product.nom];
  if (data && data[lang] && data[lang][field]) return data[lang][field];
  return product[field] || product.description || "";
}

function getLocalizedLongDescription(product, lang = currentLang) {
  const data = productTextMap[product.nom];
  if (data && data[lang] && data[lang].longDescription) return data[lang].longDescription;
  return product.longDescription || product.description || "";
}

function getLocalizedPrice(product) {
  return product.prix;
}

const yaourt = [
  { nom: "YAOURT NATURE", description: "Pot Artisanal Bio", prix: "2 300 FCFA", image: "asset/images/yaourt/yaourt_nature.jpeg", categorie: "yaourt" },
  { nom: "YAOURT À BOIRE", description: "Boisson Lactée Fraîche", prix: "2 100 FCFA", image: "asset/images/yaourt/yaourt_a_boire.jpeg", categorie: "yaourt" },
  { nom: "POTS DE YAOURT", description: "Assortiment Artisanal", prix: "2 550 FCFA", image: "asset/images/yaourt/pots_de_yaourt.jpeg", categorie: "yaourt" }
];

const dessert = [
  { nom: "CRÊPES MAISON", description: "Crêpes Fines Traditionnelles", prix: "1 850 FCFA", image: "asset/images/dessert/crepes.jpeg", categorie: "dessert" },
  { nom: "CRÊPES GOURMANDES", description: "Crêpes Roulées", prix: "1 950 FCFA", image: "asset/images/dessert/crepe2.jpeg", categorie: "dessert" },
  { nom: "CRÊPE CHOCOLAT", description: "Crêpe Nappée de Chocolat", prix: "2 300 FCFA", image: "asset/images/dessert/crepe_chocolate.jpeg", categorie: "dessert" },
  { nom: "SABLÉS CHOCOLAT VANILLE", description: "Biscuits Pur Beurre", prix: "1 950 FCFA", image: "asset/images/dessert/sables_chocolat_vanille.jpeg", categorie: "dessert" }
];

const plats = [
  { nom: "BROCHETTES DE VIANDE", description: "Brochettes de Bœuf Grillées", prix: "5 900 FCFA", image: "asset/images/plats/brochettes_de_viande.jpeg", categorie: "plats" },
  { nom: "BROCHETTES GRILLÉES", description: "Brochettes de Viande Grillée", prix: "6 050 FCFA", image: "asset/images/plats/brochettes_de_viande_grillee.jpeg", categorie: "plats" },
  { nom: "BROCHETTES LÉGUMES", description: "Brochettes Végétariennes", prix: "4 500 FCFA", image: "asset/images/plats/brochettes_legumes.jpeg", categorie: "plats" },
  { nom: "BROCHETTES VIANDE LÉGUMES", description: "Brochettes Mixtes Grillées", prix: "5 600 FCFA", image: "asset/images/plats/brochettes_viande_legumes.jpeg", categorie: "plats" },
  { nom: "GOMBO", description: "Sauce Gombo Traditionnelle", prix: "6 200 FCFA", image: "asset/images/plats/gombo.jpeg", categorie: "plats" },
  { nom: "GOMBO À EMPORTER", description: "Sauce Gombo à Emporter", prix: "6 200 FCFA", image: "asset/images/plats/gombo_emporte.jpeg", categorie: "plats" },
  { nom: "GRATIN DE PÂTES", description: "Gratin Maison", prix: "5 150 FCFA", image: "asset/images/plats/gratin_de_pates.jpeg", categorie: "plats" },
  { nom: "PÂTES AUX SAUCISSES", description: "Pâtes Gourmandes", prix: "5 250 FCFA", image: "asset/images/plats/pates_aux_saucisses.jpeg", categorie: "plats" },
  { nom: "PÂTES AUX LÉGUMES", description: "Pâtes Sautées aux Légumes", prix: "4 900 FCFA", image: "asset/images/plats/pattes_aux_legumes.jpeg", categorie: "plats" },
  { nom: "PENNE SAUCE CRÉMEUSE", description: "Penne à la Crème", prix: "5 350 FCFA", image: "asset/images/plats/penne_sauce_cremeuse.jpeg", categorie: "plats" },
  { nom: "POISSON SAUCE TOMATE", description: "Poisson Mijoté", prix: "6 900 FCFA", image: "asset/images/plats/poisson_sauce_tomate.jpeg", categorie: "plats" },
  { nom: "RIZ AUX LÉGUMES", description: "Riz Sauté aux Légumes", prix: "5 100 FCFA", image: "asset/images/plats/riz_aux_legumes.jpeg", categorie: "plats" },
  { nom: "RIZ AUX LÉGUMES 2", description: "Riz aux Légumes Variante", prix: "5 100 FCFA", image: "asset/images/plats/riz_aux_legumes_2.jpeg", categorie: "plats" },
  { nom: "RIZ AU POULET", description: "Riz Épicé au Poulet", prix: "6 200 FCFA", image: "asset/images/plats/riz_au_poulet.jpeg", categorie: "plats" },
  { nom: "RIZ AVEC LÉGUMES", description: "Riz Complet aux Légumes", prix: "5 100 FCFA", image: "asset/images/plats/riz_avec_legumes.jpeg", categorie: "plats" },
  { nom: "RIZ AVEC LÉGUMES 2", description: "Riz aux Légumes Variante", prix: "5 100 FCFA", image: "asset/images/plats/riz_avec_legumes_2.jpeg", categorie: "plats" },
  { nom: "RIZ JAUNE", description: "Riz Parfumé au Curcuma", prix: "5 250 FCFA", image: "asset/images/plats/riz_jaune.jpeg", categorie: "plats" },
  { nom: "RIZ JOLLOF", description: "Riz Jollof Traditionnel", prix: "5 900 FCFA", image: "asset/images/plats/riz_jollof.jpeg", categorie: "plats" },
  { nom: "SALADE COMPOSÉE", description: "Salade Fraîcheur", prix: "4 250 FCFA", image: "asset/images/plats/salade_composee.jpeg", categorie: "plats" },
  { nom: "SALADE DE LÉGUMES", description: "Salade Fraîche", prix: "4 050 FCFA", image: "asset/images/plats/salade_de_legumes.jpeg", categorie: "plats" },
  { nom: "SALADE DE PÂTES", description: "Salade de Pâtes Fraîche", prix: "4 500 FCFA", image: "asset/images/plats/salade_de_pates.jpeg", categorie: "plats" },
  { nom: "SALADE MULTICOLORE", description: "Salade de Légumes Variés", prix: "4 250 FCFA", image: "asset/images/plats/salade_multicolore.jpeg", categorie: "plats" },
  { nom: "SPAGHETTI SAUCE TOMATE", description: "Spaghetti Maison", prix: "4 900 FCFA", image: "asset/images/plats/spaghetti_sauce_tomate.jpeg", categorie: "plats" }
];

const catalogue = [...yaourt, ...dessert, ...plats].map((item, index) => ({
  ...item,
  productIndex: index,
}));
const heroProducts = yaourt;

const panier = [];
const wishlist = [];
let produitActuel = 0;
let heroCurrentIndex = 0;
let carouselInterval;
let transitionEnCours = false;
let detailSourceElement;
let filtreActif = "yaourt";
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
  title.textContent = getLocalizedText(produit, "nom");
  description.innerHTML = `${getLocalizedText(produit, "description")} <span aria-hidden="true">|</span> ${produit.prix}`;
}

function transitionProduit(nouvelIndex, direction = "next") {
  if (transitionEnCours || document.body.classList.contains("product-detail-open") || document.body.classList.contains("catalog-open")) return;
  const produit = heroProducts[nouvelIndex];
  const { image, title, description } = getHeroElements();
  const oldImageClone = image.cloneNode(true);
  oldImageClone.classList.add("product-image-receding");
  image.parentElement.appendChild(oldImageClone);

  const xShift = direction === "next" ? 72 : -72;
  transitionEnCours = true;
  heroCurrentIndex = nouvelIndex;

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => {
      transitionEnCours = false;
      oldImageClone.remove();
    },
  });

  tl.to(oldImageClone, {
    scale: 0.76,
    opacity: 0.2,
    filter: "blur(16px)",
    x: direction === "next" ? -84 : 84,
    rotation: direction === "next" ? -5 : 5,
    duration: 1.18,
    ease: "power3.inOut",
  }, 0);

  tl.set(image, {
    backgroundImage: asBackgroundImage(produit.image),
    scale: 0.86,
    opacity: 0,
    filter: "blur(16px)",
    x: xShift,
    rotation: direction === "next" ? 4 : -4,
  }, 0);

  tl.to(image, {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
    rotation: 0,
    duration: 1.15,
    ease: "power3.out",
  }, 0.06);

  tl.to([title, description], { autoAlpha: 0, y: -10, duration: 0.28 }, 0);
  tl.add(() => {
    title.textContent = getLocalizedText(produit, "nom");
    description.innerHTML = `${getLocalizedText(produit, "description")} <span aria-hidden="true">|</span> ${produit.prix}`;
  }, 0.34);
  tl.to([title, description], { autoAlpha: 1, y: 0, duration: 0.42 }, 0.54);
}

function afficherProduitSuivant() {
  const nextIndex = (heroCurrentIndex + 1) % heroProducts.length;
  transitionProduit(nextIndex, "next");
}

function startProductCarousel() {
  window.clearInterval(carouselInterval);
  carouselInterval = window.setInterval(afficherProduitSuivant, 3700);
}

function restartProductCarousel() {
  startProductCarousel();
}

function filterCatalogueByCategory(category = filtreActif) {
  if (!category || category === "all") return catalogue;
  return catalogue.filter((item) => item.categorie === category);
}

function getFilteredProducts() {
  const normalizedSearch = rechercheActive.trim().toLocaleLowerCase("fr");
  return filterCatalogueByCategory(filtreActif).filter((produit) => {
    const searchable = `${produit.nom} ${produit.description} ${produit.categorie}`.toLocaleLowerCase("fr");
    return !normalizedSearch || searchable.includes(normalizedSearch);
  });
}

/** Construit la grille ou la liste depuis le filtre actif. */
function renderProductGrid() {
  const grid = document.querySelector(".catalog-grid");
  const productsToRender = getFilteredProducts();
  grid.classList.toggle("is-list", catalogueEnListe);
  grid.innerHTML = productsToRender.length ? productsToRender.map((produit) => `
    <article class="catalog-card" tabindex="0" role="button" aria-label="Voir ${getLocalizedText(produit, "nom")}" data-product-index="${produit.productIndex}">
      <div class="catalog-card__image catalog__card-image catalog__list-image" style="background-image: url('${produit.image}'); background-size: cover; background-position: center;"></div>
      <div class="catalog-card__heading"><span>${getLocalizedText(produit, "nom")}</span><span class="catalog-card__price">${produit.prix}</span></div>
      <p class="catalog-card__description">${getLocalizedText(produit, "description")}</p>
    </article>
  `).join("") : `<p class="catalog-empty">${translations[currentLang].catalog.empty}</p>`;
}

function initCatalogAnimation() {
  const cards = document.querySelectorAll(".catalog-card");
  gsap.set(cards, { autoAlpha: 0, y: 20 });
  gsap.to(cards, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" });
}

function updateCategoryActiveState(filter) {
  document.querySelectorAll("[data-category]").forEach((link) => {
    const active = link.dataset.category === filter;
    const li = link.closest(".sidebar__category");
    link.classList.toggle("is-active", active);
    if (li) li.classList.toggle("sidebar__category--active", active);
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
  window.clearInterval(carouselInterval);

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
  const produit = catalogue[produitActuel];
  const detailImage = document.querySelector(".detail-product-image");
  const variantImage = variant === 1 ? catalogue[(produitActuel + 1) % catalogue.length].image : produit.image;
  detailImage.style.backgroundImage = asBackgroundImage(variantImage);
  document.querySelector(".detail-price").textContent = produit.prix;
  document.querySelector("#detail-product-title").textContent = getLocalizedText(produit, "nom");
  document.querySelector(".detail-product-heading p").textContent = getLocalizedText(produit, "description");
  document.querySelector(".detail-description").textContent = getLocalizedLongDescription(produit);
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
  window.clearInterval(carouselInterval);
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
  const totalQuantity = panier.reduce((sum, item) => sum + item.quantite, 0);
  count.textContent = totalQuantity;
  count.setAttribute("aria-label", translations[currentLang].detail.productCountLabel(totalQuantity));
  list.innerHTML = panier.map((item, index) => `
    <div class="cart-drawer__item">
      <div class="cart-drawer__item-image" style="background-image: url('${item.produit.image}')"></div>
      <div class="cart-drawer__item-info">
        <span class="cart-drawer__item-name">${getLocalizedText(item.produit, "nom")}</span>
        <span class="cart-drawer__item-price">${item.produit.prix}</span>
        <div class="cart-drawer__item-qty">
          <button class="cart-drawer__qty-btn cart-drawer__qty-minus" data-index="${index}" type="button" aria-label="Moins">−</button>
          <span class="cart-drawer__qty-value">${item.quantite}</span>
          <button class="cart-drawer__qty-btn cart-drawer__qty-plus" data-index="${index}" type="button" aria-label="Plus">+</button>
        </div>
      </div>
      <button class="cart-drawer__item-remove" data-index="${index}" type="button" aria-label="Retirer ${getLocalizedText(item.produit, "nom")} du panier">×</button>
    </div>
  `).join("");
  empty.hidden = totalQuantity > 0;
  empty.textContent = translations[currentLang].detail.cartEmpty;
  const amount = panier.reduce((sum, item) => sum + (parseCfaPrice(item.produit.prix) * item.quantite), 0);
  total.textContent = formatCfaPrice(amount);
  checkout.disabled = totalQuantity === 0;
  checkout.textContent = translations[currentLang].detail.checkout;
  document.querySelector(".drawer-header h2").textContent = translations[currentLang].detail.cartTitle;
  document.querySelector("[data-cart-close]").setAttribute("aria-label", translations[currentLang].detail.close);
}

function showToast(message) {
  const toast = document.querySelector(".toast");
  toast.textContent = message;
  gsap.killTweensOf(toast);
  gsap.timeline().to(toast, { autoAlpha: 1, y: 0, duration: 0.2 }).to(toast, { autoAlpha: 0, y: 15, duration: 0.25, delay: 2 });
}

function addCurrentProductToCart() {
  const format = document.querySelector(".format-select select").value;
  const produit = catalogue[produitActuel];
  const existing = panier.find((item) => item.produit.nom === produit.nom && item.format === format);
  if (existing) {
    existing.quantite += 1;
  } else {
    panier.push({ produit: { ...produit }, format, quantite: 1 });
  }
  updateCart();
  gsap.fromTo(".cart-count", { scale: 1 }, { scale: 1.45, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" });
  showToast(translations[currentLang].toasts.addedToCart);
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

function removeCartItem(index) {
  const removedProduct = panier.splice(index, 1)[0];
  updateCart();
  showToast(translations[currentLang].toasts.itemRemoved(getLocalizedText(removedProduct.produit, "nom")));
}

function changeCartQuantity(index, delta) {
  const line = panier[index];
  if (!line) return;
  line.quantite += delta;
  if (line.quantite <= 0) {
    panier.splice(index, 1);
  }
  updateCart();
}

/** Simule la validation d'une commande puis vide le panier local. */
function placeOrder() {
  if (!panier.length) return;
  panier.length = 0;
  updateCart();
  closeCart();
  showToast(translations[currentLang].toasts.orderPlaced);
}

function updateWishlistButton() {
  const button = document.querySelector("[data-wishlist-toggle]");
  const selected = wishlist.includes(produitActuel);
  button.textContent = selected ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(selected));
  button.setAttribute("aria-label", selected ? translations[currentLang].detail.wishlistRemove : translations[currentLang].detail.wishlistAdd);
}

function openCheckoutContact() {
  const overlay = document.querySelector(".checkout-contact");
  closeCart();
  overlay.style.display = "flex";
  overlay.setAttribute("aria-hidden", "false");
  gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
}

function closeCheckoutContact() {
  const overlay = document.querySelector(".checkout-contact");
  gsap.to(overlay, { autoAlpha: 0, duration: 0.3, ease: "power2.in", onComplete: () => {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    gsap.set(overlay, { clearProps: "opacity" });
  } });
}

function getCurrentThemePref() {
  try {
    return localStorage.getItem("yaourt-theme") || "system";
  } catch {
    return "system";
  }
}

function applyTheme(theme) {
  const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  try {
    localStorage.setItem("yaourt-theme", theme);
  } catch {
    // localStorage unavailable in some environments, ignore gracefully.
  }

  if (theme === "system") {
    const prefersDark = themeMedia.matches;
    document.body.classList.toggle("theme-dark", prefersDark);
    themeMedia.addEventListener("change", (event) => {
      if (getCurrentThemePref() === "system") {
        document.body.classList.toggle("theme-dark", event.matches);
      }
    });
  } else {
    document.body.classList.toggle("theme-dark", theme === "dark");
  }

  document.querySelectorAll(".theme-dropdown__item").forEach((item) => {
    item.classList.toggle("theme-dropdown__item--active", item.dataset.theme === theme);
  });
}

function toggleThemeMenu() {
  const toggle = document.querySelector(".theme-selector__toggle");
  const menu = document.querySelector(".theme-dropdown");
  const opening = menu.hidden;
  menu.hidden = !opening;
  toggle.setAttribute("aria-expanded", String(opening));
}

function toggleWishlist() {
  const index = wishlist.indexOf(produitActuel);
  if (index === -1) wishlist.push(produitActuel); else wishlist.splice(index, 1);
  updateWishlistButton();
  showToast(index === -1 ? translations[currentLang].toasts.addedToWishlist : translations[currentLang].toasts.removedFromWishlist);
}

function toggleSearch() {
  const panel = document.querySelector(".header-search");
  const input = document.querySelector("[data-header-search-input]");
  const opening = panel.getAttribute("aria-hidden") === "true";
  panel.setAttribute("aria-hidden", String(!opening));
  gsap.to(panel, { width: opening ? 250 : 0, autoAlpha: opening ? 1 : 0, duration: 0.25, ease: "power2.out", onComplete: () => { if (opening) input.focus(); } });
}

function applyLanguage(lang = currentLang) {
  currentLang = lang;
  const t = translations[currentLang];
  const navLeft = document.querySelectorAll(".navbar__group--left a");
  const navRight = document.querySelectorAll(".navbar__group--right a");
  navLeft[0].textContent = t.nav.yaourt;
  navLeft[1].textContent = t.nav.dessert;
  navLeft[2].textContent = t.nav.plats;
  navRight[0].textContent = t.nav.wishlist;
  navRight[1].textContent = t.nav.blog;
  document.querySelector("[data-language-toggle]").querySelector(".language-current").textContent = t.nav.language;
  document.querySelector(".language-current").textContent = t.nav.language;
  document.querySelector("[data-language-toggle]").setAttribute("aria-label", t.nav.language);
  document.querySelector("[data-search-toggle]").setAttribute("aria-label", t.nav.search);
  document.querySelector(".cart-toggle").setAttribute("aria-label", t.nav.cart);
  document.querySelector("[data-home-link]").setAttribute("aria-label", t.nav.home);
  document.querySelector(".hero__eyebrow").textContent = t.hero.eyebrow;
  document.querySelector(".button-pill").textContent = t.hero.button;
  document.querySelector(".detail-back").textContent = t.detail.back;
  document.querySelector(".detail-back").setAttribute("aria-label", t.detail.back);
  document.querySelector(".detail-product-heading p").textContent = getLocalizedText(catalogue[produitActuel], "description");
  document.querySelector(".detail-description").textContent = getLocalizedLongDescription(catalogue[produitActuel]);
  document.querySelector(".add-to-cart").lastChild.textContent = t.detail.addToCart;
  document.querySelector(".format-select .sr-only").textContent = t.detail.chooseFormat;
  document.querySelector(".format-select select").innerHTML = t.detail.formats.map((label, index) => `<option value="${[125, 150, 200][index]}g">${label}</option>`).join("");
  document.querySelectorAll(".accordion-trigger").forEach((trigger, index) => {
    const label = trigger.querySelector(".accordion-label");
    if (label) label.textContent = t.detail.accordion[index];
  });
  document.querySelectorAll(".accordion-panel p").forEach((panel, index) => {
    panel.textContent = t.detail.accordionContent[index];
  });
  document.querySelector(".cart-empty").textContent = t.detail.cartEmpty;
  document.querySelector(".drawer-header h2").textContent = t.detail.cartTitle;
  document.querySelector("[data-checkout]").textContent = t.detail.checkout;
  document.querySelector(".checkout-contact__title").textContent = t.detail.checkoutTitle;
  document.querySelector(".checkout-contact__subtitle").textContent = t.detail.checkoutSubtitle;
  document.querySelector("[data-cart-close]").setAttribute("aria-label", t.detail.close);
  document.querySelector("[data-cart-toggle]").setAttribute("aria-label", t.nav.cart);
  document.querySelectorAll("[data-language]").forEach((option) => {
    option.classList.toggle("is-active", option.dataset.language.toLowerCase() === lang);
  });
  renderProductGrid();
  updateCart();
  updateProductDetail();
  appliquerProduit(heroProducts[heroCurrentIndex]);
  updateWishlistButton();
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
  document.querySelector(".hero__arrow--left").addEventListener("click", () => {
    const previousIndex = (heroCurrentIndex - 1 + heroProducts.length) % heroProducts.length;
    transitionProduit(previousIndex, "previous");
    restartProductCarousel();
  });
  document.querySelector(".hero__arrow--right").addEventListener("click", () => {
    const nextIndex = (heroCurrentIndex + 1) % heroProducts.length;
    transitionProduit(nextIndex, "next");
    restartProductCarousel();
  });
  document.querySelector(".detail-back").addEventListener("click", goBackToHero);
  document.querySelector("[data-home-link]").addEventListener("click", showHero);
  document.querySelectorAll("[data-nav-filter]").forEach((link) => link.addEventListener("click", (event) => showCatalog(event, link.dataset.navFilter)));
  document.querySelectorAll("[data-category]").forEach((link) => link.addEventListener("click", (event) => showCatalog(event, link.dataset.category)));
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
  document.querySelector(".checkout-contact__close").addEventListener("click", closeCheckoutContact);
  document.querySelector(".cart-items").addEventListener("click", (event) => {
    const removeButton = event.target.closest(".cart-drawer__item-remove");
    const plusButton = event.target.closest(".cart-drawer__qty-plus");
    const minusButton = event.target.closest(".cart-drawer__qty-minus");
    if (removeButton) removeCartItem(Number(removeButton.dataset.index));
    if (plusButton) changeCartQuantity(Number(plusButton.dataset.index), 1);
    if (minusButton) changeCartQuantity(Number(minusButton.dataset.index), -1);
  });
  document.querySelector("[data-checkout]").addEventListener("click", openCheckoutContact);
  document.querySelector("[data-add-to-cart]").addEventListener("click", addCurrentProductToCart);
  document.querySelector("[data-wishlist-toggle]").addEventListener("click", toggleWishlist);
  document.querySelectorAll("[data-variant]").forEach((swatch) => swatch.addEventListener("click", () => {
    document.querySelectorAll("[data-variant]").forEach((item) => { const active = item === swatch; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
    updateProductDetail(Number(swatch.dataset.variant));
  }));
  document.querySelector(".format-select select").addEventListener("change", () => showToast(translations[currentLang].detail.formatUpdated));
  document.querySelector("[data-language-toggle]").addEventListener("click", toggleLanguageMenu);
  document.querySelectorAll("[data-language]").forEach((option) => option.addEventListener("click", () => {
    applyLanguage(option.dataset.language.toLowerCase());
    document.querySelector(".language-dropdown").hidden = true;
    document.querySelector("[data-language-toggle]").setAttribute("aria-expanded", "false");
  }));
  document.querySelector(".theme-selector__toggle").addEventListener("click", toggleThemeMenu);
  document.querySelectorAll(".theme-dropdown__item").forEach((option) => option.addEventListener("click", () => {
    applyTheme(option.dataset.theme);
    document.querySelector(".theme-dropdown").hidden = true;
    document.querySelector(".theme-selector__toggle").setAttribute("aria-expanded", "false");
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
  applyTheme(getCurrentThemePref());
  applyLanguage(currentLang);
  renderProductGrid();
  updateCart();
  updateWishlistButton();
  document.querySelector(".review-count").textContent = Math.floor(Math.random() * 41) + 10;
  appliquerProduit(heroProducts[0]);
  initHeroAnimation();
  initAccordions();
  initEventListeners();
  startProductCarousel();
}

document.addEventListener("DOMContentLoaded", init);
