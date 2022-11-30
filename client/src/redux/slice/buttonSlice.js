import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   all: [
      { id: 0, click: 'allTodo', text: 'Все', addClass: null },
      { id: 1, click: 'activeTodo', text: 'Активные', addClass: null },
      { id: 2, click: 'complitedTodo', text: 'Выполненые', addClass: null },
      { id: 3, click: 'deleteTodo', text: 'Удалить выполненые', addClass: 'delete-completed' },
   ]
}

export const buttonSlice = createSlice({
   name: 'button',
   initialState,
})

export const buttonReducer = buttonSlice.reducer

export const selectAllButton = state => state.button