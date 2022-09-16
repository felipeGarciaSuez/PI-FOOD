const { Router } = require("express");
const { resource } = require("../app");
const { Recipe, Diet, DishTypes } = require("../db");
require("dotenv").config();
const axios = require("axios").default;
const { apiDiets } = require("./diets");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { APIKEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Funcion encargada de traer informacion de la API
const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`
  );
  const infoRecipes = await apiUrl.data.results.map((each) => {
    var stepByStep = [];
    if (each.analyzedInstructions[0]) {
      const stepsInfo = each.analyzedInstructions[0].steps;
      stepsInfo.forEach((i) => {
        stepByStep = [...stepByStep, {number: i.number, step : i.step}];
      });
    }


    return {
      id: each.id,
      name: each.title,
      summary: each.summary,
      healthScore: each.healthScore,
      steps: stepByStep,
      diets: each.diets.map((e) => e),
      image: each.image,
      dishTypes: each.dishTypes.map((e) => e)
    };
  });
  return infoRecipes;
};

// Funcion encargada de traer informacion de la DataBase
const getDbInfo = async () => {
  try {
    const recipes = await Recipe.findAll({
      include: {
        model: Diet,
      },
    });
    let dataRecipes = recipes.map(d => d.dataValues)
    return dataRecipes.map(re => {
      return {
        ...re,
        diets: re.diets.map(diet => diet.name)
      }
    })
      
  } catch (e) {
    console.log(e);
  }
};

// Funcion encargada de concatenar todas las recetas y devolverlas
const getAllRecipes = async () => {
  await loadDiets()
  const dbRecipes = await getDbInfo();
  if(dbRecipes.length < 99) {
    const apiRecipes = await getApiInfo();
    apiRecipes.forEach(async recipe => {
      const res = await Recipe.create({
        name: recipe.name,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        image: recipe.image,
        steps: recipe.steps
      })
      recipe.diets.forEach(async d=> {
        let diet = await Diet.findOne({ where: { name: d } });
        await res.addDiet(diet.id)
      })
      recipe.dishTypes.forEach(async dish => {
        let dishInfo = await DishTypes.findOrCreate({where: {name: dish}})
        await res.addDishType(dishInfo.id)
      })
    })
  const final = await getDbInfo() 
  return final
  }
  return dbRecipes
};

//Funcion encargada de cargar las dietas en la base de datos

const loadDiets = async () => {
  apiDiets.forEach(async (diet) => {
    await Diet.findOrCreate({
      where: {
        name: diet,
      },
    });
  })
};


// Ruta GET encargada de traer todas las recetas o buscadas si existe req.query
router.get("/recipes", async (req, res) => {
    const allRecipes = await getAllRecipes();
    const { name } = req.query;
    console.log(allRecipes)

  try {

    if (name) {
      let found = await allRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()))
      console.log(found)


      if(found.length !== []) res.status(200).json(found)
      else res.status(404).send("Recipe not found :(")

    }else {
      res.status(200).json(allRecipes);
    }

  } catch (e) {
    res.status(400).send(e);
  }
});

//Ruta GET encargada de buscar recetas por ID
router.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allRecipes = await getAllRecipes();
    const found = allRecipes.find((recipe) => recipe.id == id);
    res.status(200).json(found);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/diet", async (req, res) => {
  try {
    loadDiets()
    const dbDiets = await Diet.findAll();
    res.status(200).send(dbDiets);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/recipes", async (req, res, next) => {
  const { name, summary, healthScore, steps, diets } = req.body;

  try {
    const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      steps,
      image: "https://www.happyeater.com/images/default-food-image.jpg"
    });

    diets.forEach(async (d) => {
      let diet = await Diet.findOne({ where: { name: d } });
      await newRecipe.addDiet(diet.id);
    });
    res.status(200).send("Receta creada");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
