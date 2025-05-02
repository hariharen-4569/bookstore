function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.querySelector(".cart-items");
    let totalPrice = 0;

    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div>
                <h4>${item.title}</h4>
                <p class="price">${item.price}</p>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        totalPrice += parseFloat(item.price.replace("$", ""));
    });

    document.getElementById("total-price").textContent = `$${totalPrice.toFixed(2)}`;

    // Add event listener for remove buttons
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.dataset.index;
            removeFromCart(index);
        });
    });
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

document.getElementById("checkout-btn").addEventListener("click", function () {
    window.location.href = "payment.html";
});

window.onload = loadCart;

alert("Added Successfully!");
