import React, { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeDetail } from "../redux/actions";

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
                    <div>Cargando...</div>
                ) : (
                    
                    <div>
                        <Link to={"/home"}><button>Volver...</button></Link>
                        <h1>{recipe.name}</h1>
                        <img src={recipe.image}/>
                        
                        {
                            recipe.diets ? (
                                <h2>Tipos de dietas de la receta: {recipe.diets && recipe.diets.join(", ").charAt(0).toUpperCase() + recipe.diets.join(", ").slice(1)}
                                </h2>
                            ) : (
                                <h2>Esta receta no contiene tipo de dietas</h2>
                            )
                        }


                        
                        {
                            recipe.dishTypes ? (
                                <h2>Tipos de platos de la receta: {
                                    recipe.dishTypes && recipe.dishTypes.join(", ").charAt(0).toUpperCase() + recipe.dishTypes.join(", ").slice(1)}
                                </h2>
                            ) : (
                                <h2>Esta receta no contiene tipo de platos</h2>
                            )
                        }   
                        
                        {recipe.summary}
                        <h3>La puntuacion de salud de esta receta es de {recipe.healthScore} puntos</h3>
                        {
                            recipe.steps && recipe.steps.map(step => {
                                return <h4 key={step.number}>Paso {step.number}: {step.step}</h4>
                            })
                        }
                
                    </div>
                )
            }
        </div>
    )
}