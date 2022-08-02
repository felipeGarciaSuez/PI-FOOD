const initialState = {
    recipes: [],
    diets: [],
    allRecipes: [],
    detail: []
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type) {

        case "GET_ALL_RECIPES" : 
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case "GET_ALL_DIETS" : 
            return{
                ...state,
                diets: action.payload
            }
        
        case "GET_RECIPES_DETAIL" : 
        return {
            ...state,
            detail: action.payload
        }

        case "FILTER_BY_DIET" :
            const allRecipes = state.allRecipes
            const recipesFiltered = action.payload === "all" ? allRecipes : allRecipes.filter(el => el.diets.includes(action.payload))

            return{
                ...state,
                recipes : recipesFiltered
            }

        case "ORDER_BY_NAME" : 
            var recipesOrder = []
            
            var ascending = state.recipes.sort((a, b) => {
                if(a.name.toUpperCase() > b.name.toUpperCase()) return 1
                if(a.name.toUpperCase() < b.name.toUpperCase()) return -1
                return 0
                })

            if(action.payload === "asc") recipesOrder = ascending
            else if(action.payload === "desc") recipesOrder = ascending.reverse()

            return{
                ...state,
                recipes : recipesOrder
            }

        case "ORDER_BY_HEALTH" : 
            var recipesOrder = []
            
            var ascending = state.recipes.sort((a, b) => {
                if(a.healthScore > b.healthScore) return 1
                if(a.healthScore < b.healthScore) return -1
                return 0
                })

            if(action.payload === "asc") recipesOrder = ascending
            else if(action.payload === "desc") recipesOrder = ascending.reverse()

            return{
                ...state,
                recipes : recipesOrder
            }


        case "RECIPE_SEARCH" :
            return{
                ...state,
                recipes: action.payload
            }
        default: return state

        case "POST_RECIPE" :
        return {
            ...state
        }
    }
}

export default rootReducer