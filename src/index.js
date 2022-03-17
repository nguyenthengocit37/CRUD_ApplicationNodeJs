const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const port = 3000;
const routes = require('./resources/routes');

//Middleware Form data
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Static Path
app.use(express.static(path.join(__dirname, 'public')));

//HTTP Logger
app.use(morgan('combined'));

//Templates Engine
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
          app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
routes(app);

//Create Web Sever
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
