var dbConfig = require('../util/dbconfig');
//获取分类
var getClass = (req, res) => {
  var sql = 'select * from classes';
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      console.log('---连接出错了----')
    } else {

      var sql1 = 'select * from classmenbel';
      var sqlArr1 = [];
      var callBack1 = (err1, data1) => {
        if (err1) {
          console.log('---连接出错了----')
        } else {

          var sql2 = 'select * from teacherMessage';
          var sqlArr2 = [];
          var callBack2 = (err2, data2) => {
            if (err2) {
              console.log('---连接出错了----')
            } else {
              let data3 = data.map(item => {
                let classmenbel = []
                let teacherMessage = []
                data1.map(item1 => {
                  if (item.id == item1.pid) {
                    classmenbel.push(item1)
                    return classmenbel
                  }
                })
                data2.map(item2 => {
                  if (item.id == item2.pid) {
                    teacherMessage.push(item2)
                    return teacherMessage
                  }
                })
                return { ...item, classmenbel, teacherMessage }
              })
              // console.log(data3, 'data3');
              res.send({
                'list': data3,
                success: true
              })
            }
          }
          dbConfig.sqlConnect(sql2, sqlArr2, callBack2);
        }
      }
      dbConfig.sqlConnect(sql1, sqlArr1, callBack1);
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
}
var getClassMenbel = (req, res, predata) => {
  var sql = 'select * from classmenbel';
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      console.log('---连接出错了----')
    } else {

      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
}

// 搜索年级
var getSearchGrade = (req, res) => {
  var sql = 'select * from classes where grades=?';
  var sqlArr = [req.params.grades];
  var callBack = (err, data) => {
    if (err) {
      console.log('---连接出错了----')
    } else {

      var sql1 = 'select * from classmenbel';
      var sqlArr1 = [];
      var callBack1 = (err1, data1) => {
        if (err1) {
          console.log('---连接出错了----')
        } else {

          var sql2 = 'select * from teacherMessage';
          var sqlArr2 = [];
          var callBack2 = (err2, data2) => {
            if (err2) {
              console.log('---连接出错了----')
            } else {
              let data3 = data.map(item => {
                let classmenbel = []
                let teacherMessage = []
                data1.map(item1 => {
                  if (item.id == item1.pid) {
                    classmenbel.push(item1)
                    return classmenbel
                  }
                })
                data2.map(item2 => {
                  if (item.id == item2.pid) {
                    teacherMessage.push(item2)
                    return teacherMessage
                  }
                })
                return { ...item, classmenbel, teacherMessage }
              })
              // console.log(data3, 'data3');
              res.send({
                'list': data3,
                success: true
              })
            }
          }
          dbConfig.sqlConnect(sql2, sqlArr2, callBack2);
        }
      }
      dbConfig.sqlConnect(sql1, sqlArr1, callBack1);
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
}



module.exports = {
  getClass,
  getClassMenbel,
  getSearchGrade
};