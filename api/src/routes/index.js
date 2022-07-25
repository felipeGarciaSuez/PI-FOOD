const { Router } = require('express');
const {Recipe, Diet} = require("../db");
require('dotenv').config();
const axios = require("axios").default
const {apiDiets} = require("./diets")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {APIKEY} = process.env


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// Funcion encargada de traer informacion de la API
const getApiInfo = async () => {
    
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`)
    const infoRecipes = await apiUrl.data.results.map((each)=>{

        var stepByStep = "";
        if (each.analyzedInstructions[0]) {
            const stepsInfo = each.analyzedInstructions[0].steps;
            stepsInfo.forEach((i) => {
                stepByStep += i.number + ". " + i.step;
            });
        }

        return{
            id: each.id,
            name: each.title,
            summary: each.summary,
            healthScore: each.healthScore,
            stepByStep: stepByStep,
            diets: each.diets.map((e)=>e),
            image: each.image
    }})
    return infoRecipes
}

// Funcion encargada de traer informacion de la DataBase
const getDbInfo = async () => {
    try {
        const infoRecipes = await Recipe.findAll({
            include:{
                model: Diet
            }
        })

        return infoRecipes
    } catch(e) {
        console.log(e)
    }
}

// Funcion encargada de concatenar todas las recetas y devolverlas 
const getAllRecipes = async () => {
    const apiRecipes = await getApiInfo()
    const dbRecipes = await getDbInfo()
    const allRecipes = apiRecipes.concat(dbRecipes)
    console.log(allRecipes)

    return allRecipes
}

//Funcion encargada de cargar las dietas en la base de datos

const loadDiets = async () => {
    const load = await apiDiets.forEach(e=>Diet.create({name:e}))
    return load
}

// Ruta GET encargada de traer todas las recetas
router.get("/", async (req, res) => {
    try {
        loadDiets()
        const allRecipes = await getAllRecipes()
        res.status(200).json(allRecipes)
    } catch(e) {
        res.status(400).send(e)
    }
})

//Ruta GET encargada de buscar recetas por palabra clave
router.get("/recipes", async (req, res) => {
    try {
        const {name} = req.query
        const allRecipes = await getAllRecipes()
        const found = allRecipes.find(recipe => recipe.name.indexOf(name) != 0)
        res.status(200).json(found)
    } catch(e) {
        res.status(400).send(e)
    }
})

//Ruta GET encargada de buscar recetas por ID
router.get("/recipes/:id", async (req, res) => {
    try {
        const {id} = req.params
        const allRecipes = await getAllRecipes()
        const found = allRecipes.find(recipe => recipe.id == id)
        res.status(200).json(found)
    } catch(e) {
        res.status(400).send(e)
    }
})


router.get("/diet", async (req, res) =>{
    
      try {
        apiDiets.forEach(async (diet) => {
          await Diet.findOrCreate({
            where: {
              name: diet,
            },
          });
        });
        const dbDiets = await Diet.findAll()
        res.status(200).send(dbDiets);
      } catch (e) {
            next(e);
      }
})


router.post("/recipes", async (req, res, next) => {
    const {name, summary, healthScore, steps , diets} = req.body
 
    try{
        const newRecipe = await Recipe.create({name, summary, healthScore, steps})
        
        diets.forEach(async (d) => {
            let diet = await Diet.findOne({ where: {name: d}})
            await newRecipe.addDiet(diet.id)
        })
        res.status(200).send("Receta creada")
    }catch(e){
       next(e)
    }
})

module.exports = router;
