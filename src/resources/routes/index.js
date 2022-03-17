const newRouter = require('./shop');
const siteRouter = require('./site');

function routes(app) {
    app.use('/shop', newRouter);
    app.use('/', siteRouter);
}
module.exports = routes;
