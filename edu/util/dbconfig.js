const mysql = require('mysql')
module.exports = {
  config: {
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'exapp'
  },
  //连接数据库，使用连接池方式
  //连接池对象
  sqlConnect: function (sql, sqlArr, callBack) {
    var pool = mysql.createPool(this.config);
    pool.getConnection(function (err, conn) {
      if (err) {
        console.log('连接失败');
        return;
      }
      conn.query(sql, sqlArr, callBack);
      conn.release();
    })
  },
}