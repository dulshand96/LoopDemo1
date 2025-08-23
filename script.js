// ====== Firebase Initialization ======
const firebaseConfig = {
  apiKey: "AIzaSyD37cnCEDd5QfwatYKe8xmO-xm5jUfni6w",
  authDomain: "loopdemo1-d9bc0.firebaseapp.com",
  projectId: "loopdemo1-d9bc0",
  storageBucket: "loopdemo1-d9bc0.firebasestorage.app",
  messagingSenderId: "449011096566",
  appId: "1:449011096566:web:ac35ac6f27b815acc045d7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ====== Add new item ======
function addItem() {
  const title = document.getElementById("title").value;
  const brandSelect = document.getElementById("brandSelect");
  const customBrand = document.getElementById("customBrand");
  const brand = brandSelect.value === "Other" ? customBrand.value : brandSelect.value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  db.collection("items").add({
    title,
    brand,
    price,
    image,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    window.location.href = "index.html";
  })
  .catch((error) => {
    console.error("Error adding item: ", error);
    alert("Failed to add item. Check console for details.");
  });
}

// ====== Display items on homepage ======
function displayItems() {
  const container = document.getElementById("items-container");
  if (!container) return;
  container.innerHTML = "";

  db.collection("items").orderBy("createdAt", "desc").get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        const item = { id: doc.id, ...doc.data() };
        const card = document.createElement("div");
        card.classList.add("item-card");

        // Make the card clickable for details
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
    })
    .catch((error) => console.error("Error fetching items: ", error));
}

// ====== Display items for edit page ======
function displayEditableItems() {
  const container = document.getElementById("edit-items-container");
  if (!container) return;
  container.innerHTML = "";

  db.collection("items").orderBy("createdAt", "desc").get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        const item = { id: doc.id, ...doc.data() };
        const card = document.createElement("div");
        card.classList.add("item-card");

        // Click to go to edit-item.html
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
    })
    .catch((error) => console.error("Error fetching items for edit: ", error));
}

// ====== Get a single item by ID ======
function getItemById(id, callback) {
  db.collection("items").doc(id).get()
    .then(doc => {
      if (doc.exists) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        console.error("No such item!");
        alert("Item not found.");
      }
    })
    .catch(error => console.error("Error getting item: ", error));
}

// ====== Update item ======
function updateItem(id) {
  const title = document.getElementById("title").value;
  const brand = document.getElementById("brand").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  db.collection("items").doc(id).update({
    title,
    brand,
    price,
    image
  })
  .then(() => {
    window.location.href = "edit-index.html";
  })
  .catch(error => {
    console.error("Error updating item: ", error);
    alert("Failed to update item.");
  });
}
