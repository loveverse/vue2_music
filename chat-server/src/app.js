const Koa = require('koa')
const http = require('http')
const WebSocketInit = require('ws')
const cors = require('koa2-cors')
const Routers = require('./routes/index')


const app = new Koa()
const server = http.createServer(app.callback())
// const wss = new WebSocketInit.Server({ server })    // 同一端口监听不同的服务
// 处理跨域
app.use(cors())
app.use(Routers.routes())


server.listen(5200)
console.log('服务器地址:http://localhost:5200');