var express = require('express');
var router = express.Router();
var createStudent = require('../controllers/createStudent')
 

router.post('/base/', createStudent.createStudent);
router.post('/chat/', createStudent.createStudentChat);
router.post('/base/updata', createStudent.updataStudentChat);
router.post('/other/', createStudent.createStudentOther);
router.get('/getBufferSchoolNumber/', createStudent.getBufferSchoolNumber);
module.exports = router;
