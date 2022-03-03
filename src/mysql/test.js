const mysql = require('mysql')
function _connection(){
  const connection = mysql.createConnection({
    host: "1.12.252.87",
    // host: "192.168.1.15",
    // user: "root",
    //  password: "123456",
    user: 'verse',
    password: 'GrHt8HDDTD5ETT8h',
    database: 'verse'
  })
  
  connection.connect()
  return connection
}

exports.query = function(sql, params = null){
  const connection = _connection()
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results, fields) => {
      if(error) throw error
      resolve(results)
    })
  })
}

// 查
// const sql = 'select * from websites'



  // connection.query(sql, function(error, result){
  //   if(error) throw error
  //   // console.log(result);
  // })

// 增
// const addSql = 'insert into websites(id, name, url, alexa, country) values(0,?,?,?,?)'
// const addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN']

// connection.query(addSql,addSqlParams, function(error, result){
//   if(error) throw error
//   console.log(result);
// })



const modSql = 'update websites set name=?, url=? where id=?'
const modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6]


// connection.query(modSql,modSqlParams, function(error, result){
//   if(error) throw error
//   console.log(result.affectedRows);
// })

// const delSql = 'delete from websites where id=6'
// connection.query(delSql, function(error, result){
//   if(error) throw error
//   console.log(result.affectedRows);
// })




// connection.query(sql, function(error, result){
//   if(error) throw error
//   console.log(result);
// })


// connection.end()