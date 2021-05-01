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
 
module.exports = {
  getTeachers,
  
};