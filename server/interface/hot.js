const Koa = require('koa')
const http = require('http')
const WebSocket = require('ws')
const cors = require('koa2-cors')
const router = require('koa-router')()
const DB = require('../mysql/sqlConfig')
// const WebSocketApi = require('../utils/ws')


// 创建一个Koa对象
const app = new Koa()
const server = http.createServer(app.callback())
const wss = new WebSocket.Server({ server })    // 同一端口监听不同的服务


const findSql = "select * from hot"
// 数据库查询10条（0，10）
// limit m(跳过m条),n（取n条记录）
const pageFindSql = "select * from hot limit ?,?"


wss.on('connection', async function connection(ws) {
  ws.on('message', async function incoming(message) {
      // 消息id
      let messageIndex = 0
        const result = await DB.query(findSql)

      wss.clients.forEach((client) => {
        messageIndex++

        // console.log(client);
        client.send(JSON.stringify(result))
      })
    // }


  })
})


// WebSocketApi(wss)

// 处理跨域
app.use(cors())
app.use(router.routes())




// 查
router.get('/find', async (ctx, next) => {
  ctx.body = await DB.query(findSql)
})

// 分页查询
router.get('/pageQuery', async (ctx, next) => {
  const {limit, page} = ctx.request.query
  /* 
    第一页：0，10（0，10）
    第二页：10，20（10，10）
  */
  // limit后面都是数字类型，转换一下 
  const pageFindSqlParams = [limit * (page - 1), +limit]
  // console.log(pageFindSqlParams);
  let total = await DB.query(findSql)
  let list = await DB.query(pageFindSql, pageFindSqlParams)
  // list.forEach(e => {
  //   e.content = e.content.replace("\n", "<br/>")
  // })
  ctx.body = {total: total.length, list}
  // console.log(ctx.body);
  // console.log(ctx.body);

})


server.listen(3001)

console.log('服务器地址:http://localhost:3001/find');