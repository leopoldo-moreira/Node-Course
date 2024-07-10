const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const port = 3000;
const pool = require('./db/conn');

const app = express();

// tornando o BODY HTML em um objeto JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// configurando o handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
('');
// configurando os assets
app.use(express.static('public'));

//Removendo dados no db
app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM books WHERE ?? = ?`;
  const data = ['id', id];

  pool.query(sql, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
  });
});

//Atualizando Dados no DB
app.post('/books/updatebook', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
  const data = ['title', title, 'pageqty', pageqty, 'id', id];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
  });
});

//Recebendo dados do DB para editar
app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    res.render('editbook', { book });
  });
});

// resgatando todos os dados do DB
app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;
    res.render('books', { books });
  });
});

// resgatando dados especifico do DB
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const selectedBook = data[0];
    res.render('book', { selectedBook });
  });
});

//inserindo dados no DB
app.post('/books/insertbook', (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const data = ['title', 'pageqty', title, pageqty];

  pool.query(sql, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/');
  });
});

// renderizando a home
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
