var express = require('express');
var router = express.Router();
var updataPassWord =require('../controllers/updataPassWord')

router.post('/', updataPassWord.updataPassWord);



module.exports = router;
