window.addEventListener("DOMContentLoaded", () => {
  // ======================== عناصر الهيدر ========================
  const login = document.getElementById("login");
  const register = document.getElementById("register");
  const logout = document.getElementById("logout");
  const welcome = document.getElementById("welcome");
  const car_cart = document.getElementById("car_cart");
  const collection_btns = document.getElementById("collection_btns");
  const parent1 = document.getElementById("sec2");
  const sec1 = document.getElementById("sec1");
  const shopping_cart = document.getElementById("shopping_cart");
  const search = document.getElementById("search");
  const checkOut = document.querySelector(".checkout");
  const head_img = document.querySelector(".header img");
  const display_data = document.querySelector("#display_data");
  const car = document.getElementById("car");
  const cart_content = document.querySelector(".cart_content");
  const cartCounter = document.getElementById("cartCounter");
  const display_love_data = document.querySelector("#display_love_data");

  // ======================== بيانات المنتجات ========================
  const products = [
    {
      id: 1,
      img: "images/airpods1.png",
      title: "AirPods Pro",
      price: 400,
      category: "Electronics",
    },
    {
      id: 2,
      img: "images/airpods2.png",
      title: "AirPods black pro",
      price: 350,
      category: "Electronics",
    },
    {
      id: 3,
      img: "images/headphone2.png",
      title: "Head Phone black",
      price: 150,
      category: "Head Phone",
    },
    {
      id: 4,
      img: "images/PS5.png",
      title: "PlayStation 5",
      price: 500,
      category: "Gaming",
    },
    {
      id: 5,
      img: "images/lenovo.png",
      title: "Labtop LOQ",
      price: 200,
      category: "Labtops",
    },
    {
      id: 6,
      img: "images/chair1.png",
      title: "Modern Chair",
      price: 300,
      category: "Furniture",
    },
    {
      id: 7,
      img: "images/chair2.png",
      title: "Classic Chair",
      price: 250,
      category: "Furniture",
    },
    {
      id: 8,
      img: "images/suit1.png",
      title: "Men Suit",
      price: 550,
      category: "Clothing",
    },
    {
      id: 9,
      img: "images/a-black-dress-on-transparent-background-free-png.png",
      title: "Black Dress",
      price: 700,
      category: "Clothing",
    },
    {
      id: 10,
      img: "images/fridge.png",
      title: "Refrigerator",
      price: 700,
      category: "Home Appliances",
    },
    {
      id: 11,
      img: "images/iphone17.png",
      title: "iPhone 17",
      price: 700,
      category: "Mobiles",
    },
    {
      id: 12,
      img: "images/bag1.png",
      title: "Leather Bag",
      price: 700,
      category: "Accessories",
    },
  ];

  // ======================== متغيرات السلة والمفضلة ========================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let loveItems = JSON.parse(localStorage.getItem("loveItems")) || [];
  let isCartOpen = false;

  // ======================== تحديث الهيدر ========================
  function updateHeader() {
    if (localStorage.getItem("Logged")) {
      if (logout) logout.style.display = "block";
      if (login) login.style.display = "none";
      if (register) register.style.display = "none";
      if (car_cart) car_cart.style.display = "block";
      if (welcome) {
        welcome.style.display = "block";
        welcome.innerHTML = "Welcome, " + localStorage.getItem("fname");
      }
      if (car) car.style.visibility = "visible";
      if (collection_btns) collection_btns.style.width = "400px";
    } else {
      if (logout) logout.style.display = "none";
      if (login) login.style.display = "block";
      if (register) register.style.display = "block";
      if (car_cart) car_cart.style.display = "none";
      if (welcome) welcome.style.display = "none";
      if (car) car.style.visibility = "hidden";
      if (collection_btns) collection_btns.style.width = "350px";
    }
    displayCounter();
    updateProductButtons();
  }

  // ======================== دالة إنشاء كارت المنتج ========================
  // تم توحيد التصميم هنا لمنع تكرار الكود في دوال الرسم والبحث
  function createProductCard(item) {
    const isInCart = cart.some((cartItem) => cartItem.id === item.id);
    const isLoved = loveItems.some((loveItem) => loveItem.id === item.id);

    return `
      <div class="product-card" data-id="${item.id}">
        <img src="${item.img}" alt="${item.title}" />
        <div class="details">
          <h2>${item.title}</h2>
          <p>Price: $${item.price}</p>
          <p>Category: ${item.category}</p>
          <div class="col_icon">
            <i class="fa-solid fa-heart love-icon" 
               data-id="${item.id}"
               style="color: ${isLoved ? "red" : "#ccc"}; cursor:pointer;"></i>
            <button class="add-to-cart" data-id="${item.id}" 
                    style="${isInCart ? "background-color: rgb(131, 8, 8); color: white;" : ""}">
              ${isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ======================== عرض المنتجات ========================
  function drawItems() {
    if (!parent1) return;
    parent1.innerHTML = products
      .map((item) => createProductCard(item))
      .join("");
    rebindEvents();
  }

  // ======================== إعادة ربط الأحداث ========================
  function rebindEvents() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      const id = parseInt(button.getAttribute("data-id"));
      button.onclick = function () {
        const itemInCart = cart.some((item) => item.id === id);
        if (itemInCart) {
          removeProductFromCart(id, this);
        } else {
          addToCart(id, this);
        }
      };
    });

    document.querySelectorAll(".love-icon").forEach((icon) => {
      const id = parseInt(icon.getAttribute("data-id"));
      icon.onclick = function () {
        const isLoved = loveItems.some((item) => item.id === id);
        if (isLoved) {
          removeFromLove(id, this);
        } else {
          addToCart_love(id, this);
        }
      };
    });
  }

  // ======================== سلة التسوق (حركة الفتح والإغلاق) ========================
  if (car_cart && shopping_cart) {
    car_cart.addEventListener("click", () => {
      isCartOpen = !isCartOpen;
      shopping_cart.style.transition = "0.5s";
      if (parent1) parent1.style.transition = "0.5s";
      if (sec1) sec1.style.transition = "0.5s";

      if (isCartOpen) {
        shopping_cart.style.transform = "translateX(0%)";
        if (parent1) parent1.style.transform = "translate(-150px)";
        if (sec1) sec1.style.transform = "translate(-150px)";
      } else {
        shopping_cart.style.transform = "translateX(120%)";
        if (parent1) parent1.style.transform = "translate(0%)";
        if (sec1) sec1.style.transform = "translate(0%)";
      }

      displayCart();
      displayCart2();
    });
  }

  function displayCounter() {
    if (!cartCounter) return;
    let totalQuantity = cart.reduce(
      (total, item) => total + (item.quantity || 1),
      0,
    );
    cartCounter.textContent = totalQuantity;
  }

  function displayCart() {
    if (!cart_content) return;
    cart_content.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cart_content.innerHTML = "<p>Your cart is empty</p>";
      return;
    }

    cart.forEach((item, index) => {
      let itemTotal = item.price * (item.quantity || 1);
      total += itemTotal;

      cart_content.innerHTML += `
      <div class="cart_item">
        <img src="${item.img}" alt="${item.title}" width="80">
        <div class="item_info">
          <h3>${item.title}</h3>
          <p>$${item.price}</p>
          <div class="quantity">
            <button onclick="decreaseQuantity(${index})">-</button>
            <span>${item.quantity || 1}</span>
            <button onclick="increaseQuantity(${index})">+</button>
          </div>
        </div>
      </div>
      `;
    });

    cart_content.innerHTML += `
      <div style="margin-top: 15px; border-top: 1px solid #333; padding-top: 10px;">
        <h4>Total: $${total}</h4>
      </div>
    `;
  }

  function displayCart2() {
    if (!display_data) return;
    display_data.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      display_data.innerHTML = "<p>Your cart is empty</p>";
      return;
    }

    cart.forEach((item, index) => {
      let itemTotal = item.price * (item.quantity || 1);
      total += itemTotal;

      display_data.innerHTML += `
      <div class="cart_item">
        <img src="${item.img}" alt="${item.title}" width="80">
        <div class="item_info">
          <h3>${item.title}</h3>
          <p>$${item.price}</p>
          <div class="quantity">
            <button onclick="decreaseQuantity(${index})">-</button>
            <span>${item.quantity || 1}</span>
            <button onclick="increaseQuantity(${index})">+</button>
          </div>
          <button class="rme" onclick="removeFromCart(${index})">Remove From Cart</button>
        </div>
      </div>
      `;
    });

    display_data.innerHTML += `
      <div class="cart_total" style="width: 100%; margin-bottom:50px;">
        <hr style="width: 100%;">
        <h3>Total: $${total}</h3>
      </div>
    `;
  }

  function displayCart3() {
    if (!display_love_data) return;
    display_love_data.innerHTML = "";

    if (loveItems.length === 0) {
      display_love_data.innerHTML = "<p>Your Favourite items are empty</p>";
      return;
    }

    display_love_data.innerHTML = loveItems
      .map(
        (item) => `
        <div class="product-card" data-id="${item.id}">
          <img src="${item.img}" alt="${item.title}" />
          <div class="details">
            <h2>${item.title}</h2>
            <p>Price: $${item.price}</p>
            <p>Category: ${item.category}</p>
            <div class="col_icon">
              <i class="fa-solid fa-heart love-icon" 
                 data-id="${item.id}"
                 style="color: red; cursor:pointer"></i>
            </div>
          </div>
        </div>
      `,
      )
      .join("");

    document
      .querySelectorAll("#display_love_data .love-icon")
      .forEach((icon) => {
        const id = parseInt(icon.getAttribute("data-id"));
        icon.onclick = function () {
          removeFromLove(id, this);
        };
      });
  }

  // ======================== إدارة السلة ========================
  function addToCart(id, buttonElement) {
    if (!localStorage.getItem("Logged")) {
      alert("Please login first to add items to cart!");
      window.location.href = "Login.html";
      return;
    }

    let chosenItem = products.find((item) => item.id === id);
    let existingItem = cart.find((item) => item.id === id);

    if (!existingItem) {
      cart.push({ ...chosenItem, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      displayCounter();
      displayCart2();

      if (buttonElement) {
        buttonElement.innerHTML = "Remove from Cart";
        buttonElement.style.backgroundColor = "rgb(131, 8, 8)";
        buttonElement.style.color = "white";
      }
    } else {
      increaseQuantity(cart.indexOf(existingItem));
    }
  }

  function removeProductFromCart(id, buttonElement) {
    let itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      if (confirm("Are you sure you want to remove this item from cart?")) {
        cart.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        displayCounter();
        displayCart2();

        if (buttonElement) {
          buttonElement.innerHTML = "Add to Cart";
          buttonElement.style.backgroundColor = "";
          buttonElement.style.color = "";
        }
      }
    }
  }

  window.removeFromCart = function (index) {
    if (confirm("Are you sure you want to remove this item?")) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      displayCounter();
      displayCart2();
      drawItems();
    }
  };

  window.increaseQuantity = function (index) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    displayCounter();
    displayCart2();
  };

  window.decreaseQuantity = function (index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      displayCounter();
      displayCart2();
    } else {
      window.removeFromCart(index);
    }
  };

  // ======================== إدارة المفضلة ========================
  function addToCart_love(id, iconElement) {
    if (!localStorage.getItem("Logged")) {
      alert("Please login first to add items to favourites!");
      window.location.href = "Login.html";
      return;
    }

    let chosenItem = products.find((item) => item.id === id);
    let existingItem = loveItems.find((item) => item.id === id);

    if (!existingItem) {
      loveItems.push(chosenItem);
      localStorage.setItem("loveItems", JSON.stringify(loveItems));

      if (iconElement) {
        iconElement.style.color = "red";
      }
      if (display_love_data) displayCart3();
    }
  }

  function removeFromLove(id, iconElement) {
    let itemIndex = loveItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      loveItems.splice(itemIndex, 1);
      localStorage.setItem("loveItems", JSON.stringify(loveItems));

      if (iconElement) {
        iconElement.style.color = "#ccc";
      }
      if (display_love_data) displayCart3();
    }
  }

  // ربط الدوال بالـ Global Object لاستخدامها في الـ HTML
  window.addToCart_love = addToCart_love;
  window.removeFromLove = removeFromLove;

  function updateProductButtons() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      const id = parseInt(button.getAttribute("data-id"));
      const existingItem = cart.some((item) => item.id === id);

      if (existingItem) {
        button.innerHTML = "Remove from Cart";
        button.style.backgroundColor = "rgb(131, 8, 8)";
        button.style.color = "white";
      } else {
        button.innerHTML = "Add to Cart";
        button.style.backgroundColor = "";
        button.style.color = "";
      }

    });
  }

  // ======================== أحداث الهيدر ========================
  if (login) login.onclick = () => (window.location.href = "Login.html");
  if (register)
    register.onclick = () => (window.location.href = "Register.html");
  if (logout) {
    logout.onclick = () => {
      localStorage.removeItem("Logged");
      localStorage.removeItem("fname");
      localStorage.removeItem("cart");
      localStorage.removeItem("loveItems");
      window.location.href = "Login.html";
    };
  }
  if (head_img) head_img.onclick = () => (window.location.href = "index.html");
  if (checkOut)
    checkOut.addEventListener(
      "click",
      () => (window.location.href = "all_productes.html"),
    );

  // ======================== البحث ========================
  let searchMood = "title";

  window.SearchFun = function (id) {
    if (id === "sss") {
      search.placeholder = "Search By Product Name";
      searchMood = "title";
    } else if (id === "ccc") {
      search.placeholder = "Search By Category";
      searchMood = "category";
    }
    search.focus();
    search.value = "";
    drawItems();
  };

  window.Search = function (value) {
    if (value === undefined) return;
    if (!value) {
      drawItems();
      return;
    }
    if (!parent1) return;

    let searchTerm = value.toLowerCase();
    let filteredProducts = products.filter((item) => {
      if (searchMood === "title") {
        return item.title.toLowerCase().includes(searchTerm);
      } else {
        return item.category.toLowerCase().includes(searchTerm);
      }
    });

    parent1.innerHTML = filteredProducts
      .map((item) => createProductCard(item))
      .join("");
    rebindEvents();
  };

  if (search) {
    search.addEventListener("input", function (e) {
      window.Search(e.target.value);
    });
  }
  var scroll_home = document.getElementById("scroll_home");
  window.onscroll = function () {
    if (scrollY >= 400) {
      scroll_home.style.visibility = "visible";
    } else {
      scroll_home.style.visibility = "hidden";
    }
  };
  scroll_home.onclick = function () {
    scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // ✅ صح: بنستخدم cart.length عشان نعرف إذا كان في منتجات في السلة ولا لأ


  // ======================== التهيئة الأولية ========================
  updateHeader();
  drawItems();
  displayCart();
  displayCounter();
  displayCart2();
  if (display_love_data) displayCart3();
  updateProductButtons();
});
