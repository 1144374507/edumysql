var dbConfig = require('../util/dbconfig');

//查询用户
var getUserData = (req, res) => {
  var sql = 'select * from students where schoolNumber = ?';
  var sqlArr =  req.params.schoolNumber;
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
  getUserData
};