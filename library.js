const books = document.querySelector('#books');
const submit = document.querySelector('input[type=submit]');
const toggleFormButton = document.querySelector('#toggle-form')
const hiddenForm = document.querySelector('#hidden-form');

let myLibrary = [{id: 1, title: 'War and peace', author: 'Leon Tolstoy', pages: 1000, read: true}];
let newBook = new Book('Lolita', 'Nabokov', 500, true);
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
    bookWrapper.dataset.id = book.id;
    bookWrapper.classList.add('book');
    bookWrapper.innerHTML = 
      `<div>${book.title}</div>
       <div>${book.author}</div>
       <div>${book.pages}</div>
       <div>${book.read}</div>`; 
    books.appendChild(bookWrapper);
  }
}

function showForm() {
  hiddenForm.classList.toggle('hidden-form');
}

function getBook(e) {
  e.preventDefault();
}

displayBooks();

toggleFormButton.addEventListener('click', showForm);
submit.addEventListener('click', getBook);
