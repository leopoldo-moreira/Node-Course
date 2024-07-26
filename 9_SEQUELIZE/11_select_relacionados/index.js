const express = require('express');
const exphbs = require('express-handlebars');
const port = 3000;
const conn = require('./db/conn');
const User = require('./models/User');
const Address = require('./models/Address');

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

//Insert Data in a Relational Base
app.post('/address/create', async (req, res) => {
  
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const address = {
    street,
    number,
    city,
    UserId
  };

  await Address.create(address);

  res.redirect(`/users/edit/${UserId}`);
  
})

//update
app.post('/users/update', async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === 'ON') {
    newsletter = true;
  } else {
    newsletter = false;
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  };

  await User.update(userData, { where: { id: id } });
  res.redirect('/');
});

//Edit
app.get('/users/edit/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ include: Address, where: { id: id } });
  res.render('useredit', { user: user.get({ plain: true }) });
});

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
  .sync()
  //.sync({ force: true }) //reseta toda a tabela, perdendo os dados ja gravados.
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
