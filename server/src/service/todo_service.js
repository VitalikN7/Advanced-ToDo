const e = require('express')
const { User, Todo } = require('../../db/models')
const ApiError = require('../errors/apiError')

class TodoService {

   async getAll(id) {
      const allTodo = await Todo.findAll({
         order: [['createdAt', 'DESC']],
         where: { user_id: id },
         raw: true
      })
      return allTodo
   }

   async getAdd(todo, id) {
      const newTodo = await Todo.create({
         user_id: id,
         text_todo: todo,
         status: false,
         like: 0
      })
      return newTodo
   }

   async getEdit(editTodo, idTodo) {
      const newEditTodo = await Todo.update(
         { text_todo: editTodo },
         {
            where: {
               id: idTodo
            }
         }
      )
      return newEditTodo
   }

   async getStatus(todo) {
      if (todo.status === false) {
         const newStatus = await Todo.update(
            { status: true },
            {
               where: {
                  id: todo.id
               }
            }
         )
         return newStatus
      }
      if (todo.status === true) {
         const newStatus = await Todo.update(
            { status: false },
            {
               where: {
                  id: todo.id
               }
            }
         )
         return newStatus
      }
   }

   async getDelete(id) {
      const deletetodo = await Todo.destroy({
         where: {
            id: id
         }
      })
      return deletetodo
   }
}

module.exports = new TodoService()