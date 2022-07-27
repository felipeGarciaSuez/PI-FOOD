import React from "react";

export default function Pagination ({recipesPerPage, allRecipes, pagination}) {
    const pageNumbers = []

    for(let i = 0; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(number =>{
                        <a onClick={()=>pagination(number)}>{number}</a>
                    })
                }
            </ul>
        </nav>
    )
}