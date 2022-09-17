import axios from "axios"


//Empezamos a declarar las acciones con dispatch para despues
//ejecutarlas en los componentes con a travez del reducer

//Accion que trae todas las recetas de la API y DB
export const getAllRecipes = () =>{
    return async (dispatch) => {
        //Le pedimos que haga un fetch a nuestro backend y lo transforme en formato JSON
        const res = await axios.get("/recipes")
        //Le agregamos una referencia(GET_ALL_RECIPES) y un resultado (su payload)
         dispatch({type: "GET_ALL_RECIPES", payload: res.data})
    }
}

export const getRecipeDetail = (id) => {
    return async (dispatch) => {
      const res = await axios.get(`/recipes/${id}`)
      dispatch({type: "GET_RECIPES_DETAIL", payload: res.data})
    };
}

export const getAllDiets = () => {
    return async (dispatch) => {
        const res = await axios.get("/diet")
        dispatch({type: "GET_ALL_DIETS", payload: res.data})
    }
}

export const filterByDiet = (payload) => {
    return {type: "FILTER_BY_DIET", payload}
}

export const orderByName = (payload) => {
    return {type: "ORDER_BY_NAME", payload}
}

export const orderByHealth = (payload) => {
    return {type: "ORDER_BY_HEALTH", payload}
}

export const getRecipeSearch = (name) => {
    return async (dispatch) => {
        const res = await axios.get(`/recipes?name=${name}`)
        dispatch({type: "RECIPE_SEARCH", payload: res.data})
    }
}

export const postRecipe = (payload) => {
    return async (dispatch) => {
        return axios.post("/recipes/", payload)
    }
}