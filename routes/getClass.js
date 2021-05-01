var express = require('express');
var router = express.Router();
var classes =require('../controllers/getClass')
var deleteClass =require('../controllers/deleteClass')
var getSchedule =require('../controllers/getSchedule')
var updataSchedule =require('../controllers/updataSchedule')

router.get('/', classes.getClass);
router.get('/:grades', classes.getSearchGrade);
router.get('/getSchedule/:pid', getSchedule.getSchedule);
router.post('/updataSchedule/', updataSchedule.updataSchedule);
router.delete('/deleteClass/:id', deleteClass.deleteClass);
router.delete('/deleteClass/deleteStudent/:cid', deleteClass.deleteStudent);
router.delete('/deleteClass/deleteStudent2/:schoolNumber', deleteClass.deleteStudent2);
router.delete('/deleteClass/deleteTeacher/:cid', deleteClass.deleteTeacher);



module.exports = router;
