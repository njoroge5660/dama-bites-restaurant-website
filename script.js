const WHATSAPP_NUMBER = "254115485745";

const menuItems = [
  { name: "White Chapati", category: "chapatis", price: 50, description: "Soft, classic white chapati.", minimum: "Minimum order: 3", image: "assets/imagewhite.png" },
  { name: "Carrot Chapati", category: "chapatis", price: 60, description: "A colourful chapati with carrot.", minimum: "", image: "assets/imagecarrot.png" },
  { name: "Vegetable Chapati", category: "chapatis", price: 70, description: "A tasty vegetable chapati.", minimum: "", image: "assets/imageveg.png" },
  { name: "Milk Chapati", category: "chapatis", price: 70, description: "A soft milk chapati.", minimum: "", image: "assets/imagemilk.png" },
  { name: "Butter Chapati", category: "chapatis", price: 70, description: "A rich butter chapati.", minimum: "", image: "assets/imagebutter.png" },
  { name: "Butternut Chapati", category: "chapatis", price: 60, description: "A butternut-flavoured chapati.", minimum: "", image: "assets/imagenut.png" },
  { name: "Meat Chapati", category: "chapatis", price: 100, description: "A savoury meat chapati.", minimum: "", image: "assets/chapati.jpg" },
  { name: "Brown Chapati", category: "chapatis", price: 60, description: "Brown chapati.", minimum: "", image: "assets/brown.png" },
  { name: "Beef Samosas", category: "snacks", price: 220, description: "Pack of 5.", minimum: "", image: "assets/samosa.jpg" },
  { name: "Chicken Samosas", category: "snacks", price: 420, description: "Pack of 5.", minimum: "", image: "assets/samosa_chicken.jpg" },
  { name: "Beef Kebab", category: "snacks", price: 100, description: "Price per piece.", minimum: "", image: "assets/kebab.png" },
  { name: "Chicken Spring Rolls", category: "snacks", price: 420, description: "Pack of 5.", minimum: "", image: "assets/spring_roll.jpg" },
  { name: "Sausage Rolls", category: "snacks", price: 520, description: "Pack of 5.", minimum: "", image: "assets/sausage_roll.jpg" },
  { name: "Precooked Samosas", category: "snacks", price: 220, description: "Pack of 5.", minimum: "", image: "assets/precooked.png" }
];

const menuGrid = document.querySelector("#menuGrid");

function createOrderLink(item) {
  const message = `Hello DAMA BITES, I would like to order ${item.name}. The menu price shown is KSh ${item.price}. Please confirm availability, quantity and delivery fee.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderMenu(filter = "all") {
  if (!menuGrid) return;

  const visibleItems = menuItems.filter(item => filter === "all" || item.category === filter);

  menuGrid.innerHTML = visibleItems.map(item => `
    <article class="menu-card">
      <img class="menu-card-image" src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="menu-card-top">
        <div>
          <span class="menu-category">${item.category}</span>
          <h3>${item.name}</h3>
        </div>
        <span class="menu-price">KSh ${item.price}</span>
      </div>
      <p class="menu-description">${item.description}</p>
      <div class="menu-card-bottom">
        <span class="minimum-note">${item.minimum}</span>
        <a class="menu-order" href="${createOrderLink(item)}" target="_blank" rel="noopener">Order on WhatsApp ↗</a>
      </div>
    </article>
  `).join("");
}

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    renderMenu(button.dataset.filter);
  });
});

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

renderMenu();
