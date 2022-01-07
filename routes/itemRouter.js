const router = require('express').Router()
const itemController = require('../controllers/itemController')

router.route('/items')
    .get(itemController.getItems)
    .post(itemController.createItems)

router.route('/items/:id')
    .delete(itemController.deleteItems)
    .put(itemController.updateItems)


module.exports = router