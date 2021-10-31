const books = document.querySelector('#books');
const submit = document.querySelector('input[type=submit]');
const toggleFormButton = document.querySelector('#toggle-form')
const hiddenForm = document.querySelector('#hidden-form');

let myLibrary = [];

parseLocalStorage();
displayBookCards();

function Book(title, author, pages, read) {
  myLibrary.at(-1) ? this.id = myLibrary.at(-1).id + 1 : this.id = 1;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(e) {
  e.preventDefault();

  titleInput = document.querySelector('#title');
  authorInput = document.querySelector('#author');
  pagesInput = document.querySelector('#pages');
  readInput = document.querySelector('#read');

  let book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);

  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readInput.checked = false;

  myLibrary.push(book);
  createBookCard(book);

  saveLibraryToLocalStorage();
}

function displayBookCards() {
  for (book of myLibrary) {
    createBookCard(book);
  }
}

function createBookCard(book) {
  let bookWrapper = document.createElement('div');
  bookWrapper.classList.add('book');
  bookWrapper.dataset.id = book.id;
  bookWrapper.innerHTML = 
    `<div>"${book.title}"</div>
    <div>${book.author}</div>
    <div>${book.pages} pages</div>`; 

  let readBookButton = document.createElement('button');
  readBookButton.classList.add('button');
  book.read ? readBookButton.classList.add('is-read') : readBookButton.classList.add('not-read'); 
  book.read ? readBookButton.textContent = 'Read' : readBookButton.textContent = 'Not Read';

  let deleteBookButton = document.createElement('button');
  deleteBookButton.classList.add('button');
  deleteBookButton.classList.add('delete');
  deleteBookButton.textContent = 'Delete';

  readBookButton.addEventListener('click', toggleRead);
  deleteBookButton.addEventListener('click', deleteBook);

  bookWrapper.appendChild(readBookButton);
  bookWrapper.appendChild(deleteBookButton);
  books.appendChild(bookWrapper);
}

function toggleRead(e) {
  let bookWrapper = e.target.parentNode;
  let bookId = bookWrapper.dataset.id;

  let bookIndex = myLibrary.findIndex(book => book.id === Number(bookId));
  let book = myLibrary[bookIndex];
  book.read = !book.read;

  e.target.classList.toggle('is-read');
  e.target.classList.toggle('not-read');

  book.read ? e.target.textContent = 'Read' : e.target.textContent = 'Not Read';

  saveLibraryToLocalStorage();
}

function deleteBook(e) {
  let bookWrapper = e.target.parentNode;
  let bookId = bookWrapper.dataset.id;

  myLibrary = myLibrary.filter(book => book.id !== Number(bookId));
  bookWrapper.remove();

  saveLibraryToLocalStorage();
}

function showForm() {
  hiddenForm.classList.toggle('invisible');
}

function parseLocalStorage() {
  let stringifiedLibrary = localStorage.getItem('myLibrary');
  myLibrary = JSON.parse(stringifiedLibrary);
}

function saveLibraryToLocalStorage() {
  let stringifiedLibrary = JSON.stringify(myLibrary);
  localStorage.setItem('myLibrary', stringifiedLibrary);
}

toggleFormButton.addEventListener('click', showForm);
submit.addEventListener('click', addBookToLibrary);
