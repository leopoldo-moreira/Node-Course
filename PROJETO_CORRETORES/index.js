const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const { cpf } = require('cpf-cnpj-validator');
const port = 3000;
const pool = require('./db/conn');

const app = express();

//configurando o modulo session

app.use(
  session({
    secret: 'mySuperSecretKey123',
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (!req.session.message) {
    req.session.message = null;
  }
  next();
});

// HTML Body into JSON Object
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Setting Partials
const hbs = exphbs.create({
  partialsDir: ['views/partials'],
});

// Setting handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setting assets
app.use(express.static('public'));

//Update Dates in DB

app.post('/broker/updatebroker', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const cpf = req.body.cpf;
  const creci = req.body.creci;

  const sql = 'UPDATE corretores SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
  const data = ['name', name, 'cpf', cpf, 'creci', creci, 'id', id];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    req.session.message = {
      type: 'greenMsg',
      content: 'Corretor alterado com sucesso!'
    };

    res.redirect('/');
  });
});

// to edit data
app.get('/broker/edit/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM corretores WHERE ?? = ?';
  const data = ['id', id];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const dbData = data[0];

    req.session.edit = {
      id: dbData.id,
      name: dbData.name,
      cpf: dbData.cpf,
      creci: dbData.creci,
    };

    res.redirect('/');
  });
});

// remove data
app.get('/broker/remove/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM corretores WHERE ?? = ?';
  const data = ['id', id];

  pool.query(sql, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    req.session.message = {
      type: 'redMsg',
      content: 'Corretor excluido!',
    };

    res.redirect('/');
  });
});

// Insert Data in DB
app.post('/brokers/newbroker', (req, res) => {
  const name = req.body.name;
  const cpf = req.body.cpf;
  const creci = req.body.creci;

  const sql = 'INSERT INTO corretores (??, ??, ??) VALUES (?, ?, ?)';
  const data = ['name', 'cpf', 'creci', name, cpf, creci];

  pool.query(sql, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    req.session.message = {
      type: 'greenMsg',
      content: 'Corretor cadastrado com sucesso!',
    };

    res.redirect('/');
  });
});

// Render home
app.get('/', (req, res) => {
  let toEdit;
  let message;

  // Caso seja um Edit Mode
  if (req.session.edit) {
    toEdit = req.session.edit;
    req.session.edit = null;
  }

  if (req.session.message) {
    message = req.session.message;
    req.session.messsage = null;
  }

  const sql = 'SELECT * FROM corretores';

  pool.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const corretores = data;

    if (toEdit) {
      const url = '/broker/updatebroker';
      res.render('home', { corretores, toEdit, url });
    } else {
      const url = '/brokers/newbroker';
      res.render('home', { corretores, message, url });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});