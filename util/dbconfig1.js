// 操作数据库通用API
// 引用mysql
const mysql = require('mysql')
// 封装一个连接数据库 函数
exports.base = (sql, data, callback) => {
  // 配置数据库信息
  const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'exapp'
  });
  // 建立数据库连接
  connection.connect();

  // 数据库操作 是异步的
  connection.query(sql, data, function (error, results, fields) {
    if (error) throw error;
    callback(results);
  });
  // 结束数据库操作
  // connection.end();
}
