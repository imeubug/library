/* 
 * date: October 9th, 2020
 * name: Jii Eu
 */

const bookshelf = document.getElementById('bookshelf');
const newBookForm = document.getElementById('new-book-form');
const addNewBookButton = document.getElementById('add-new-book');

const book1 = [new Book('殺人ゲーム', '東野 圭吾', 'reading'), false];
const book2 = [new Book('세월의 돌 1', '전민희', 'read'), false];
const book3 = [new Book('세월의 돌 2', '전민희', 'read'), false];
const book4 = [new Book('11문자의 살인', '히가시노 케이고', 'not-yet'), false];

let myLibrary = [book1, book2, book3, book4];

populate();

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;

    this.info = function () {
        let read = (this.read) ? 'read' : 'not read yet';
        return `${this.title} - ${this.author}. ${read}.`;
    }
}

addNewBookButton.addEventListener('click', function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    let read = document.getElementsByName('read');
    for (v in read) {
        if (read[v].checked) {
            read = read[v].value;
            break;
        }
    }
    console.log(read);
    myLibrary.push([new Book(title, author, read), false]);
    populate();
    toggleForm();
});

function populate() {
    for (index in myLibrary) {
        if (myLibrary[index][1]) continue;
        let card = document.createElement('div');
        card.addEventListener('click', e => {
            toggleRead(e);
        });
        card.classList.add('card', myLibrary[index][0].read);

        let img = document.createElement('img');
        // SAMPLE IMAGE
        img.src = 'assets/sample.jpg';
        img.alt = 'Sample book image';
        img.addEventListener('click', e => {
            e.stopPropagation();
        });
        let container = document.createElement('div');
        container.className = 'container';
        let book = myLibrary[index];
        book[1] = true;
        container.innerText = `${(book[0]).title} - ${(book[0]).author}`;

        card.appendChild(img);
        card.appendChild(container);

        bookshelf.appendChild(card);
    }
}

function toggleForm() {
    let hidden = newBookForm.style.display;
    newBookForm.style.display = (hidden === 'none') ? 'block' : 'none';

    let opa = bookshelf.style.opacity;
    bookshelf.style.opacity = (opa == 0.3) ? 1.0 : 0.3;
}

function toggleRead(e) {
    console.log(e.target);
}