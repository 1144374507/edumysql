var express = require('express');
var router = express.Router();
var getPid =require('../controllers/getPid')
router.get('/', getPid.getPid); 

module.exports = router;
