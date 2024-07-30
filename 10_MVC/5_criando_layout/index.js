const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');
const port = 3000;

//models import
const Task = require('./models/Task');

//Routes
const taskRoutes = require('./routes/tasksRoutes');

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

//middleware para toda vez que houver /tasks na url
app.use('/tasks', taskRoutes);

// iniciando o servidor
conn
  .sync()
  //.sync({ force: true }) //reseta toda a tabela, perdendo os dados ja gravados.
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
