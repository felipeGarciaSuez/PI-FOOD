import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllDiets, postRecipe} from "../redux/actions"
import validateForm from "../validateForm"


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
        const newStep = { number: input.steps[input.steps.length - 1].number + 1}
        setInput({...input, steps: [...input.steps, newStep]})
    }

    let handleDeleteStep = (e) => {
        e.preventDefault()

        const newSteps = input.steps;
        if (newSteps.length > 1) newSteps.pop()

        setInput({ ...input, steps: newSteps })
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
        <div>
            <Link to="/home">Volver</Link>
            <h1>Crea tu receta</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Nombre: </label>
                {errors.name && <span> {errors.name}</span>}
                <input 
                    type = "text"
                    value={input.name}
                    onChange={(e) => handleInputChange(e)}
                    name = "name"
                />

                <label>Resumen del plato: </label>
                {errors.summary && <span> {errors.summary}</span>}
                <input 
                    type = "text"
                    value={input.summary}
                    onChange={(e) => handleInputChange(e)}
                    name = "summary"
                />

                <label>Puntuacion de salud: </label>
                {errors.healthScore && <p> {errors.healthScore}</p>}
                <input 
                    type = "number"
                    value={input.healthScore}
                    onChange={(e) => handleInputChange(e)}
                    name = "healthScore"
                />

                <label>Agregar pasos: </label>
                <button onClick={handleSubmitStep}>+</button>
                <button onClick={handleDeleteStep}>-</button>
                {errors.steps && <p>{errors.steps}</p>}
                <ol>
                    {input.steps.map(step => (
                        <li key={step.number}>
                            <input type="text" id={step.number} name="step" onChange={handleStepsChange} autoComplete="off" />
                        </li>
                    ))}
                </ol>



                {
                    diets?.map(d => {
                        return(<div key={d.id}>
                            <label>{d.name}</label>
                            <input 
                                type = "checkbox" name = {d.name} value = {d.name} onChange={handleDietsChange}
                            />
                        </div>
                        )
                    })
                }
                <button type="submit">Crear receta</button>
            </form>

            
        </div>
    )
}