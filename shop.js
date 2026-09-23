let bagCount = 0;
const toast = document.querySelector('#cart-toast');
const count = document.querySelector('#bag-count');
function showToast(message) {
  toast.firstChild.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}
document.querySelectorAll('.add-bag').forEach(button => button.addEventListener('click', () => {
  bagCount += 1;
  count.textContent = bagCount;
  showToast(`${button.dataset.product} added to your bag `);
}));
function filterProducts(category) {
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.display = category === 'all' || card.dataset.productCategory === category ? '' : 'none';
  });
  document.querySelectorAll('.shop-filter').forEach(button => button.classList.toggle('active', button.dataset.shopFilter === category));
}
document.querySelectorAll('[data-shop-filter]').forEach(button => button.addEventListener('click', event => {
  const category = button.dataset.shopFilter;
  filterProducts(category);
  if (button.classList.contains('shop-filter')) event.preventDefault();
}));
