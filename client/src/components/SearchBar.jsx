import React from "react";
import { getRecipeSearch } from "../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles/SearchBar.module.css"

export default function SearchBar ({page}) {

    const dispatch = useDispatch()
    const [search, setSearch] = useState("")

    const handleInputChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handleSubmitChange = (e) => {
        e.preventDefault()
        dispatch(getRecipeSearch(search))
        page(1)
    }

    return(
        <div className={styles.search_box}>
            <input className={styles.search_input} type="text" placeholder="Receta..." onChange={(e) => handleInputChange(e)}/>
            <button className={styles.search_button} type="submit" onClick={(e) => handleSubmitChange(e)}><i class ="fa-solid fa-magnifying-glass"></i></button>
        </div>
    )


}