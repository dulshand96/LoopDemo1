// Get items from localStorage (or return empty array if none)
function getItems() {
  return JSON.parse(localStorage.getItem("items")) || [];
}

// Save items back to localStorage
function saveItems(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

// Add new item from form
function addItem() {
  const title = document.getElementById("title").value;
  const brand = document.getElementById("brand").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  const items = getItems();
  const newItem = {
    id: Date.now(), // unique id
    title,
	brand,
    price,
    image
  };

  items.push(newItem);
  saveItems(items);

  // redirect back to home
  window.location.href = "index.html";
}

// Display items on homepage
function displayItems() {
  const items = getItems();
  const container = document.getElementById("items-container");
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("item-card");

    // Make the card clickable
    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${item.id}`;
    });

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="item-tile">
      <h3 class="item-title">${item.title}</h3>
      <h4 class="brand">${item.brand}</h4>
      <p class="price">£${item.price}</p>
    `;
    container.appendChild(card);
  });
}

function displayEditableItems() {
  const items = getItems();
  const container = document.getElementById("edit-items-container");
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("item-card");

    // When clicked, go to edit page for that item
    card.addEventListener("click", () => {
      window.location.href = `edit-item.html?id=${item.id}`;
    });

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="item-tile">
      <h3 class="item-title">${item.title}</h3>
      <h4 class="brand">${item.brand}</h4>
      <p class="price">£${item.price}</p>
    `;

    container.appendChild(card);
  });
}

