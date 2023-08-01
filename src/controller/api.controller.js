const connection = require('../lib/database');
const fs = require('node:fs/promises');
const path = require('node:path');
const controller = {};

// GET /api/books
controller.getAllBooks = (req, res) => {
  connection.query('SELECT * FROM books')
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      throw err;
    });
};

// GET /api/books/:saga
controller.getBooksBySaga = (req, res) => {
  const saga = req.params.saga.split('-').join(' ');
  connection.query('SELECT * FROM books WHERE saga = ?', [saga])
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      throw err;
    });
};

// GET /api/buy
controller.getAllBuyUrl = (req, res) => {
  connection.query('SELECT * FROM shopsUrl')
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      throw err;
    });
};

// GET /api/buy/:isbn
controller.getUrlByIsbn = (req, res) => {
  connection.query('SELECT * FROM shopsUrl WHERE ISBN = ?', req.params.isbn)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      throw err;
    });
};

// POST /api/books (create book)
controller.postBook = async (req, res) => {
  const { ISBN, name, publicationDate, saga, planet, pages, shortNovel, urlImage } = req.body;

  if (!ISBN || !name || !publicationDate || !saga || !planet || !pages || shortNovel === undefined || !urlImage || ISBN.length > 17) return res.status(400).json({ error: 'Bad Request' });

  const regularExpression = /^\d{4}-\d{2}-\d{2}$/;

  if (!regularExpression.test(publicationDate)) return res.status(400).json({ error: 'Bad Request (publication date format not valid)' });
  if (isNaN(Number(pages)) || Number(pages) <= 0) return res.status(400).json({ error: 'Bad Request (pages not valid)' });
  const newPages = Number(pages);

  if (typeof shortNovel !== 'boolean') return res.status(400).json({ error: 'Bad Request (shorNovel not valid)' });

  // Comprobamos que ISBN es unico
  const test = await connection.query('SELECT ISBN FROM books WHERE ISBN = ?', [ISBN]);
  if (test.length > 0) return res.status(400).json({ error: 'Bad Request (ISBN exist)' });

  // Descargamos la imagen y cambiamos url
  const response = await fetch(urlImage);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(`./src/public/img/${ISBN}${path.extname(urlImage)}`, buffer);

  let url;
  try {
    url = `./img/${ISBN}${path.extname(urlImage)}`;
  } catch {
    return res.status(400).json({ error: 'Bad Request (url not valid)' });
  }

  // Realizamos la query
  try {
    await connection.query('INSERT INTO books VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
      ISBN,
      name,
      publicationDate,
      saga,
      planet,
      newPages,
      shortNovel,
      url
    ]);
    res.json({
      ISBN,
      name,
      publicationDate,
      saga,
      planet,
      newPages,
      shortNovel,
      url
    });
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

// POST /api/buy
controller.postUrlBuy = async (req, res) => {
  const { ISBN, urlBuy, shop } = req.body;

  if (!ISBN || ISBN.length > 17 || !urlBuy || !shop) return req.status(400).json({ error: 'Bad Request' });

  // Comprobamos que el ISBN existe
  const test = await connection.query('SELECT ISBN FROM books WHERE ISBN = ?', [ISBN]);
  if (test.length === 0) return res.status(400).json({ error: 'Bad Request (ISBN not exist)' });

  // Realizamos la query
  try {
    await connection.query('INSERT INTO shopsUrl (ISBN, urlBuy, shop) VALUES (?, ?, ?)', [
      ISBN,
      urlBuy,
      shop
    ]);
    res.json({
      ISBN,
      urlBuy,
      shop
    });
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = controller;
