const { Router } = require('express');
const Recipe = require('../models/Recipe');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {APIKEY} = process.env


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`)
    const infoRecipes = await apiUrl.formData.results.map((each)=>{
        id: each.id
        name: each.title
        summary: each.summary
        healthScore: each.healthScore
        stepByStep: each.analyzedInstructions.map((e)=>e)
    })
    await Recipe.bulkCreate(infoRecipes)
}



module.exports = router;
