import React from "react";
import { getRecipeSearch } from "../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
        <div>
            <input type="text" placeholder="Receta..." onChange={(e) => handleInputChange(e)}/>
            <button type="submit" onClick={(e) => handleSubmitChange(e)}>Buscar</button>
        </div>
    )


}