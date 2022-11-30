import { configureStore } from '@reduxjs/toolkit'
import { todoReducer } from './slice/todoSlice'
import { authReducer } from './slice/authSlice'
import { buttonReducer } from './slice/buttonSlice'

export const store = configureStore({
   reducer: {
      todo: todoReducer,
      auth: authReducer,
      button: buttonReducer,
   }
})

