const Koa = require('koa')
const http = require('http')
const WebSocket = require('ws')
const  cors = require('koa2-cors')
const router = require('koa-router')()
const DB = require('../mysql/sqlConfig')
// const WebSocketApi = require('../utils/ws')
// 创建一个Koa对象
const app = new Koa()
const server = http.createServer(app.callback())
const wss = new WebSocket.Server({server})    // 同一端口监听不同的服务

wss.on('connection', async function connection(ws){
  ws.on('message', async function incoming(message){ 
    // console.log(111);
    const result = await DB.query(findSql)
    // console.log(result);
    ws.send(JSON.stringify(result))
  })
})


// WebSocketApi(wss)

// 处理跨域
app.use(cors())
app.use(router.routes())



const findSql = "select * from hot_word"
const addSql = "insert into hot_word(content) values(?)"



// 查
router.get('/find', async (ctx, next) => {
  ctx.body = await DB.query(findSql)
})

// 增
router.get('/add', async (ctx, next) => {
  const addSqlParams = ctx.request.query.content
  await DB.query(addSql, addSqlParams)
  ctx.body = await DB.query('select * from hot_word')
})



server.listen(3000)

console.log('服务器地址:http://localhost:3000/find');