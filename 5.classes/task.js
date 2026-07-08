// задача 1
class PrintEditionItem {
  #state;
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.#state = 100;
    this.type = null;
  }

  fix() {
    this.#state = Math.min(100, this.#state * 1.5);
  }

  set state(value) {
    if (value < 0) {
      this.#state = 0;
    } else if (value > 100) {
      this.#state = 100;
    } else {
      this.#state = value;
    }
  }

  get state() {
    return this.#state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}


// задача 2
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const book = this.books.find(item => item[type] === value);
    return book || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex(item => item.name === bookName);
    
    if (index === -1) {
      return null;
    }

    return this.books.splice(index, 1)[0];
  }
}


console.log('=== Тестовый сценарий ===');

const library = new Library('Библиотека имени Ленина');

library.addBook(new DetectiveBook('Артур Конан Дойл', 'Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе', 2019, 1008));
library.addBook(new FantasticBook('Аркадий и Борис Стругацкие', 'Пикник на обочине', 1972, 168));
library.addBook(new NovelBook('Герберт Уэллс', 'Машина времени', 1895, 138));
library.addBook(new Magazine('Мурзилка', 1924, 60));

console.log('Количество книг после добавления:', library.books.length);

const oldBook = new NovelBook('Неизвестный автор', 'Старая рукопись', 1919, 200);
oldBook.state = 25;
library.addBook(oldBook);

const foundBook = library.findBookBy('releaseDate', 1919);
console.log('Книга 1919 года найдена в библиотеке:', foundBook);

const issuedBook = library.giveBookByName('Машина времени');
console.log('Выдана книга:', issuedBook ? issuedBook.name : null);
console.log('Количество книг после выдачи:', library.books.length);

if (issuedBook) {
  issuedBook.state = 20;
  console.log('Состояние выданной книги после повреждения:', issuedBook.state);

  issuedBook.fix();
  console.log('Состояние после починки:', issuedBook.state);

  library.addBook(issuedBook);
  console.log('Попытка добавить обратно: состояние книги', issuedBook.state);
  
  const isBackInLibrary = library.findBookBy('name', 'Машина времени') !== null;
  console.log('Книга вернулась в библиотеку?', isBackInLibrary); 
}

if (issuedBook && issuedBook.state <= 30) {
  issuedBook.state = 31;
  library.addBook(issuedBook);
  const check = library.findBookBy('name', 'Машина времени');
  console.log('Теперь книга точно в библиотеке:', check ? check.name : null);
  console.log('Итоговое количество книг:', library.books.length);
}

// задача 3
