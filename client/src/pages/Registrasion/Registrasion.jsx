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
      formState: { errors, isValid }
   } = useForm({
      defaultValues: {
         username: '',
         email: '',
         password: '',
      },
      mode: 'onBlur',
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
                  {...register("username", {
                     required: {
                        value: true,
                        message: 'Укажите никнейм'
                     },
                  })}
                  type='text'
                  className={styles['form-control']}
                  placeholder="Username"
                  autoFocus
                  autoComplete='off' />
               {errors?.username && <p style={{ color: '#da4141' }}>{errors?.username?.message}</p>}
               <input
                  {...register("email", {
                     required: {
                        value: true,
                        message: 'Укажите почту'
                     },
                     pattern: {
                        value: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*/i,
                        message: 'Некорректно указана почта'
                     }
                  })}
                  type="email"
                  className={styles['form-control']}
                  placeholder="Email"
                  autoComplete='off' />
               {errors?.email && <p style={{ color: '#da4141', marginBottom: '10px' }}>{errors?.email?.message}</p>}
               <input
                  {...register("password", {
                     required: {
                        value: true,
                        message: 'Укажите пароль'
                     }, minLength: {
                        value: 5,
                        message: 'Пароль должен содержать не менее 5 символов'
                     }
                  })}
                  type="password"
                  className={styles['form-control']}
                  placeholder="Password" />
               {errors?.password && <p style={{ color: '#da4141', marginBottom: '10px' }}>{errors?.password?.message}</p>}
               <label className={styles.checkbox}>
                  <input type="checkbox" defaultValue="remember-me" id="rememberMe" checked={true} /> Запомнить меня
               </label>
               <button
                  className={styles.btn}
                  type="submit"
                  disabled={!isValid}
               >Зарегистрироваться</button>
            </form>
         </div>
      </>
   )
}
