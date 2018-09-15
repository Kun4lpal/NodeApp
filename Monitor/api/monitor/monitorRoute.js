var router = require('express').Router();
var monitorController = require('./monitorController');

router.get('/',monitorController.get);

module.exports = router;