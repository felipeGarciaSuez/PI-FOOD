import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import Card from "./Card";
import { Fragment, useEffect, useState } from "react";
import { getAllRecipes, getAllDiets, filterByDiet, orderByName, orderByHealth} from "../redux/actions";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import styles from "./styles/Home.module.css"



export default function Home() {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const allDiets = useSelector((state) => state.diets)
    // Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    // Ordenado
    const [order, setOrder] = useState("")


    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getAllDiets())
    }, [dispatch])

    useEffect(()=>{
        dispatch(getAllRecipes())
    }, [dispatch])

    let handleSubmitChange = (e) => {
        e.preventDefault()
        dispatch(getAllRecipes())
    }

    function handleFilterStatus (e){
        dispatch(filterByDiet(e.target.value))
    }

    function handleOrderByName (e) {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleOrderByHealth (e) {
        dispatch(orderByHealth(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    return (
        <div>
            
            <div className={styles.navBar}>
                <h1>FOOD API</h1>
                <div><Link to = "/recipes">Crear receta</Link></div>
                <div onClick={(e) => handleSubmitChange(e)}>Voler a cargar las recetas</div>

                <div>
                    <select onChange= {e => handleOrderByName(e)}>
                        <option value="asc">Nombre ascendente</option>
                        <option value="desc">Nombre descendente</option>
                    </select>

                    <select onChange= {e => handleOrderByHealth(e)}>
                        <option value="asc">Health score ascendente</option>
                        <option value="desc">Health score descendente</option>
                    </select>

                    <select onChange= {e => handleFilterStatus(e)}>
                        <option value="all">Todas las dietas</option>
                        {
                            allDiets?.map(d => {
                                return (
                                    <option value= {d.name} key={d.id}>
                                        {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>   
                    <SearchBar page={setCurrentPage}/>
                
            </div>
            <div id={styles.cardContainer}>
                {
                currentRecipes?.map(e => {
                    return (
                        <div className={styles.entire_card}>
                            <Link to = {/recipes/ + e.id}>
                                <Card  name={e.name} image={e.image} diets={e.diets}/>
                            </Link>
                        </div>
                )})
                }</div>
                <Pagination recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagination={pagination} />
              
        </div>
    )
}