/* 
 * date: October 9th, 2020
 * name: Jii Eu
 */

"use strict";

/* disable right click */
document.addEventListener('contextmenu', event => event.preventDefault());

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCwH990_A8qCsoYD7nG1EBF3-f9qMdW4ZU",
    authDomain: "library-6b733.firebaseapp.com",
    databaseURL: "https://library-6b733.firebaseio.com",
    projectId: "library-6b733",
    storageBucket: "library-6b733.appspot.com",
    messagingSenderId: "279988305",
    appId: "1:279988305:web:76d36a3220dd18bc03d070"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let database = firebase.database();
let storage = firebase.storage();

const bookshelf = document.getElementById('bookshelf');
const newBookForm = document.getElementById('new-book-form');
const addNewBookButton = document.getElementById('add-new-book');
const legends = document.getElementById('legend');
const bookCountTag = document.getElementById('book-count');
let bookCount = 0;
let currentView = '';

// let myLibrary = localStorage.getItem('myBooks');
// myLibrary = (myLibrary) ? JSON.parse(myLibrary) : [];

let myBooks = [];

class Book {
    constructor(title, author, img, read, imgKey) {
        this.title = title;
        this.author = author;
        this.img = img;
        this.read = read;
        this.key = imgKey;
        this.show = false;
    }
}

window.onload = function () {
    loadData();
    setTimeout(function () { populate() }, 700);
};

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
    
    // Get a key for a new Book.
    var newBookKey = firebase.database().ref().child('books').push().key;

    // A new book entry.
    let bookData = new Book(titleTag.value, authorTag.value, filename, read, newBookKey);
    myBooks.push(bookData);

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/books/' + newBookKey] = bookData;

    firebase.database().ref().update(updates);

    // reset all fields
    titleTag.value = '';
    authorTag.value = '';
    imgFileTag.value = '';

    setTimeout(function () { populate() }, 700); // display the book
    toggleForm(); // hide the form
});

function loadData() {
    database.ref('/books/').once('value').then(function (snapshot) {
        snapshot.forEach(function (child) {
            let x = child.val();
            let b = new Book(x.title, x.author, x.img, x.read, x.key);
            myBooks.push(b);
        })
    });
}

function populate() {
    console.log('populate');
    for (let index in myBooks) {
        let book = myBooks[index];
        console.log(index, book);
        // skip if a book is already displayed
        if (book.show) continue;

        let card = document.createElement('div');
        card.classList.add('card', book.read);

        let img = document.createElement('img');
        
        // Create a reference to the file we want to download
        // var starsRef = storage.ref().child(book.img);
    
        // // Get the download URL
        // starsRef.getDownloadURL().then(function (url) {
        //     // Insert url into an <img> tag to "download"
        //     img.src = url;
        // })
        img.src = './assets/books/' + book.img;
        
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

    bookCount = myBooks.length;
    bookCountTag.innerText = bookCount;
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
    console.log(myBooks[index]);
    const _index = myBooks.indexOf(myBooks[index]);
    if (_index > -1) {
        myBooks.splice(_index, 1);
    }

    let count = bookCountTag.innerText * 1;
    bookCountTag.innerText = count - 1;
    bookCount -= 1;
}


function filterBooks(filterStr) {
    let count = 0;
    for (let x in bookshelf.children) {
        if (x == 0) continue;
        if (bookshelf.children[x].tagName === 'DIV') {
            if (currentView === filterStr) {
                bookshelf.children[x].style.display = 'block';
                continue;
            }

            if (bookshelf.children[x].className.split(' ').indexOf(filterStr) == -1) {
                count += 1;
                bookshelf.children[x].style.display = 'none';
            } else {
                bookshelf.children[x].style.display = 'block';
            }
        }
    }
    bookCountTag.innerText = bookCount - count;
    currentView = (currentView === filterStr) ? '' : filterStr;
}

legends.children[0].addEventListener('click', function () { filterBooks('read'); })
legends.children[1].addEventListener('click', function () { filterBooks('reading'); })
legends.children[2].addEventListener('click', function () { filterBooks('not-yet'); })

// /**
//  * When the page is closed or refreshed, update the localStorage
//  */
// window.onbeforeunload = function () {
//     for (let index in myLibrary) {
//         myLibrary[index].show = false;
//     }
//     localStorage.setItem('myBooks', JSON.stringify(myLibrary));
// }