// --------------------------------------------------
// Stores the cart key and provides shared cart and price helpers.
const CART_KEY = 'xdv-cart-v1';
const readCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; } };
const writeCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const peso = (value) => `₱${Number(value).toLocaleString('en-PH')}`;

const productBrands = {
  'ASUS Dual RTX 5060 OC': 'asus',
  'ASUS Dual RTX 5060 Ti OC': 'asus',
  'MSI RTX 5060 Ti Shadow 2X OC': 'msi',
  'MSI RTX 5070 Shadow 2X OC': 'msi',
  'Gigabyte RTX 5070 Ti Windforce OC SFF': 'gigabyte',
  'XFX Swift RX 9060 XT OC Gaming Edition': 'xfx',
  'ASUS Prime RX 9070 XT OC Edition': 'asus',
  'XFX Swift RX 9070 XT Gaming Edition': 'xfx',
  'Corsair CX650': 'corsair',
  'MSI MAG A750GL PCIE5': 'msi',
  'Corsair RM1000e': 'corsair',
  'AMD Ryzen 5 5600': 'amd',
  'AMD Ryzen 7 5700X': 'amd',
  'AMD Ryzen 7 5700X3D': 'amd',
  'AMD Ryzen 5 7600': 'amd',
  'AMD Ryzen 7 9700X': 'amd',
  'AMD Ryzen 7 9800X3D': 'amd',
  'MSI B550M PRO-VDH WIFI': 'msi',
  'MSI B550-A PRO': 'msi',
  'MSI PRO B850M-A WIFI': 'msi',
  'Gigabyte B850 AORUS Elite WIFI7': 'gigabyte',
  'Gigabyte X870 AORUS Elite WIFI7': 'gigabyte',
  'Kingston Fury Beast DDR5': 'kingston',
  'Corsair Vengeance DDR5': 'corsair',
  'Kingston Fury Beast DDR5 RGB': 'kingston',
  'Corsair Vengeance DDR5 RGB': 'corsair',
  'Teamgroup T-Force Vulcan Z 16GB': 'teamgroup',
  'Teamgroup T-Force Vulcan Z 32GB': 'teamgroup',
  'Kingston NV2': 'kingston',
  'WD Blue SN580': 'wd',
  'Samsung 990 EVO': 'samsung',
  'Samsung 990 PRO': 'samsung',
  'DeepCool AK400': 'deepcool',
  'Thermalright Peerless Assassin 120 SE': 'thermalright',
  'Noctua NH-D15': 'noctua',
  'DeepCool LE520': 'deepcool',
  'Arctic Liquid Freezer III 360': 'arctic',
  'Montech AIR 100 ARGB': 'montech',
  'NZXT H5 Flow': 'nzxt',
  'Montech AIR 903 MAX': 'montech',
  'Lian Li LANCOOL 216': 'lian-li',
  'Lian Li O11 Dynamic EVO': 'lian-li'
};

const brandLabels = {
  asus: 'ASUS',
  msi: 'MSI',
  gigabyte: 'Gigabyte',
  xfx: 'XFX',
  corsair: 'Corsair',
  amd: 'AMD',
  kingston: 'Kingston',
  teamgroup: 'Teamgroup',
  wd: 'WD',
  samsung: 'Samsung',
  deepcool: 'DeepCool',
  thermalright: 'Thermalright',
  noctua: 'Noctua',
  arctic: 'Arctic',
  montech: 'Montech',
  nzxt: 'NZXT',
  'lian-li': 'Lian Li'
};

