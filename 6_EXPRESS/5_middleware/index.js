const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const basePath = path.join(__dirname, 'templates');


const checkAuth = (req, res, next) => {

    req.authStatus = false;

    if (req.authStatus) {
        console.log('Está logado, pode continuar.');
        next();
    } else {
        console.log('Não está logado, faça o login para continuar.');
    }
};

app.use(checkAuth);

app.get('/', (req, res) => {    
    res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

