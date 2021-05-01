var dbConfig = require('../util/dbconfig1');

// 添加班级
let addClass = async (req, res) => {

  // let sql = 'insert into classes set ?';
  let sql = `insert into classes(id,grades,classes,monitor) values(?,?,?,?)`;

  let { id,
    grades,
    classes,
    monitor } = req.body;
  let data =
    [id,
      grades,
      classes,
      monitor
    ]
  // console.log(data);
  dbConfig.base(sql, data, (results) => {
    if (results.protocol41) {
      res.send({
        code: 200,
        success: true,
        msg: '添加成功'
      })

      ////为班级添加学生
      let sql1 = `insert into classmenbel(names,schoolNumber,sex,pid,classes,cid) values ?`;
      let { classmenbel
      } = req.body;
      let data1 = classmenbel
      if (data1.length > 0) {
        dbConfig.base(sql1, [data1], (results) => {
          console.log(results);
        })

      }
      console.log(data1, 'data1');
      // 为班级添加 老师
      let sql2 = `insert into teacherMessage(tel,names,schoolNumber,sex,courseName,office,pid) values ?`;
      let { teacherMessage
      } = req.body;
      let data2 = teacherMessage
      console.log(data2, 'data1');
      if (data2.length > 0) {

        dbConfig.base(sql2, [data2], (results) => {
          console.log(results);
        })
      }

    } else {
      res.send({
        code: 505,
        success: false,
        msg: '添加失败'
      })
    }

  })
}

let addStudents = async (req, res) => {

  let sql1 = `insert into classmenbel(tel,names,schoolNumber,sex,pid,classes,cid) values ?`;
  let { classmenbel
  } = req.body;
  let data1 = classmenbel
  if (data1.length > 0) {
    dbConfig.base(sql1, [data1], (results) => {
      if (results.protocol41) {
        res.send({
          code: 200,
          success: true,
          msg: '添加成功'
        })
      } else {
        res.send({
          success: false,
          msg: '添加失败'
        })
      }
    })

  }
}

let addTeachers = async (req, res) => {

  let sql2 = `insert into teacherMessage(tel,names,schoolNumber,sex,courseName,office,pid,classes,cid) values ?`;
  let { teacherMessage
  } = req.body;
  let data2 = teacherMessage

  if (data2.length > 0) {
    dbConfig.base(sql2, [data2], (results) => {
      if (results.protocol41) {
        res.send({
          code: 200,
          success: true,
          msg: '添加成功'
        })
      } else {
        res.send({
          success: false,
          msg: '添加失败'
        })
      }
    })

  }
}


module.exports = {
  addClass,
  addStudents,
  addTeachers
};