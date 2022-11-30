// определяем router
const express = require("express");
const router = express.Router();
// controllers
const controllers = require('../controllers/homeRouter')
// middleware
const checkIsAuth = require('../middleware/authMiddleware')

router.get('/', checkIsAuth, controllers.gethome)
router.post('/addtodo', checkIsAuth, controllers.postHome)
router.patch('/edittodo', checkIsAuth, controllers.editHome)
router.put('/statustodo', checkIsAuth, controllers.statusTodoHome) // поменят метод на patch
router.delete('/deletetodo/:id', checkIsAuth, controllers.deleteHome)

module.exports = router 