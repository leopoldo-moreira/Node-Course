const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const users = require('./users/index.js');
const products = require('./products/index.js');

const basePath = path.join(__dirname, 'templates');

app.use(express.static('public'));

app.use('/users', users);
app.use('/products', products);

app.get('/', (req, res) => {
    res
    .status(200)
    .sendFile(`${basePath}/index.html`);
});

app.use((req, res, next) => {
    res.status(404).sendFile(`${basePath}/404.html`);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});