const productDescriptions = {
  'ASUS Dual RTX 5060 OC': 'A compact GeForce graphics card built for smooth 1080p gaming.',
  'ASUS Dual RTX 5060 Ti OC': 'A compact GeForce graphics card built for smooth 1080p gaming.',
  'MSI RTX 5060 Ti Shadow 2X OC': 'A quiet dual-fan graphics card for high-refresh 1080p and 1440p gaming.',
  'MSI RTX 5070 Shadow 2X OC': 'A powerful Blackwell graphics card with DLSS 4 for demanding gaming.',
  'Gigabyte RTX 5070 Ti Windforce OC SFF': 'A compact high-performance GPU designed for small-form-factor builds.',
  'XFX Swift RX 9060 XT OC Gaming Edition': 'A triple-fan Radeon card tuned for smooth 1440p gaming.',
  'ASUS Prime RX 9070 XT OC Edition': 'A high-end Radeon card delivering fast performance for 4K gaming.',
  'XFX Swift RX 9070 XT Gaming Edition': 'A capable Radeon gaming card with efficient triple-fan cooling.',
  'Corsair CX650': 'A dependable 650W power supply for entry-level gaming systems.',
  'MSI MAG A750GL PCIE5': 'A fully modular 750W power supply ready for modern PCIe 5.0 hardware.',
  'Corsair RM1000e': 'A high-capacity modular PSU built for powerful enthusiast systems.',
  'AMD Ryzen 5 5600': 'A six-core AM4 processor offering reliable everyday and gaming performance.',
  'AMD Ryzen 7 5700X': 'An eight-core AM4 processor suited for gaming, streaming, and multitasking.',
  'AMD Ryzen 7 5700X3D': 'A gaming-focused AM4 processor with extra 3D V-Cache for higher frame rates.',
  'AMD Ryzen 5 7600': 'A fast six-core AM5 processor with efficient Zen 4 performance.',
  'AMD Ryzen 7 9700X': 'An efficient eight-core Zen 5 processor for demanding desktop workloads.',
  'AMD Ryzen 7 9800X3D': 'A premium gaming processor built for exceptional frame-rate performance.',
  'MSI B550M PRO-VDH WIFI': 'A compact AM4 motherboard with Wi-Fi for versatile mainstream builds.',
  'MSI B550-A PRO': 'A dependable AM4 motherboard with practical expansion for desktop upgrades.',
  'MSI PRO B850M-A WIFI': 'A compact AM5 motherboard with modern connectivity and integrated Wi-Fi.',
  'Gigabyte B850 AORUS Elite WIFI7': 'A feature-rich AM5 motherboard with fast Wi-Fi 7 connectivity.',
  'Gigabyte X870 AORUS Elite WIFI7': 'A premium AM5 motherboard designed for high-performance Ryzen systems.',
  'Kingston Fury Beast DDR5': 'Reliable DDR5 memory for responsive everyday computing and gaming.',
  'Corsair Vengeance DDR5': 'High-speed DDR5 memory optimized for modern performance builds.',
  'Kingston Fury Beast DDR5 RGB': 'Vibrant RGB DDR5 memory combining style with dependable performance.',
  'Corsair Vengeance DDR5 RGB': 'High-capacity RGB DDR5 memory for powerful gaming and creator systems.',
  'Teamgroup T-Force Vulcan Z 16GB': 'Affordable DDR4 memory for balanced everyday gaming builds.',
  'Teamgroup T-Force Vulcan Z 32GB': 'A 32GB DDR4 kit offering smooth multitasking and gaming performance.',
  'Kingston NV2': 'A compact NVMe SSD offering fast storage for everyday systems.',
  'WD Blue SN580': 'A reliable PCIe 4.0 NVMe SSD for quick boots and responsive applications.',
  'Samsung 990 EVO': 'A fast, efficient NVMe SSD for gaming and high-speed desktop storage.',
  'Samsung 990 PRO': 'A premium NVMe SSD delivering excellent sustained performance for demanding users.',
  'DeepCool AK400': 'A quiet tower air cooler for efficient mainstream CPU cooling.',
  'Thermalright Peerless Assassin 120 SE': 'A dual-tower cooler built for strong performance at a low noise level.',
  'Noctua NH-D15': 'A premium dual-tower air cooler known for excellent thermal performance.',
  'DeepCool LE520': 'A 240mm liquid cooler designed for effective modern CPU cooling.',
  'Arctic Liquid Freezer III 360': 'A high-capacity 360mm liquid cooler for demanding processors.',
  'Montech AIR 100 ARGB': 'A compact airflow case with integrated ARGB lighting for clean builds.',
  'NZXT H5 Flow': 'A streamlined airflow case designed for practical gaming setups.',
  'Montech AIR 903 MAX': 'A spacious airflow case with room for powerful components and cooling.',
  'Lian Li LANCOOL 216': 'A high-airflow case with large fans for efficient gaming builds.',
  'Lian Li O11 Dynamic EVO': 'A premium showcase case built for flexible layouts and custom cooling.'
};

