class ShopController{

    //[GET] /shop

    index(req, res) {
        res.send('shop');
    }
    show(req, res) {
        res.send("hiii");
    }

}
module.exports = new ShopController;