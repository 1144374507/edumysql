var express = require('express');
var router = express.Router();
var addClass = require('../controllers/addClass')
var getStudents = require('../controllers/getStudents')
var getTeachers = require('../controllers/getTeachers')
var createSchedule = require('../controllers/createSchedule')
 

router.post('/', addClass.addClass);
router.post('/addStudents', addClass.addStudents);
router.post('/addTeachers', addClass.addTeachers);
router.get('/getStudents/', getStudents.getStudents);
router.get('/getStudents2/', getStudents.getStudents2);
router.get('/getTeachers/', getTeachers.getTeachers);
router.get('/getTeachers2/', getTeachers.getTeachers2);
router.post('/createSchedule', createSchedule.createSchedule);

module.exports = router;
