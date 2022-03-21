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
        const formData = {...req.body};
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

        Promise.all([ Product.find({}),Product.countDocumentsDeleted()])
        .then(([product,countDeleted])=>{
            res.render('product/list',{
                countDeleted,
                product: mutipleMongooesToObjects(product)
            });
        });
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
        const formData = {...req.body};
        formData.image = req.file.filename;
        Product.updateOne({_id:req.params.id},formData)
        .then(() => {
            res.redirect('/product/list');
        })
        .catch(next);
    }
    //[PUT] /product/:id
    destroy(req, res, next) {
        Product.delete({_id:req.params.id})
        .then(()=>{
            res.redirect('back');
        })
        .catch(next);
    }
    //[GET] /product/trash
    trash(req, res, next) {
        Product.findDeleted({})
        .then(product => {
            res.render('product/trash',{
                product: mutipleMongooesToObjects(product)
            });
        })
        .catch(next);
    }
    //[PATCH] /product/restore/:id
    restore(req, res, next) {
        Product.restore({_id:req.params.id})
        .then(()=>{
            res.redirect('back');
        })
        .catch(next);
    }
    //[DELETE] /product/force/:id
    forceDestroy(req, res, next) {
        Product.deleteOne({_id:req.params.id})
        .then(()=>{
            res.redirect('back');
        })
        .catch(next);
    }
    //[POST] /product/handle-form-actions
    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Product.delete({_id : { $in : req.body.productsId}})
                .then(()=>{
                    res.redirect('back');
                })
                .catch(next);
                break;
            default:
                res.send(404);
                break;

        }
    }
    //[POST] /product/trash/handle-actions
    handleActions(req, res, next){
        switch(req.body.action) {
             case 'destroy':
                Product.deleteOne({_id : { $in : req.body.productsId}})
                .then(()=>{
                    res.redirect('back');
                })
                .catch(next);
                break;
            case 'restore':
                Product.restore({_id:{ $in : req.body.productsId}})
                .then(()=>{
                    res.redirect('back');
                })
                .catch(next);
                break;
            default:
                res.send(404);
                break;

        }
    }
}


module.exports = new ShopController();
