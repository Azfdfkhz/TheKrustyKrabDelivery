  const cartLink = document.querySelector('.cart-link');
  const cartTab = document.querySelector('.cart-view');
  const closeCartButton = document.querySelector('.close');
  const addToCartButtons = document.querySelectorAll('.add-cart-btn');
  const cartList = document.querySelector('#cartList');
  const cartCount = document.querySelector('.cart-count');

  let cartItems = []; 

  cartLink.addEventListener('click', function(event) {
      event.preventDefault();
      cartTab.style.display = 'block'; 
      renderCart(); 
  });

  closeCartButton.addEventListener('click', function() {
      cartTab.style.display = 'none'; 
  });

  addToCartButtons.forEach(button => {
      button.addEventListener('click', function(event) {
          const productName = this.closest('.product-card').querySelector('h2').textContent.trim();
          const productPrice = this.closest('.product-card').querySelector('.price-1').textContent.trim();
          
          cartItems.push({ name: productName, price: productPrice });

          cartCount.textContent = cartItems.length;

          renderCart();
      });
  });

  function renderCart() {
      cartList.innerHTML = ''; 

      cartItems.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');

          cartItem.innerHTML = `
              <span class="cart-item-name">${item.name}</span>
              <span class="cart-item-price">${item.price}</span>
          `;

          cartList.appendChild(cartItem);
      });
  }

  function toggleCart() {
      cartTab.classList.toggle('visible');
  }