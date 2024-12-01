
var popupViews = document.querySelectorAll('.popup-view');
var popupBtns = document.querySelectorAll('.popup-btn');
var closeBtns = document.querySelectorAll('.close-btn');

var popup = function(popupClick) {
    popupViews[popupClick].classList.add('active')
}

popupBtns.forEach((popupBtns, i ) => {
    popupBtns.addEventListener("click",() => {
        popup(i);
    });
});



function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.add('active');
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.remove('active');
}

document.querySelectorAll('.popup-btn').forEach(button => {
  button.addEventListener('click', function () {
    const popupId = this.getAttribute('data-popup');
    openPopup(popupId);
  });
});

document.querySelectorAll('.close-btn').forEach(button => {
  button.addEventListener('click', function () {
    const popupId = this.closest('.popup-view').id;
    closePopup(popupId);
  });
});

function addToCart(itemName, price) {
  console.log('Added to cart:', itemName, 'Price:', price);
}





let cart = [];

function addToCart(productName, price) {
    const item = {
        name: productName,
        price: price,
        quantity: 1
    };

    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        // If the item exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // Otherwise, add the item to the cart
        cart.push(item);
    }

    updateCart();
}

function updateCart() {
    const cartContent = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalPriceElem = document.getElementById('total-price');

    cartContent.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - ${item.quantity} x $${item.price}</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContent.appendChild(cartItem);

        // Calculate the total price
        totalPrice += item.price * item.quantity;
    });


    cartCount.textContent = cart.length;
    totalPriceElem.textContent = totalPrice.toFixed(2);
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);

    updateCart();
}

function toggleCart() {
    const cartContent = document.querySelector('.cart-content');
    cartContent.style.display = cartContent.style.display === 'none' ? 'block' : 'none';
}

function checkout() {
    document.getElementById('checkout-popup').style.display = 'block';
    cart = [];
    updateCart();  

    
}

function closeCheckoutPopup() {
    document.getElementById('checkout-popup').style.display = 'none';
}

function showCategory(category, element) {
    document.querySelectorAll('.subtitle span').forEach(btn => {
        btn.classList.remove('active');
    });

    element.classList.add('active');

    document.querySelectorAll('.menu-category').forEach(cat => {
        cat.classList.remove('show');
        cat.style.display = 'none';
    });

    const selectedCategory = document.querySelector(`.menu-category.${category}`);
    selectedCategory.style.display = 'block';
    setTimeout(() => {
        selectedCategory.classList.add('show');
    }, 10);
}

function togglePhoneInput() {
  const paymentMethod = document.getElementById('payment-method').value;
  const phoneInput = document.getElementById('phone-input');

  if (paymentMethod === 'cod') {
      phoneInput.style.display = 'none';  
  } else {
      phoneInput.style.display = 'block';  
  }
}

function processPayment() {
  const paymentMethod = document.getElementById('payment-method').value;
  let paymentMessage = '';

  if (paymentMethod === 'cod') {
      document.getElementById('thank-you-popup').style.display = 'block';
      setTimeout(closeThankYouPopup, 2000);  
  } else {

      const phoneNumber = document.getElementById('phone-number').value;
      if (phoneNumber === '') {
          alert('Harap masukkan nomor telepon untuk pembayaran!');
          return;  
      }

      switch(paymentMethod) {
          case 'dana':
              paymentMessage = `Pembayaran menggunakan DANA dipilih. Pembayaran berhasil! Nomor telepon: ${phoneNumber}`;
              break;
          case 'ovo':
              paymentMessage = `Pembayaran menggunakan OVO dipilih. Pembayaran berhasil! Nomor telepon: ${phoneNumber}`;
              break;
          case 'gopay':
              paymentMessage = `Pembayaran menggunakan GoPay dipilih. Pembayaran berhasil! Nomor telepon: ${phoneNumber}`;
              break;
          default:
              paymentMessage = 'Metode pembayaran tidak valid!';
              break;
      }

      alert(paymentMessage);

      document.getElementById('thank-you-popup').style.display = 'block';
      setTimeout(closeThankYouPopup, 10000);  
  }

function showThankYouPopup() {
  document.getElementById('thank-you-popup').style.display = 'none';
}

  closeCheckoutPopup();
}

function closeThankYouPopup() {
  const thankYouPopup = document.getElementById('thank-you-popup');
  if (thankYouPopup) {
      thankYouPopup.style.display = 'none';
  } else {
      console.error('Popup Terima Kasih tidak ditemukan!');
  }
}

