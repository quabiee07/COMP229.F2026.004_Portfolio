var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index_controller');

router.get('/', indexController.home)

module.exports = router;