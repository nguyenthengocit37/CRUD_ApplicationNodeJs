const Product = require('../model/Products');
const { mutipleMongooesToObjects} = require('../../util/mongoose');

class SiteController {
    //[GET] /shop

    index(req, res,next) {
          Product.find({})
          .then(product => {res.render('home',{
              product: mutipleMongooesToObjects(product)
            });
            })
          .catch(next);
    }
    show(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();
