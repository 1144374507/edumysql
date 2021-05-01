var dbConfig = require('../util/dbconfig');
//获取老师
var getTeachers = (req, res) => {
  var sql = 'select * from teachers';
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

//查询 按老师年级 、学号 或 姓名
var getTeachers2 = (req, res) => {
  let key = Object.keys(req.query)
  console.log(key, 'key');
  grades = key[0]
  var sql = `select * from teachers where ${grades} like '%${req.query[grades]}%'`;
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
  getTeachers,
  getTeachers2
};