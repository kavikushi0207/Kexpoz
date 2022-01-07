const router = require('express').Router()
const countryController = require('../controllers/countryController')

router.route('/countries')
    .get(countryController.getCountries)
    .post(countryController.createCountries)

router.route('/countries/:id')
    .delete(countryController.deleteCountries)
    .put(countryController.updateCountries)


module.exports = router