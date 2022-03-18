const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');

//Format Time
const moment = require('moment');

//Connect db
db.connect();

//Middleware Form data
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

//HTTP protocol
app.use(methodOverride('_method'));

// Static Path
app.use(express.static(path.join(__dirname, 'public')));

//HTTP Logger
app.use(morgan('combined'));

//Templates Engine
app.engine('hbs', handlebars.engine({
     extname: '.hbs',
     // Created Function Handlers Templates Engine
     helpers: {
        sum: (a,b) => a + b,
        formatDate: (date) => moment(date).format('DD-MM-YYYY , HH:mm:ss A'),
    },
    }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
routes(app);

//Create Web Sever
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
