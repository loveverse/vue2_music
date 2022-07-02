const Router = require('koa-router');
// 导入控制层
const hotWordController = require("../controller/hotWord")


let hotWord = new Router()
hotWord.get("/hot/findHotWord", hotWordController.FindHotWord)
hotWord.get("/hot/pageQuery", hotWordController.PageQuery)


module.exports = hotWord