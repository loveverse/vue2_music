const Koa = require('koa')
const router = require('koa-router')()
const DB = require('../mysql/test');
// 创建一个Koa对象
const app = new Koa()


app.use(async (ctx, next)=>{
  await next();
  // 设置HTTP响应的内容类型
  ctx.set('Access-Control-Allow-Origin', '*')
});
router.get('/find', async (ctx, next) => {
  ctx.body = await DB.query('select * from websites')
  
  console.log(ctx.body);
})

app.use(router.routes())
app.listen(3000)
console.log('启动服务成功！');