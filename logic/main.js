/* 
 * date: October 9th, 2020
 * name: Jii Eu
 */

const bookshelf = document.getElementById('bookshelf');

let myLibrary = [];
addBook();
populate();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        let read = (this.read) ? 'read' : 'not read yet';
        return `${this.title} - ${this.author}. ${this.pages} pages. ${read}.`;
    }
}

function addBook() {
    myLibrary.push(new Book('Stone of Ages', 'Jeon', 500, true));
    myLibrary.push(new Book('Stone of Ages', 'Jeon', 500, true));
    myLibrary.push(new Book('Stone of Ages', 'Jeon', 500, true));
    myLibrary.push(new Book('Stone of Ages', 'Jeon', 500, true));
    myLibrary.push(new Book('Stone of Ages', 'Jeon', 500, true));
}

function populate() {
    const newBookCard = bookshelf.firstElementChild;

    for (index in myLibrary) {
        let card = document.createElement('div');
        card.className = 'card';

        let img = document.createElement('img');
        // SAMPLE IMAGE
        img.src = 'assets/sample.jpg';
        img.alt = 'Sample book image';

        let container = document.createElement('div');
        container.className = 'container';
        let book = myLibrary[index];
        container.innerText = `${book.title} - ${book.author}`;

        card.appendChild(img);
        card.appendChild(container);

        bookshelf.appendChild(card);
    }
    bookshelf.appendChild(newBookCard);
}