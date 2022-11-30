const todoService = require('../service/todo_service')
const { validationResult } = require('express-validator')
const ApiError = require('../errors/apiError')

class homeController {
   async gethome(req, res) {
      try {
         const { id } = req.user
         const userAllTodo = await todoService.getAll(id)
         res.json(userAllTodo)
      } catch (error) {
         console.log(error);
      }
   }
   async postHome(req, res, next) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
         }
         const { todo } = req.body
         const { id } = req.user
         const userAddTodo = await todoService.getAdd(todo, id)
         res.json(userAddTodo)
      } catch (error) {
         console.log(error);
      }
   }
   async editHome(req, res) {
      try {
         const { editTodo, idTodo } = req.body
         const userEditTodo = await todoService.getEdit(editTodo, idTodo)
         res.json(userEditTodo)
      } catch (error) {
         console.log(error);
      }
   }
   async statusTodoHome(req, res) {
      try {
         const { el } = req.body
         const userStatusTodo = await todoService.getStatus(el)
         res.json(userStatusTodo)
      } catch (error) {
         console.log(error);
      }
   }
   async deleteHome(req, res) {
      try {
         const { id } = req.params
         const deteteTodo = await todoService.getDelete(id)
         res.json(deteteTodo)
      } catch (error) {
         console.log(error);
      }
   }
}

module.exports = new homeController()