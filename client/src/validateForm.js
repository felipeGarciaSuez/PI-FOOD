export default function validateForm (input) {
    let errors = {}

    if (!input.name) {
        errors.name = "Ingresa un nombre para la receta"
    } else if((!input.name.trim() || !/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.name) || input.name.length < 2)) {
        errors.name = "El nombre de la receta no debe contener caracteres especiales y debe contener mas de 2 caracteres"
    }else if(input.name.length > 30){
        errors.name = "El nombre de la receta debe contener como maximo 30 caracteres!"
    }

    if (!input.summary) {
        errors.summary = "Ingresa un resumen del plato";
    }

    if (input.healthScore === "-") {
        errors.healthScore = "Ingresa una puntuacion de salud";
    } else if (input.healthScore < 0 || input.healthScore > 100) {
        errors.healthScore = "La puntuacion de salud debe estar entre 0 y 100";
    }

    if(input.steps[0].step === "") {
        errors.steps = "La receta debe tener como minimo un paso"
    }
  return errors;
}