const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

app.get('/', (req, res) => {

    const user = {
        name: 'Leopoldo',
        surname: 'Moreira',
        age: 32
    };

    const words = 'This is a test words.';
    const auth = true;

    res.render('home', { user: user, words, auth});

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});