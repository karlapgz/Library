// buttons 
const openForm = document.querySelector(".add-new"),
    deleteAll = document.querySelector(".delete-all"),
    addBook = document.querySelector(".add"),
    deleteBook = document.querySelector(".delete-book"),
    closeForm = document.querySelector(".close");

// inputs

const title = document.querySelector("#title"),
    author = document.querySelector("#author"),
    pages = document.querySelector("#pages"),
    read = document.querySelector("#read");

const formSection = document.querySelector(".form");
const allBooks = document.querySelector(".all-books");
let library = [];

if(localStorage.length > 0) {
    let array = localStorage.getItem('library');
    array = JSON.parse(array);
    library = [...array];
}

/* class and constructor */
class Book {
    constructor (title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

/* functions */

const cleanInput = () => {
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = false;
}

const addBookArray = (e) => {
    e.preventDefault();
    let titleValue = title.value,
        authorValue = author.value,
        pagesValue = pages.value,
        readValue = read.checked ? 'Yes' : 'No';

    const newBook = new Book(titleValue, authorValue, pagesValue, readValue);
    library.push(newBook);
    localStorage.setItem('library', JSON.stringify(library));
    cleanInput();
    addBookDOM(library);
}

const addBookDOM = (library) => {
    let books = library.map(item => {
        return `
        <div class="book">
            <h3>${item.title}</h3>
            <h3>${item.author}</h3>
            <h4>Pages: ${item.pages}</h4>
            <h4>Read: ${item.read}</h4>
        </div>`
    });

    books = books.join('');
    allBooks.innerHTML = books;
}

const deleteAllBooks = () => {
    localStorage.clear();
    library = [];
    allBooks.innerHTML = '';
}


/* Show and close form */

openForm.addEventListener('click', (e) => {
    e.preventDefault();
    formSection.classList.add('form-show');
});

closeForm.addEventListener('click', (e) => {
    e.preventDefault();
    formSection.classList.remove('form-show');
});

/* Add book */

addBook.addEventListener('click', addBookArray);

/* Show Books */

window.addEventListener('DOMContentLoaded', () => {
    addBookDOM(library);
});

/* Delete all books */
deleteAll.addEventListener('click', () => {
    deleteAllBooks();
});