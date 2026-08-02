/* global gsap, ScrollTrigger */

const EUR_TO_CFA_RATE = 655;
const FCFA_STEP = 50;
let currentLang = "fr";
let currentThemePreference = null;

const translations = {
  fr: {
    nav: {
      yaourt: "YAOURT",
      dessert: "DESSERT",
      plats: "PLATS",
      about: "À PROPOS",
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
    about: {
      back: "← Retour",
      eyebrow: "NOTRE HISTOIRE",
      title: "Le goût de l'authentique, depuis toujours",
      intro: "Seton's Delight est né d'une conviction simple : une cuisine généreuse et sincère mérite d'être accessible à tous, préparée avec les mêmes égards qu'un repas de famille.",
      historyTitle: "Notre histoire",
      historyText: "Tout a commencé dans une petite cuisine, animée par la passion de transmettre des recettes authentiques et généreuses. Ce qui n'était au départ qu'une envie de partager de bons plats avec nos proches est devenu, avec le temps, une véritable adresse de confiance pour celles et ceux qui recherchent une cuisine préparée avec soin, des yaourts artisanaux jusqu'aux plats mijotés traditionnels. Année après année, nous avons affiné nos recettes, sélectionné nos producteurs avec exigence, et construit une relation de confiance avec notre clientèle, fidèle à une même promesse : de la qualité, de la fraîcheur, et du goût.",
      missionTitle: "Notre mission",
      missionText: "Offrir une alimentation savoureuse, saine et accessible, préparée chaque jour avec des ingrédients sélectionnés avec exigence. Nous croyons qu'un bon repas commence toujours par de bons produits, une préparation soignée, et l'attention portée aux détails qui font toute la différence.",
      valuesTitle: "Nos valeurs",
      values: [["Qualité avant tout", "Des ingrédients soigneusement sélectionnés, une préparation artisanale, sans compromis sur le goût ni sur la fraîcheur."], ["Authenticité", "Des recettes transmises et perfectionnées avec le temps, respectueuses des traditions culinaires qui nous inspirent."], ["Proximité", "Une relation directe et à l'écoute de notre clientèle, du choix des produits jusqu'à la livraison."], ["Engagement", "Un service fiable et attentif, pensé pour s'adapter aux besoins de chacun, à chaque commande."]],
      servicesTitle: "Nos services de livraison",
      servicesText: "Nous mettons tout en œuvre pour que votre commande vous parvienne dans les meilleures conditions, quel que soit votre besoin.",
      delivery: [["Livraison standard", "Toutes nos livraisons sont effectuées en moins de 24 heures sur l'ensemble de notre zone de couverture, pour que vos plats et yaourts arrivent aussi frais qu'au moment de leur préparation."], ["Livraison express", "Besoin d'être livré rapidement ? Notre option express permet une livraison sous quelques heures selon votre zone et nos disponibilités du moment. Contactez-nous directement pour vérifier l'éligibilité de votre commande."], ["Livraisons spéciales & événements", "Pour vos anniversaires, fêtes ou tout autre événement particulier, notre équipe peut également se déplacer directement sur le lieu de votre événement pour préparer les plats sur place. Cette prestation nécessite d'être prévenue au moins 24 heures à l'avance afin que nous puissions nous organiser au mieux et vous garantir un service à la hauteur de l'occasion."], ["Zones de livraison & conditions", "Nous livrons actuellement dans un rayon défini autour de notre point de préparation. Un montant minimum de commande peut s'appliquer selon la distance. Pour toute zone en dehors de notre périmètre habituel, contactez-nous : une solution peut généralement être trouvée selon la demande."]],
      ctaText: "Une question, une demande particulière ou une commande spéciale à organiser ?",
      ctaButton: "NOUS CONTACTER",
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
        "Détails personnalisés selon le produit.",
        "Livraison en moins de 24h sur l'ensemble de notre zone de couverture. Les retours sont possibles pour tout produit non ouvert, selon nos conditions.",
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
      searchPlaceholder: "Rechercher un produit...",
      searchEmpty: "Aucun résultat",
      reviewLabel: "Avis",
      detailsTitle: "Détails",
    },
  },
  en: {
    nav: {
      yaourt: "YOGURT",
      dessert: "DESSERT",
      plats: "PLATES",
      about: "ABOUT",
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
    about: {
      back: "← Back",
      eyebrow: "OUR STORY",
      title: "The taste of authenticity, always",
      intro: "Seton's Delight was born from a simple belief: generous, honest food should be within everyone's reach and prepared with the same care as a family meal.",
      historyTitle: "Our story",
      historyText: "It all began in a small kitchen, driven by a passion for sharing authentic, generous recipes. What started as a wish to serve good food to our loved ones has, over time, become a trusted address for people looking for carefully prepared cuisine, from artisan yogurts to traditional slow-cooked dishes. Year after year, we have refined our recipes, selected our producers with exacting care, and built a relationship of trust with customers who remain loyal to one promise: quality, freshness, and flavour.",
      missionTitle: "Our mission",
      missionText: "To offer tasty, wholesome, accessible food, prepared every day with ingredients selected to exacting standards. We believe every good meal starts with good products, thoughtful preparation, and attention to the details that make all the difference.",
      valuesTitle: "Our values",
      values: [["Quality first", "Carefully selected ingredients and artisan preparation, with no compromise on flavour or freshness."], ["Authenticity", "Recipes passed down and refined over time, respectful of the culinary traditions that inspire us."], ["Closeness", "A direct, attentive relationship with our customers, from product selection through delivery."], ["Commitment", "Reliable, considerate service designed to adapt to everyone's needs, with every order."]],
      servicesTitle: "Our delivery services",
      servicesText: "We do everything possible to ensure your order reaches you in the best conditions, whatever your needs.",
      delivery: [["Standard delivery", "All our deliveries are completed in under 24 hours across our entire coverage area, so your dishes and yogurts arrive as fresh as when they were prepared."], ["Express delivery", "Need your order quickly? Our express option provides delivery within a few hours depending on your area and current availability. Contact us directly to check whether your order is eligible."], ["Special deliveries & events", "For birthdays, celebrations or any special event, our team can also come directly to your event location to prepare the dishes on site. This service requires at least 24 hours' notice so we can organize accordingly and deliver a service worthy of the occasion."], ["Delivery areas & conditions", "We currently deliver within a defined radius around our preparation site. A minimum order amount may apply depending on distance. For areas outside our usual perimeter, contact us: a solution can generally be found depending on your request."]],
      ctaText: "A question, a special request, or a custom order to arrange?",
      ctaButton: "CONTACT US",
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
        "Product-specific details.",
        "Delivery in under 24 hours across our entire coverage area. Returns are possible for any unopened product, as per our conditions.",
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
      searchPlaceholder: "Search for a product...",
      searchEmpty: "No results",
      reviewLabel: "Reviews",
      detailsTitle: "Details",
    },
  },
};

const productTextMap = {
  "YAOURT NATURE": { fr: { nom: "YAOURT NATURE", description: "Pot Artisanal Bio", longDescription: "Un lot de trois yaourts nature au lait entier bio, lentement brassés pour une texture généreuse et douce." }, en: { nom: "NATURAL YOGURT", description: "Artisanal Pots", longDescription: "A set of three creamy whole-milk artisan yogurt pots, slowly blended for a rich and smooth texture." } },
  "YAOURT + GRANOLA": { fr: { nom: "YAOURT + GRANOLA", description: "Pot Gourmand", longDescription: "Un yaourt nature au lait entier bio accompagné de granola pour une pause généreuse et croquante." }, en: { nom: "YOGURT + GRANOLA", description: "Gourmet Pot", longDescription: "A creamy whole-milk yogurt served with granola for a rich, crunchy treat." } },
  "YAOURT GRAND FORMAT": { fr: { nom: "YAOURT GRAND FORMAT", description: "Format Généreux", longDescription: "Un yaourt au format généreux, doux et rafraîchissant à partager ou à savourer longtemps." }, en: { nom: "LARGE-FORMAT YOGURT", description: "Generous Format", longDescription: "A generously sized yogurt, smooth and refreshing for sharing or enjoying at length." } },
  "CRÊPES MAISON": { fr: { nom: "CRÊPES MAISON", description: "Crêpes Fines Traditionnelles", longDescription: "Des crêpes maison à la pâte souple et parfumée, servies dans un esprit généreux et simple." }, en: { nom: "HOMEMADE CRÊPES", description: "Traditional Fine Pancakes", longDescription: "A homemade crêpe selection with a soft, fragrant batter and a warm handmade feel." } },
  "CRÊPES GOURMANDES": { fr: { nom: "CRÊPES GOURMANDES", description: "Crêpes Roulées", longDescription: "Des crêpes gourmandes roulées pour un service généreux et visuellement équilibré." }, en: { nom: "GOURMET CRÊPES", description: "Rolled Pancakes", longDescription: "Rich rolled pancakes made for a soft, indulgent and neatly presented service." } },
  "CRÊPES CHOCOLAT": { fr: { nom: "CRÊPES CHOCOLAT", description: "Crêpe Nappée de Chocolat", longDescription: "Des crêpes généreusement nappées de chocolat, douces et fondantes à chaque bouchée." }, en: { nom: "CHOCOLATE CRÊPES", description: "Chocolate-Coated Pancakes", longDescription: "Chocolate-covered crêpes, silky and indulgent from the first bite." } },
  "BROCHETTES DE VIANDE": { fr: { nom: "BROCHETTES DE VIANDE", description: "Brochettes de Bœuf Grillées", longDescription: "Des brochettes de bœuf grillées, généreuses et parfumées pour un plat de caractère." }, en: { nom: "MEAT SKEWERS", description: "Grilled Beef Skewers", longDescription: "Grilled beef skewers with deep smoky aroma and a bold, satisfying finish." } },
  "BROCHETTES GRILLÉES": { fr: { nom: "BROCHETTES GRILLÉES", description: "Brochettes de Viande Grillée", longDescription: "Des brochettes grillées à l’assemblage simple, parfumées et bien dorées." }, en: { nom: "GRILLED SKEWERS", description: "Grilled Meat Skewers", longDescription: "A grilled skewer selection with a smoky finish and a hearty feel." } },
  "BANANA BROCHETTE": { fr: { nom: "BANANA BROCHETTE", description: "Brochette à la Banane", longDescription: "Une brochette à la banane, colorée et généreuse pour une dégustation savoureuse." }, en: { nom: "BANANA BROCHETTE", description: "Banana Skewer", longDescription: "A colorful banana skewer, generously prepared for a satisfying meal." } },
  "BROCHETTES VIANDE LÉGUMES": { fr: { nom: "BROCHETTES VIANDE LÉGUMES", description: "Brochettes Mixtes Grillées", longDescription: "Un mélange harmonieux de viande et légumes, grillé pour un goût bien fondant." }, en: { nom: "MEAT & VEG SKEWERS", description: "Mixed Grilled Skewers", longDescription: "A harmonious blend of meat and vegetables, grilled for a mellow, well-balanced taste." } },
  "GOMBO": { fr: { nom: "GOMBO", description: "Sauce Gombo Traditionnelle", longDescription: "Une sauce gombo traditionnelle, riche et parfumée pour un repas chaleureux." }, en: { nom: "GOMBO", description: "Traditional Gombo Sauce", longDescription: "A rich traditional gombo sauce, fragrant and velvety for a warm meal." } },
  "ESSOR GOMBO": { fr: { nom: "ESSOR GOMBO", description: "Sauce Gombo à Emporter", longDescription: "La même richesse du gombo, pensée pour une dégustation à emporter." }, en: { nom: "ESSOR GOMBO", description: "Takeaway Gombo Sauce", longDescription: "A rich gombo sauce made for a convenient takeaway experience." } },
  "PÂTES AUX SAUCISSES": { fr: { nom: "PÂTES AUX SAUCISSES", description: "Pâtes Gourmandes", longDescription: "Des pâtes généreuses servies avec des saucisses à la saveur rassasiante." }, en: { nom: "SAUSAGE PASTA", description: "Savory Pasta", longDescription: "Hearty pasta served with sausages for a satisfying, rich and flavorful plate." } },
  "PÂTES AUX LÉGUMES": { fr: { nom: "PÂTES AUX LÉGUMES", description: "Pâtes Sautées aux Légumes", longDescription: "Des pâtes sautées aux légumes, légères et colorées dans une préparation rapide." }, en: { nom: "VEGETABLE PASTA", description: "Sautéed Vegetable Pasta", longDescription: "Sautéed pasta with vegetables, lively, colorful and balanced for everyday comfort." } },
  "PENNE VIANDE SAUTÉE": { fr: { nom: "PENNE VIANDE SAUTÉE", description: "Penne à la Viande", longDescription: "Des penne à la viande sautée, généreuses et savoureuses dans un service réconfortant." }, en: { nom: "SAUTÉED MEAT PENNE", description: "Penne with Meat", longDescription: "Penne served with sautéed meat, flavorful and deeply comforting in every forkful." } },
  "POISSON SAUCE TOMATE": { fr: { nom: "POISSON SAUCE TOMATE", description: "Poisson Mijoté", longDescription: "Un poisson mijoté à la sauce tomate, généreux, parfumé et équilibré." }, en: { nom: "FISH IN TOMATO SAUCE", description: "Slow-Cooked Fish", longDescription: "Slow-cooked fish in tomato sauce, rich in aroma and balanced in every bite." } },
  "RIZ CURRY + AILERON / VIANDE DE BŒUF": { fr: { nom: "RIZ CURRY + AILERON / VIANDE DE BŒUF", description: "Riz Curry Généreux", longDescription: "Un riz curry généreux servi avec aileron ou viande de bœuf." }, en: { nom: "CURRY RICE + WING / BEEF", description: "Generous Curry Rice", longDescription: "Generous curry rice served with a wing or beef." } },
  "EGOUSSI SOUNNOUN": { fr: { nom: "EGOUSSI SOUNNOUN", description: "Riz Épicé au Poulet", longDescription: "Un riz épicé au poulet, généreux en arômes et impeccable pour les repas maison." }, en: { nom: "EGOUSSI SOUNNOUN", description: "Spiced Chicken Rice", longDescription: "A richly spiced chicken rice dish with bold flavors and a comforting finish." } },
  "RIZ AVEC LÉGUMES": { fr: { nom: "RIZ AVEC LÉGUMES", description: "Riz Complet aux Légumes", longDescription: "Un riz complet aux légumes, naturel et généreux dans son équilibre calorique." }, en: { nom: "VEGGIE RICE", description: "Whole Rice with Vegetables", longDescription: "A wholesome rice dish with vegetables, balanced, natural and generously textured." } },
  "SALADE COMPOSÉE": { fr: { nom: "SALADE COMPOSÉE", description: "Salade Fraîcheur", longDescription: "Une salade composée légère, vivante et colorée, pensée pour l’équilibre et la fraîcheur." }, en: { nom: "COMPOSED SALAD", description: "Fresh Salad", longDescription: "A lively, colorful composed salad built for lightness and freshness." } },
  "MANTINDJAN": { fr: { nom: "MANTINDJAN", description: "Spécialité Maison", longDescription: "Une spécialité maison fraîche et généreuse, pensée pour un repas équilibré." }, en: { nom: "MANTINDJAN", description: "House Specialty", longDescription: "A fresh, generous house specialty made for a balanced meal." } },
  "SALADE DE PÂTES": { fr: { nom: "SALADE DE PÂTES", description: "Salade de Pâtes Fraîche", longDescription: "Une salade de pâtes fraîche et généreuse, parfaite pour un repas léger et rassasiant." }, en: { nom: "PASTA SALAD", description: "Fresh Pasta Salad", longDescription: "A fresh and generous pasta salad built for a light, satisfying and easy meal." } },
  "SALADE COMPOSÉE 2": { fr: { nom: "SALADE COMPOSÉE 2", description: "Salade de Légumes Variés", longDescription: "Une salade composée aux légumes variés, vivante et pleine de fraîcheur." }, en: { nom: "COMPOSED SALAD 2", description: "Assorted Vegetable Salad", longDescription: "A colorful composed salad with assorted vegetables, fresh and pleasantly varied." } },
  "SISI SPAGHETTIS": { fr: { nom: "SISI SPAGHETTIS", description: "Spaghetti Maison", longDescription: "Des spaghettis maison à la sauce tomate, classiques, doux et rassasiants." }, en: { nom: "SISI SPAGHETTIS", description: "Homestyle Spaghetti", longDescription: "Classic homemade spaghetti with tomato sauce, comforting and satisfying." } },
};

Object.assign(productTextMap, {
  "YAOURT NATURE": { fr: { nom: "YAOURT NATURE", description: "Lot de 3 Pots Artisanaux", longDescription: "Trois pots de yaourt nature au lait entier bio, brassés lentement pour une texture riche et une légère acidité, à partager ou à savourer sur plusieurs jours." }, en: { nom: "PLAIN YOGURT", description: "Set of 3 Artisan Pots", longDescription: "Three whole-milk organic plain yogurt pots, slowly churned for a rich texture and a gentle tang, perfect to share or enjoy over a few days." } },
  "YAOURT + GRANOLA": { fr: { nom: "YAOURT + GRANOLA", description: "Pot Gourmand au Granola Croustillant", longDescription: "Un pot de yaourt onctueux garni de granola croustillant, pour une pause gourmande qui allie douceur crémeuse et croquant." }, en: { nom: "YOGURT + GRANOLA", description: "Creamy Pot with Crunchy Granola", longDescription: "A creamy yogurt pot topped with crunchy granola, combining smooth richness with a satisfying crunch." } },
  "YAOURT GRAND FORMAT": { fr: { nom: "YAOURT GRAND FORMAT", description: "Format Familial Généreux", longDescription: "Notre yaourt en grand format, pensé pour les familles ou les grandes envies, avec la même texture crémeuse et le même goût authentique." }, en: { nom: "FAMILY-SIZE YOGURT", description: "Generous Family Format", longDescription: "Our yogurt in a large family format, made for sharing, with the same creamy texture and authentic taste." } },
  "CRÊPES MAISON": { fr: { nom: "CRÊPES MAISON", description: "Crêpes Fines et Nature", longDescription: "Des crêpes fines préparées maison, à la pâte souple et légèrement dorée, idéales nature ou accompagnées de votre garniture préférée." }, en: { nom: "HOMEMADE CRÊPES", description: "Thin, Plain Crêpes", longDescription: "Thin homemade crêpes with a soft, lightly golden batter, delicious plain or topped with your favorite filling." } },
  "CRÊPES GOURMANDES": { fr: { nom: "CRÊPES GOURMANDES", description: "Crêpes Roulées et Garnies", longDescription: "Des crêpes roulées et généreusement garnies, présentées avec soin pour un moment gourmand à partager." }, en: { nom: "GOURMET CRÊPES", description: "Rolled and Filled Crêpes", longDescription: "Rolled crêpes with a generous filling, neatly presented for a delightful shared treat." } },
  "CRÊPES CHOCOLAT": { fr: { nom: "CRÊPES CHOCOLAT", description: "Crêpe Nappée de Chocolat Fondant", longDescription: "Une crêpe généreusement nappée de chocolat fondant, moelleuse et gourmande à chaque bouchée." }, en: { nom: "CHOCOLATE CRÊPE", description: "Melted Chocolate-Coated Crêpe", longDescription: "A crêpe generously coated in melted chocolate, soft and indulgent in every bite." } },
  "CRÊPES CHOCOOO": { fr: { nom: "CRÊPES CHOCOOO", description: "Crêpe Fourrée Gourmande", longDescription: "Une crêpe fourrée à la garniture gourmande et généreuse, moelleuse à l'intérieur, parfaite pour une pause sucrée réconfortante." }, en: { nom: "CHOCOOO CRÊPE", description: "Filled Gourmet Crêpe", longDescription: "A crêpe filled with a rich, generous filling, soft on the inside, perfect for a comforting sweet break." } },
  "BROCHETTES DE VIANDE": { fr: { nom: "BROCHETTES DE VIANDE", description: "Brochettes de Bœuf Grillées au Feu de Bois", longDescription: "Des brochettes de bœuf marinées puis grillées, au goût fumé et à la texture tendre, servies bien dorées." }, en: { nom: "MEAT SKEWERS", description: "Wood-Grilled Beef Skewers", longDescription: "Marinated beef skewers grilled over open flame, smoky in flavor and tender in texture." } },
  "BROCHETTES GRILLÉES": { fr: { nom: "BROCHETTES GRILLÉES", description: "Assortiment de Viande Grillée", longDescription: "Un assortiment de morceaux de viande grillés à point, dorés à l'extérieur et juteux à l'intérieur." }, en: { nom: "GRILLED SKEWERS", description: "Grilled Meat Assortment", longDescription: "An assortment of perfectly grilled meat pieces, golden outside and juicy inside." } },
  "BANANA BROCHETTE": { fr: { nom: "BANANA BROCHETTE", description: "Brochette de Banane Plantain Grillée", longDescription: "Une brochette de banane plantain grillée, légèrement caramélisée, pour un accompagnement sucré-salé qui change des classiques." }, en: { nom: "PLANTAIN SKEWER", description: "Grilled Plantain Skewer", longDescription: "A grilled plantain skewer with a light caramelized touch, a sweet-savory side that stands out from the classics." } },
  "BROCHETTES VIANDE LÉGUMES": { fr: { nom: "BROCHETTES VIANDE LÉGUMES", description: "Brochettes Mixtes Viande et Légumes", longDescription: "Un assemblage de viande et de légumes grillés ensemble, coloré et équilibré, pour un plat complet en une bouchée." }, en: { nom: "MEAT & VEG SKEWERS", description: "Mixed Meat and Vegetable Skewers", longDescription: "A colorful mix of meat and vegetables grilled together, balanced and satisfying in every bite." } },
  "GOMBO": { fr: { nom: "GOMBO", description: "Sauce Gombo Traditionnelle et Mijotée", longDescription: "Une sauce gombo mijotée selon la tradition, à la texture veloutée, servie généreusement pour accompagner votre féculent préféré." }, en: { nom: "GOMBO", description: "Traditional Simmered Gombo Sauce", longDescription: "A traditionally simmered gombo sauce with a velvety texture, generously served to pair with your favorite side." } },
  "ESSOR GOMBO": { fr: { nom: "ESSOR GOMBO", description: "Gombo Prêt à Emporter", longDescription: "La même sauce gombo mijotée, conditionnée pour être emportée facilement sans compromis sur le goût ni la fraîcheur." }, en: { nom: "GOMBO TO GO", description: "Takeaway Gombo", longDescription: "The same simmered gombo sauce, packed for an easy takeaway without compromising on taste or freshness." } },
  "PÂTES AUX SAUCISSES": { fr: { nom: "PÂTES AUX SAUCISSES", description: "Pâtes Sautées aux Saucisses Fumées", longDescription: "Des pâtes généreusement sautées avec des saucisses fumées, pour un plat rassasiant aux saveurs relevées." }, en: { nom: "SAUSAGE PASTA", description: "Sautéed Pasta with Smoked Sausage", longDescription: "Generously sautéed pasta with smoked sausage, a hearty dish with bold, satisfying flavor." } },
  "PÂTES AUX LÉGUMES": { fr: { nom: "PÂTES AUX LÉGUMES", description: "Pâtes Sautées aux Légumes de Saison", longDescription: "Des pâtes sautées avec des légumes de saison, légères et colorées, pour une option fraîche et équilibrée." }, en: { nom: "VEGETABLE PASTA", description: "Sautéed Seasonal Vegetable Pasta", longDescription: "Sautéed pasta with seasonal vegetables, light and colorful for a fresh, balanced option." } },
  "PENNE VIANDE SAUTÉE": { fr: { nom: "PENNE VIANDE SAUTÉE", description: "Penne à la Viande Sautée et Épicée", longDescription: "Des penne accompagnées de viande sautée légèrement épicée, pour un plat consistant aux saveurs marquées." }, en: { nom: "SAUTÉED MEAT PENNE", description: "Penne with Spiced Sautéed Meat", longDescription: "Penne paired with lightly spiced sautéed meat, a hearty dish with bold flavor." } },
  "POISSON SAUCE TOMATE": { fr: { nom: "POISSON SAUCE TOMATE", description: "Poisson Mijoté à la Sauce Tomate", longDescription: "Un poisson mijoté longuement dans une sauce tomate parfumée, tendre et généreux en saveurs." }, en: { nom: "FISH IN TOMATO SAUCE", description: "Slow-Simmered Fish in Tomato Sauce", longDescription: "Fish slowly simmered in a fragrant tomato sauce, tender and rich in flavor." } },
  "EGOUSSI SOUNNOUN": { fr: { nom: "EGOUSSI SOUNNOUN", description: "Sauce Egoussi Traditionnelle", longDescription: "Une sauce egoussi préparée selon la recette traditionnelle, onctueuse et parfumée, à accompagner du féculent de votre choix." }, en: { nom: "EGOUSSI SOUNNOUN", description: "Traditional Egoussi Sauce", longDescription: "A traditionally prepared egoussi sauce, smooth and fragrant, to enjoy with your favorite side." } },
  "RIZ AVEC LÉGUMES": { fr: { nom: "RIZ AVEC LÉGUMES", description: "Riz Complet aux Légumes", longDescription: "Un riz complet cuisiné avec des légumes variés, léger et équilibré pour un repas sain au quotidien." }, en: { nom: "RICE WITH VEGETABLES", description: "Whole Rice with Vegetables", longDescription: "Whole rice cooked with a mix of vegetables, light and balanced for an everyday healthy meal." } },
  "RIZ CURRY + AILERON / VIANDE DE BŒUF": { fr: { nom: "RIZ CURRY + AILERON / VIANDE DE BŒUF", description: "Riz au Curry avec Aileron ou Bœuf", longDescription: "Un riz parfumé au curry, servi avec au choix des ailerons de poulet ou de la viande de bœuf mijotée, pour un plat riche et généreux." }, en: { nom: "CURRY RICE + WING / BEEF", description: "Curry Rice with Chicken Wing or Beef", longDescription: "Curry-scented rice served with a choice of chicken wings or slow-cooked beef, for a rich, generous meal." } },
  "SALADE COMPOSÉE": { fr: { nom: "SALADE COMPOSÉE", description: "Salade Fraîcheur aux Légumes Croquants", longDescription: "Une salade composée de légumes frais et croquants, légère et colorée, idéale pour un repas équilibré." }, en: { nom: "COMPOSED SALAD", description: "Fresh Salad with Crunchy Vegetables", longDescription: "A composed salad of fresh, crunchy vegetables, light and colorful, ideal for a balanced meal." } },
  "MANTINDJAN": { fr: { nom: "MANTINDJAN", description: "Spécialité Maison Traditionnelle", longDescription: "Une spécialité traditionnelle préparée maison, aux saveurs authentiques transmises avec soin." }, en: { nom: "MANTINDJAN", description: "Traditional Homemade Specialty", longDescription: "A traditional homemade specialty with authentic flavors, carefully prepared." } },
  "SALADE DE PÂTES": { fr: { nom: "SALADE DE PÂTES", description: "Salade de Pâtes Fraîche et Légère", longDescription: "Une salade de pâtes fraîche, légère et généreuse, parfaite pour un déjeuner simple et rassasiant." }, en: { nom: "PASTA SALAD", description: "Fresh, Light Pasta Salad", longDescription: "A fresh, light pasta salad, generous enough for a simple and satisfying lunch." } },
  "SALADE COMPOSÉE 2": { fr: { nom: "SALADE COMPOSÉE 2", description: "Salade de Légumes Variés et Colorés", longDescription: "Une seconde variante de salade composée, aux légumes variés et colorés, pour renouveler le plaisir de la fraîcheur." }, en: { nom: "COMPOSED SALAD 2", description: "Assorted Colorful Vegetable Salad", longDescription: "A second composed salad variation with assorted, colorful vegetables for a refreshing change." } },
  "SISI SPAGHETTIS": { fr: { nom: "SISI SPAGHETTIS", description: "Spaghetti Sauce Tomate Maison", longDescription: "Un spaghetti classique à la sauce tomate maison, simple, réconfortant et généreusement servi." }, en: { nom: "SISI SPAGHETTI", description: "Homestyle Tomato Sauce Spaghetti", longDescription: "A classic spaghetti with homemade tomato sauce, simple, comforting and generously served." } },
});

const localizedProductDetails = {
  "YAOURT NATURE": { fr: "Ingrédients : lait entier bio, ferments lactiques. Lait collecté auprès de fermes locales. À conserver entre 0°C et 6°C, à consommer sous 5 jours après ouverture.", en: "Ingredients: organic whole milk, live cultures. Milk sourced from local farms. Keep between 0°C and 6°C and consume within 5 days after opening." },
  "YAOURT + GRANOLA": { fr: "Ingrédients : yaourt nature bio, granola (avoine, miel, fruits secs). À conserver entre 0°C et 6°C, à consommer rapidement après ouverture pour un granola croustillant.", en: "Ingredients: organic plain yogurt, granola (oats, honey, dried fruit). Keep between 0°C and 6°C and enjoy soon after opening for maximum crunch." },
  "YAOURT GRAND FORMAT": { fr: "Ingrédients : lait entier bio, ferments lactiques. Format familial. À conserver entre 0°C et 6°C, à consommer sous 5 jours après ouverture.", en: "Ingredients: organic whole milk, live cultures. Family-size format. Keep between 0°C and 6°C and consume within 5 days after opening." },
  "CRÊPES MAISON": { fr: "Ingrédients : farine de blé, œufs frais, lait, beurre, une pincée de sel. Préparées le jour même. À conserver au frais, à consommer sous 48h.", en: "Ingredients: wheat flour, fresh eggs, milk, butter and a pinch of salt. Made the same day. Keep chilled and consume within 48 hours." },
  "CRÊPES GOURMANDES": { fr: "Ingrédients : farine de blé, œufs, lait, garniture gourmande maison. Préparées le jour même. À conserver au frais et à réchauffer légèrement avant dégustation.", en: "Ingredients: wheat flour, eggs, milk and a homemade gourmet filling. Made the same day. Keep chilled and warm gently before serving." },
  "CRÊPES CHOCOLAT": { fr: "Ingrédients : farine de blé, œufs, lait, chocolat fondant. Préparées le jour même. À conserver au frais, meilleure dégustation à température ambiante.", en: "Ingredients: wheat flour, eggs, milk and melted chocolate. Made the same day. Keep chilled; best enjoyed at room temperature." },
  "CRÊPES CHOCOOO": { fr: "Ingrédients : farine de blé, œufs, lait, garniture chocolatée. Préparées le jour même. À conserver au frais, à consommer sous 48h.", en: "Ingredients: wheat flour, eggs, milk and a chocolate filling. Made the same day. Keep chilled and consume within 48 hours." },
  "BROCHETTES DE VIANDE": { fr: "Ingrédients : bœuf mariné, épices, oignons. Cuisson grillée au feu de bois. À consommer chaud, idéalement le jour de la livraison.", en: "Ingredients: marinated beef, spices and onions. Wood-fire grilled. Enjoy hot, ideally on the day of delivery." },
  "BROCHETTES GRILLÉES": { fr: "Ingrédients : viande assortie, marinade maison, épices grillées. Cuisson au feu de bois. À consommer chaud, idéalement le jour de la livraison.", en: "Ingredients: assorted meat, homemade marinade and grilled spices. Wood-fire cooked. Enjoy hot, ideally on the day of delivery." },
  "BANANA BROCHETTE": { fr: "Ingrédients : banane plantain, une touche de sucre de canne, cuisson grillée. À consommer chaud, en accompagnement ou seul.", en: "Ingredients: plantain, a touch of cane sugar, grilled cooking. Enjoy hot as a side dish or on its own." },
  "BROCHETTES VIANDE LÉGUMES": { fr: "Ingrédients : viande marinée, poivrons, oignons, courgettes. Cuisson grillée au feu de bois. À consommer chaud, idéalement le jour de la livraison.", en: "Ingredients: marinated meat, peppers, onions and courgettes. Wood-fire grilled. Enjoy hot, ideally on the day of delivery." },
  "GOMBO": { fr: "Ingrédients : gombo frais, viande ou poisson au choix, épices traditionnelles, huile de palme. Mijoté longuement. À consommer chaud avec le féculent de votre choix.", en: "Ingredients: fresh okra, meat or fish of your choice, traditional spices and palm oil. Slowly simmered. Enjoy hot with your preferred starch." },
  "ESSOR GOMBO": { fr: "Ingrédients : gombo frais, viande ou poisson au choix, épices traditionnelles. Conditionné pour l'emport. À réchauffer avant dégustation.", en: "Ingredients: fresh okra, meat or fish of your choice and traditional spices. Packed for takeaway. Reheat before serving." },
  "PÂTES AUX SAUCISSES": { fr: "Ingrédients : pâtes, saucisses fumées, sauce tomate maison, épices. Préparé le jour même. À consommer chaud.", en: "Ingredients: pasta, smoked sausages, homemade tomato sauce and spices. Made the same day. Enjoy hot." },
  "PÂTES AUX LÉGUMES": { fr: "Ingrédients : pâtes, légumes de saison sautés, huile d'olive, épices douces. Préparé le jour même. À consommer chaud ou froid.", en: "Ingredients: pasta, sautéed seasonal vegetables, olive oil and mild spices. Made the same day. Enjoy hot or cold." },
  "PENNE VIANDE SAUTÉE": { fr: "Ingrédients : penne, viande sautée, épices, sauce maison. Préparé le jour même. À consommer chaud.", en: "Ingredients: penne, sautéed meat, spices and homemade sauce. Made the same day. Enjoy hot." },
  "POISSON SAUCE TOMATE": { fr: "Ingrédients : poisson frais, sauce tomate maison, épices, oignons, poivrons. Mijoté longuement. À consommer chaud avec le féculent de votre choix.", en: "Ingredients: fresh fish, homemade tomato sauce, spices, onions and peppers. Slowly simmered. Enjoy hot with your preferred starch." },
  "EGOUSSI SOUNNOUN": { fr: "Ingrédients : graines d'egoussi, viande ou poisson au choix, épices traditionnelles. Mijoté selon la recette traditionnelle. À consommer chaud.", en: "Ingredients: egoussi seeds, meat or fish of your choice and traditional spices. Simmered following a traditional recipe. Enjoy hot." },
  "RIZ AVEC LÉGUMES": { fr: "Ingrédients : riz, légumes de saison, épices douces, huile végétale. Préparé le jour même. À consommer chaud.", en: "Ingredients: rice, seasonal vegetables, mild spices and vegetable oil. Made the same day. Enjoy hot." },
  "RIZ CURRY + AILERON / VIANDE DE BŒUF": { fr: "Ingrédients : riz, curry, ailerons de poulet ou bœuf mijoté au choix, épices. Préparé le jour même. À consommer chaud.", en: "Ingredients: rice, curry, chicken wings or slow-cooked beef of your choice, and spices. Made the same day. Enjoy hot." },
  "SALADE COMPOSÉE": { fr: "Ingrédients : légumes frais de saison, protéines au choix, vinaigrette maison. Préparée le jour même. À consommer frais, idéalement dans les 24h.", en: "Ingredients: fresh seasonal vegetables, protein of your choice and homemade dressing. Made the same day. Enjoy chilled, ideally within 24 hours." },
  "MANTINDJAN": { fr: "Ingrédients : recette traditionnelle maison, épices locales. Préparé selon la recette transmise avec soin. À consommer chaud.", en: "Ingredients: a traditional homemade recipe and local spices. Carefully prepared from a passed-down recipe. Enjoy hot." },
  "SALADE DE PÂTES": { fr: "Ingrédients : pâtes, légumes frais, vinaigrette légère. Préparée le jour même. À consommer frais, idéalement dans les 24h.", en: "Ingredients: pasta, fresh vegetables and light dressing. Made the same day. Enjoy chilled, ideally within 24 hours." },
  "SALADE COMPOSÉE 2": { fr: "Ingrédients : légumes variés et colorés, vinaigrette maison. Préparée le jour même. À consommer frais, idéalement dans les 24h.", en: "Ingredients: assorted colorful vegetables and homemade dressing. Made the same day. Enjoy chilled, ideally within 24 hours." },
  "SISI SPAGHETTIS": { fr: "Ingrédients : spaghetti, sauce tomate maison, épices, herbes fraîches. Préparé le jour même. À consommer chaud.", en: "Ingredients: spaghetti, homemade tomato sauce, spices and fresh herbs. Made the same day. Enjoy hot." },
};

Object.entries(localizedProductDetails).forEach(([nom, details]) => {
  if (!productTextMap[nom]) return;
  productTextMap[nom].fr.details = details.fr;
  productTextMap[nom].en.details = details.en;
});

function formatCfaPrice(amount) {
  return `${new Intl.NumberFormat("fr-FR").format(Math.round(amount / FCFA_STEP) * FCFA_STEP)} FCFA`;
}

function parseCfaPrice(value) {
  const digits = String(value).match(/[\d\s]+(?=\s*FCFA)/);
  return Number((digits ? digits[0] : "0").replace(/\s/g, ""));
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

function getLocalizedDetails(product, lang = currentLang) {
  const data = productTextMap[product.nom];
  if (data && data[lang] && data[lang].details) return data[lang].details;
  return lang === "en" ? "Details coming soon." : "Détails à venir.";
}

function getLocalizedPrice(product) {
  return product.prix;
}

const yaourt = [
  { nom: "YAOURT NATURE", description: "Pot Artisanal Bio", prix: "2 250 FCFA (lot de 3 pots)", image: "asset/images/yaourt/pots_de_yaourt.jpeg", categorie: "yaourt" },
  { nom: "YAOURT + GRANOLA", description: "Pot Gourmand", prix: "1 800 FCFA (le pot)", image: "asset/images/yaourt/yaourt_nature.jpeg", categorie: "yaourt" },
  { nom: "YAOURT GRAND FORMAT", description: "Format Généreux", prix: "À partir de 3 500 FCFA", image: "asset/images/yaourt/yaourt_a_boire.jpeg", categorie: "yaourt" }
];

const dessert = [
  { nom: "CRÊPES MAISON", description: "Crêpes Fines Traditionnelles", prix: "1 850 FCFA", image: "asset/images/dessert/crepes.jpeg", categorie: "dessert" },
  { nom: "CRÊPES GOURMANDES", description: "Crêpes Roulées", prix: "2 500 FCFA", image: "asset/images/dessert/crepe2.jpeg", categorie: "dessert" },
  { nom: "CRÊPES CHOCOLAT", description: "Crêpe Nappée de Chocolat", prix: "2 000 FCFA", image: "asset/images/dessert/crepe_chocolate.jpeg", categorie: "dessert" },
  { nom: "CRÊPES CHOCOOO", description: "Crêpe Fourrée Gourmande", prix: "1 950 FCFA", image: "asset/images/dessert/sables_chocolat_vanille.jpeg", categorie: "dessert" }
];

const plats = [
  { nom: "BROCHETTES DE VIANDE", description: "Brochettes de Bœuf Grillées", prix: "5 900 FCFA", image: "asset/images/plats/brochettes_de_viande.jpeg", categorie: "plats" },
  { nom: "BROCHETTES GRILLÉES", description: "Brochettes de Viande Grillée", prix: "6 050 FCFA", image: "asset/images/plats/brochettes_de_viande_grillee.jpeg", categorie: "plats" },
  { nom: "BANANA BROCHETTE", description: "Brochette à la Banane", prix: "4 500 FCFA", image: "asset/images/plats/brochettes_legumes.jpeg", categorie: "plats" },
  { nom: "BROCHETTES VIANDE LÉGUMES", description: "Brochettes Mixtes Grillées", prix: "5 600 FCFA", image: "asset/images/plats/brochettes_viande_legumes.jpeg", categorie: "plats" },
  { nom: "GOMBO", description: "Sauce Gombo Traditionnelle", prix: "6 200 FCFA", image: "asset/images/plats/gombo.jpeg", categorie: "plats" },
  { nom: "ESSOR GOMBO", description: "Sauce Gombo à Emporter", prix: "À partir de 4 500 FCFA", image: "asset/images/plats/gombo_emporte.jpeg", categorie: "plats" },
  { nom: "PÂTES AUX SAUCISSES", description: "Pâtes Gourmandes", prix: "3 500 FCFA", image: "asset/images/plats/pates_aux_saucisses.jpeg", categorie: "plats" },
  { nom: "PÂTES AUX LÉGUMES", description: "Pâtes Sautées aux Légumes", prix: "4 000 FCFA", image: "asset/images/plats/pattes_aux_legumes.jpeg", categorie: "plats" },
  { nom: "PENNE VIANDE SAUTÉE", description: "Penne à la Viande", prix: "5 350 FCFA", image: "asset/images/plats/penne_sauce_cremeuse.jpeg", categorie: "plats" },
  { nom: "POISSON SAUCE TOMATE", description: "Poisson Mijoté", prix: "6 900 FCFA", image: "asset/images/plats/poisson_sauce_tomate.jpeg", categorie: "plats" },
  { nom: "EGOUSSI SOUNNOUN", description: "Riz Épicé au Poulet", prix: "À partir de 4 000 FCFA", image: "asset/images/plats/riz_au_poulet.jpeg", categorie: "plats" },
  { nom: "RIZ AVEC LÉGUMES", description: "Riz Complet aux Légumes", prix: "5 100 FCFA", image: "asset/images/plats/riz_avec_legumes.jpeg", categorie: "plats" },
  { nom: "RIZ CURRY + AILERON / VIANDE DE BŒUF", description: "Riz Curry Généreux", prix: "À partir de 3 500 FCFA", image: "asset/images/plats/riz_aux_legumes.jpeg", categorie: "plats" },
  { nom: "SALADE COMPOSÉE", description: "Salade Fraîcheur", prix: "4 250 FCFA", image: "asset/images/plats/salade_composee.jpeg", categorie: "plats" },
  { nom: "MANTINDJAN", description: "Spécialité Maison", prix: "À partir de 4 000 FCFA", image: "asset/images/plats/salade_de_legumes.jpeg", categorie: "plats" },
  { nom: "SALADE DE PÂTES", description: "Salade de Pâtes Fraîche", prix: "4 500 FCFA", image: "asset/images/plats/salade_de_pates.jpeg", categorie: "plats" },
  { nom: "SALADE COMPOSÉE 2", description: "Salade de Légumes Variés", prix: "4 250 FCFA", image: "asset/images/plats/salade_multicolore.jpeg", categorie: "plats" },
  { nom: "SISI SPAGHETTIS", description: "Spaghetti Maison", prix: "3 700 FCFA", image: "asset/images/plats/spaghetti_sauce_tomate.jpeg", categorie: "plats" }
];

// Les descriptions catalogue restent synchronisées avec les contenus localisés.
[...yaourt, ...dessert, ...plats].forEach((produit) => {
  produit.description = productTextMap[produit.nom]?.fr.description || produit.description;
});

const catalogue = [...yaourt, ...dessert, ...plats].map((item, index) => ({
  ...item,
  productIndex: index,
}));
const heroProducts = catalogue;

const panier = [];
const wishlist = [];
let produitActuel = 0;
let heroSwiper;
let transitionEnCours = false;
let detailSourceElement;
let filtreActif = "yaourt";
let rechercheActive = "";
let catalogueEnListe = false;

const getHeroElements = () => ({
  hero: document.querySelector(".hero"),
  sidebar: document.querySelector(".hero-sidebar"),
  image: document.querySelector(".hero-swiper .swiper-slide-active .product-image-main") || document.querySelector(".hero-swiper .product-image-main"),
  title: document.querySelector("#product-title"),
  description: document.querySelector(".hero__description"),
});

/** Transforme un chemin local en valeur CSS pour background-image. */
const asBackgroundImage = (imagePath) => `url("${imagePath}")`;

/** Animation d'entrée de la hero après l'initialisation de Swiper. */
function initHeroAnimation() {
  const { title, description } = getHeroElements();
  const images = document.querySelectorAll(".hero-swiper .product-image-main");
  gsap.set(images, { autoAlpha: 0, scale: 0.94 });
  gsap.set([title, description], { autoAlpha: 0, y: 20 });
  gsap.timeline({ defaults: { ease: "power2.out" } })
    .to(images, { autoAlpha: 1, scale: 1, duration: 0.65, stagger: 0.03 })
    .to([title, description], { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 }, "-=0.2");
}

function buildHeroSwiperSlides() {
  const wrapper = document.querySelector(".hero-swiper__wrapper");
  if (!wrapper) return;
  wrapper.innerHTML = heroProducts.map((produit, index) => `
    <div class="swiper-slide hero-swiper__slide" data-product-index="${index}">
      <div class="product-image product-image-main" style="background-image: url('${produit.image}')"></div>
    </div>
  `).join("");
}

function applyHeroSlideBlur(swiper) {
  swiper.slides.forEach((slide) => {
    const image = slide.querySelector(".product-image-main");
    if (!image) return;
    const distance = Math.abs(slide.progress);
    gsap.set(image, {
      filter: `blur(${Math.min(distance * 10, 10)}px)`,
      opacity: Math.max(1 - distance * 0.5, 0.35),
    });
  });
}

function applyHeroSlideBlurTransition(swiper, duration) {
  swiper.slides.forEach((slide) => {
    const image = slide.querySelector(".product-image-main");
    if (image) gsap.to(image, { duration: duration / 1000, ease: "power2.out" });
  });
}

function updateHeroContentFromActiveSlide() {
  if (!heroSwiper) return;
  const activeSlide = heroSwiper.slides[heroSwiper.activeIndex];
  const productIndex = Number(activeSlide?.dataset.productIndex);
  const produit = heroProducts[productIndex];
  if (!produit) return;
  produitActuel = produit.productIndex;
  const { title, description } = getHeroElements();
  gsap.timeline()
    .to([title, description], { autoAlpha: 0, y: -10, duration: 0.35 })
    .add(() => {
      title.textContent = getLocalizedText(produit, "nom");
      description.innerHTML = `${getLocalizedText(produit, "description")} <span aria-hidden="true">|</span> ${produit.prix}`;
    })
    .to([title, description], { autoAlpha: 1, y: 0, duration: 0.5 });
}

function initHeroSwiper() {
  if (typeof Swiper === "undefined") return;
  buildHeroSwiperSlides();
  heroSwiper = new Swiper(".hero-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 1400,
    coverflowEffect: { rotate: 0, stretch: 0, depth: 220, modifier: 1.4, slideShadows: false },
    autoplay: { delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: false },
    navigation: { nextEl: ".hero__arrow--right", prevEl: ".hero__arrow--left" },
    on: {
      progress: applyHeroSlideBlur,
      setTransition: applyHeroSlideBlurTransition,
      slideChangeTransitionStart: updateHeroContentFromActiveSlide,
    },
  });
  updateHeroContentFromActiveSlide();
}

function startHeroAutoplay() {
  heroSwiper?.autoplay?.start();
}

function stopHeroAutoplay() {
  heroSwiper?.autoplay?.stop();
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
  if (document.body.classList.contains("about-page-open")) closeAboutPageInstant();
  if (transitionEnCours || document.body.classList.contains("product-detail-open")) return;
  filtreActif = filter;
  catalogueEnListe = listView;
  updateCategoryActiveState(filter);
  updateViewToggles();
  renderProductGrid();
  const { hero } = getHeroElements();
  const catalog = document.querySelector(".product-catalog");
  stopHeroAutoplay();

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

/** Ferme la fiche sans rejouer le retour hero lorsque la destination est le catalogue. */
function closeProductDetailInstant() {
  const detail = document.querySelector(".product-detail");
  const catalog = document.querySelector(".product-catalog");
  const revealItems = detail.querySelectorAll(".detail-price, .detail-variants, .format-select, .detail-product-heading, .detail-actions, .detail-description, .accordions");
  gsap.killTweensOf([detail, ...revealItems]);
  document.querySelectorAll(".product-image-transition").forEach((proxy) => proxy.remove());
  gsap.set(detail, { display: "none", autoAlpha: 1 });
  detail.setAttribute("aria-hidden", "true");
  document.body.classList.remove("product-detail-open");
  if (document.body.classList.contains("catalog-open")) gsap.set(catalog, { autoAlpha: 1, scale: 1 });
  stopHeroAutoplay();
  transitionEnCours = false;
}

function navigateToCatalog(event, category) {
  event.preventDefault();
  if (document.body.classList.contains("about-page-open")) closeAboutPageInstant();
  if (document.body.classList.contains("product-detail-open")) closeProductDetailInstant();
  showCatalog(null, category);
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
  document.querySelector("#accordion-details p").textContent = getLocalizedDetails(produit);
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
  if (document.body.classList.contains("about-page-open")) closeAboutPageInstant();
  if (transitionEnCours || document.body.classList.contains("product-detail-open")) return;
  transitionEnCours = true;
  stopHeroAutoplay();
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
    startHeroAutoplay();
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
  if (document.body.classList.contains("about-page-open")) {
    hideAboutPage();
    return;
  }
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
  startHeroAutoplay();
}

function showAboutPage(event) {
  event?.preventDefault();
  if (transitionEnCours || document.body.classList.contains("about-page-open")) return;
  if (document.body.classList.contains("product-detail-open")) closeProductDetailInstant();

  const { hero, sidebar } = getHeroElements();
  const catalog = document.querySelector(".product-catalog");
  const about = document.querySelector(".about-page");
  stopHeroAutoplay();
  document.body.classList.remove("catalog-open");
  catalog.style.display = "none";
  catalog.setAttribute("aria-hidden", "true");
  gsap.set([hero, sidebar], { autoAlpha: 0, scale: 1 });
  about.style.display = "block";
  about.scrollTop = 0;
  about.setAttribute("aria-hidden", "false");
  document.body.classList.add("about-page-open");
  initAccordions();
  gsap.fromTo(about, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
}

function hideAboutPage() {
  const { hero, sidebar } = getHeroElements();
  const about = document.querySelector(".about-page");
  gsap.to(about, { autoAlpha: 0, duration: 0.28, ease: "power2.in", onComplete: () => {
    about.style.display = "none";
    about.setAttribute("aria-hidden", "true");
    document.body.classList.remove("about-page-open");
    gsap.to([hero, sidebar], { autoAlpha: 1, scale: 1, duration: 0.32, ease: "power2.out" });
    startHeroAutoplay();
  } });
}

function closeAboutPageInstant() {
  const about = document.querySelector(".about-page");
  gsap.killTweensOf(about);
  gsap.set(about, { display: "none", autoAlpha: 1 });
  about.setAttribute("aria-hidden", "true");
  document.body.classList.remove("about-page-open");
}

function initAccordions() {
  document.querySelectorAll("[data-accordion-group]").forEach((group) => {
    const items = group.querySelectorAll(".accordion-item");
    items.forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      if (trigger.dataset.accordionReady) return;
      trigger.dataset.accordionReady = "true";
      trigger.addEventListener("click", () => {
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
      });
    });
  });
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

function initTheme() {
  applyTheme(currentThemePreference || "light");
}

function applyTheme(theme) {
  const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  currentThemePreference = theme;

  if (theme === "system") {
    const prefersDark = themeMedia.matches;
    document.body.classList.toggle("theme-dark", prefersDark);
    themeMedia.addEventListener("change", (event) => {
      if (currentThemePreference === "system") {
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
  if (panel.classList.contains("is-open")) {
    closeSearch();
    return;
  }
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  input.focus();
}

function closeSearch() {
  const panel = document.querySelector(".header-search");
  const input = document.querySelector("[data-header-search-input]");
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  input.value = "";
  document.querySelector("[data-header-search-results]").innerHTML = "";
}

function normalizeSearch(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
}

function renderHeaderSearchResults(query) {
  const resultsBox = document.querySelector("[data-header-search-results]");
  const normalizedQuery = normalizeSearch(query.trim());
  if (!normalizedQuery) {
    resultsBox.innerHTML = "";
    return;
  }
  const results = catalogue.filter((produit) => normalizeSearch(`${produit.nom} ${getLocalizedText(produit, "nom")}`).includes(normalizedQuery)).slice(0, 8);
  resultsBox.innerHTML = results.length ? results.map((produit) => `
    <button class="header-search__result" type="button" data-product-index="${produit.productIndex}">
      <span class="header-search__result-image" style="background-image: url('${produit.image}')"></span>
      <span class="header-search__result-name">${getLocalizedText(produit, "nom")}</span>
      <span class="header-search__result-price">${produit.prix}</span>
    </button>
  `).join("") : `<p class="header-search__empty">${translations[currentLang].misc.searchEmpty}</p>`;
}

function applyAboutTranslations(about) {
  const t = translations[currentLang].about;
  about.querySelector(".about-page__back").textContent = t.back;
  about.querySelector(".about-page__eyebrow").textContent = t.eyebrow;
  about.querySelector(".about-page__title").textContent = t.title;
  about.querySelector(".about-page__intro").textContent = t.intro;
  const sections = about.querySelectorAll(".about-page__section");
  sections[0].querySelector(".about-page__section-title").textContent = t.historyTitle;
  sections[0].querySelector(".about-page__text").textContent = t.historyText;
  sections[1].querySelector(".about-page__section-title").textContent = t.missionTitle;
  sections[1].querySelector(".about-page__text").textContent = t.missionText;
  sections[2].querySelector(".about-page__section-title").textContent = t.valuesTitle;
  about.querySelectorAll(".about-page__value").forEach((value, index) => {
    value.querySelector("h3").textContent = t.values[index][0];
    value.querySelector("p").textContent = t.values[index][1];
  });
  sections[3].querySelector(".about-page__section-title").textContent = t.servicesTitle;
  sections[3].querySelector(".about-page__text").textContent = t.servicesText;
  about.querySelectorAll(".about-page__accordions .accordion-item").forEach((item, index) => {
    item.querySelector(".accordion-label").textContent = t.delivery[index][0];
    item.querySelector(".accordion-panel p").textContent = t.delivery[index][1];
  });
  about.querySelector(".about-page__cta p").textContent = t.ctaText;
  about.querySelector("[data-about-contact]").textContent = t.ctaButton;
}

function applyLanguage(lang = currentLang) {
  currentLang = lang;
  const t = translations[currentLang];
  const navLeft = document.querySelectorAll(".navbar__group--left a");
  const navRight = document.querySelectorAll(".navbar__group--right a");
  navLeft[0].textContent = t.nav.yaourt;
  navLeft[1].textContent = t.nav.dessert;
  navLeft[2].textContent = t.nav.plats;
  navLeft[3].textContent = t.nav.about;
  navRight[0].textContent = t.nav.wishlist;
  navRight[1].textContent = t.nav.blog;
  document.querySelector("[data-language-toggle]").querySelector(".language-current").textContent = t.nav.language;
  document.querySelector(".language-current").textContent = t.nav.language;
  document.querySelector("[data-language-toggle]").setAttribute("aria-label", t.nav.language);
  document.querySelector("[data-search-toggle]").setAttribute("aria-label", t.nav.search);
  document.querySelector("[data-header-search-input]").placeholder = t.misc.searchPlaceholder;
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
  document.querySelectorAll(".product-detail .accordion-trigger").forEach((trigger, index) => {
    const label = trigger.querySelector(".accordion-label");
    if (label) label.textContent = t.detail.accordion[index];
  });
  document.querySelectorAll(".product-detail .accordion-panel p").forEach((panel, index) => {
    if (index > 0) panel.textContent = t.detail.accordionContent[index];
  });
  document.querySelector("#accordion-details p").textContent = getLocalizedDetails(catalogue[produitActuel]);
  document.querySelector(".cart-empty").textContent = t.detail.cartEmpty;
  document.querySelector(".drawer-header h2").textContent = t.detail.cartTitle;
  document.querySelector("[data-checkout]").textContent = t.detail.checkout;
  document.querySelector(".checkout-contact__title").textContent = t.detail.checkoutTitle;
  document.querySelector(".checkout-contact__subtitle").textContent = t.detail.checkoutSubtitle;
  document.querySelector("[data-cart-close]").setAttribute("aria-label", t.detail.close);
  document.querySelector("[data-cart-toggle]").setAttribute("aria-label", t.nav.cart);
  applyAboutTranslations(document.querySelector(".about-page"));
  document.querySelectorAll("[data-language]").forEach((option) => {
    option.classList.toggle("is-active", option.dataset.language.toLowerCase() === lang);
  });
  renderHeaderSearchResults(document.querySelector("[data-header-search-input]").value);
  renderProductGrid();
  updateCart();
  updateProductDetail();
  updateHeroContentFromActiveSlide();
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

function closeMobileMenu() {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("#mobile-navigation");
  navbar.classList.remove("menu-is-open");
  if (!window.matchMedia("(max-width: 760px)").matches) {
    menu.inert = false;
    menu.removeAttribute("aria-hidden");
    return;
  }
  menu.inert = true;
  menu.setAttribute("aria-hidden", "true");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Ouvrir le menu");
}

function toggleMobileMenu() {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("#mobile-navigation");
  const isOpen = navbar.classList.toggle("menu-is-open");
  menu.inert = !isOpen;
  menu.setAttribute("aria-hidden", String(!isOpen));
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
}

/** Tous les écouteurs sont initialisés de façon centralisée après le DOM. */
function initEventListeners() {
  document.querySelector(".button-pill").addEventListener("click", showProductDetail);
  document.querySelector(".detail-back").addEventListener("click", goBackToHero);
  document.querySelectorAll("[data-page='about']").forEach((link) => link.addEventListener("click", (event) => {
    closeMobileMenu();
    showAboutPage(event);
  }));
  document.querySelector(".about-page__back").addEventListener("click", hideAboutPage);
  document.querySelector("[data-about-contact]").addEventListener("click", openCheckoutContact);
  document.querySelector("[data-home-link]").addEventListener("click", showHero);
  document.querySelectorAll("[data-nav-filter]").forEach((link) => link.addEventListener("click", (event) => {
    closeMobileMenu();
    navigateToCatalog(event, link.dataset.navFilter);
  }));
  document.querySelector("[data-menu-toggle]").addEventListener("click", toggleMobileMenu);
  window.addEventListener("resize", closeMobileMenu);
  document.querySelectorAll("[data-category]").forEach((link) => link.addEventListener("click", (event) => navigateToCatalog(event, link.dataset.category)));
  document.querySelectorAll("[data-catalog-view]").forEach((toggle) => toggle.addEventListener("click", (event) => {
    const filter = toggle.closest(".hero") ? "all" : filtreActif;
    showCatalog(event, filter, toggle.dataset.catalogView === "list");
  }));
  document.querySelector("[data-search-toggle]").addEventListener("click", toggleSearch);
  document.querySelector("[data-search-close]").addEventListener("click", closeSearch);
  document.querySelector("[data-header-search-input]").addEventListener("input", (event) => renderHeaderSearchResults(event.target.value));
  document.querySelector("[data-header-search-results]").addEventListener("click", (event) => {
    const result = event.target.closest(".header-search__result");
    if (!result) return;
    produitActuel = Number(result.dataset.productIndex);
    closeSearch();
    if (document.body.classList.contains("product-detail-open")) {
      updateProductDetail();
      return;
    }
    showProductDetail(null, getHeroElements().image);
  });
  document.addEventListener("click", (event) => {
    const panel = document.querySelector(".header-search");
    if (panel.classList.contains("is-open") && !panel.contains(event.target) && !event.target.closest("[data-search-toggle]")) closeSearch();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
      closeMobileMenu();
    }
  });
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
  initTheme();
  applyLanguage(currentLang);
  renderProductGrid();
  updateCart();
  updateWishlistButton();
  document.querySelector(".review-count").textContent = Math.floor(Math.random() * 41) + 10;
  initHeroSwiper();
  initHeroAnimation();
  initAccordions();
  initEventListeners();
  closeMobileMenu();
  startHeroAutoplay();
}

document.addEventListener("DOMContentLoaded", init);
