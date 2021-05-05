var dbConfig = require('../util/dbconfig');
var token = require('../token/token')
//登录
var login = (req, res) => {
  var sql = 'select * from usercount where userName=?';
  const {
    userName,
    passWord
  } = req.body
  let data = [userName]
  var callBack = (err, data) => {
    if (err) {
      res.send({
        success: false

      })
    } else {
      if (data.length == 0) {
        res.send({
          success: false,
          msg: "账号不存在"
        })
      }
      else if (data[0].passWord == passWord) {
        token.setToken(userName, data[0].schoolNumber).then(token => {
          res.send({
            token,
            success: true
          })
        })
      } else {
        res.send({
          success: false,
          msg: "密码或者账号错误"
        })
      }


    }
  }
  dbConfig.sqlConnect(sql, data, callBack);
}

module.exports = {
  login,
};