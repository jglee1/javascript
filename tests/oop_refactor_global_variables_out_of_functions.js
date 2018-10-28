// the global variable
var bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

/* This function should add a book to the list and return the list */
// New parameters should come before the bookName one

// Add your code below this line
function add (bookList, bookName) {
  let bookListA = bookList.slice();
  //console.log("1", bookListA);
  //console.log("2", bookName);
  bookListA.push(bookName);
  //console.log("3", bookListA);
  return bookListA;
  
  // Add your code above this line
}

/* This function should remove a book from the list and return the list */
// New parameters should come before the bookName one

// Add your code below this line
function remove (bookList, bookName) {
  let bookListA = bookList.slice();
  if (bookListA.indexOf(bookName) >= 0) {
    bookListA.splice(bookList.indexOf(bookName), 1)
    return bookListA;
    
    // Add your code above this line
    }
}

var newBookList = add(bookList, 'A Brief History of Time');
//console.log(bookList);
//console.log(newBookList);
var newerBookList = remove(bookList, 'On The Electrodynamics of Moving Bodies');
//console.log(newerBookList);
var newestBookList = remove(add(bookList, 'A Brief History of Time'), 'On The Electrodynamics of Moving Bodies');
//console.log(newestBookList);
//console.log(bookList);