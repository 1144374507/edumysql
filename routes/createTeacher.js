var express = require('express');
var router = express.Router();
var createTeacher = require('../controllers/createTeacher')
 

router.post('/base/', createTeacher.createTeacher);
router.post('/other/', createTeacher.createTeacherOther);
router.get('/getBufferSchoolNumber/', createTeacher.getBufferSchoolNumber);
module.exports = router;
