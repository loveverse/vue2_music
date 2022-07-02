const Router = require('koa-router');
// 导入控制层
const treeHoleController = require("../controller/treeHole")


let treeHole = new Router()
treeHole.get("/tree/findExcerpt",treeHoleController.FindExcerpt)
treeHole.get("/tree/addExcerpt",treeHoleController.AddExcerpt)
treeHole.get("/tree/updateExcerpt",treeHoleController.UpdateExcerpt)
treeHole.get("/tree/delExcerpt",treeHoleController.DelExcerpt)

module.exports = treeHole