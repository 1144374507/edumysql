var express = require('express');
var router = express.Router();
var addClass = require('../controllers/addClass')
var getStudents = require('../controllers/getStudents')
var getTeachers = require('../controllers/getTeachers')

router.post('/', addClass.addClass);
router.post('/addStudents', addClass.addStudents);
router.get('/getStudents/', getStudents.getStudents);
router.get('/getTeachers/', getTeachers.getTeachers);
module.exports = router;
