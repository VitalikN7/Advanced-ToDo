import React from 'react'
import styles from './Button.module.scss'

export const Button = ({ getButton, click, addClass, text, id, idButton, setIdButton }) => {

   return (
      <button
         onClick={() => { getButton(click); setIdButton(id) }}
         className={`${styles.button} ${styles[addClass]} ${id === idButton ? styles.active : ""}`}
      >
         {text}
      </button>
   )
}
