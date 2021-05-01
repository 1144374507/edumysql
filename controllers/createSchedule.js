var dbConfig = require('../util/dbconfig1');
// 创建课表
let createSchedule = async (req, res) => {
  for (let obj of req.body) {

    let {
      pid,
      id,
      sectiontime,
      sections,
      time,
      mom,
      tue,
      wed,
      thurs,
      friday,
      sat,
      sun
    } = obj;

    let sql = `insert into schedule(
      pid,
      id,
      sectiontime,
      sections,
      time,
      mom,
      tue,
      wed,
      thurs,
      friday,
      sat,
      sun
      ) values(?,?,?,?,?,?,?,?,?,?,?,?)`;

    
    let data =
      [
        pid,
        id,
        sectiontime,
        sections,
        time,
        mom,
        tue,
        wed,
        thurs,
        friday,
        sat,
        sun
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
  createSchedule,
};