const DB = require('../models/db')
const findExcerptSql = "select * from excerpt"
const addExcerptSql = "insert into excerpt(content, author, flag,date) values(?,?,?,?)"
const updateExcerptSql = "update excerpt set content = ? where id = ?"
const delExcerptSql = "delete from excerpt where id = ?"

module.exports = {
  FindExcerpt: async ctx => {
    ctx.body = await DB.query(findExcerptSql)
  },
  AddExcerpt: async ctx => {
    const { content, author, flag, date } = JSON.parse(ctx.request.query.params)
    const addExcerptSqlParams = [content, author, flag, date]
    ctx.body = await DB.query(addExcerptSql, addExcerptSqlParams)
  },
  UpdateExcerpt: async ctx => {
    const { id, content } = ctx.request.query
    const updateExcerptSqlParams = [content, id]
    await DB.query(updateExcerptSql, updateExcerptSqlParams)
    ctx.body = await DB.query(findExcerptSql)
  },
  DelExcerpt: async ctx => {
    await DB.query(delExcerptSql, ctx.request.query.id)
    ctx.body = await DB.query(findExcerptSql)
  }
}