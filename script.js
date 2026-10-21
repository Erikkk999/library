const form = document.querySelector("#book-form");
const dialog = document.querySelector("#my-dialog");
const container = document.querySelector(".page-content");

const myLibrary = [];

function Book(id, author, title, pages) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = false;
}

function addBookToLibrary(author, title, pages) {
  const id = crypto.randomUUID();
  const book = new Book(id, author, title, pages);
  myLibrary.push(book);

  displayBook();
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

function displayBook() {
  container.replaceChildren();

  myLibrary.forEach(item => {
    container.appendChild(createBookElement(item));
  });
}

function createBookElement(item) {
  const book = document.createElement("div");
  book.classList.add("book");
  book.dataset.id = item.id;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";

  const image = document.createElement("img");
  image.src = "img/plus.svg";
  image.alt = "";
  image.width = "30";

  const bookHeader = document.createElement("div");
  bookHeader.classList.add("book-header");

  const paraCont = document.createElement("div");
  paraCont.classList.add("paragraph-container");

  const bookTitle = document.createElement("h3");
  bookTitle.textContent = item.title;

  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");

  const labelForAuthor = document.createElement("span");
  labelForAuthor.textContent = "Author: ";

  const labelForPages = document.createElement("span");
  labelForPages.textContent = "Pages: ";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.id = `read-status: ${item.id}`;
  checkBox.checked = item.read;

  const checkBoxLabel = document.createElement("label");
  checkBoxLabel.classList.add("switch");
  checkBoxLabel.htmlFor = checkBox.id;

  checkBoxLabel.append(checkBox);
  bookAuthor.append(labelForAuthor);
  bookPages.append(labelForPages);
  bookAuthor.append(item.author);
  bookPages.append(item.pages);
  removeBtn.append(image);
  paraCont.append(bookAuthor, bookPages);
  bookHeader.append(bookTitle);

  book.append(removeBtn, bookHeader, paraCont, checkBoxLabel);

  return book;
}