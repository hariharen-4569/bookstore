document.addEventListener("DOMContentLoaded", () => {
    const booksContainer = document.getElementById("books-container");
    const bookForm = document.getElementById("book-form");
    const bookFormContainer = document.getElementById("book-form-container");
    const addBookBtn = document.getElementById("add-book-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const bookImageInput = document.getElementById("book-image");
    let books = JSON.parse(localStorage.getItem("books")) || [];

    // Renders books from localStorage
    function renderBooks() {
        booksContainer.innerHTML = "";
        books.forEach((book, index) => {
            const imagePath = book.image ? book.image : "assets/default-image.jpg";

            const bookItem = document.createElement("div");
            bookItem.classList.add("book-item");
            bookItem.innerHTML = `
                <img src="${imagePath}" alt="${book.title}" onerror="this.src='assets/default-image.jpg'">
                <h4>${book.title}</h4>
                <p>Price: ${book.price}</p>
                <div class="buttons">
                    <button class="btn edit-btn" data-index="${index}">Edit</button>
                    <button class="btn secondary delete-btn" data-index="${index}">Remove</button>
                </div>
            `;
            booksContainer.appendChild(bookItem);
        });
    }

    // Open the book form (for adding)
    addBookBtn.addEventListener("click", () => {
        bookFormContainer.style.display = "block";
        bookForm.reset();
        document.getElementById("form-title").textContent = "Add New Book";
        document.getElementById("book-id").value = "";
    });

    // Close the book form (Cancel button)
    cancelBtn.addEventListener("click", () => {
        bookFormContainer.style.display = "none";
    });

    // Handle form submission (Add/Edit books)
    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("book-title").value;
        const price = document.getElementById("book-price").value;
        const bookId = document.getElementById("book-id").value;
        const imageUrl = document.getElementById("book-image").value.trim();

        if (!title || !price || !imageUrl) {
            alert("Please fill in all fields.");
            return;
        }

        const bookData = { title, price, image: imageUrl };

        if (bookId !== "") {
            books[bookId] = bookData; // Edit
        } else {
            books.push(bookData); // Add
        }

        localStorage.setItem("books", JSON.stringify(books));
        bookForm.reset();
        bookFormContainer.style.display = "none";
        renderBooks();
    });

    // Edit or Delete book actions
    booksContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const index = e.target.getAttribute("data-index");
            document.getElementById("book-title").value = books[index].title;
            document.getElementById("book-price").value = books[index].price;
            document.getElementById("book-image").value = books[index].image;
            document.getElementById("book-id").value = index;
            document.getElementById("form-title").textContent = "Edit Book";
            bookFormContainer.style.display = "block";
        } else if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            if (confirm("Are you sure you want to remove this book?")) {
                books.splice(index, 1);
                localStorage.setItem("books", JSON.stringify(books));
                renderBooks();
            }
        }
    });

    // Logout
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        alert("Logged out successfully!");
        window.location.href = "login.html";
    });

    renderBooks();
    renderOrders(); // ✅ Render orders inside DOMContentLoaded
});

// -----------------------
// Render Orders Section
// -----------------------
function renderOrders() {
    const ordersList = document.getElementById("orders-list");
    if (!ordersList) return; // ✅ Prevent crashing if element not found

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        ordersList.innerHTML = "<p>No orders found.</p>";
        return;
    }

    ordersList.innerHTML = ""; // Clear existing content

    orders.forEach((order, index) => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order");

        const itemList = order.items.map(item => `<li>${item.title} - $${item.price}</li>`).join("");

        orderDiv.innerHTML = `
            <h4>Order #${index + 1}</h4>
            <p><strong>Customer Name:</strong> ${order.name}</p>
            <p><strong>Address:</strong> ${order.address.address}, ${order.address.city}, ${order.address.country}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Items:</strong></p>
            <ul>${itemList}</ul>
            <p><strong>Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
            <hr>
        `;

        ordersList.appendChild(orderDiv);
    });
}
