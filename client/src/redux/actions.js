import axios from "axios"


//Empezamos a declarar las acciones con dispatch para despues
//ejecutarlas en los componentes con a travez del reducer

//Accion que trae todas las recetas de la API y DB
export const getAllRecipes = () =>{
    return async (dispatch) => {
        //Le pedimos que haga un fetch a nuestro backend y lo transforme en formato JSON
        const res = await axios.get("/recipes")
        console.log(res)
        //Le agregamos una referencia(GET_ALL_RECIPES) y un resultado (su payload)
         dispatch({type: "GET_ALL_RECIPES", payload: res})
    }
}

export const getRecipeDetail = (id) => {
    return async (dispatch) => {
      return axios.get(`/recipes/${id}`)
      .then(response => response.json())
      .then(json => dispatch({type: "GET_RECIPES_DETAIL", payload: json}))
      .then(resultado => console.log(resultado))
      
    };
}

export const getAllDiets = () => {
    return async (dispatch) => {
        return axios.get("/diet")
        .then(response => response.json())
        .then(json => dispatch({type: "GET_ALL_DIETS", payload: json}))
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

            return axios.get(`/recipes?name=${name}`)
            .then(response => response.json())
            .then(json => dispatch({type: "RECIPE_SEARCH", payload: json}))
    }
}

export const postRecipe = (payload) => {
    return async (dispatch) => {
        return axios.post("/recipes/", payload)
    }
}