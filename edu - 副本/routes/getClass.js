var express = require('express');
var router = express.Router();
var classes =require('../controllers/getClass')
var deleteClass =require('../controllers/deleteClass')

router.get('/', classes.getClass);
router.delete('/deleteClass/:id', deleteClass.deleteClass);
router.delete('/deleteClass/deleteStudent/:cid', deleteClass.deleteStudent);



module.exports = router;
