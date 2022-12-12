import { React } from 'react'
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserlogin, selectIsAuth } from '../../redux/slice/authSlice'
import styles from './Login_and_Register.module.scss'

export const Login = () => {

   const {
      register,
      handleSubmit,
      formState: { errors, isValid }
   } = useForm({
      defaultValues: {
         email: '',
         password: '',
      },
      mode: 'onBlur',
   });

   const dispatch = useDispatch()
   const isAuth = useSelector(selectIsAuth)

   const onSubmit = (data) => {
      dispatch(fetchUserlogin(data))
   }

   if (isAuth) {
      return <Navigate to='/' />
   }

   return (
      <>
         <div className={styles.wrapper}>
            <form className={styles['form-signin']} onSubmit={handleSubmit(onSubmit)}>
               <h2 className={styles['form-signin-heading']}>Авторизация</h2>
               <input
                  {...register("email", {
                     required: {
                        value: true,
                        message: 'Укажите почту'
                     },
                  })}
                  type="email"
                  className={styles['form-control']}
                  placeholder="Email"
                  autoFocus
                  autoComplete="off" />
               {errors?.email && <p style={{ color: '#da4141' }}>{errors?.email?.message}</p>}
               <input
                  {...register("password", {
                     required: {
                        value: true,
                        message: 'Укажите пароль'
                     },
                  })}
                  type="password"
                  className={styles['form-control']}
                  placeholder="Password"
                  autoComplete="off"
               />
               {errors?.password && <p style={{ color: '#da4141', marginBottom: '10px' }}>{errors?.password?.message}</p>}
               <label className={styles.checkbox}>
                  <input type="checkbox" defaultValue="remember-me" id="rememberMe" checked={true} /> Запомнить меня
               </label>
               <button
                  className={styles.btn}
                  type="submit"
                  disabled={!isValid}
               >Войти</button>
            </form>
         </div>
      </>
   )
}
