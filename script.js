const form = document.querySelector("#book-form");
const dialog = document.querySelector("#my-dialog");

const myLibrary = [];

function Book(id, author, title, pages) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
}

function addBookToLibrary(author, title, pages) {
  const id = crypto.randomUUID();
  const book = new Book(id, author, title, pages);
  myLibrary.push(book);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  
  const author = formData.get("author");
  const title = formData.get("title");
  const pages = formData.get("pages");

  addBookToLibrary(author, title, pages);

  form.reset();
  dialog.close();
});