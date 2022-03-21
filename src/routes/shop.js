const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');

const shopController = require('../app/controllers/ShopController');

// Add Image From By Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,appRoot + '/src/public/images/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });


router.get('/create', shopController.create);
router.get('/list', shopController.list);
router.post('/handle-form-actions', shopController.handleFormAction);
router.get('/trash', shopController.trash);
router.post('/trash/handle-actions', shopController.handleActions);
router.patch('/restore/:id', shopController.restore);
router.put('/update/:id',upload.single('image_input'),shopController.update);
router.get('/edit/:id', shopController.edit);
router.delete('/:id', shopController.destroy);
router.delete('/force/:id', shopController.forceDestroy);
router.post('/store',upload.single('image_input'), shopController.store);
router.get('/:slug', shopController.show);


module.exports = router;