// --------------------------------------------------
// Contains the products shown in the PC Parts catalog.
const catalogProducts = [
  ['ASUS Dual RTX 5060 OC', 'gpu', 'NVIDIA RTX 5060', '8GB GDDR7', 23950],
  ['MSI RTX 5060 Ti Shadow 2X OC', 'gpu', 'NVIDIA RTX 5060 Ti', '8GB GDDR7', 29995],
  ['MSI RTX 5070 Shadow 2X OC', 'gpu', 'NVIDIA RTX 5070', '12GB GDDR7', 48895],
  ['Gigabyte RTX 5070 Ti Windforce OC SFF', 'gpu', 'NVIDIA RTX 5070 Ti', '16GB GDDR7', 81995],
  ['XFX Swift RX 9060 XT OC Gaming Edition', 'gpu', 'AMD Radeon RX 9060 XT', '16GB GDDR6', 27950],
  ['ASUS Prime RX 9070 XT OC Edition', 'gpu', 'AMD Radeon RX 9070 XT', '16GB GDDR6', 53250],
  ['XFX Swift RX 9070 XT Gaming Edition', 'gpu', 'AMD Radeon RX 9070 XT', '16GB GDDR6', 48850],
  ['Corsair CX650', 'psu', 'Entry-Level PSU', '650W • 80+ Bronze', 3490],
  ['MSI MAG A750GL PCIE5', 'psu', 'Mid-Range PSU', '750W • 80+ Gold', 5490],
  ['Corsair RM1000e', 'psu', 'High-End PSU', '1000W • 80+ Gold', 9990],
  ['AMD Ryzen 5 5600', 'processor', 'AM4', '6 / 12', 6995],
  ['AMD Ryzen 7 5700X', 'processor', 'AM4', '8 / 16', 9995],
  ['AMD Ryzen 7 5700X3D', 'processor', 'AM4', '8 / 16', 14995],
  ['AMD Ryzen 5 7600', 'processor', 'AM5', '6 / 12', 12995],
  ['AMD Ryzen 7 9700X', 'processor', 'AM5', '8 / 16', 22995],
  ['AMD Ryzen 7 9800X3D', 'processor', 'AM5', '8 / 16', 29995],
  ['MSI B550M PRO-VDH WIFI', 'motherboard', 'AM4 Motherboard', 'AM4 • B550', 6995],
  ['MSI B550-A PRO', 'motherboard', 'AM4 Motherboard', 'AM4 • B550', 7995],
  ['MSI PRO B850M-A WIFI', 'motherboard', 'AM5 Motherboard', 'AM5 • B850', 11995],
  ['Gigabyte B850 AORUS Elite WIFI7', 'motherboard', 'AM5 Motherboard', 'AM5 • B850', 15650],
  ['Gigabyte X870 AORUS Elite WIFI7', 'motherboard', 'AM5 Motherboard', 'AM5 • X870', 18695],
  ['Kingston Fury Beast DDR5', 'ram', 'DDR5 RAM', '16GB (2×8GB) • 5600MHz', 3495],
  ['Corsair Vengeance DDR5', 'ram', 'DDR5 RAM', '32GB (2×16GB) • 6000MHz', 6495],
  ['Kingston Fury Beast DDR5 RGB', 'ram', 'DDR5 RGB RAM', '32GB (2×16GB) • 6000MHz', 7495],
  ['Corsair Vengeance DDR5 RGB', 'ram', 'DDR5 RGB RAM', '64GB (2×32GB) • 6000MHz', 12995],
  ['Teamgroup T-Force Vulcan Z 16GB', 'ram', 'DDR4 RAM', '16GB (2×8GB) • 3600MHz', 8395],
  ['Teamgroup T-Force Vulcan Z 32GB', 'ram', 'DDR4 RAM', '32GB (2×16GB) • 3600MHz', 15895],
  ['Kingston NV2', 'storage', 'NVMe M.2 SSD', '500GB', 2495],
  ['WD Blue SN580', 'storage', 'NVMe M.2 SSD', '1TB', 4495],
  ['Samsung 990 EVO', 'storage', 'NVMe M.2 SSD', '1TB', 5995],
  ['Samsung 990 PRO', 'storage', 'NVMe M.2 SSD', '2TB', 10995],
  ['DeepCool AK400', 'cpu cooler', 'Air Cooler', '', 1695],
  ['Thermalright Peerless Assassin 120 SE', 'cpu cooler', 'Dual-Tower Air Cooler', '', 2495],
  ['Noctua NH-D15', 'cpu cooler', 'Dual-Tower Air Cooler', '', 5495],
  ['DeepCool LE520', 'cpu cooler', '240mm AIO', '', 3995],
  ['Arctic Liquid Freezer III 360', 'cpu cooler', '360mm AIO', '', 6995],
  ['Montech AIR 100 ARGB', 'case', 'Micro-ATX Case', '', 3495],
  ['NZXT H5 Flow', 'case', 'Mid-Tower Case', '', 4995],
  ['Montech AIR 903 MAX', 'case', 'Mid-Tower Case', '', 5495],
  ['Lian Li LANCOOL 216', 'case', 'Mid-Tower Case', '', 6495],
  ['Lian Li O11 Dynamic EVO', 'case', 'Mid-Tower Case', '', 9995]
];

