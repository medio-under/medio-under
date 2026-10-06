const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}

document.querySelectorAll('[data-filter-group]').forEach((group) => {
  const buttons = group.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll(`[data-filter-item="${group.dataset.filterGroup}"]`);
  const empty = document.querySelector(`[data-empty="${group.dataset.filterGroup}"]`);
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    let visible = 0;
    items.forEach((item) => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.style.display = visible ? 'none' : 'block';
  }));
});

document.querySelectorAll('[data-search]').forEach((input) => {
  const target = input.dataset.search;
  const items = document.querySelectorAll(`[data-filter-item="${target}"]`);
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    items.forEach((item) => { item.hidden = query && !item.textContent.toLowerCase().includes(query); });
  });
});

const modal = document.querySelector('.modal');
document.querySelectorAll('[data-modal-open]').forEach((button) => button.addEventListener('click', () => modal?.classList.add('open')));
document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', () => modal?.classList.remove('open')));
modal?.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('open'); });

const form = document.querySelector('[data-demo-form]');
const toast = document.querySelector('.toast');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  toast.textContent = 'Listo: tu propuesta quedó guardada como borrador.';
  toast.classList.add('show');
  form.reset();
  window.setTimeout(() => toast.classList.remove('show'), 3500);
});

document.querySelectorAll('[data-save]').forEach((button) => button.addEventListener('click', () => {
  button.textContent = button.dataset.saved === 'true' ? 'Guardar' : 'Guardado ✓';
  button.dataset.saved = button.dataset.saved !== 'true';
}));
