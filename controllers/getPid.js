var dbConfig = require('../util/dbconfig');

// var getPid = (req, res) => {
//   var sql = 'select pid from classmenbel where schoolNumber=?';
//   let data = [req.params.schoolNumber]
//   var callBack = (err, data) => {
//     if (err) {
//       res.send({
//         success: false
//       })
//     } else {
//       res.send({
//         'list': data,
//         success: true
//       })
//     }
//   }
//   dbConfig.sqlConnect(sql, data, callBack);
// }
// 查询 pid 用于课表查询
var getPid = (req, res) => {
  let key = Object.keys(req.query)
  console.log(key, 'key');
  console.log(req.query, 'req.query');
  schoolNumber = key[0]
  grade = key[1]
  var sql = `select pid from classmenbel where schoolNumber = '${req.query[schoolNumber]}' and grades = '${req.query[grade]}' `;
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
  getPid,

};