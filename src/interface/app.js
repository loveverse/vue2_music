const Koa = require('koa')
const cors = require('koa2-cors')
const router = require('koa-router')()
const DB = require('../mysql/test');
// 创建一个Koa对象
const app = new Koa()

app.use(cors())
app.use(router.routes())

// app.use(async (ctx, next)=>{
//   await next();
//   // 设置HTTP响应的内容类型
//   ctx.set('Access-Control-Allow-Origin', '*')
// });
router.get('/find', async (ctx, next) => {
  ctx.body = await DB.query('select * from hot_word')
  
  console.log(ctx.body);
})

router.get('/add/:content', async (ctx, next) => {
  const addSql = 'insert into hot_word(content) values(?)'
  const addSqlParams = ctx.request.params.content
  // console.log(addSqlParams);
  await DB.query(addSql, addSqlParams)

  ctx.body = await DB.query('select * from hot_word')
})


app.listen(3000)
console.log('启动服务成功！');