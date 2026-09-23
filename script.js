const modal = document.querySelector('#modal');
const toast = document.querySelector('#toast');
const openModal = () => modal.classList.add('open');
const closeModal = () => modal.classList.remove('open');
document.querySelector('#add-product').addEventListener('click', openModal);
document.querySelector('#modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.querySelector('#save-product').addEventListener('click', () => {
  const name = document.querySelector('#new-product-name').value.trim();
  if (!name) { document.querySelector('#new-product-name').focus(); return; }
  closeModal(); document.querySelector('#new-product-name').value = '';
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2800);
});
const body = document.querySelector('#inventory-body');
const rows = [...body.querySelectorAll('tr')];
function applyFilter(filter, query = '', category = activeCategory) {
  let visibleCount = 0;
  rows.forEach(row => {
    const matchesFilter = filter === 'all' || row.dataset.stock === filter;
    const matchesCategory = category === 'all' || row.dataset.category === category;
    const matchesQuery = row.innerText.toLowerCase().includes(query.toLowerCase());
    const isVisible = matchesFilter && matchesCategory && matchesQuery;
    row.style.display = isVisible ? '' : 'none';
    if (isVisible) visibleCount += 1;
  });
  document.querySelector('#table-count').textContent = `Showing ${visibleCount} of 51 products`;
}
let activeFilter = 'all';
let activeCategory = 'all';
document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelector('.tab.active').classList.remove('active');
  tab.classList.add('active'); activeFilter = tab.dataset.filter;
  applyFilter(activeFilter, document.querySelector('#inventory-search').value);
}));
document.querySelectorAll('.collection-filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.collection-filter.active').classList.remove('active');
  button.classList.add('active');
  activeCategory = button.dataset.category;
  applyFilter(activeFilter, document.querySelector('#inventory-search').value, activeCategory);
}));
document.querySelector('#inventory-search').addEventListener('input', e => applyFilter(activeFilter, e.target.value));
document.querySelectorAll('.restock').forEach(button => button.addEventListener('click', e => {
  const row = e.target.closest('tr'); const stock = row.querySelector('.stock');
  stock.className = 'stock healthy'; stock.innerHTML = '<i></i> 12 in stock'; e.target.textContent = '•••';
  toast.textContent = 'Inventory updated'; toast.classList.add('show'); setTimeout(() => { toast.classList.remove('show'); toast.innerHTML = 'Product added to your catalog <span>✓</span>'; }, 2200);
}));
document.querySelector('#view-inventory').addEventListener('click', () => document.querySelector('#inventory-search').focus());
document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => {
  document.querySelector('.nav-item.active').classList.remove('active'); item.classList.add('active');
  document.querySelector('#page-title').textContent = item.textContent.trim().replace(/\s+\d+$/, '');
}));
