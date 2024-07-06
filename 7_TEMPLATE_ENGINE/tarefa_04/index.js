const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;

// habilita o uso de partials
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

// configurando handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// habilita usar css
app.use(express.static('public'));


// lista de produtos

const products = [
    {
        productName: "Monitor",
        productPrice: "R$800,00",
        productDescription: "Um monitor gamer de última geração",
        productLink: "/monitor"
    },
    {
        productName: "Teclado",
        productPrice: "R$250,00",
        productDescription: "Teclado mecânico",
        productLink: "/teclado"
    },
    {
        productName: "Mouse",
        productPrice: "R$125,00",
        productDescription: "Mouse 120 DPI",
        productLink: "/mouse"
    }
]

app.get('/monitor', (req, res) => {
    res.render('monitor');
});

app.get('/teclado', (req, res) => {
    res.render('teclado');
});

app.get('/mouse', (req, res) => {
    res.render('mouse');
});

app.get('/', (req, res) => {
    res.render('home' , { products });
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});