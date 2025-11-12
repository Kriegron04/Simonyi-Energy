// ===== PRODUCTS =====
const cups = [
  { id: 1, name: "Shaker Bottle – White", price: 14.99, img: "grey_cup.png" },
  { id: 2, name: "Shaker Bottle – Purple", price: 14.99, img: "purp_cup.png" },
  { id: 3, name: "Shaker Bottle – Cyan", price: 14.99, img: "cyan_cup.png" },
  { id: 4, name: "Shaker Bottle – Green", price: 14.99, img: "green_cup.png" },
];

const hoodies = [
  { id: 5, name: "Simonyi E-Sport Hoodie – Black", price: 34.99, img: "hood_black.png" },
  { id: 6, name: "Simonyi E-Sport Hoodie – Purple", price: 34.99, img: "hood_brown.png" },
  { id: 7, name: "Simonyi E-Sport Hoodie – Cyan", price: 34.99, img: "hood_blue.png" },
  { id: 8, name: "Simonyi E-Sport Hoodie – Green", price: 34.99, img: "hood_red.png" },
];

const products = [...cups, ...hoodies];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const shopBtn = document.getElementById("shopBtn");
const productsSection = document.getElementsByClassName("products");
const productGrid = document.querySelector(".cup-grid");
const hoodieGrid = document.querySelector(".hoodie-grid");
const cartCountElem = document.getElementById("cartCount");
const miniCart = document.getElementById("miniCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElem = document.getElementById("cartTotal");
const overlay = document.getElementById("cartOverlay");

if (shopBtn && productsSection.length > 0) {
  shopBtn.addEventListener("click", () => {
    productsSection[0].scrollIntoView({ behavior: "smooth" });
  });
}

function renderProducts() {
  if (productGrid) productGrid.innerHTML = "";
  if (hoodieGrid) hoodieGrid.innerHTML = "";

  cups.forEach(prod => {
    if (!productGrid) return;
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p class="price">$${prod.price.toFixed(2)}</p>
      <button onclick="addToCart(${prod.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });

  hoodies.forEach(prod => {
    if (!hoodieGrid) return;
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p class="price">$${prod.price.toFixed(2)}</p>
      <button onclick="addToCart(${prod.id})">Add to Cart</button>
    `;
    hoodieGrid.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  cart.push(product);
  updateCart();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  if (!cartItemsContainer || !cartCountElem || !cartTotalElem) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElem.textContent = total.toFixed(2);
  cartCountElem.textContent = cart.length;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function openCart() {
  if (miniCart) miniCart.classList.add("open");
  if (overlay) overlay.classList.add("active");
}

function closeCart() {
  if (miniCart) miniCart.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
}

function checkout() {
  alert("Thank you for your purchase!");
  cart = [];
  updateCart();
  localStorage.removeItem("cart");
}

if (document.getElementById("cartButton")) {
  document.getElementById("cartButton").addEventListener("click", e => {
    e.preventDefault();
    openCart();
  });
}

if (document.getElementById("closeCart")) {
  document.getElementById("closeCart").addEventListener("click", closeCart);
}

if (overlay) overlay.addEventListener("click", closeCart);

renderProducts();
updateCart();

window.addToCart = addToCart;
