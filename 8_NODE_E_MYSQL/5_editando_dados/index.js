const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const port = 3000;

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

//Editar dados do DB - 1º Passo
app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    res.render('editbook', { book });
  });
});

// resgatando dados gerais do DB
app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';

  conn.query(sql, (err, data) => {
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
  const sql = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
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

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`;

  conn.query(sql, (err) => {
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

// configurando conexao com o DB
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
});

// tentativa de conectar ao DB
conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Conectado ao MySQL!');

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
