// --------------------------------------------------
// Reads product metadata from the page and prepares its Add to Cart button.
const product = document.querySelector('[data-product]');
if (product) {
  const { name, price } = product.dataset;
  const add = product.querySelector('[data-add-to-cart]');
  document.title = `${name} — XDV Tech Shop`;
  if (add) {
    add.dataset.id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    add.dataset.name = name;
    add.dataset.price = price;
    add.dataset.image = add.dataset.image || product.querySelector('[data-product-image]')?.getAttribute('src') || '';
  }
  const detailCopy = document.querySelector('.detail-copy');
  const specification = detailCopy?.querySelector('.detail-specifications');
  const intro = detailCopy?.querySelector('.detail-intro');
  const specificationHeading = [...(detailCopy?.querySelectorAll('h2') || [])]
    .find((heading) => heading.textContent.trim().toLowerCase() === 'specifications');
  if (intro) intro.remove();
  if (specificationHeading) specificationHeading.remove();
  if (specification) specification.remove();
  if (detailCopy && !detailCopy.querySelector('.detail-description')) {
    const type = product.dataset.type || product.dataset.category || 'performance';
    const descriptionHeading = document.createElement('h2');
    const description = document.createElement('p');
    descriptionHeading.textContent = 'Description';
    description.className = 'detail-description';
    description.textContent = `Built for ${type} systems, the ${name} delivers dependable performance and practical features. It is a strong choice for everyday use, gaming, and future upgrades.`;
    const title = detailCopy.querySelector('h1');
    title?.insertAdjacentElement('afterend', descriptionHeading);
    descriptionHeading.insertAdjacentElement('afterend', description);
  }
}
