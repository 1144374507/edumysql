var dbConfig = require('../util/dbconfig1');

// 删除
let deleteClass = async (req, res) => {
  let sql = 'delete  from classes where id=?';
  let sqlArr = req.params.id;
  dbConfig.base(sql, sqlArr, (results) => {
    console.log(results, 'results');
    res.send({
      code: 200,
      succeed: true,
      msg: '删除成功'
    })

  })
}
let deleteStudent = async (req, res) => {
  let sql = 'delete  from classmenbel where cid=?';
  let sqlArr = req.params.cid;
  dbConfig.base(sql, sqlArr, (results) => {
    console.log(results, 'results');
    res.send({
      code: 200,
      success: true,
      msg: '删除成功'
    })

  })
}
let deleteTeacher = async (req, res) => {
  let sql = 'delete  from teachermessage where cid=?';
  let sqlArr = req.params.cid;
  dbConfig.base(sql, sqlArr, (results) => {
    console.log(results, 'results');
    res.send({
      code: 200,
      success: true,
      msg: '删除成功'
    })

  })
}

module.exports = {
  deleteClass, 
  deleteStudent,
  deleteTeacher
};