import { React } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserlogout, selectIsUser } from '../../redux/slice/authSlice'
import { Container } from '../Ul/Container/Container'
import styles from './Header.module.scss'
import { selectIsAuth } from '../../redux/slice/authSlice';

export const Header = () => {

   const isAuth = useSelector(selectIsAuth)
   const isUser = useSelector(selectIsUser)

   const dispatch = useDispatch()

   function onClickLogout() {
      dispatch(fetchUserlogout());
   }

   return (
      <Container>
         <header className={styles.header}>
            <div className={styles.header_inner}>
               <Link className={styles.header_logo} to="/">ToDo</Link>
               <nav className={styles.header_nav}>
                  {isAuth ? (
                     <>
                        <p className={styles.header_hello}>{`Привет ${isUser.username}`}</p>
                        <Link className={styles.header_profile} to="/profile">Личный кабинет</Link>
                        <p onClick={onClickLogout} className={styles.header_profile} >Выйти</p>
                     </>
                  ) : (
                     <>
                        <Link className={styles.header_profile} to="/login">Войти</Link>
                        <Link className={styles.header_profile} to="/register">Зарегистрироваться</Link>
                     </>
                  )}
               </nav>
            </div>
         </header>
      </Container >
   )
}


