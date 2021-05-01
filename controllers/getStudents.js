var dbConfig = require('../util/dbconfig');
//查询学生
var getStudents = (req, res) => {
  var sql = 'select * from students';
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      res.send({
        success: false
      })
    } else {
      res.send({
        'list': data,
        success: true
      })
    }

  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
}

//查询 按学生年级 、学号 或 姓名
var getStudents2 = (req, res) => {
  let key = Object.keys(req.query)
  console.log(key, 'key');
  grades = key[0]
  var sql = `select * from students where ${grades} like '%${req.query[grades]}%'`;
  var sqlArr = [req.query[grades]];

  var callBack = (err, data) => {
    if (err) {
      res.send({
        success: false
      })
    } else {
      res.send({
        'list': data,
        success: true
      })
    }

  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
}

module.exports = {
  getStudents,
  getStudents2
};