const shopRouter = require('./shop');
const siteRouter = require('./site');

function routes(app) {
    app.use('/product', shopRouter);
    app.use('/', siteRouter);
}
module.exports = routes;
