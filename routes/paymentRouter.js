const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const auth = require('../middleware/authorization')
const authAdmin = require('../middleware/authAdmin')


router.route('/payment')
    .get(auth, authAdmin, paymentController.getPayments)
    .post(auth, paymentController.createPayment)


module.exports = router
