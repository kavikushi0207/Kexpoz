const router = require('express').Router()
const productController = require('../controllers/productController')
const auth = require('../middleware/authorization')
const authAdmin = require('../middleware/authAdmin')

router.route('/product')
    .get(productController.getProducts)
    .post(auth,authAdmin,productController.createProduct)

router.route('/product/:id')
    .delete(auth,authAdmin,productController.deleteProduct)
    .put(auth,authAdmin,productController.updateProduct)

module.exports = router