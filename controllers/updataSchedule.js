var dbConfig = require('../util/dbconfig1');
// 编辑课表
let updataSchedule = async (req, res) => {
  for (let obj of req.body) {

    let {
      mom,
      tue,
      wed,
      thurs,
      friday,
      sat,
      sun,
      pid,
      id
    } = obj;
    let sql = `update schedule 
    set  mom= ?,tue= ?,wed= ?,thurs= ?,friday= ?,sat= ?,sun= ?
    where pid= ? && id= ?`
    let data =
      [
        mom,
        tue,
        wed,
        thurs,
        friday,
        sat,
        sun,
        pid,
        id
      ]
      dbConfig.base(sql, data, (results) => {
        if (id == req.body.length) {
          if (results.protocol41) {
            res.send({
              code: 200,
              success: true,
              msg: '添加成功'
            })
            return false;
          } else {
            res.send({
              code: 505,
              success: false,
              msg: '添加失败'
            })
            return false;
          }
        }
      })
  }
}



module.exports = {
  updataSchedule,
};