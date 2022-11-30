import { React } from 'react'
import styles from './Pagination.module.scss'

export const Pagination = ({ page, totalPages, prevPage, setPage, nextPage }) => {

   return (
      <nav className={styles.page_item}>
         <p className={styles.text}>
            {page}/{totalPages}
         </p>
         <button
            onClick={prevPage}
            className={styles.page}
         >
            &larr;
         </button>
         {
            totalPages > 0 ? (
               [...Array(totalPages)?.keys()]?.map((el) => (
                  <button
                     onClick={() => setPage(el + 1)}
                     key={el}
                     className={`${styles.page} ${page === el + 1 ? styles.active : ""}`}
                  >
                     {el + 1}
                  </button>
               ))
            ) : null
         }
         <button onClick={nextPage} className={styles.page}>
            &rarr;
         </button>
      </nav>
   )
}