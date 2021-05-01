var dbConfig = require('../util/dbconfig');
//查询课表
var getSchedule = (req, res) => {
  var sql = 'select * from schedule where pid=?';
  let data = [req.params.pid]
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
 
module.exports = {
  getSchedule,
  
};