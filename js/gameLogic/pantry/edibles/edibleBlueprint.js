import {globals} from "../../../utils/globals.js";

export class EdibleBlueprint{
    static registeredClasses = [];

    constructor(details){
        const {ingredients, processes} = details;

        ingredients.forEach(ingredient => {
            const ingredientAmount = globals.generateRandomDouble(ingredient.min, ingredient.max);

            delete ingredient.min;
            delete ingredient.max;
            ingredient.amount = Number(ingredientAmount);
        });

        this.edible = {
            "edible": this.constructor.name,
            "ingredients": ingredients, 
            "processes": processes
        }
    }

    static registerEdible(subclass){
        EdibleBlueprint.registeredClasses.push(subclass)
    }
}