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