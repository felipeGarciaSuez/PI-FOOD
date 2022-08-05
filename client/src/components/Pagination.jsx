import React from "react";
import styles from "./styles/Pagination.module.css"

export default function Pagination ({recipesPerPage, allRecipes, pagination, nextPage, prevPage}) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav className={styles.pagination}>
            <ul>
                <li className = {styles.prev} onClick={() => prevPage()}>{"<"}Anterior</li>
                {
                    pageNumbers &&
                    pageNumbers.map(number =>{
                        return <li className = {styles.page_number} key={number.toString()} onClick={()=>pagination(number)}>{number}</li>
                    })
                }
                <li className = {styles.next} onClick={() => nextPage(pageNumbers.length)}>Siguiente{">"}</li>
            </ul>
        </nav>
    )
}