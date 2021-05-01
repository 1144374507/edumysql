var dbConfig = require('../util/dbconfig');
//获取分类
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
 
module.exports = {
  getStudents,
  
};