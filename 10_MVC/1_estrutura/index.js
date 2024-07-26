const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');
const port = 3000;

const app = express();

//Tornando o BODY HTML em um objeto JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//configurando o handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//configurando os assets
app.use(express.static('public'));

// iniciando o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




