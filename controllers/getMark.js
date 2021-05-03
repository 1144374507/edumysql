var dbConfig = require('../util/dbconfig');
//查询课表
var getMark = (req, res) => {
  var sql = 'select * from mark where schoolNumber=?';
  let data = [req.params.schoolNumber]
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
  dbConfig.sqlConnect(sql, data, callBack);
}
var getMark2 = (req, res) => {
  let key = Object.keys(req.query)
  console.log(key, 'key');
  schoolNumber = key[0]
  grade = key[1]
  var sql = `select * from mark where ${schoolNumber} = '${req.query[schoolNumber]}' and grade = '${req.query[grade]}' `;
  var sqlArr = [req.query[schoolNumber],req.query[grade]];

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
  getMark,
  getMark2

};