// --------------------------------------------------
// Contains the products shown in the Prebuilt PCs catalog.
const prebuiltProducts = [
  ['XDV Valor Lite', 'Low-End', 'Ryzen 5 5600G • 16GB RAM • 500GB SSD • Integrated Graphics', 29995],
  ['XDV Starter X1', 'Low-End / Entry Gaming', 'Ryzen 5 5600 • RX 9060 XT • 16GB DDR5 • 1TB SSD', 59995],
  ['XDV Apex M1', 'Mid-End', 'Ryzen 5 9600X • RTX 5070 • 32GB DDR5 • 1TB SSD', 89995],
  ['XDV Apex M2', 'Mid-End', 'Ryzen 7 9700X • RTX 5070 Ti • 32GB DDR5 • 1TB SSD', 119995],
  ['XDV Titan X', 'High-End', 'Ryzen 7 9800X3D • RTX 5080 • 32GB DDR5 • 2TB SSD', 169995]
];

// --------------------------------------------------
// Converts product names into URL-safe IDs and finds their page folders.
const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// --------------------------------------------------
// Builds the image path for a prebuilt product card.
const prebuiltImageUrl = (name) => `../Products/Prebuilt_PCs/pics/${slugify(name).replaceAll('-', '_')}.png`;

// --------------------------------------------------
// Builds links to the individual product pages.
const productFolder = (category) => ({
  gpu: 'GPU',
  motherboard: 'Motherboards',
  psu: 'PSU',
  processor: 'CPU',
  ram: 'RAM',
  storage: 'Storage',
  'cpu cooler': 'CPU_Coolers',
  case: 'Cases',
  prebuilt: 'Prebuilt_PCs'
}[category] || 'Products');
const productDetailUrl = (name, category) => `../Products/${productFolder(category)}/${slugify(name).replaceAll('-', '_')}.html`;

// --------------------------------------------------
// Renders catalog cards for PC Parts and Prebuilt PCs.
function renderDocumentCatalogs() {
  const partsGrid = document.querySelector('[data-parts-grid]');
  if (partsGrid && !partsGrid.querySelector('[data-product-card]')) {
    partsGrid.innerHTML = catalogProducts.map(([name, category, type, specs, price]) => `<article class="product-card" data-product-card data-category="${category}" data-brand="${productBrands[name]}" data-price="${price}"><a href="${productDetailUrl(name, category)}" class="product-image"><div class="image-placeholder" role="img" aria-label="${name} — image needed"><span>ADD IMAGE<small>Product image needed</small></span></div><span class="tag">${category.toUpperCase()}</span></a><div class="product-info"><p class="product-type">${brandLabels[productBrands[name]]}</p><h3>${name}</h3><p>${productDescriptions[name] || specs || type}</p><div class="product-bottom"><strong>${peso(price)}</strong><button type="button" class="button button-red pc-parts-add-button" data-add-to-cart data-id="${slugify(name)}" data-name="${name}" data-price="${price}" data-image="">Add to cart</button></div></div></article>`).join('');
  }
  const prebuiltGrid = document.querySelector('.prebuilt-hero + .catalog-section .product-grid');
  if (prebuiltGrid) {
    prebuiltGrid.innerHTML = prebuiltProducts.map(([name, type, specs, price]) => `<article class="product-card"><a href="${productDetailUrl(name, 'prebuilt')}" class="product-image"><img src="${prebuiltImageUrl(name)}" alt="${name}"><span class="tag">${type.toUpperCase()}</span></a><div class="product-info"><p class="product-type">${type}</p><h3>${name}</h3><p>${specs}</p><div class="product-bottom"><strong>${peso(price)}</strong><button type="button" class="button button-red pc-parts-add-button" data-add-to-cart data-id="${slugify(name)}" data-name="${name}" data-price="${price}" data-image="${prebuiltImageUrl(name)}">Add to cart</button></div></div></article>`).join('');
    const count = prebuiltGrid.closest('.catalog-section')?.querySelector('.catalog-note');
    if (count) count.textContent = `${prebuiltProducts.length} systems / ready to ship`;
  }

}

