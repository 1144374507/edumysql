var dbConfig = require('../util/dbconfig1');

// 删除
let deleteMark = async (req, res) => {
  let {
    schoolNumber,
    grade,
    courseName,
  } = req.query
  console.log(req.query,'query');
  let sql = 'delete  from mark where  schoolNumber= ? && grade= ? && courseName=?';
  let data =
    [
      schoolNumber,
      grade,
      courseName
    ]
  dbConfig.base(sql, data, (results) => {
    res.send({
      code: 200,
      success: true,
      msg: '删除成功'
    })

  })
}

module.exports = {
  deleteMark
};