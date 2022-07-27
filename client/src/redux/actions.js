
//Empezamos a declarar las acciones con dispatch para despues
//ejecutarlas en los componentes con a travez del reducer

//Accion que trae todas las recetas de la API y DB
export const getAllRecipes = () =>{
    return async (dispatch) => {
        //Le pedimos que haga un fetch a nuestro backend y lo transforme en formato JSON
        return fetch("http://localhost:3001/recipes")
        .then(response => response.json())
        //Le agregamos una referencia(GET_ALL_RECIPES) y un resultado (su payload)
        .then(json => dispatch({type: "GET_ALL_RECIPES", payload: json}))
        .then(res=> console.log(res))
    }
}

export const getProductDetail = (id) => {
    return async (dispatch) => {
      return fetch(`http://localhost:3001/recipes/${id}`)
      .then(response=>response.json())
      .then(json=>dispatch({type: "GET_RECIPES_DETAIL", payload: json}))
    };
}

export const createRecipe = (name, summary, healthScore, steps, diets) => {
    return{
        type: "CREATE_RECIPE",  payload:{name, summary, healthScore, steps, diets}
    }
}

export const filterByDiet = (diets) =>{

}