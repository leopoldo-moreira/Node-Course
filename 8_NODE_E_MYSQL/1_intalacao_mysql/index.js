const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const port = 3000;

const app = express();

// configurando o handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// configurando os assets
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

// configurando conexao com o DB
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

// tentativa de conectar ao DB
conn.connect((err) => {

    if(err) {
        console.log(err);
        return;
    }

    console.log('Conectado ao MySQL!');

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
