/* 
 * date: October 9th, 2020
 * name: Jii Eu
 */

const bookshelf = document.getElementById('bookshelf');
const newBookForm = document.getElementById('new-book-form');

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
    myLibrary.push(new Book('Stone of Ages 1', 'Jeon Min Hee', 500, 'read'));
    myLibrary.push(new Book('Stone of Ages 2', 'Jeon Min Hee', 500, 'read'));
    myLibrary.push(new Book('Stone of Ages 3', 'Jeon Min Hee', 500, 'read'));
    myLibrary.push(new Book('Stone of Ages 4', 'Jeon Min Hee', 500, 'reading'));
    myLibrary.push(new Book('책방', '저자', 500, 'not-yet'));
    myLibrary.push(new Book('11の殺人', '東野圭吾', 500, 'not-yet'));
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

function toggleForm() {
    let hidden = newBookForm.style.display;
    newBookForm.style.display = (hidden === 'none') ? 'block' : 'none';

    let opa = bookshelf.style.opacity;
    bookshelf.style.opacity = (opa == 0.3) ? 1.0 : 0.3;
    
}
