let myLibrary = [];

if (localStorage.getItem('library')) {
    // if there is a local storage, parse it into myLibrary
    myLibrary = JSON.parse(localStorage.getItem('library'));
    // redefines the prototype of each book as metadata is lost with JSON.stringify
    myLibrary.forEach(obj => {
        return Object.setPrototypeOf(obj, Book.prototype);
    })
} 

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.haveRead}`;
}

Book.prototype.toggleReadStatus = function () {
    if (this.haveRead === 'Yes') {
        return this.haveRead = 'No';
    } else {
        return this.haveRead = 'Yes';
    }
}

function Book(title, author, pages, haveRead) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.haveRead = haveRead
}


let booksDisplay = document.getElementById('books-display');
let toggleButton = document.getElementById('toggleButton');
let addBookButton = document.getElementById('add-book');


toggleButton.addEventListener("click", formToggle);
addBookButton.addEventListener("click", addBookShowLibrary);

function addBookShowLibrary(){
    addBookToLibrary();
    renderBooks();
    formToggle();
}

function addBookToLibrary(){
    //take a users input and add that input (a book) to the myLibrary array
    let newBook = new Book();
    newBook.title = document.getElementById('title').value;
    newBook.author = document.getElementById('author').value;
    newBook.pages = document.getElementById('pages').value;

    if (document.getElementById('yes').checked){
        newBook.haveRead = document.getElementById('yes').value
    } else {
        newBook.haveRead = document.getElementById('no').value 
    }
    

    myLibrary.push(newBook);
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

function removeBookFromLibrary(){
    let bookToRemove = myLibrary[this.dataset.index];

    //update the array to exclude the bookToRemove
    myLibrary = myLibrary.filter(book => {
        return book != bookToRemove;       
    });
    
    localStorage.setItem('library', JSON.stringify(myLibrary))
    renderBooks();
}

function changeReadStatus(){
    let book = myLibrary[this.dataset.index].toggleReadStatus();
    renderBooks();
}

function renderBooks(){
    booksDisplay.innerHTML = '';
    myLibrary.forEach((book) => {
        booksDisplay.innerHTML += `<div class='book-card'>${book.title}</div>
                                    Did I read it?
                                    <button class='read-status' 
                                    data-index=${myLibrary.indexOf(book)}>
                                    ${book.haveRead}
                                    </button>
                                    <button class='remove-button' 
                                    data-index=${myLibrary.indexOf(book)}>
                                    Remove
                                    </button>`
    })

    //adds event listeners to each book's remove button
    let removeButtons = document.querySelectorAll('.remove-button');
    [...removeButtons].forEach(button => {
        button.addEventListener('click', removeBookFromLibrary);
    })

    //adds event listeners to each book's haveRead button
    let haveReadButtons = document.querySelectorAll('.read-status');
    [...haveReadButtons].forEach(button => {
        button.addEventListener('click', changeReadStatus);
    })

    localStorage.setItem('library', JSON.stringify(myLibrary))

}

function formToggle(){
    let formContainer = document.getElementById("form-container");
    if (formContainer.style.display === 'none') {
        formContainer.style.display = 'block';
        toggleButton.innerHTML = 'Go Back';
        booksDisplay.style.display = 'none';
    } else {
        formContainer.style.display = 'none';
        toggleButton.innerHTML = 'New Book';
        booksDisplay.style.display = 'block';
    }
}

                                    
renderBooks();


