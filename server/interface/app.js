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


const findSql = "select * from hot_word"
const addSql = "insert into hot_word(content) values(?)"
const updateSql = "update hot_word set content = ? where id = ?"
const delSql = "delete from hot_word where id = ?"


wss.on('connection', async function connection(ws) {
  ws.on('message', async function incoming(message) {
    // console.log(message);
      // 消息id
      let messageIndex = 0
      // let msg = async function () {
        // messageIndex++
        // 需要返回的数据
        const result = await DB.query(findSql)
        // 返回一个JSON字符串
        // return JSON.stringify({
          // id: messageIndex,
          // data: result
        // })
      // }
      // console.log(msg);
      // console.log(msg());
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

// 增
router.get('/add', async (ctx, next) => {
  const addSqlParams = ctx.request.query.content
  await DB.query(addSql, addSqlParams)
  ctx.body = await DB.query(findSql)
})
router.get('/update', async (ctx, next) => {
  // console.log(ctx.request.query);
  const { id, content } = ctx.request.query
  const updateSqlParams = [content, id]
  await DB.query(updateSql, updateSqlParams)
  ctx.body = await DB.query(findSql)
})

router.get('/del', async (ctx, next) => {
  const delSqlParams = ctx.request.query.id
  // console.log(delSqlParams);
  await DB.query(delSql, delSqlParams)
  ctx.body = await DB.query(findSql)
})

server.listen(3000)

console.log('服务器地址:http://localhost:3000/find');