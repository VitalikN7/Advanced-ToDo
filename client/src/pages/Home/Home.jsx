import { React, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   CSSTransition,
   TransitionGroup,
} from 'react-transition-group';
import usePagination from '../../hooks/usePagination';
import styles from './Home.module.scss'
import { Button } from '../../components/Ul/Button/Button'
import { Todos } from '../../components/Ul/Todos/Todos'
import { Pagination } from '../../components/Ul/Pagination/Pagination'
import { Modal } from '../../components/Modal/Modal';
import { Spinners } from '../../components/Spinners/Spinners';
import {
   fetchAddTodo,
   fetchAllTodo,
   fetchAllTodoStatus,
   fetchEditTodo,
   fetchTodoDelete,
   statusItemAllTodo
} from '../../redux/slice/todoSlice'
import { selectAllTodo } from '../../redux/slice/todoSlice';
import { selectAllButton } from '../../redux/slice/buttonSlice';
import { selectIsAuth } from '../../redux/slice/authSlice';

export const Home = () => {

   const dispatch = useDispatch()
   // Список задач из стора Redux
   const isTodos = useSelector(selectAllTodo)
   // Массив конопок
   const allButton = useSelector(selectAllButton)
   // Проверка авторизации
   const isAuth = useSelector(selectIsAuth)
   // Создания туду
   const [todo, setTodo] = useState('')
   // Изменить туду
   const [editTodo, setEditTodo] = useState('')
   // Вытащить id туду и изменить
   const [idTodo, setIdTodo] = useState(0)
   // Выполненая или невыполненая todo
   const [changeTodo, setChangeTodo] = useState([])
   const [clickName, setclickName] = useState([])
   // Пагинация   
   const {
      firstContentIndex,
      lastContentIndex,
      nextPage,
      prevPage,
      page,
      setPage,
      totalPages,
   } = usePagination({
      contentPerPage: 5,
      count: changeTodo?.length,
   });
   const [idButton, setIdButton] = useState(0)
   // Модальное окно
   const [modalActive, setModalActive] = useState(false)
   // Создания туду
   const getTodo = ((e) => {
      e.preventDefault()
      if (todo !== '') {
         dispatch(fetchAddTodo({ todo }))
      }
      setTodo('')
   })
   // Изменить туду
   const getEditTodo = async (e) => {
      e.preventDefault()
      if (editTodo !== '') {
         dispatch(fetchEditTodo({ editTodo, idTodo }))
      }
      setEditTodo('')
      setModalActive(false)
   }
   // Отображение всех todo первый раз когда отображается страница
   useEffect(() => {
      dispatch(fetchAllTodo())
   }, [dispatch, isTodos.addTodo, isTodos.editTodo])
   // Выполненая или невыполненая todo и добавление количество todo
   useEffect(() => {
      if (isTodos.allTodo !== undefined) {
         setChangeTodo(isTodos.allTodo)
      }
   }, [isTodos.allTodo])
   // Измение выполненой todo
   const getClass = (id) => {
      const res = isTodos.allTodo.map((el, i) => {
         if (el.id === id) {
            dispatch(fetchAllTodoStatus({ el }))
            return {
               ...el,
               status: !el.status
            }
         }
         return el
      })
      dispatch(statusItemAllTodo(res))
   }
   // Удаление ToDo
   const getDelete = (id) => {
      dispatch(fetchTodoDelete(id))
   }
   // Фильтрация ToDo
   const getButton = useCallback((click) => {

      if (click === 'allTodo') {
         setChangeTodo(isTodos.allTodo)
      }
      if (click === 'activeTodo') {
         const activeTodo = isTodos.allTodo.filter(el => {
            return el.status !== true
         })
         setChangeTodo(activeTodo)
      }
      if (click === 'complitedTodo') {
         const complitedTodo = isTodos.allTodo.filter(el => {
            return el.status === true
         })
         setChangeTodo(complitedTodo)
      }
      if (click === 'deleteTodo') {
         const deleteTodo = isTodos.allTodo.filter(el => {
            return el.status !== true
         })
         setChangeTodo(deleteTodo)
      }
   }, [isTodos.allTodo])

   useEffect(() => {
      getButton(clickName)
   }, [getButton, clickName,])

   return (
      <>
         <main className={styles.main}>
            <h1 className={styles.main_h1}>Todo Список</h1>
            <h3 className={styles.main_h3}>
               {`Всего задач: ${isTodos?.allTodo && isAuth ? isTodos?.allTodo?.length : 0}`}
            </h3>
            <form className={styles.form}>
               <input
                  type="text"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  className={styles.form_input}
                  placeholder="Добавить todo"
                  autoFocus
               />
               <button onClick={getTodo} className={styles.form_button} type="submit" >➕</button>
            </form>
            {!localStorage.getItem('token') ? (
               <h1 className={styles.title}>Чтобы создать ToDo зарегистрируйтесь или авторизуйтесь</h1>
            ) :
               isTodos.statusAllTodo === 'loaded'
                  ?
                  (<>
                     <ul>
                        {/* <TransitionGroup> */}
                        {changeTodo?.slice(firstContentIndex, lastContentIndex)
                           ?.map(({ id, createdAt, status, text_todo }) =>
                              // <CSSTransition
                              //    key={id}
                              //    timeout={500}
                              //    classNames='todos'
                              // >
                              <Todos
                                 key={id}
                                 data={createdAt.slice(0, 10)}
                                 id={id}
                                 status={status}
                                 text={text_todo}
                                 getClass={getClass}
                                 getDelete={getDelete}
                                 setActive={setModalActive}
                                 setIdTodo={setIdTodo}
                              />
                              // { /* </CSSTransition> */ }
                           )}
                        {/* </TransitionGroup> */}
                     </ul>
                     <div className={styles.button_container}>
                        {allButton.all.map(({ id, click, text, addClass }) => (
                           <Button
                              key={id}
                              getButton={setclickName}
                              click={click}
                              text={text}
                              addClass={addClass}
                              id={id}
                              idButton={idButton}
                              setIdButton={setIdButton}
                           />
                        ))}
                     </div>
                     <Pagination
                        page={page}
                        totalPages={totalPages}
                        prevPage={prevPage}
                        setPage={setPage}
                        nextPage={nextPage}
                     />
                  </>)
                  :
                  (<Spinners />)
            }
         </main >
         <Modal active={modalActive} setActive={setModalActive}>
            <form className={styles.modal}>
               <input
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className={styles.input_modal}
                  placeholder="Изменить todo"
                  type="text"
                  autoFocus
               />
               <button onClick={getEditTodo} className={styles.button_modal}>Изменить</button>
            </form>
         </Modal>
      </>
   )
}
