const mysql = require("mysql");

let dbConfig = {
  host: "1.12.252.87",
  user: "chat",
  password: "123456",
  database: "chat",
};

let pool = mysql.createPool(dbConfig);
let DB = {};

DB.query = function (sql, params) {
  return new Promise((resolve, reject) => {
    // 取出连接
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, function (error, results, fields) {
        // 释放连接
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
      );
    });
  });
};

module.exports = DB;
