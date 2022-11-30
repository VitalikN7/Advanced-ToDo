import { React, useState } from 'react'
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserlogin, selectIsAuth } from '../../redux/slice/authSlice'
import styles from './Login_and_Register.module.scss'

export const Login = () => {

   const [val, setVal] = useState({ email: '', password: '' })
   const dispatch = useDispatch()
   const isAuth = useSelector(selectIsAuth)

   const getText = (e) => {
      e.preventDefault()
      dispatch(fetchUserlogin(val))
      setVal({ email: '', password: '' })
   }

   if (isAuth) {
      return <Navigate to='/' />
   }

   return (
      <>
         <div className={styles.wrapper}>
            <form className={styles['form-signin']}>
               <h2 className={styles['form-signin-heading']}>Авторизация</h2>
               <input
                  value={val.email}
                  onChange={(e) => setVal({ ...val, email: e.target.value })}
                  type="email"
                  className={styles['form-control']}
                  name="email" placeholder="Email"
                  required
                  autoFocus
                  autoComplete="off" />
               <input
                  value={val.password}
                  onChange={(e) => setVal({ ...val, password: e.target.value })}
                  type="password"
                  className={styles['form-control']}
                  name="password"
                  placeholder="Password"
                  required />
               <label className={styles.checkbox}>
                  <input type="checkbox" defaultValue="remember-me" id="rememberMe" name="rememberMe" /> Запомнить меня
               </label>
               <button
                  onClick={getText}
                  className={styles.btn}
                  type="submit">Войти</button>
            </form>
         </div>
      </>
   )
}
