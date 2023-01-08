import { React, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import {
//    CSSTransition,
//    TransitionGroup,
// } from 'react-transition-group';
import usePagination from '../../hooks/usePagination';
import styles from './Home.module.scss'
import { Button } from '../../components/Ul/Button/Button'
import { Todos } from '../../components/Ul/Todos/Todos'
import { Pagination } from '../../components/Ul/Pagination/Pagination'
import { Modal } from '../../components/Modal/Modal';
import { Spinner } from '../../components/Spinner/Spinner';
import {
   fetchAddTodo,
   fetchAllTodo,
   fetchAllTodoStatus,
   fetchEditTodo,
   fetchTodoDelete,
   filterItemAllTodo,
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
   const [addTodo, setAddTodo] = useState({
      todo: '',
      editTodo: '',
   })
   const [isValid, setIsValid] = useState({
      todo: false,
      editTodo: false,
   })
   // Вытащить id туду и изменить
   const [idTodo, setIdTodo] = useState(0)
   // Выполненая или невыполненая todo
   const [changeTodo, setChangeTodo] = useState([])
   const [clickName, setclickName] = useState('')
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
   const getTodo = (e) => {
      e.preventDefault()
      const { todo } = addTodo
      if (todo.length) {
         dispatch(fetchAddTodo({ todo }))
         setIsValid({
            ...isValid, todo: false
         })
         setAddTodo({
            todo: '',
            editTodo: '',
         })
      } else {
         setIsValid({
            ...isValid, todo: true
         })
      }
   }
   // Изменить туду
   const getEdiTodo = (e) => {
      e.preventDefault()
      const { editTodo } = addTodo
      if (editTodo.length) {
         dispatch(fetchEditTodo({ editTodo, idTodo }))
         setModalActive(false)
         setIsValid({
            ...isValid, editTodo: false
         })
         setAddTodo({
            todo: '',
            editTodo: '',
         })
      } else {
         setIsValid({
            ...isValid, editTodo: true
         })
      }
   }
   // Отображение всех todo первый раз когда отображается страница
   useEffect(() => {
      dispatch(fetchAllTodo())
   }, [dispatch])
   // Выполненая или невыполненая todo и добавление количество todo
   useEffect(() => {
      if (isTodos.allTodo !== undefined) {
         setChangeTodo(isTodos.allTodo)
      }
   }, [isTodos.allTodo])

   useEffect(() => {
      dispatch(fetchAllTodo())
   }, [dispatch, isTodos.editTodo, isTodos.addTodo])
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
   useEffect(() => {
      setChangeTodo(isTodos.filterTodo)
   }, [isTodos.filterTodo])

   useEffect(() => {
      getButtonFilter(clickName)
   }, [clickName])

   const getButtonFilter = (click) => {
      dispatch(filterItemAllTodo(click))
   }

   return (
      <>
         <main className={styles.main}>
            <h1 className={styles.main_h1}>Todo Список</h1>
            <h3 className={styles.main_h3}>
               {`Всего задач: ${isTodos?.allTodo && isAuth ? isTodos?.allTodo?.length : 0}`}
            </h3>
            {isAuth && <form className={`${styles.form}`}>
               <input
                  value={addTodo.todo}
                  onChange={e => setAddTodo({ ...addTodo, todo: e.target.value })}
                  className={styles.form_input}
                  placeholder="Добавить todo"
                  autoFocus={true}
                  autoComplete='off'
               />
               <button onClick={getTodo} className={styles.form_button} type="submit" >➕</button>
               {isValid.todo && <p className={styles.valid}>Напишите хотя бы что нибудь</p>}
            </form>}
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
                              //    mountOnEnter
                              //    unmountOnExit
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
                              // </CSSTransition>
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
                  (<Spinner />)
            }
         </main >
         <Modal active={modalActive} setActive={setModalActive}>
            <form className={styles.modal}>
               <input
                  value={addTodo.editTodo}
                  onChange={e => setAddTodo({ ...addTodo, editTodo: e.target.value })}
                  className={styles.input_modal}
                  placeholder="Изменить todo"
                  autoFocus={true}
                  autoComplete='off'
               />
               <button onClick={getEdiTodo} className={styles.button_modal}>Изменить</button>
            </form>
            {isValid.editTodo && <p className={styles.valid}>Напишите хотя бы что нибудь</p>}
         </Modal>
      </>
   )
}
