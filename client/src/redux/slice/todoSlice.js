import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../https/setupAxios";

export const fetchAddTodo = createAsyncThunk('/fetchAddTodo', async (params) => {
   const { data } = await axios.post('addtodo', params)
   return data
})

export const fetchAllTodo = createAsyncThunk('/fetchAllTodo', async () => {
   const { data } = await axios.get()
   return data
})

export const fetchAllTodoStatus = createAsyncThunk('/fetchAllTodoStatus', async (params) => {
   const { data } = await axios.put('statustodo', params)
   return data
})

export const fetchTodoDelete = createAsyncThunk('/fetchTodoDelete', async (id) => {
   axios.delete(`deletetodo/${id}`)
})

export const fetchEditTodo = createAsyncThunk('/fetchEditTodo', async (params) => {
   const { data } = await axios.patch('edittodo', params)
   return data
})

const initialState = {
   addTodo: null,
   allTodo: [],
   statusTodo: null,
   editTodo: null,
   statusAddTodo: 'loading',
   statusAllTodo: 'loading',
   statusAllTodoStatus: 'loading',
   statusTodoDelete: 'loading',
   statusEditTodo: 'loading',
}

export const todoSlice = createSlice({
   name: 'todo',
   initialState,
   reducers: {
      statusItemAllTodo: (state, action) => {
         state.allTodo = action.payload
      }
   },
   extraReducers: {
      [fetchAddTodo.pending]: (state) => {
         state.statusAddTodo = 'loading'
         state.addTodo = null
      },
      [fetchAddTodo.fulfilled]: (state, action) => {
         state.statusAddTodo = 'loaded'
         state.addTodo = action.payload
         if (!action.payload) {
            return alert('Не удалось создать ToDo')
         }
      },
      [fetchAddTodo.rejected]: (state) => {
         state.statusAddTodo = 'error'
         state.addTodo = null
      },

      [fetchAllTodo.pending]: (state) => {
         state.statusAllTodo = 'loading'
         // state.allTodo = null
      },
      [fetchAllTodo.fulfilled]: (state, action) => {
         state.statusAllTodo = 'loaded'
         state.allTodo = action.payload
         if (!action.payload) {
            return alert('Не удалось отобразить ToDо')
         }
      },
      [fetchAllTodo.rejected]: (state) => {
         state.statusAllTodo = 'error'
         state.allTodo = null
      },

      [fetchAllTodoStatus.pending]: (state) => {
         state.statusAllTodoStatus = 'loading'
         state.statusTodo = null
      },
      [fetchAllTodoStatus.fulfilled]: (state, action) => {
         state.statusAllTodoStatus = 'loaded'
         state.statusTodo = action.payload
         if (!action.payload) {
            return window.alert('Не удалось изменить статус ToDо')
         }
      },
      [fetchAllTodoStatus.rejected]: (state) => {
         state.statusAllTodoStatus = 'error'
         state.statusTodo = null
      },

      [fetchEditTodo.pending]: (state) => {
         state.statusEditTodo = 'loading'
         state.editTodo = null
      },
      [fetchEditTodo.fulfilled]: (state, action) => {
         state.statusEditTodo = 'loaded'
         state.editTodo = action.payload
         if (!action.payload) {
            return alert('Не удалось изменить ToDo')
         }
      },
      [fetchEditTodo.rejected]: (state) => {
         state.statusEditTodo = 'error'
         state.editTodo = null
      },

      [fetchTodoDelete.pending]: (state, action) => {
         state.allTodo = state.allTodo.filter((obj) => obj.id !== action.meta.arg);
      }
   }
})

export const todoReducer = todoSlice.reducer

export const { statusItemAllTodo } = todoSlice.actions

export const selectAllTodo = state => state.todo