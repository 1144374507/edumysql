var dbConfig = require('../util/dbconfig1');
let dbConfig2 = require('../util/dbconfig');

// 添加班级
let addClass = async (req, res) => {

  // let sql = 'insert into classes set ?';
  let sql = `insert into classes(id,grades,classes,monitor) values(?,?,?,?)`;

  let { id,
    grades,
    classes,
    monitor } = req.body;
  let data3 =
    [id,
      grades,
      classes,
      monitor
    ]
  let arr = []
  // console.log(data);
  // 检查是否重复
  dbConfig2.sqlConnect(`select * from classes`, arr, (err, data) => {
    if (!err) {
      let flog = true
      for (let item of data) {
        // console.log(item, 'item');
        if (item.grades == grades && item.classes == classes) {
          flog = false
          // console.log(flog, 'flog1');

          res.send({
            code: 400,
            success: false,
            msg: '班级已存在，请确认是否正确'
          })
          break
        }
      }

      // console.log(flog, 'flog');
      if (flog) {
        dbConfig.base(sql, data3, (results) => {
          if (results.protocol41) {

            res.send({
              code: 200,
              success: true,
              msg: '添加成功'
            })

            // ////为班级添加学生
            // let sql1 = `insert into classmenbel(names,schoolNumber,sex,pid,classes,cid,grades) values ?`;
            // let { classmenbel
            // } = req.body;
            // let data1 = classmenbel

            // 查询某年级里是否存在此人
            // dbConfig2.sqlConnect(`select * from classmenbel where grades = ?`, [grades], (err, data) => {
            //   console.log(err);
            //   if (!err) {
            //     let isBreak = false
            //     for (let i of data) {
            //       console.log(data, 'data');
            //       for (let j of data1) {
            //         console.log(i.schoolNumber == j[1], '====');
            //         if (i.schoolNumber == j[1]) {
            //           res.send({
            //             code: 400,
            //             success: false,
            //             msg: `无法添加${j[0]}，在${grades}已存在，学号为${j[1]}的学生。`
            //           })
            //           isBreak = true
            //           break
            //         }
            //       }
            //       if (isBreak) {
            //         break
            //       }
            //     }
            //   } else {
            //     if (data1.length > 0) {
            //       dbConfig.base(sql1, [data1], (results) => {
            //         data1.map(item => {
            //           // 为students 添加 classes 信息
            //           dbConfig.base(`update students set classes=? where schoolNumber=${item[1]}`, [item[4]], (results) => {
            //             res.send({
            //               code: 200,
            //               success: true,
            //               msg: '添加成功'
            //             })
            //           })
            //         })
            //       })

            //     }
            //   }
            // })


            // // 为班级添加 老师
            // let sql2 = `insert into teacherMessage(tel,names,schoolNumber,sex,courseName,office,pid,classes,cid) values ?`;
            // let { teacherMessage
            // } = req.body;
            // let data2 = teacherMessage
            // if (data2.length > 0) {

            //   dbConfig.base(sql2, [data2], (results) => {
            //   })
            // }

          } else {
            res.send({
              code: 505,
              success: false,
              msg: '添加失败'
            })
          }

        })
      }
    } else {
      res.send({
        code: 400,
        success: false,
        msg: '请检查网络连接'
      })

    }
  })

}

let addStudents = async (req, res) => {


  let sql1 = `insert into classmenbel(tel,names,schoolNumber,sex,pid,classes,cid,grades) values ?`;
  let { classmenbel
  } = req.body;
  let data1 = classmenbel
  console.log(data1[0][7]);
  // 查询某年级里是否存在此人
  dbConfig2.sqlConnect(`select * from classmenbel where grades = ?`, [data1[0][7]], (err, data) => {
    console.log(err);
    if (!err) {
      let isBreak = false
      for (let i of data) {
        console.log(data, 'data');
        for (let j of data1) {
          console.log(i.schoolNumber == j[2], '====');
          if (i.schoolNumber == j[2]) {
            res.send({
              code: 400,
              success: false,
              msg: `无法添加${j[1]}，在${data1[0][7]}已存在，学号为${j[0]}的学生。`
            })
            isBreak = true
            break
          }  
        }
        if (isBreak) {
          break
        }
      }
      if (!isBreak) {
        if (data1.length > 0) {
          dbConfig.base(sql1, [data1], (results) => {
            data1.map(item => {
              // 为students 添加 classes 信息
              dbConfig.base(`update students set classes=? where schoolNumber=${item[2]}`, [item[5]], (results) => {
                res.send({
                  code: 200,
                  success: true,
                  msg: '添加学生成功'
                })
              })
            })
          })
        }
      }
    } else {
      res.send({
        code: 400,
        success: false,
        msg: '检查网络连接'
      })
    }
  })

  // if (data1.length > 0) {
  //   dbConfig.base(sql1, [data1], (results) => {
  //     if (results.protocol41) {
  //       res.send({
  //         code: 200,
  //         success: true,
  //         msg: '添加成功'
  //       })
  //     } else {
  //       res.send({
  //         success: false,
  //         msg: '添加失败'
  //       })
  //     }
  //   })
  // }
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
          msg: '添加老师成功'
        })
      } else {
        res.send({
          success: false,
          msg: '添加老师失败'
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