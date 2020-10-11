/* 
 * date: October 9th, 2020
 * name: Jii Eu
 */

const bookshelf = document.getElementById('bookshelf');
const newBookForm = document.getElementById('new-book-form');
const addNewBookButton = document.getElementById('add-new-book');

let myLibrary = [];
// addBook();
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

addNewBookButton.addEventListener('click', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    let read = document.getElementsByName('read');
    for(v in read) {
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

function addBook() {
    myLibrary.push([new Book('Stone of Ages 1', 'Jeon Min Hee', 500, 'read'), false]);
    myLibrary.push([new Book('Stone of Ages 2', 'Jeon Min Hee', 500, 'read'), false]);
    myLibrary.push([new Book('Stone of Ages 3', 'Jeon Min Hee', 500, 'read'), false]);
    myLibrary.push([new Book('Stone of Ages 4', 'Jeon Min Hee', 500, 'reading'), false]);
    myLibrary.push([new Book('title', 'author', 500, 'not-yet'), false]);
    myLibrary.push([new Book('11の殺人', '東野 圭吾', 500, 'not-yet'), false]);
}

function populate() {
    // const newBookCard = bookshelf.firstElementChild;

    for (index in myLibrary) {
        if(myLibrary[index][1]) continue;
        let card = document.createElement('div');
        card.className = 'card';

        let img = document.createElement('img');
        // SAMPLE IMAGE
        img.src = 'assets/sample.jpg';
        img.alt = 'Sample book image';

        let container = document.createElement('div');
        container.className = 'container';
        let book = myLibrary[index];
        book[1] = true;
        container.innerText = `${(book[0]).title} - ${(book[0]).author}`;

        card.appendChild(img);
        card.appendChild(container);

        bookshelf.appendChild(card);
    }
    // bookshelf.appendChild(newBookCard);
}

function toggleForm() {
    let hidden = newBookForm.style.display;
    newBookForm.style.display = (hidden === 'none') ? 'block' : 'none';

    let opa = bookshelf.style.opacity;
    bookshelf.style.opacity = (opa == 0.3) ? 1.0 : 0.3;
    
}
