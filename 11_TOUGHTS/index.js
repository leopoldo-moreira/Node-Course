const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const flash = require('express-flash');
const port = 3000;
const app = express();
const conn = require('./db/conn');


app.get('/', (req,res) => {
    res.send('ola mundo!'); 
})

// iniciando o servidor
conn
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        })
    })
    .catch((err) => console.log(err));