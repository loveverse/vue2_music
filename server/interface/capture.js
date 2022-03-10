const axios = require('axios');
const mysql = require('mysql')

// 连接数据库配置
const connection = mysql.createConnection({
  host: "1.12.252.87",
  user: 'verse',
  password: '123456',
  database: 'verse'
})
connection.connect()

const findSql = 'select content from hot'
const addSql = 'insert into hot(name, url, picurl, artistsname, avatarurl, nickname, content) values(?,?,?,?,?,?,?)'
const baseUrlArray = []
const baseUrl = 'https://api.uomg.com/api/comments.163'

connection.query(findSql, function(err, result) {
  if(err){
    console.log("报错：",err);
  }else{
    // console.log(JSON.stringify(result));
    let contentArray = result.map(item => item.content);
    console.log("查询数据成功！");
    successCallback(contentArray)
  }
})

function successCallback(data) {
  axios({
    methods: "post",
    url:baseUrl,
    timeout: 20000,
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
  }).then(res => {
    if(res.status === 200){
      const {name, url, picurl, artistsname, avatarurl, nickname, content} = res.data.data
      // 如果数组中有一个和当前需要添加进去的相等，直接返回
      if(data.some(item => item.content === content)) return console.log("存在相同的数据")

      const addSqlParams = [name, url, picurl, artistsname, avatarurl, nickname, content]
      connection.query(addSql, addSqlParams, function(err,result){
        if(err){
          console.log("报错：",err);
        }else{
          console.log("插入数据成功！");
        }
      })
      connection.end();
    }
  }).catch(error => {
    console.log(error);
  })
}
