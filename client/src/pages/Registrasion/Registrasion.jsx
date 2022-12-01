import { React } from 'react'
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserRegistration, selectIsAuth } from '../../redux/slice/authSlice'
import styles from '../Login/Login_and_Register.module.scss'

export const Registrasion = () => {

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      defaultValues: {
         username: '',
         email: '',
         password: '',
      }
   });

   const dispatch = useDispatch()
   const isAuth = useSelector(selectIsAuth)

   const onSubmit = (data) => {
      dispatch(fetchUserRegistration(data))
   }

   if (isAuth) {
      return <Navigate to='/' />
   }

   return (
      <>
         <div className={styles.wrapper}>
            <form className={styles['form-signin']} onSubmit={handleSubmit(onSubmit)}>
               <h2 className={styles['form-signin-heading']}>Регистрация</h2>
               <input
                  {...register("username", { required: 'Укажите никнейм', })}
                  type="text"
                  className={styles['form-control']}
                  placeholder="Username"
                  autoFocus
                  autoComplete="off" />
               {errors.username && <p style={{ color: '#da4141' }}>Укажите никнейм</p>}
               <input
                  {...register("email", { required: 'Укажите почту', })}
                  type="email"
                  className={styles['form-control']}
                  placeholder="Email"
                  autoComplete="off" />
               {errors?.email?.type === "required" &&
                  <p style={{ color: '#da4141' }}>Укажите почту</p>}
               <input
                  {...register("password", { required: 'Укажите пароль' })}
                  type="password"
                  className={styles['form-control']}
                  placeholder="Password"
                  required />
               {errors.password && <p style={{ color: '#da4141' }}>Укажите пароль</p>}
               <label className={styles.checkbox}>
                  <input type="checkbox" defaultValue="remember-me" id="rememberMe" name="rememberMe" /> Запомнить меня
               </label>
               <button
                  className={styles.btn}
                  type="submit">Зарегистрироваться</button>
            </form>
         </div>
      </>
   )
}
