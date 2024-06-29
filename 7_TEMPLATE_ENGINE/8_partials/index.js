const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;

// habilita a utilização de partials
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get('/blog', (req, res) => {

  const posts = [
    {
      title: "Aprender Node.js",
      category: "Node.js",
      body: "Node.js é muito utilizado na programação hoje em dia",
      comments: 4,
    },
    {
      title: "PHP ainda vale a pena?",
      category: "PHP",
      body: "",
      comments: 12,
    },
    {
      title: "Os segredos de JavaScript",
      category: "JavaScript",
      body: "",
      comments: 5,
    },
  ];

  res.render('blog', { posts });

});

app.get("/blogpost", (req, res) => {
  const post = {
    title: "Aprenda Node.js",
    category: "JavaScript",
    content: "Nesse post voce vai aprender as bases do node.js...",
    comments: 4,
  };

  res.render("post", { post });
});

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", { items });
});

app.get("/", (req, res) => {
  const user = {
    name: "Leopoldo",
    surname: "Moreira",
    age: 32,
  };

  const words = "This is a test words.";
  const auth = false;
  const approved = false;

  res.render("home", { user: user, words, auth, approved });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
