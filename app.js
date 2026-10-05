const BASE_PRICE = 9999;
const CURRENCY = '₹';

function money(n) {
  return CURRENCY + n.toLocaleString('en-IN');
}

const sizeSelect = document.getElementById('size');
const totalEl = document.getElementById('total');
const addBtn = document.getElementById('addBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
const toast = document.getElementById('toast');

let cart = [];

function selected(name) {
  return document.querySelector(`input[name="${name}"]:checked`);
}

function extras() {
  return Number(sizeSelect.value) + Number(selected('mold').value) + Number(selected('core').value);
}

function price() {
  return BASE_PRICE + extras();
}

function updateTotal() {
  totalEl.textContent = money(price());
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove('show'), 2200);
}

function render() {
  const qty = cart.reduce((n, i) => n + i.qty, 0);
  cartCount.textContent = qty;
  subtotalEl.textContent = money(cart.reduce((n, i) => n + i.qty * i.price, 0));

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty">Your cart is empty.<br>Go wake up properly.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((i, idx) => `
    <div class="item">
      <div class="thumb"></div>
      <div class="meta">
        <b>quantum.pillow</b>
        <small>${i.label}</small>
        <small>Qty ${i.qty}</small>
      </div>
      <p class="price">${money(i.price * i.qty)}</p>
      <button class="rm" data-idx="${idx}" aria-label="Remove">&times;</button>
    </div>
  `).join('');
}

function buildLabel() {
  const sizeTxt = sizeSelect.options[sizeSelect.selectedIndex].text.split(' (')[0];
  const stripAddon = s => s.replace(/\s*\(\+[^)]*\)$/, '');
  const moldTxt = stripAddon(selected('mold').parentElement.textContent.trim());
  const coreTxt = stripAddon(selected('core').parentElement.textContent.trim());
  return `${sizeTxt} · ${moldTxt} · ${coreTxt}`;
}

addBtn.addEventListener('click', () => {
  const label = buildLabel();
  const p = price();
  const found = cart.find(i => i.label === label);
  if (found) found.qty++;
  else cart.push({ label, price: p, qty: 1 });

  render();
  openDrawer();
  showToast('Added to cart');
});

cartItems.addEventListener('click', e => {
  const btn = e.target.closest('.rm');
  if (!btn) return;
  cart.splice(Number(btn.dataset.idx), 1);
  render();
});

function openDrawer() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
}

document.getElementById('cartBtn').addEventListener('click', openDrawer);
document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

document.getElementById('checkout').addEventListener('click', () => {
  if (!cart.length) return showToast('Add a pillow first');
  runPrank();
});

const PRANK_STEPS = [
  'Contacting quantum bank…',
  'Verifying your REM cycle…',
  'Encrypting nano-foam lattice…',
  'Asking the pillow for permission…',
  'Almost there…',
];

const prank = document.getElementById('prank');
const prankLoader = document.getElementById('prankLoader');
const prankReveal = document.getElementById('prankReveal');
const prankStep = document.getElementById('prankStep');

function runPrank() {
  clearInterval(runPrank.t);
  prankLoader.style.display = '';
  prankReveal.style.display = 'none';
  prank.classList.add('open');
  prank.setAttribute('aria-hidden', 'false');

  let i = 0;
  prankStep.textContent = PRANK_STEPS[0];
  runPrank.t = setInterval(() => {
    i++;
    if (i >= PRANK_STEPS.length) {
      clearInterval(runPrank.t);
      prankLoader.style.display = 'none';
      prankReveal.style.display = '';
      return;
    }
    prankStep.textContent = PRANK_STEPS[i];
  }, 700);
}

function closePrank() {
  clearInterval(runPrank.t);
  prank.classList.remove('open');
  prank.setAttribute('aria-hidden', 'true');
}

document.getElementById('prankAgain').addEventListener('click', runPrank);
document.getElementById('prankClose').addEventListener('click', closePrank);
prank.addEventListener('click', e => { if (e.target === prank) closePrank(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePrank(); });

sizeSelect.addEventListener('change', updateTotal);
document.querySelectorAll('input[type="radio"]').forEach(r => r.addEventListener('change', updateTotal));

updateTotal();
render();
