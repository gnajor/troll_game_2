import {globals} from "../../../utils/globals.js";

export class TrollBlueprint{
    static registeredClasses = [];

    constructor(ingredients){
        ingredients.forEach(ingredient => {
            const ingredientAmount = globals.generateRandomDouble(ingredient.min, ingredient.max);

            delete ingredient.min;
            delete ingredient.max;
            ingredient.amount = Number(ingredientAmount);
        });

        this.troll = {
            "troll": this.constructor.name,
            "ingredients": ingredients 
        }
    }

    static registerTroll(subclass){
        TrollBlueprint.registeredClasses.push(subclass)
    }
}