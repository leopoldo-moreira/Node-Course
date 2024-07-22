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

//Delete of CRUD
app.post('/users/delete/:id', async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.redirect('/');
});

//Read of CRUD
app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });

  res.render('userview', { user });
});

// Create of CRUD
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

//Render Add User Page
app.get('/user/create', (req, res) => {
  res.render('adduser');
});

// Render Home Page and Read all Datas
app.get('/', async (req, res) => {
  const users = await User.findAll({ raw: true });
  console.log(users);
  res.render('home', { users: users });
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
