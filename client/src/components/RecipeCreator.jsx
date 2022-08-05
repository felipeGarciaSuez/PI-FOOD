import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllDiets, postRecipe} from "../redux/actions"
import validateForm from "../validateForm"
import styles from "./styles/RecipeCreator.module.css"


export default function RecipeCreator() {

    const [input, setInput] = React.useState({name: "", summary: "", healthScore: 0, steps: [{number: 1, step:""}], diets: []})
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    const [errors, setErrors] = React.useState({})

    let handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    let handleDietsChange = (e) => {
        let dietsArray = input.diets;
        dietsArray = e.target.checked ? [...dietsArray, e.target.name] : dietsArray.filter(diet => diet !== e.target.name);
        setInput({ ...input, diets: dietsArray });
      }

    let handleStepsChange = (e) => {
        let stepsArray = input.steps
        stepsArray[e.target.id - 1].step = e.target.value
        setInput({ ...input, steps: stepsArray })
    }

    let handleSubmitStep = (e) => {
        e.preventDefault()
        if(input.steps.length < 15) {
            const newStep = { number: input.steps[input.steps.length - 1].number + 1}
            setInput({...input, steps: [...input.steps, newStep]})
        } else {
            alert("La receta no puede tener mas de 15 pasos!!")
        }
    }

    let handleDeleteStep = (e) => {
        e.preventDefault()

        const newSteps = input.steps;
        if (newSteps.length > 1) {
            newSteps.pop()
            setInput({ ...input, steps: newSteps })
        }

        else alert("No puedes tener menos de un paso para la receta!!")
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        const errors = validateForm(input)
        setErrors(errors)
        if(Object.keys(errors).length === 0){
            dispatch(postRecipe(input))
            alert("Receta creada")
            setInput({
                name: "", 
                summary: "", 
                healthScore: 0, 
                steps: [{number: 1, step:""}], 
                diets: []
            })
        }
    }

    useEffect(() => {
        dispatch(getAllDiets())
    }, [dispatch])



    return (
        
        <div className={styles.frame}>
             <Link to="/home">Volver</Link>
            <h1 className={styles.title}>Crea tu receta</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className= {styles.top_form}>
                    <div className={styles.input_div}>
                        <label>Nombre: </label>
                        {errors.name && <span> {errors.name}</span>}
                        <input 
                            type = "text"
                            value={input.name}
                            onChange={(e) => handleInputChange(e)}
                            name = "name"
                        />
                        
                    </div>
                    

                    <div className={styles.input_div}>
                        <label>Resumen del plato: </label>
                        {errors.summary && <span> {errors.summary}</span>}
                        <input 
                            type = "text"
                            value={input.summary}
                            onChange={(e) => handleInputChange(e)}
                            name = "summary"
                        />
                        
                    </div>
                    

                    <div className={styles.input_div}>
                        <label>Puntuacion de salud: </label>
                        <input 
                            type = "number"
                            value={input.healthScore}
                            onChange={(e) => handleInputChange(e)}
                            name = "healthScore"
                            className= {styles.input_health}
                        />
                        {errors.healthScore && <span> {errors.healthScore}</span>}
                    </div>
                    
                    <div className={styles.input_div}>
                        <label>Agregar pasos: </label>
                        <button onClick={handleSubmitStep}>+</button>
                        <button onClick={handleDeleteStep}>-</button>
                        {errors.steps && <span>{errors.steps}</span>}
                    </div>
                    
                
                    <ol>
                        <h2>Pasos:</h2>
                        {input.steps.map(step => (
                            <li key={step.number}>
                                {step.number}.  <input type="text" id={step.number} name="step" onChange={handleStepsChange} autoComplete="off" />
                            </li>
                        ))}
                    </ol>
                </div>       

                <div className= {styles.diets_container}>
                {
                    diets?.map(d => {
                        return(<div key={d.id} className = {styles.diets_box}>
                            <label>{d.name.charAt(0).toUpperCase() + d.name.slice(1)}</label>
                            <input 
                                type = "checkbox" name = {d.name} value = {d.name} onChange={handleDietsChange}
                            />
                        </div>
                        )
                    })
                }
                </div>
                <button id ={styles.create_button} type="submit">Crear receta</button>
            </form>

            
        </div>
    )
}