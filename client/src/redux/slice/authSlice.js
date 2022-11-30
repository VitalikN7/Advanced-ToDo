import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { API_URL } from "../../https/setupAxios";

export const fetchUserRegistration = createAsyncThunk('auth/fetchUserlogin', async (params) => {
   const { data } = await axios.post('auth/registration', params)
   return data
})

export const fetchUserlogin = createAsyncThunk('auth/fetchUserlogin', async (params) => {
   const { data } = await axios.post('auth/login', params)
   return data
})

export const fetchUserlogout = createAsyncThunk('auth/fetchlogout', async () => {
   const { data } = await axios.post('auth/logout')
   return data
})

export const fetchUserCheckAuth = createAsyncThunk('auth/fetchCheckAuth', async () => {
   const { data } = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true })
   return data
})

const initialState = {
   data: null,
   status: 'loading'
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   extraReducers: {
      [fetchUserRegistration.pending]: (state) => {
         state.status = 'loading'
         state.data = null
      },
      [fetchUserRegistration.fulfilled]: (state, action) => {
         state.status = 'loaded'
         state.data = action.payload
         if (!action.payload) {
            return alert('Не удалось зарегистрироваться')
         }
         if ('accessToken' in action.payload) {
            localStorage.setItem('token', action.payload.accessToken)
         }
      },
      [fetchUserRegistration.rejected]: (state) => {
         state.status = 'error'
         state.data = null
      },

      [fetchUserlogin.pending]: (state) => {
         state.status = 'loading'
         state.data = null
      },
      [fetchUserlogin.fulfilled]: (state, action) => {
         state.status = 'loaded'
         state.data = action.payload
         if (!action.payload) {
            return alert('Не удалось авторизоваться')
         }
         if ('accessToken' in action.payload) {
            localStorage.setItem('token', action.payload.accessToken)
         }
      },
      [fetchUserlogin.rejected]: (state) => {
         state.status = 'error'
         state.data = null
      },

      [fetchUserlogout.pending]: (state) => {
         state.status = 'loading'
      },
      [fetchUserlogout.fulfilled]: (state) => {
         state.status = 'loaded'
         localStorage.removeItem('token')
         state.data = null
      },
      [fetchUserlogout.rejected]: (state) => {
         state.status = 'error'
      },

      [fetchUserCheckAuth.pending]: (state) => {
         state.status = 'loading'
         state.data = null
      },
      [fetchUserCheckAuth.fulfilled]: (state, action) => {
         state.status = 'loaded'
         state.data = action.payload
         if (!action.payload) {
            return alert('Не удалось зарегистрироваться')
         }
         if ('accessToken' in action.payload) {
            localStorage.setItem('token', action.payload.accessToken)
         }
      },
      [fetchUserCheckAuth.rejected]: (state) => {
         state.status = 'error'
         state.data = null
      },
   }
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const selectIsUser = state => state.auth?.data?.user

export const authReducer = authSlice.reducer