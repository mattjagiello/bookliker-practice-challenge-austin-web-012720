let bookArray = [];
let bookFans;

document.addEventListener('DOMContentLoaded', () => {
  getBooks();
});

function getBooks() {
  bookArray = [];
  return fetch('http://localhost:3000/books')
    .then((response) => response.json())
    .then((json) => {
      json.forEach((e) => {
        bookArray.push(e);
      });
      renderList(bookArray);
    });
}

function renderList(books) {
  bookUl = document.getElementById('list');
  bookUl.innerHTML = '';
  books.forEach((book) => {
    const bookLi = document.createElement('li');
    bookLi.innerText = book.title;
    bookUl.append(bookLi);

    bookLi.addEventListener('click', (e) => {
      e.preventDefault();
      showBook(books, bookLi.innerText);
    });
  });
}

function showBook(books, title) {
  const bookDiv = document.getElementById('show-panel');
  bookDiv.innerHTML = '';
  const bookInfo = books.filter((book) => book.title === title);

  const bookHeader = document.createElement('h2');
  bookHeader.innerText = bookInfo[0].title;
  const bookImg = document.createElement('p');
  bookImg.innerHTML = `<img src = ${bookInfo[0].img_url} />`;
  const bookDesc = document.createElement('p');
  bookDesc.innerText = bookInfo[0].description;
  const bookUsers = document.createElement('ul');
  bookFans = bookInfo[0].users;
  bookFans.forEach((fan) => {
    const userLi = document.createElement('li');
    userLi.innerText = fan.username;
    bookUsers.appendChild(userLi);
  });
  const likeBtn = document.createElement('button');
  likeBtn.innerText = 'Like Book';
  likeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    likeBook(bookInfo);
  });

  function likeBook(bookInfo) {
    const addFan = {
      method: 'PATCH',
      headers:
            {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
      body: JSON.stringify({
        users: bookFans,
      }),
    };
    const user1 = { id: 1, username: 'pouros' };
    bookFans.push(user1);
    fetch(`http://localhost:3000/books/${bookInfo[0].id}`, addFan)
      .then((response) => response.json())
      .then((json) => {
        showBook(bookInfo, bookInfo[0].title);
      });
  }

  bookDiv.append(bookHeader);
  bookDiv.append(bookImg);
  bookDiv.append(bookDesc);
  bookDiv.append(bookUsers);
  bookDiv.append(likeBtn);
}
