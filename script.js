const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title,author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const container = document.querySelector('#book-container');
    myLibrary.forEach(book => {
        const newCard = createCard(book);
        container.appendChild(newCard);
    });
}

function createCard(card, book) {
    const card = document.createElement('div');
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("button");
    const removeButton = document.createElement("button");
    fillCardInfos(title, author, pages, read, book);
    addClasses(card, read, remove, book);
    return card;
}

function fillCardInfos(title, author, pages, read, book) {
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read ? "Read" : "Not read";
}

function addClasses(card, read, remove, book) {
    card.classList.add("card");
    const readClass = book.read ? "read" : "not-read";
    read.classList.add(readClass);
    remove.classList.add("remove");
}

function appendCardInfo(card, title, author, pages, read, remove) {
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(removeButton);
}

function removeBook(book) {
    const bookIndex = findBookIndex(book);
    myLibrary.splice(bookIndex, 1);
}

function findBookIndex(bookToFind) {
    for (let i = 0; i < myLibrary.length; i++) 
        if (myLibrary[i].title === bookToFind.title) return i;
}
