var dbConfig = require('../util/dbconfig1');
var dbConfig2 = require('../util/dbconfig');




// 创建学生
let createStudent = async (req, res) => {

  //查询学生
  var sql1 = 'select * from students';
  var sqlArr1 = [];
  var callBack = (err, resoult) => {
    if (err) {
      res.send({
        success: false,
        msg: '查询学生失败'
      })
    } else {
      let sql = `insert into students(name,englishName,sex,height,weight,schoolNumber,idCardNum ) values(?,?,?,?,?,?,?)`;
      let {
        name, englishName, sex, height, weight, schoolNumber, idCardNum
      } = req.body;
      let data =
        [
          name, englishName, sex, height, weight, schoolNumber, idCardNum
        ]
      let flog = false
      resoult.map(item => {
        if (item.schoolNumber == schoolNumber) {
          res.send({
            success: false,
            msg: `检查学号：${schoolNumber}是否重复！`
          })
          flog = true
          return
        }

      })
      if (!flog) {
        dbConfig.base(sql, data, (results) => {
          if (results.protocol41) {




            // 缓存学号
            let sqlx = `insert into buffer(schoolNumber ) values(?)`;
            let datax =
              [
                schoolNumber
              ]
            dbConfig.base(sqlx, datax, (results) => {

              // 清除其他缓存学号
              let sqls = `delete  from buffer where schoolNumber!=?`;
              dbConfig.base(sqls, datax, (results) => { })
            })

            res.send({
              code: 200,
              success: true,
              msg: '添加成功'
            })
          } else {
            res.send({
              code: 505,
              success: false,
              msg: '添加失败'
            })
          }

        })
      }
    }

  }
  dbConfig2.sqlConnect(sql1, sqlArr1, callBack);

}

// 添加学生的入学信息
let createStudentChat = async (req, res) => {
  // console.log(req.body, 'req.body');
  let {
    admissionData, admissionGrade, grades, overseas, schoolNumber
  } = req.body;
  let sql = 'update students set admissionData= ?,admissionGrade= ?,grades= ?,overseas= ? where schoolNumber= ?'
  let data =
    [
      admissionData, admissionGrade, grades, overseas, schoolNumber
    ]
  dbConfig.base(sql, data, (results) => {
    if (results.protocol41) {
      res.send({
        code: 200,
        success: true,
        msg: '操作成功'
      })
    } else {
      res.send({
        code: 505,
        success: false,
        msg: '操作失败'
      })
    }

  })
}
// 添加学生的联系方式
let createStudentOther = async (req, res) => {
  // console.log(req.body, 'req.body');
  let {
    qq,
    tel,
    email,
    postcode,
    schoolNumber,
  } = req.body;
  let sql = 'update students set qq= ?,tel= ?,email= ?,postcode= ? where schoolNumber= ?'
  let data =
    [
      qq,
      tel,
      email,
      postcode,
      schoolNumber
    ]
  dbConfig.base(sql, data, (results) => {
    if (results.protocol41) {
      res.send({
        code: 200,
        success: true,
        msg: '操作成功'
      })
    } else {
      res.send({
        code: 505,
        success: false,
        msg: '操作失败'
      })
    }

  })
}

let getBufferSchoolNumber = (req, res) => {
  let sql = 'select * from buffer'
  let sqlArr = []
  let callback = (err, data) => {
    if (err) {
      res.send({
        msg: '获取失败'
      })
    } else {

      res.send({
        'list': data
      })
    }
  }
  dbConfig2.sqlConnect(sql, sqlArr, callback);

}

// 更新学生的入学信息
let updataStudentChat = async (req, res) => {

  let {
    name, englishName, sex, height, weight, schoolNumber, idCardNum
  } = req.body;
  let data =
    [
      name, englishName, sex, height, weight, idCardNum,schoolNumber
    ]
 
  let sql = 'update students set name= ?,englishName= ?,sex= ?,height= ? ,weight= ?,idCardNum= ? where schoolNumber= ?'

  dbConfig.base(sql, data, (results) => {
    if (results.protocol41) {
      res.send({
        code: 200,
        success: true,
        msg: '修改成功'
      })
    } else {
      res.send({
        code: 505,
        success: false,
        msg: '修改失败'
      })
    }

  })
}


module.exports = {
  createStudent,
  createStudentChat,
  createStudentOther,
  getBufferSchoolNumber,
  updataStudentChat
};