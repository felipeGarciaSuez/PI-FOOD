import React from "react"
import { useDispatch } from "react-redux"


export default function recipeCreator() {

    const [input, setInput] = React.useState({name: "", summary: "", healthScore: 0, steps: []})

    let handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch()

    let handleSubmitChange = (e) => {
        e.preventDefault()
        dispatch(recipeCreator(input))
    }
    return (
        <form onSubmit={(e) => handleSubmitChange(e)}>
            <label>Nombre: </label>
            <input 
                type = "text"
                value={input.name}
                onChange={(e) => handleInputChange(e)}
                name = "name"
            />

            <label>Resumen del plato: </label>
            <input 
                type = "text"
                value={input.name}
                onChange={(e) => handleInputChange(e)}
                name = "summary"
            />

            <label>Puntuacion de salud: </label>
            <input 
                type = "number"
                value={input.name}
                onChange={(e) => handleInputChange(e)}
                name = "healthScore"
            />
        </form>
    )
}