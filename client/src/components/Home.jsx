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

    const nextPage = (totalPages) => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        console.log("entro")
        if(currentPage > 1){
            console.log("entro el if")
            setCurrentPage(currentPage - 1)
        }
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
                <div className={styles.container_left}>
                    <div className={styles.wrapper}>
                        <div className = {styles.searchBar}><SearchBar page={setCurrentPage}/></div>
                        <div className = {`${styles.icon} ${styles.add_recipe}`} >
                            <div className={styles.tooltip}>Crear receta</div>
                            <span><Link to = "/recipes"><i class="fa-solid fa-plus" className={styles.fa_add}></i></Link></span>
                        </div>
                        <div className = {`${styles.icon} ${styles.reset_recipes}`}>
                            <div className={styles.tooltip} >Recargar recetas</div>
                            <span onClick={(e) => handleSubmitChange(e)}><i class="fa-solid fa-rotate-right" className={styles.fa_reload}></i></span>
                        </div>
                        
                    </div>
                    <div className={styles.filters}>
                        <select className = {styles.select} onChange= {e => handleOrderByName(e)}>
                            <option value="default">Ordenar por nombre</option>
                            <option value="asc">Nombre ascendente</option>
                            <option value="desc">Nombre descendente</option>
                        </select>

                        <select className = {styles.select}  onChange= {e => handleOrderByHealth(e)}>
                            <option value="default">Ordenar por salud</option>
                            <option value="asc">Salud ascendente</option>
                            <option value="desc">Salud descendente</option>
                        </select>

                        <select className = {styles.select}  onChange= {e => handleFilterStatus(e)}>
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
                        
                </div>
                <img className={styles.logo} src="/images/foodlogo.png"/>
                
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
                <Pagination 
                    recipesPerPage={recipesPerPage} 
                    allRecipes={allRecipes.length} 
                    pagination={pagination} 
                    prevPage = {prevPage} 
                    nextPage = {nextPage}
                />
              
        </div>
    )
}