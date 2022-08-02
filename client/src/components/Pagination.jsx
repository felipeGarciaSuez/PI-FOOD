import React from "react";

export default function Pagination ({recipesPerPage, allRecipes, pagination}) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(number =>{
                        return <button key={number.toString()}><a onClick={()=>pagination(number)}>{number}</a></button>
                    })
                }
            </ul>
        </nav>
    )
}