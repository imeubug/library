/* 
 * date: October 9th, 2020
 * name: Jii Eu
 */

 "use strict";

 /**
 * stack overflow: disable right click
 * begin::
 */
document.addEventListener('contextmenu', event => event.preventDefault());
/* end:: */

const bookshelf = document.getElementById('bookshelf');
const newBookForm = document.getElementById('new-book-form');
const addNewBookButton = document.getElementById('add-new-book');

// const book1 = new Book('test', '東野 圭吾', 'default.png', 'reading');
// const book2 = new Book('11문자 살인사건', '히가시노 케이고', 'default.png', 'not-yet');
// const book3 = new Book('Stone of Ages', 'Jeon Min Hee', 'sample.jpg', 'read');
// const book4 = new Book('세월의 돌', '전민희', 'sample.jpg', 'read');
// const book5 = new Book('세월의 돌', '전민희', 'sample.jpg', 'read');

// let myLibrary = [book1, book2, book3, book4, book5];

let myLibrary = localStorage.getItem('myBooks');
myLibrary = (myLibrary) ? JSON.parse(myLibrary) : [];
populate();

function Book(title, author, img, read) {
    this.title = title;
    this.author = author;
    this.img = img;
    this.read = read;

    this.info = function () {
        let read = (this.read) ? 'read' : 'not read yet';
        return `${this.title} - ${this.author}. ${read}.`;
    }
}

addNewBookButton.addEventListener('click', e => {
    e.preventDefault();
    let titleTag = document.getElementById('title')
    let authorTag = document.getElementById('author')
    let imgFileTag = document.getElementById('img');
    let filename = 'default.png';

    // check if Title and Author field is empty
    if (!titleTag.value) {
        titleTag.focus();
        return;
    }
    if (!authorTag.value) {
        authorTag.focus();
        return;
    }

    // Set file name if an img file is chosen by the user
    if (imgFileTag.value) {
        filename = imgFileTag.files[0].name;
    }

    // set 'read' to the correct Radio input value
    let read = document.getElementsByName('read');
    for (let v in read) {
        if (read[v].checked) {
            read = read[v].value;
            break;
        }
    }

    // add a book to an array
    myLibrary.push(new Book(titleTag.value, authorTag.value, filename, read));
    
    // reset all fields
    titleTag.value = '';
    authorTag.value = '';
    imgFileTag.value = '';

    populate(); // display the book
    toggleForm(); // hide the form
});

function populate() {
    for (let index in myLibrary) {
        let book = myLibrary[index];
        // skip if a book is already displayed
        if (book.show) continue;

        let card = document.createElement('div');
        card.classList.add('card', book.read);

        let img = document.createElement('img');
        img.src = 'assets/' + book.img;
        img.alt = 'Sample book image';
        let container = document.createElement('p');
        container.className = 'container';
        book.show = true;
        container.innerText = `${book.title} - ${book.author}`;

        card.appendChild(img);
        card.appendChild(container);
        card.addEventListener('click', e => {
            e.preventDefault();
            if (e.target.tagName === 'DIV') toggleRead(e, index);
        });
        card.addEventListener('contextmenu', e => {
            e.preventDefault();
            if (e.target.tagName === 'DIV') removeCard(e.target, index);
        })
        bookshelf.appendChild(card);
    }
}

/**
 * Show and hide the form onclick
 */
function toggleForm() {
    let hidden = newBookForm.style.display;
    newBookForm.style.display = (hidden === 'none') ? 'block' : 'none';
    let opa = bookshelf.style.opacity;
    bookshelf.style.opacity = (opa == 0.3) ? 1.0 : 0.3;

    document.body.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
            toggleForm();
        }
        else if (e.keyCode === 13) {
            addNewBookButton.focus();
        }
    })
}

/*
* toggle:
* read -> reading -> not-yet
 */
function toggleRead(e, index) {
    let curr = e.target.className.split(' ')[1];
    e.target.classList.remove(curr);

    if (curr === 'read') {
        myLibrary[index].read = 'reading';
        e.target.classList.add('reading');
    }
    else if (curr === 'reading') {
        myLibrary[index].read = 'not-yet';
        e.target.classList.add('not-yet');
    }
    else if (curr === 'not-yet') {
        myLibrary[index].read = 'read';
        e.target.classList.add('read');
    }
}

function removeCard(elem, index) {
    bookshelf.removeChild(elem);
    console.log(elem, index);
    const _index = myLibrary.indexOf(myLibrary[index]);
    if (_index > -1) {
        myLibrary.splice(_index, 1);
    }
}

window.onbeforeunload = function() {
    for (let index in myLibrary) {
        myLibrary[index].show = false;
    }
    localStorage.setItem('myBooks', JSON.stringify(myLibrary));
}