// --------------------------------------------------
// Replaces PC Parts detail links with working Add to Cart buttons.
function setupPartsAddToCart() {
  document.querySelectorAll('[data-parts-grid] [data-product-card]').forEach((card) => {
    const detailLink = card.querySelector('.product-bottom a');
    if (!detailLink) return;
    const image = card.querySelector('.product-image img');
    const name = card.querySelector('h3')?.textContent?.trim();
    if (!name) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button button-red pc-parts-add-button';
    button.dataset.addToCart = '';
    button.dataset.id = slugify(name);
    button.dataset.name = name;
    button.dataset.price = card.dataset.price || '0';
    button.dataset.image = image?.getAttribute('src') || '';
    button.textContent = 'Add to cart';
    detailLink.replaceWith(button);
  });
}

// --------------------------------------------------
// Renders a product detail view when a catalog product is selected.
function renderCatalogProductDetail() {
  const target = document.querySelector('[data-catalog-product-detail]');
  if (!target) return;
  const slug = new URLSearchParams(window.location.search).get('product');
  const product = [...catalogProducts.map(([name, category, type, specs, price]) => ({ name, category, type, specs, price })),
  ...prebuiltProducts.map(([name, type, specs, price]) => ({ name, category: 'prebuilt', type, specs, price }))].find((item) => slugify(item.name) === slug);
  if (!product) {
    target.innerHTML = '<p class="no-results">Product not found.</p>';
    return;
  }
  const catalogLabel = product.category === 'prebuilt'
    ? '<a href="../Prebuilt%20PC/prebuilt.html">Prebuilt PCs</a>'
    : '<a href="../PC%20Parts/pc-parts.html">PC Parts</a>';
  const description = `Built for ${product.type} systems, the ${product.name} delivers dependable performance and practical features. It is a strong choice for everyday use, gaming, and future upgrades.`;
  target.innerHTML = `<div class="product-breadcrumb"><a href="../index.html">Home</a><span>/</span>${catalogLabel}<span>/</span><b>${product.name}</b></div><section class="product-detail"><div class="detail-image"><div class="image-placeholder" role="img" aria-label="${product.name} — image needed"><span>ADD IMAGE<small>Product image needed</small></span></div><span class="tag">${product.category.toUpperCase()}</span></div><div class="detail-copy"><p class="eyebrow dark">XDV SELECT <span>/</span> ${product.type}</p><h1>${product.name}</h1><h2>Specifications</h2><p class="detail-specifications">${product.specs || product.type}</p><h2>Description</h2><p class="detail-description">${description}</p><div class="detail-price">${peso(product.price)}</div><div class="detail-rule"></div><div class="spec-list"><div><span>Category</span><b>${product.category}</b></div><div><span>Availability</span><b>In stock · ready to ship</b></div><div><span>Warranty</span><b>Official XDV support</b></div></div><button class="button button-red add-button" data-add-to-cart data-id="${slug}" data-name="${product.name}" data-price="${product.price}" data-image="">ADD TO CART <span>→</span></button></div></section>`;
}

// --------------------------------------------------
// Updates the cart item count displayed in the site navigation.
function updateCount() {
  const count = readCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach((el) => { el.textContent = count; });
}

// --------------------------------------------------
// Keeps open pages synchronized when another page changes the saved cart.
window.addEventListener('storage', (event) => {
  if (event.key !== CART_KEY) return;
  updateCount();
  renderCart();
});
window.addEventListener('pageshow', () => {
  updateCount();
  renderCart();
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  updateCount();
  renderCart();
});

// --------------------------------------------------
// Shows a temporary confirmation message near the bottom of the page.
function showToast(message) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

