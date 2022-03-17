const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const port = 3000;

// Static Path
app.use(express.static(path.join(__dirname,"public")));

//HTTP Logger
app.use(morgan("combined"));

//Templates Engine
app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});