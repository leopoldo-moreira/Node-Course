const express = require('express');
const exphbs = require('express-handlebars');
const port = 3000;
const conn = require('./db/conn');
const User = require('./models/User');

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

// configurando os assets
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/user/create', (req, res) => {
  res.render('adduser');
});

app.post('/user/create/', async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === 'on') {
    newsletter = true;
  } else {
    newsletter = false;
  }

  console.log(req.body);
  await User.create({ name, occupation, newsletter });


  res.redirect('/');
});

// Cria as tabelas e roda o app
conn
  .sync() //sync responsavel por criar as tabelas
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
