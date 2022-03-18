const Product = require('../model/Products');
const { mongooseToObjects} = require('../../util/mongoose');
const { mutipleMongooesToObjects} = require('../../util/mongoose');


class ShopController {

    //[GET] /product/create
    create(req, res, next) {
        res.render('product/create');
    }
    //[GET] /product/:slug
    show(req, res,next) {
        Product.findOne({slug: req.params.slug})
        .then(product =>{
            res.render('product/detail',{ product:mongooseToObjects(product) })
        })
        .catch(next);
    }
    //[POST] /product/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = req.file.filename;
        const product = new Product(formData);
        product.save()
        .then(()=>{
            res.redirect('/')
        })
        .catch(()=>{
            res.status(500).send({ error: 'Error' })
        });
    }
    //[GET] /product/list
    list(req, res, next) {
        Product.find({})
        .then(product => {
            res.render('product/list',{
                product: mutipleMongooesToObjects(product)
            });
        })
        .catch(next);
    }
    //[GET] /product/edit/:_id
    edit(req, res, next) {
        Product.findById(req.params.id)
        .then(product => {
            res.render('product/edit',{product : mongooseToObjects(product)});
        })
    }
    //[PUT] /product/:id
    update(req, res, next) {
        const formData = req.body;
        formData.image = req.file.filename;
        Product.updateOne({id:req.params.id},formData)
        .then(() => {
            res.redirect('/product/list');
        })
        .catch(next);
    }
}


module.exports = new ShopController();
