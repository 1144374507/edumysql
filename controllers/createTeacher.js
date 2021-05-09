var dbConfig = require('../util/dbconfig1');
var dbConfig2 = require('../util/dbconfig');




// 创建学生
let createTeacher = async (req, res) => {

  //查询学生
  var sql1 = 'select * from teachers';
  var sqlArr1 = [];
  var callBack = (err, resoult) => {
    if (err) {
      res.send({
        success: false,
        msg: '查询老师失败'
      })
    } else {
      let sql = `insert into teachers(name,englishName,sex,height,weight,schoolNumber,idCardNum,courseName ) values(?,?,?,?,?,?,?,?)`;
      let {
        name, englishName, sex, height, weight, schoolNumber, idCardNum, courseName
      } = req.body;
      let data =
        [
          name, englishName, sex, height, weight, schoolNumber, idCardNum, courseName
        ]
      let flog = false
      resoult.map(item => {
        if (item.schoolNumber == schoolNumber) {
          res.send({
            success: false,
            msg: `检查工号：${schoolNumber}是否重复！`
          })
          flog = true
          return
        }

      })
      if (!flog) {
        dbConfig.base(sql, data, (results) => {
          if (results.protocol41) {




            // 缓存学号
            let sqlx = `insert into buffertch(schoolNumber ) values(?)`;
            let datax =
              [
                schoolNumber
              ]
            dbConfig.base(sqlx, datax, (results) => {

              // 清除其他缓存学号
              let sqls = `delete  from buffertch where schoolNumber!=?`;
              dbConfig.base(sqls, datax, (results) => { })
            })

            // res.send({
            //   code: 200,
            //   success: true,
            //   msg: '添加成功'
            // })
            const userName = schoolNumber
            const passWord = '123456'
            const root = 'true'
            let data4 =
              [
                schoolNumber, userName, passWord, root
              ]
            let sql4 = `insert into usercount(schoolNumber,userName,passWord,root ) values(?,?,?,?)`;

            var callBack = (err, resoult) => {
              if (err) {
                res.send({
                  success: false,
                  msg: '创建老师登录账号失败'
                })
              } else {
                res.send({
                  success: true,
                  msg: '创建老师成功'
                })
              }
            }
            dbConfig2.sqlConnect(sql4, data4, callBack);
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


// 添加老师的联系方式
let createTeacherOther = async (req, res) => {
  // console.log(req.body, 'req.body');
  let {
    qq,
    tel,
    email,
    postcode,
    schoolNumber,
  } = req.body;
  let sql = 'update teachers set qq= ?,tel= ?,email= ?,postcode= ? where schoolNumber= ?'
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

let getBufferSchoolNumber = (req, res) => {
  let sql = 'select * from buffertch'
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

// 更新老师的基础信息
let updataTeacherBase = async (req, res) => {

  let {
    name, englishName, sex, height, weight, schoolNumber, idCardNum
  } = req.body;
  let data =
    [
      name, englishName, sex, height, weight, idCardNum, schoolNumber
    ]

  let sql = 'update teachers set name= ?,englishName= ?,sex= ?,height= ? ,weight= ?,idCardNum= ? where schoolNumber= ?'

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
  createTeacher,
  createTeacherOther,
  getBufferSchoolNumber,
  updataTeacherBase
};