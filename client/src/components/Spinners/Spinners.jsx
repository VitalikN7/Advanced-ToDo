import React from 'react'
import styles from './Spinners.module.scss'

export const Spinners = () => {
   return (
      <div className={`${styles.container} ${styles['text-center']}`}>
         <div className={styles.row}>
            <div className={styles['col-sm-2']}>
               <div className={`${styles.sp} ${styles['sp-wave']}`}></div>
            </div>
         </div>
      </div >
   )
}