// --------------------------------------------------
// Adds a product to localStorage or increases its existing quantity.
function addToCart(button) {
  const item = { id: button.dataset.id, name: button.dataset.name, price: Number(button.dataset.price), image: button.dataset.image || '' };
  const cart = readCart();
  const existing = cart.find((product) => product.id === item.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...item, quantity: 1 });
  writeCart(cart); updateCount(); showToast(`${item.name} added to cart`);
}

// --------------------------------------------------
// Renders cart products, quantities, and totals.
function renderCart() {
  const list = document.querySelector('[data-cart-list]');
  if (!list) return;
  const cart = readCart();
  const empty = document.querySelector('[data-cart-empty]');
  const content = document.querySelector('[data-cart-content]');
  if (!cart.length) { list.innerHTML = ''; empty?.classList.add('visible'); content?.classList.add('hidden'); return; }
  empty?.classList.remove('visible'); content?.classList.remove('hidden');
  list.innerHTML = cart.map((item) => `<article class="cart-row" data-row-id="${item.id}"><div class="cart-product">${item.image ? `<img src="${item.image}" alt="">` : '<div class="cart-image-placeholder" role="img" aria-label="Product image needed">ADD IMAGE</div>'}<div><b>${item.name}</b><small>Performance system</small></div></div><div class="quantity" aria-label="Quantity"><button data-quantity="decrease" data-id="${item.id}">−</button><span>${item.quantity}</span><button data-quantity="increase" data-id="${item.id}">+</button></div><strong>${peso(item.price * item.quantity)}</strong><button class="remove-item" data-remove="${item.id}" aria-label="Remove ${item.name}">×</button></article>`).join('');
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelectorAll('[data-subtotal]').forEach((el) => el.textContent = peso(subtotal));
  document.querySelectorAll('[data-total]').forEach((el) => el.textContent = peso(subtotal));
}

// --------------------------------------------------
// Handles Add to Cart, quantity, removal, clearing, and checkout clicks.
document.addEventListener('click', (event) => {
  const add = event.target.closest('[data-add-to-cart]');
  if (add) { event.preventDefault(); addToCart(add); return; }
  const qty = event.target.closest('[data-quantity]');
  if (qty) {
    const cart = readCart(); const item = cart.find((product) => product.id === qty.dataset.id);
    if (item) { item.quantity += qty.dataset.quantity === 'increase' ? 1 : -1; writeCart(cart.filter((product) => product.quantity > 0)); updateCount(); renderCart(); }
    return;
  }
  const remove = event.target.closest('[data-remove]');
  if (remove) { writeCart(readCart().filter((item) => item.id !== remove.dataset.remove)); updateCount(); renderCart(); showToast('Item removed from cart'); return; }
  const clear = event.target.closest('[data-clear-cart]');
  if (clear) { writeCart([]); updateCount(); renderCart(); showToast('Cart cleared'); }
  const checkout = event.target.closest('[data-checkout]');
  if (checkout) showToast('Checkout is coming soon — your cart is saved.');
});

// --------------------------------------------------
// Controls the homepage hero carousel and its navigation dots.
function setupCarousel() {
  const slides = [...document.querySelectorAll('[data-slide]')];
  const dots = [...document.querySelectorAll('[data-carousel-dot]')];
  if (!slides.length) return;
  let current = 0;
  const setSlide = (index) => { current = index; slides.forEach((slide, i) => slide.classList.toggle('active', i === current)); dots.forEach((dot, i) => dot.classList.toggle('active', i === current)); };
  dots.forEach((dot) => dot.addEventListener('click', () => setSlide(Number(dot.dataset.carouselDot))));
  window.setInterval(() => setSlide((current + 1) % slides.length), 6500);
}

