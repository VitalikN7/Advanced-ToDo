import { React } from 'react'
import styles from './Todos.module.scss'

export const Todos = ({ data, id, status, text, getClass, getDelete, setActive, setIdTodo }) => {

   return (
      <div className={styles.todos_list}>
         <div className={styles.todo_user_and_like}>
            <p className={styles.todo_data}>{'Дата создания:'}</p>
            <p className={styles.todo_data}>{data}</p>
         </div>
         <li className={`${styles.todo_item}`}>
            <span onClick={() => getClass(id)} className={
               status ? styles.disabled : null
            }>{text}</span>
            <span onClick={() => getDelete(id)} className={styles.todo_item__delete_button}>✖</span>
            <span onClick={() => { setIdTodo(id); setActive(true) }} className={styles.todo_item__edit_button}>✎</span>
         </li>
      </div >
   )
}
