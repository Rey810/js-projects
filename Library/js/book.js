//example books
let book1 = new Book("book1", "author1", 20, true);
let book2 = new Book("book2", "author2", 20, true);
let book3 = new Book("book3", "author3", 20, true);
let book4 = new Book("book4", "author4", 20, true);
let book5 = new Book("book5", "author5", 20, true);
let book6 = new Book("book6", "author6", 20, true);

let myLibrary = [book1, book2, book3, book4, book5, book6];

let booksDisplay = document.getElementById('books-display');
let toggleButton = document.getElementById('toggleButton');
let addBookButton = document.getElementById('add-book');
let removeButtons = document.querySelectorAll('.remove-button');

let buttonArray = [...removeButtons]
buttonArray.forEach((button) => {
    button.addEventListener('click', () => console.log("Inside event listener"))
})

toggleButton.addEventListener("click", formToggle);
addBookButton.addEventListener("click", addBookShowLibrary);

function addBookShowLibrary(){
    addBookToLibrary();
    renderBooks();
    formToggle();
}

function Book(title, author, pages, haveRead){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.haveRead = haveRead,
    this.info = () => {
        return `${title} by ${author}, ${pages}, ${haveRead}`
    }
}

function addBookToLibrary(){
    //take a users input and add that input (a book) to the myLibrary array
    let newBook = new Book();
    newBook.title = document.getElementById('title').value;
    newBook.author = document.getElementById('author').value;
    newBook.pages = document.getElementById('pages').value;
    newBook.haveRead = document.getElementById('haveRead').value;

    myLibrary.push(newBook);
}

function removeBookFromLibrary(){
    console.log('test');
    console.log(`This button is ${this.index}`);

}

function renderBooks(){
    //allows the innerHTML to be reset according to the current 
    // myLibrary array
    booksDisplay.innerHTML = '';
    let output = '';
    myLibrary.forEach((book) => {
        output += `<div class='book-card'>${book.title}</div>
                    <button class='remove-button' data-index=${myLibrary.indexOf(book)}>
                        Remove</button>`
    })
    booksDisplay.innerHTML += output;
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
