// Sample books data (if not already in localStorage)
const defaultBooks = [
    { title: "The Alchemist", price: "$10", img: "assets/book1.jpg" },
    { title: "Atomic Habits", price: "$15", img: "assets/book2.jpg" },
    { title: "Rich Dad Poor Dad", price: "$12", img: "assets/book3.jpg" },
    { title: "1984", price: "$14", img: "assets/book4.jpg" },
    { title: "Harry Potter", price: "$20", img: "assets/book5.jpg" },
    { title: "Deep Work", price: "$18", img: "assets/book6.jpg" },
    { title: "The Power of Habit", price: "$13", img: "assets/book7.jpg" },
    { title: "Sapiens", price: "$22", img: "assets/book8.jpg" },
    { title: "The Subtle Art of Not Giving a F*ck", price: "$18", img: "assets/book9.jpg" },
    { title: "Think and Grow Rich", price: "$12", img: "assets/book10.jpg" },
    { title: "The Psychology of Money", price: "$20", img: "assets/book11.jpg" },
    { title: "The 5 AM Club", price: "$15", img: "assets/book12.jpg" },
    { title: "Can't Hurt Me", price: "$22", img: "assets/book13.jpg" },
    { title: "Zero to One", price: "$16", img: "assets/book14.jpg" },
    { title: "To Kill a Mockingbird", price: "$13", img: "assets/book15.jpg" },
];

// Check if books are already in localStorage, else set default books
if (!localStorage.getItem("books")) {
    localStorage.setItem("books", JSON.stringify(defaultBooks));
}

// Load books from localStorage
function loadBooks() {
    const booksGrid = document.querySelector(".books-grid");
    booksGrid.innerHTML = ""; // Clear existing content

    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.forEach(book => {
        let bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
            <img src="${book.img}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p class="price">${book.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        booksGrid.appendChild(bookElement);
    });

    // Attach event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button, index) => {
        button.addEventListener("click", () => {
            let book = books[index];
            addToCart(book.title, book.price, book.img);
        });
    });
}

// Function to handle adding items to cart
function addToCart(title, price, img) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ title, price, img });
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show popup
    let popup = document.createElement("div");
    popup.textContent = "Added Successfully!";
    popup.classList.add("cart-popup");
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 1500);
}

// Load books on page load
window.onload = loadBooks;
