const DB = require('../models/db')

const findSql = "select * from hot"
// 数据库查询10条（0，10）
// limit m(跳过m条),n（取n条记录）
// 倒序拿到10条数据
const pageFindSql = "select * from hot order by id desc limit ?,?"

module.exports = {
  FindHotWord: async ctx => {
    ctx.body = await DB.query(findSql)
  },
  // 分页查询
  PageQuery: async ctx => {
    const { limit, page } = ctx.request.query
    /* 
      第一页：0，10（0，10）
      第二页：10，20（10，10）
    */
    // limit后面都是数字类型，转换一下 
    const pageFindSqlParams = [limit * (page - 1), +limit]
    // console.log(pageFindSqlParams);
    let total = await DB.query(findSql)
    let list = await DB.query(pageFindSql, pageFindSqlParams)
    // 解决不换行：replace全局替换和v-html
    // list.forEach(e => {
    //   e.content = e.content.replace(/\n/g, "<br/>")
    // })
    ctx.body = { total: total.length, list }

  }
}