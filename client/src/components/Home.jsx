import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import NavBar from "./NavBar";
import Card from "./Card";
import { Fragment, useEffect, useState } from "react";
import { getAllRecipes } from "../redux/actions";
import Pagination from "./Pagination";



export default function Home() {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    // Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)


    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
        dispatch(getAllRecipes())
    }, [dispatch])

    let handleSubmitChange = (e) => {
        e.preventDefault()
        dispatch(getAllRecipes())
    }




    return (
        <div>
            <Link to = "/recipes">Crear receta</Link>
            <h1>Hola</h1>
            <button onSubmit={(e) => handleSubmitChange(e)}>Voler a cargar las recetas</button>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="asc ">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="type_diet">Tipo de dieta</option>
                </select>
                <Pagination recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagination={pagination} />
                {
                currentRecipes?.map(e => {
                    return (<div>
                        <Link to = {/recipes/ + e.id}>
                            <Card name={e.name} image={e.image} diets={e.diets}/>
                        </Link></div>
                )})
            }
            
            </div>  
        </div>
    )
}