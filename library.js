const books = document.querySelector('#books');
const submit = document.querySelector('input[type=submit]');
const toggleFormButton = document.querySelector('#toggle-form')
const hiddenForm = document.querySelector('#hidden-form');

let myLibrary = [{id: 1, title: 'War and peace', author: 'Leon Tolstoy', pages: 1000, read: true}];
let newBook = new Book('Lolita', 'Nabokov', 500, false);
addBookToLibrary(newBook);

function Book(title, author, pages, read) {
  this.id = myLibrary[myLibrary.length - 1].id + 1;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  for (book of myLibrary) {
    bookWrapper = document.createElement('div');
    bookWrapper.classList.add('book');
    bookWrapper.dataset.id = book.id;
    bookWrapper.innerHTML = 
      `<div>${book.title}</div>
       <div>${book.author}</div>
       <div>${book.pages}</div>
       <div>${book.read}</div>`; 
    readBookButton = document.createElement('button');
    deleteBookButton = document.createElement('button');
    readBookButton.textContent = 'Read';
    deleteBookButton.textContent = 'Delete';
    book.read ? readBookButton.classList.add('is-read') : readBookButton.classList.add('not-read'); 
    readBookButton.addEventListener('click', readBook);
    deleteBookButton.addEventListener('click', deleteBook);
    bookWrapper.appendChild(readBookButton);
    bookWrapper.appendChild(deleteBookButton);
    books.appendChild(bookWrapper);
  }
}

function readBook(e) {
  bookWrapper = e.target.parentNode;
  bookId = bookWrapper.dataset.id;

  bookIndex = myLibrary.findIndex(book => book.id === Number(bookId));
  myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
  e.target.classList.toggle('is-read');
  e.target.classList.toggle('not-read');
  console.log(myLibrary[bookIndex].read);
}

function deleteBook(e) {
  bookWrapper = e.target.parentNode;
  bookId = bookWrapper.dataset.id;

  myLibrary = myLibrary.filter(book => book.id !== Number(bookId));
  bookWrapper.remove();
}

function showForm() {
  hiddenForm.classList.toggle('invisible');
}

function getBook(e) {
  e.preventDefault();
}

displayBooks();

toggleFormButton.addEventListener('click', showForm);
submit.addEventListener('click', getBook);
