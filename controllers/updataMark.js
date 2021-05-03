var dbConfig = require('../util/dbconfig1');
// 编辑成绩单
let updataMark = async (req, res) => {
  let index = 1
  for (let obj of req.body) {

    let {
      courseType,
      examType,
      mark,
      noPassReason,
      schoolNumber,
      grade,
      courseName,
      teacher
    } = obj;
    console.log('obg', obj);
    var sql2 = `select * from mark where  schoolNumber= ? && grade= ? && courseName=?`;
    let data2 =
      [
        schoolNumber,
        grade,
        courseName

      ]

    dbConfig.base(sql2, data2, (results) => {
      console.log('data', results);
      if (results.length == 0) {
        let sql3 = `insert into mark(
           courseType,
          examType,
          mark,
          noPassReason,
          teacher,
          schoolNumber,
          grade,
          courseName) values (?,?,?,?,?,?,?,?)`
        let data3 =
          [
            courseType,
            examType,
            mark,
            noPassReason,
            teacher,
            schoolNumber,
            grade,
            courseName

          ]
        dbConfig.base(sql3, data3, (results) => {
          if (index >= req.body.length) {
            if (results.protocol41) {
              res.send({
                code: 200,
                success: true,
                msg: '编辑成功'
              })
              return false;
            } else {
              res.send({
                code: 505,
                success: false,
                msg: '编辑失败'
              })
              return false;
            }
          }
          index++
        })
      } else {
        let sql = `update mark 
        set  courseType= ?,examType= ?,mark= ?,noPassReason= ? ,teacher=?
        where schoolNumber= ? && grade= ? && courseName=?`
        let data =
          [
            courseType,
            examType,
            mark,
            noPassReason,
            teacher,
            schoolNumber,
            grade,
            courseName

          ]
        dbConfig.base(sql, data, (results) => {

          if (index >= req.body.length) {
            if (results.protocol41) {
              res.send({
                code: 200,
                success: true,
                msg: '编辑成功'
              })
              return false;
            } else {
              res.send({
                code: 505,
                success: false,
                msg: '编辑失败'
              })
              return false;
            }
          }
          index++

        })
      }

    })

  }
}



module.exports = {
  updataMark,
};