import { React, useState } from 'react'
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserRegistration, selectIsAuth } from '../../redux/slice/authSlice'
import styles from '../Login/Login_and_Register.module.scss'

export const Registrasion = () => {

   const [val, setVal] = useState({ username: '', email: '', password: '' })
   const dispatch = useDispatch()
   const isAuth = useSelector(selectIsAuth)

   const getText = (e) => {
      e.preventDefault()
      dispatch(fetchUserRegistration(val))
      setVal({ username: '', email: '', password: '' })
   }

   if (isAuth) {
      return <Navigate to='/' />
   }

   return (
      <>
         <div className={styles.wrapper}>
            <form className={styles['form-signin']}>
               <h2 className={styles['form-signin-heading']}>Регистрация</h2>
               <input
                  value={val.username}
                  onChange={(e) => setVal({ ...val, username: e.target.value })}
                  type="text"
                  className={styles['form-control']}
                  name="username"
                  placeholder="Username"
                  required
                  autoFocus
                  autoComplete="off" />
               <input
                  value={val.email}
                  onChange={(e) => setVal({ ...val, email: e.target.value })}
                  type="email"
                  className={styles['form-control']}
                  name="email" placeholder="Email"
                  required
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
                  type="submit">Зарегистрироваться</button>
            </form>
         </div>
      </>
   )
}
