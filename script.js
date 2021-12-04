const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
	const container = createContainer();
	myLibrary.forEach(book => {
        const newCard = createNewCard(book);
		container.appendChild(newCard);
	});
}

function createContainer() {
    const content = document.querySelector("#content");
    if (document.querySelector("#book-container")) {
        const remove = document.querySelector("#book-container");
        content.removeChild(remove);
    }
    const container = document.createElement("div");
    container.setAttribute("id", "book-container");
    content.appendChild(container);
    return container;
}

function createNewCard(book) {
    const card = document.createElement("div");
    fillCardInfos(book);
    createChildren(card, cardDisplay);
    card.classList.add("card");
    return card;
}

const cardDisplay = {
    title : {
        element: "p",
        text : "",
    },
    author : {
        element: "p",
        text : "",
    },
    pages : {
        element: "p",
        text : "",
    },
    read : {
        element: "button",
        text : "",
        class: "",
    },
    removeButton : {
        element: "button",
        text: "Remove",
        class : "remove",
    },
};

function fillCardInfos(book) {
	for (let attribute in book) 
        cardDisplay[attribute]["text"] = book[attribute];
    cardDisplay["read"]["class"] = book.read === "Read" ? "read" : "not-read";
}

function createChildren(parent, children) {
	for (let item in children) {
		const child = document.createElement(children[item]["element"]);
		for (let attribute in children[item]) {
			if (attribute === "element") continue;
			if (attribute === "text") {
				child.textContent = children[item][attribute];
				continue;
			}
			child.setAttribute(attribute, children[item][attribute]);
		}
		parent.appendChild(child);
	}
}

function removeBook(book) {
	const bookIndex = findBookIndex(book);
	myLibrary.splice(bookIndex, 1);
}

function findBookIndex(bookToFind) {
	for (let i = 0; i < myLibrary.length; i++)
		if (myLibrary[i].title === bookToFind.title) return i;
}

function createAddNewBookInterface() {
	const content = document.querySelector("#content");
	const newBookDiv = document.createElement("div");
	newBookDiv.setAttribute("id", "new-book");
	createChildren(newBookDiv, newBookInterface);
	content.appendChild(newBookDiv);
    createSubmitListener();
}

const newBookInterface = {
	head: {
		element: "p",
		text: "Add new book",
	},
	title: {
		element: "input",
		type: "text",
		id: "new-title",
		placeholder: "Title",
	},
	author: {
		element: "input",
		type: "text",
		id: "new-author",
		placeholder: "Author",
	},
	pages: {
		element: "input",
		type: "number",
		id: "new-pages",
		placeholder: "Pages",
	},
	label: {
		element: "label",
		for: "number",
		text: "Have you read this book?",
	},
	checkbox: {
		element: "input",
		type: "checkbox",
		id: "new-read",
	},
	button: {
		element: "button",
		id: "submit-book",
		text: "Submit Book",
	},
};

const options = {
	"add-book": createAddNewBookInterface,
    "submit-book": submitBook
};

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
	button.addEventListener("click", event => {
		const id = event.target.id;
		options[id]();
	});
});


function submitBook() {
    const title = document.querySelector("#new-title").value;
    const author = document.querySelector("#new-author").value;
    const pages = document.querySelector("#new-pages").value;
    const readStatus = document.querySelector("#new-read").checked;
    const read = readStatus ? "Read" : "Not read";
    addBookToLibrary(title, author, pages, read);
    destroyAddNewBookInterface()
}

function destroyAddNewBookInterface() {
	const content = document.querySelector("#content");
	const newBookDiv = document.querySelector("#new-book");
	content.removeChild(newBookDiv);
}

function createSubmitListener() {
    const submitBook = document.querySelector("#submit-book")
    submitBook.addEventListener("click", event => {
		const id = event.target.id;
		options[id]();
    })
}