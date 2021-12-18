(function addListeners() {
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.addEventListener("click", executeAction);
	});
})();

function executeAction(event) {
	const id = event.target.id;
	if (options[id]) options[id]();
}

const options = {
	"add-book": createAddNewBookInterface,
	"submit-book": submitBook,
};

function createAddNewBookInterface() {
	const content = document.querySelector("#content");
	if (preventMultipleInterfaces(content)) return;
	const newBookDiv = document.createElement("div");
	newBookDiv.setAttribute("id", "new-book");
	createChildren(newBookDiv, newBookInterface);
	content.appendChild(newBookDiv);
	addListeners();
}

function preventMultipleInterfaces(content) {
	const childrenArray = Array.from(content.childNodes);
	return childrenArray.some((child) => child.id === "new-book");
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

function submitBook() {
	const title = document.querySelector("#new-title").value;
	const author = document.querySelector("#new-author").value;
	const pages = document.querySelector("#new-pages").value;
	const readStatus = document.querySelector("#new-read").checked;
	const read = readStatus ? "Read" : "Not read";
	addBookToLibrary(title, author, pages, read);
	destroyAddNewBookInterface();
}

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	displayBooks();
}

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

const myLibrary = [];

function displayBooks() {
	const container = createContainer();
	myLibrary.forEach((book) => {
		const newCard = createNewCard(book);
		container.appendChild(newCard);
	});
	addCardListeners();
}

function createContainer() {
	const content = getCleanContentDiv();
	const container = document.createElement("div");
	container.setAttribute("id", "book-container");
	content.appendChild(container);
	return container;
}

function getCleanContentDiv() {
	const content = document.querySelector("#content");
	if (document.querySelector("#book-container")) {
		const remove = document.querySelector("#book-container");
		content.removeChild(remove);
	}
	return content;
}

function createNewCard(book) {
	const card = document.createElement("div");
	card.classList.add("card");
	fillCardInfos(book);
	createChildren(card, cardDisplay);
	return card;
}

function fillCardInfos(book) {
	for (let attribute in book)
		cardDisplay[attribute]["text"] = book[attribute];
	cardDisplay["read"]["class"] = book.read === "Read" ? "read" : "not-read";
}

const cardDisplay = {
	title: {
		element: "p",
		text: "",
	},
	author: {
		element: "p",
		text: "",
	},
	pages: {
		element: "p",
		text: "",
	},
	read: {
		element: "button",
		text: "",
		class: "",
	},
	removeButton: {
		element: "button",
		text: "Remove",
		class: "remove",
	},
};

function destroyAddNewBookInterface() {
	const content = document.querySelector("#content");
	const newBookDiv = document.querySelector("#new-book");
	content.removeChild(newBookDiv);
}

function addCardListeners() {
	const cards = document.querySelectorAll(".card");
	cards.forEach((card) => addButtonListeners(card));
}

function addButtonListeners(card) {
	const buttons = card.querySelectorAll("button");

	buttons.forEach((button) =>
		button.addEventListener("click", (event) => {
			const class_ = event.target.classList;
			if (cardButtons[class_]) cardButtons[class_](card);
		})
	);
}

const cardButtons = {
	read: toggleToUnread,
	"not-read": toggleToRead,
	remove: removeCard,
};

function toggleToUnread(card) {
	const toggle = card.children[3];
	toggle.classList.add("not-read");
	toggle.classList.remove("read");
	toggle.textContent = "Not Read";
}

function toggleToRead(card) {
	const toggle = card.children[3];
	toggle.classList.add("read");
	toggle.classList.remove("not-read");
	toggle.textContent = "Read";
}

function removeCard(card) {
	const container = document.querySelector("#book-container");
	container.removeChild(card);
	if (!container.firstChild) {
		const content = document.querySelector("#content");
		content.removeChild(container);
	}
	removeBook(card);
}

function removeBook(card) {
	const index = findBookIndex(card);
	myLibrary.splice(index, 1);
}

function findBookIndex(card) {
	const title = card.children[0];
	for (let i = 0; i < myLibrary.length; i++)
		if (myLibrary[i].title === title) return i;
}
