document.addEventListener('DOMContentLoaded', function() {
    const addBookBtn = document.getElementById('addBookBtn');
    const viewBooksBtn = document.getElementById('viewBooksBtn');
    const registerUserBtn = document.getElementById('registerUserBtn');
    const borrowBookBtn = document.getElementById('borrowBookBtn');
    const viewBorrowedBooksBtn = document.getElementById('viewBorrowedBooksBtn');

    const addBookSection = document.getElementById('addBookSection');
    const viewBooksSection = document.getElementById('viewBooksSection');
    const registerUserSection = document.getElementById('registerUserSection');
    const borrowBookSection = document.getElementById('borrowBookSection');
    const viewBorrowedBooksSection = document.getElementById('viewBorrowedBooksSection');

    const addBookForm = document.getElementById('addBookForm');
    const registerUserForm = document.getElementById('registerUserForm');
    const borrowBookForm = document.getElementById('borrowBookForm');

    const booksList = document.getElementById('booksList');
    const borrowedBooksList = document.getElementById('borrowedBooksList');

    let books = [];
    let users = [];
    let borrowedBooks = [];

    function showSection(section) {
        addBookSection.style.display = 'none';
        viewBooksSection.style.display = 'none';
        registerUserSection.style.display = 'none';
        borrowBookSection.style.display = 'none';
        viewBorrowedBooksSection.style.display = 'none';
        section.style.display = 'block';
    }

    addBookBtn.addEventListener('click', () => showSection(addBookSection));
    viewBooksBtn.addEventListener('click', () => {
        showSection(viewBooksSection);
        displayBooks();
    });
    registerUserBtn.addEventListener('click', () => showSection(registerUserSection));
    borrowBookBtn.addEventListener('click', () => showSection(borrowBookSection));
    viewBorrowedBooksBtn.addEventListener('click', () => {
        showSection(viewBorrowedBooksSection);
        displayBorrowedBooks();
    });

    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const copies = parseInt(document.getElementById('bookCopies').value);

        books.push({ title, author, copies });
        alert('Book added successfully!');
        addBookForm.reset();
    });

    registerUserForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userName = document.getElementById('userName').value;

        users.push({ userName });
        alert('User registered successfully!');
        registerUserForm.reset();
    });

    borrowBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userName = document.getElementById('borrowUserName').value;
        const bookTitle = document.getElementById('borrowBookTitle').value;

        const book = books.find(b => b.title === bookTitle);
        if (book && book.copies > 0) {
            book.copies -= 1;
            borrowedBooks.push({ userName, bookTitle });
            alert('Book borrowed successfully!');
        } else {
            alert('Book not available!');
        }
        borrowBookForm.reset();
    });

    function displayBooks() {
        booksList.innerHTML = books.map(book => `
            <div>
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Copies: ${book.copies}</p>
            </div>
        `).join('');
    }

    function displayBorrowedBooks() {
        borrowedBooksList.innerHTML = borrowedBooks.map(borrowedBook => `
            <div>
                <h3>${borrowedBook.bookTitle}</h3>
                <p>Borrowed by: ${borrowedBook.userName}</p>
            </div>
        `).join('');
    }
});
