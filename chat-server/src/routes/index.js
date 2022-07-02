const Router = require('koa-router');
const treeHole = require('./treeHole')
const hotWord = require('./hotWord')
let Routers = new Router()
Routers.use(treeHole.routes())
Routers.use(hotWord.routes())

module.exports = Routers

