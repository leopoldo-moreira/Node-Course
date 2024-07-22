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

// Cria as tabelas e roda o app
conn
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
