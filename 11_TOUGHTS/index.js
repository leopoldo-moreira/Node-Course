const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const flash = require('express-flash');
const port = 3000;
const app = express();
const conn = require('./db/conn');

// Models
const Tought = require('./models/Tought');
const User = require('./models/User');

// Import Routes
const toughtsRoutes = require('./routes/ToughtsRoutes');
const authRoutes = require('./routes/authRoutes');

// Import Controller
const ToughtController = require('./controllers/ToughtController');

// template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')

// receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

// session middleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new fileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
);


// flash messages
app.use(flash());

// public path
app.use(express.static('public'));

// set session to res
app.use((req, res, next) => {

    if(req.session && req.session.userid) {
        res.locals.session = req.session;
    }

    next();
})

//Routes
app.use('/toughts',toughtsRoutes)
app.use('/', authRoutes);
app.get('/', ToughtController.showToughts);


// iniciando o servidor
conn
    .sync()
    //.sync({ force: true }) //- reseta o banco de dados Dados sao perdidos
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        })
    })
    .catch((err) => console.log(err));