var express = require('express');
var router = express.Router();
var deleteClass = require('../controllers/deleteClass')

router.delete('/:id', deleteClass.deleteClass);


module.exports = router;
