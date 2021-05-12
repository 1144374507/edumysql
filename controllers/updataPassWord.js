var dbConfig = require('../util/dbconfig');
const decrypt= require('../util/encrpt')

// 编辑成绩单
let updataPassWord = async (req, res) => {
  var sql = 'select * from usercount where userName=?';
  const {
    userName,
    passWord:oldPassWord,
    newPassWord:berNewPassWord
  } = req.body
  var passWord =decrypt.decrypt(oldPassWord)
  var newPassWord =decrypt.decrypt(berNewPassWord)

  let data = [userName]
  var callBack = (err, data) => {
    console.log(data,'data');
    console.log(userName,'userName');
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
        // token.setToken(userName, data[0].schoolNumber).then(token => {
        //   res.send({
        //     token,
        //     success: true,
        //     root: data[0].root
        //   })
        // })

        let sql1 = `update usercount 
        set passWord=?
        where userName= ?`

        
        const passWord = newPassWord

        let data1 =
          [
            passWord,
            userName,
          ]
        var callBack = (err, resoult) => {
          if (err) {
            res.send({
              success: false,
              msg: '修改密码失败'
            })
          } else {
            res.send({
              success: true,
              msg: '修改密码成功'
            })
          }
        }
        dbConfig.sqlConnect(sql1, data1, callBack)

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
  updataPassWord,
};