// --------------------------------------------------
// Applies category, brand, and price filters to the PC Parts cards.
function setupPartsFilters() {
  const cards = [...document.querySelectorAll('[data-product-card]')];
  const categoryInputs = [...document.querySelectorAll('[data-category-filter]')];
  const brandSelect = document.querySelector('[data-brand-filter]');
  const minInput = document.querySelector('[data-price-min]');
  const maxInput = document.querySelector('[data-price-max]');
  const count = document.querySelector('[data-results-count]');
  const empty = document.querySelector('[data-no-results]');
  const chips = document.querySelector('[data-active-filters]');
  if (!cards.length || !chips) return;
  if (brandSelect) {
    const label = brandSelect.closest('.select-label');
    const picker = document.createElement('div');
    const button = document.createElement('button');
    const menu = document.createElement('div');
    picker.className = 'brand-picker';
    button.type = 'button';
    button.className = 'brand-picker-button';
    button.setAttribute('aria-haspopup', 'listbox');
    menu.className = 'brand-picker-menu';
    menu.setAttribute('role', 'listbox');
    brandSelect.classList.add('native-brand-filter');
    brandSelect.parentElement.append(picker);
    picker.append(button, menu);
    [...brandSelect.options].forEach((option) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'brand-picker-option';
      item.dataset.value = option.value;
      item.textContent = option.textContent;
      item.setAttribute('role', 'option');
      item.addEventListener('click', () => {
        brandSelect.value = option.value;
        brandSelect.dispatchEvent(new Event('change', { bubbles: true }));
        menu.hidden = true;
      });
      menu.append(item);
    });
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      menu.hidden = !menu.hidden;
    });
    document.addEventListener('click', () => { menu.hidden = true; });
    const syncPicker = () => {
      button.textContent = brandSelect.options[brandSelect.selectedIndex].textContent;
      menu.querySelectorAll('.brand-picker-option').forEach((item) => {
        item.classList.toggle('selected', item.dataset.value === brandSelect.value);
      });
    };
    brandSelect.addEventListener('change', syncPicker);
    menu.hidden = true;
    syncPicker();
    if (label) label.classList.add('has-brand-picker');
  }
  cards.forEach((card) => {
    const name = card.querySelector('h3')?.textContent?.trim();
    const brand = productBrands[name];
    if (brand) card.dataset.brand = brand;
    const type = card.querySelector('.product-type');
    const description = card.querySelector('.product-info > p:not(.product-type)');
    if (brand && type) type.textContent = brandLabels[brand];
    if (description && productDescriptions[name]) description.textContent = productDescriptions[name];
  });

  const render = () => {
    const categories = categoryInputs.filter((input) => input.checked).map((input) => input.value);
    const brand = brandSelect?.value || 'all';
    const min = Number(minInput?.value || 0);
    const max = Number(maxInput?.value || Number.POSITIVE_INFINITY);
    let visible = 0;
    cards.forEach((card) => {
      const matchesCategory = !categories.length || categories.includes(card.dataset.category);
      const matchesBrand = brand === 'all' || card.dataset.brand === brand;
      const price = Number(card.dataset.price || 0);
      const matchesPrice = price >= min && price <= max;
      const show = matchesCategory && matchesBrand && matchesPrice;
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });
    if (count) count.textContent = `${visible} product${visible === 1 ? '' : 's'} / curated essentials`;
    if (empty) empty.hidden = visible !== 0;
    const active = [...categories.map((value) => value.toUpperCase()), ...(brand !== 'all' ? [brandSelect.options[brandSelect.selectedIndex].text] : []), ...(minInput?.value ? [`MIN ₱${Number(min).toLocaleString('en-PH')}`] : []), ...(maxInput?.value ? [`MAX ₱${Number(max).toLocaleString('en-PH')}`] : [])];
    chips.innerHTML = active.map((value) => `<span class="filter-chip">${value}<b>×</b></span>`).join('');
  };
  const resetCategories = () => { categoryInputs.forEach((input) => { input.checked = false; }); render(); };
  const resetFilters = () => { if (brandSelect) brandSelect.value = 'all'; if (minInput) minInput.value = ''; if (maxInput) maxInput.value = ''; render(); };
  categoryInputs.forEach((input) => input.addEventListener('change', render));
  brandSelect?.addEventListener('change', render); minInput?.addEventListener('input', render); maxInput?.addEventListener('input', render);
  document.querySelectorAll('[data-reset-categories]').forEach((button) => button.addEventListener('click', resetCategories));
  document.querySelectorAll('[data-reset-filters]').forEach((button) => button.addEventListener('click', resetFilters));
  document.querySelectorAll('[data-reset-all]').forEach((button) => button.addEventListener('click', () => { resetCategories(); resetFilters(); }));
  render();
}

// --------------------------------------------------
// Initializes catalog rendering, filters, cart state, and the carousel.
renderDocumentCatalogs(); setupPartsAddToCart(); renderCatalogProductDetail(); setupPartsFilters();
updateCount(); renderCart(); setupCarousel();
