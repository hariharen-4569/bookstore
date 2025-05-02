document.addEventListener("DOMContentLoaded", () => {
    renderCartItems();
    setupAddressForm();
    setupPaymentForm();
});

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.title} - $${item.price}`;
        cartList.appendChild(li);

        // Fix NaN: remove $ if present and parse number
        const numericPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
        total += numericPrice;
    });

    totalEl.textContent = `$${total.toFixed(2)}`;
}

function setupAddressForm() {
    const saveBtn = document.getElementById("save-address");

    saveBtn.addEventListener("click", () => {
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const country = document.getElementById("country").value.trim();

        if (!address || !city || !country) {
            alert("Please fill in all address fields.");
            return;
        }

        const userAddress = {
            address,
            city,
            country
        };

        localStorage.setItem("userAddress", JSON.stringify(userAddress));

        document.querySelector(".payment-form").style.display = "block";
        document.querySelector(".checkout-btn").disabled = false;

        showPopup("Address saved successfully! 🎯");
    });
}

document.getElementById("payment-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    const address = {
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
    };

    if (!name || !cardNumber || !expiry || !cvv) {
        alert("Please fill all payment fields.");
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

    const order = {
        name,
        address,
        items: cartItems,
        total: `$${total}`,
        timestamp: Date.now(),
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear cart
    localStorage.removeItem("cart");

    alert("Payment successful! Thank you for your order.");
    window.location.href = "home.html";
});


function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = message;
    document.body.appendChild(popup);
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
        popup.remove();
    }, 2500);
}
