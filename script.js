const addBookButton = document.getElementById("add-book-btn");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const descriptionInput = document.getElementById("description");
const ratingInput = document.getElementById("rating");
const booksList = document.getElementById("books-list");
const searchInput = document.getElementById("search");

// تحميل الكتب من localStorage عند تحميل الصفحة
let books = JSON.parse(localStorage.getItem("books")) || [];

// إضافة كتاب جديد
addBookButton.addEventListener("click", () => {
  const title = titleInput.value;
  const author = authorInput.value;
  const description = descriptionInput.value;
  const rating = parseInt(ratingInput.value);

  if (title && author && description && rating >= 1 && rating <= 5) {
    const newBook = {
      title,
      author,
      description,
      rating,
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
    clearInputs();
  } else {
    alert("يرجى تعبئة كافة الحقول بشكل صحيح.");
  }
});

// عرض الكتب في الصفحة
function renderBooks() {
  booksList.innerHTML = "";

  books.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `المؤلف: ${book.author}`;

    const bookDescription = document.createElement("p");
    bookDescription.textContent = book.description;

    const bookRating = document.createElement("p");
    bookRating.classList.add("rating");
    bookRating.textContent = "التقييم: " + "★".repeat(book.rating);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
      deleteBook(index);
    });

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookDescription);
    bookCard.appendChild(bookRating);
    bookCard.appendChild(deleteButton);

    booksList.appendChild(bookCard);
  });
}

// مسح المدخلات بعد إضافة الكتاب
function clearInputs() {
  titleInput.value = "";
  authorInput.value = "";
  descriptionInput.value = "";
  ratingInput.value = "";
}

// حذف الكتاب
function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

// البحث عن الكتب
searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value.toLowerCase();
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery) || 
    book.author.toLowerCase().includes(searchQuery)
  );
  
  booksList.innerHTML = "";
  filteredBooks.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `المؤلف: ${book.author}`;

    const bookDescription = document.createElement("p");
    bookDescription.textContent = book.description;

    const bookRating = document.createElement("p");
    bookRating.classList.add("rating");
    bookRating.textContent = "التقييم: " + "★".repeat(book.rating);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
      deleteBook(index);
    });

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookDescription);
    bookCard.appendChild(bookRating);
    bookCard.appendChild(deleteButton);

    booksList.appendChild(bookCard);
  });
});

// عرض الكتب عند تحميل الصفحة
renderBooks();
