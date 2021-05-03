var express = require('express');
var router = express.Router();
var getMark =require('../controllers/getMark')
var updataMark =require('../controllers/updataMark')
var deleteMark =require('../controllers/deleteMark')
 
// router.get('/:schoolNumber', getMark.getMark); 
router.get('/', getMark.getMark2); 
router.post('/updataMark/', updataMark.updataMark);
router.delete('/deleteMark/', deleteMark.deleteMark);

module.exports = router;
