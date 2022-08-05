import React, { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeDetail } from "../redux/actions";
import styles from "./styles/RecipeDetail.module.css"

export default function RecipeDetail (props) {
    const dispatch = useDispatch()
    const recipe = useSelector((state) => state.detail)
    const [loading, setLoading] = useState(true)
    const [recipeID, setRecipeID] = useState()


    useEffect(() => {
        dispatch(getRecipeDetail(props.match.params.id))
        .then(() => setLoading(false))
    },[dispatch])

    

    return(
        <div>
            {
                loading ? (
                    <div className = {styles.loading}>Cargando...</div>
                ) : (
                    
                    <div className = {styles.info_container}>
                        <Link to={"/home"}><button>Volver al inicio</button></Link>
                        <h1>{recipe.name}</h1>
                        <div className = {styles.top_div}>
                            <img src={recipe.image}/>
                            <div className = {styles.types}>
                                <div className = {styles.diets}>
                                    {
                                        recipe.diets ? (
                                            <h2>Tipos de dietas de la receta: {recipe.diets && recipe.diets.join(", ").charAt(0).toUpperCase() + recipe.diets.join(", ").slice(1)}
                                            </h2>
                                        ) : (
                                            <h2>Esta receta no contiene tipo de dietas</h2>
                                        )
                                    }
                                </div>
                                <div className = {styles.dish}>
                                {
                                    recipe.dishTypes ? (
                                        <h2>Tipos de platos de la receta: {
                                            recipe.dishTypes && recipe.dishTypes.join(", ").charAt(0).toUpperCase() + recipe.dishTypes.join(", ").slice(1)}
                                        </h2>
                                    ) : (
                                        <h2>Esta receta no contiene tipo de platos</h2>
                                    )
                                }  
                                </div>
                                <h2>La puntuacion de salud de esta receta es de <b>{recipe.healthScore}</b> puntos</h2>
                            </div> 
                        </div>

                        
                           
                        
                        <div className = {styles.summary}>{recipe.summary.replace(/<[^>]*>?/g, "")}</div>
                        <div className = {styles.steps}>
                        {
                            recipe.steps && recipe.steps.map(step => {
                                return (
                                <div key={step.number} className = {styles.stepbox}>
                                    <h2>Paso {step.number}: </h2>
                                    <h4>{step.step}</h4>
                                </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )
            }
        </div>
    )
}