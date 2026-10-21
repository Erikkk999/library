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

Book.prototype.setReadStatus = function (status) {
  this.read = status;
};

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

container.addEventListener("change", (e) => {
  const checkBox = e.target;

  if (!checkBox.matches(".read-status")) return;

  const book = checkBox.closest(".book");
  const item = myLibrary.find(item => item.id === book.dataset.id);
  const switchText = book.querySelector(".switch-text");

  if (!item) return;

  changeReadStatus(item, switchText, checkBox);
});

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
  checkBox.classList.add("read-status");
  checkBox.id = `read-status-${item.id}`;
  checkBox.checked = item.read;

  const checkBoxLabel = document.createElement("label");
  checkBoxLabel.classList.add("switch");
  checkBoxLabel.htmlFor = checkBox.id;

  const slider = document.createElement("span");
  slider.classList.add("slider");

  const switchText = document.createElement("span");
  switchText.classList.add("switch-text", item.read ? "text-on" : "text-off");
  switchText.textContent = item.read ? "Read" : "Not read";

  slider.appendChild(switchText);
  checkBoxLabel.append(checkBox, slider);
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

function displayBook() {
  container.replaceChildren();

  myLibrary.forEach(item => {
    container.appendChild(createBookElement(item));
  });
}

function changeReadStatus(item, switchText, checkBox) {
  switchText.classList.add("fade-out");

  timeout = setTimeout(() => {
    item.setReadStatus(checkBox.checked);

    switchText.textContent = checkBox.checked ? "Read" : "Not read";

    switchText.classList.toggle("text-on", checkBox.checked);
    switchText.classList.toggle("text-off", !checkBox.checked);

    timeout = setTimeout(() => {
    switchText.classList.remove("fade-out");
    }, 700);
  }, 300);
}

addBookToLibrary("V. Anton Spraul", "Think Like A Programmer", "256");