var express = require('express');
var router = express.Router();
var getUserData = require('../controllers/getUserData')

router.get('/:schoolNumber', getUserData.getUserData);



module.exports = router;
