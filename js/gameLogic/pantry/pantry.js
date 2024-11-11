import { EdibleBlueprint } from "./edibles/edibleBlueprint.js";
import { globals } from "../../utils/globals.js";

export class Pantry{
    constructor(instanceAmount){
        const pantry = this.getPantry(instanceAmount);
        const shuffledPantry = globals.shuffle(pantry);
        this.pantry = shuffledPantry;
    }

    getPantry(instanceAmount){
        let pantry = [];

        for(let i = 0; i < instanceAmount; i++){
            for(let edibleClass of EdibleBlueprint.registeredClasses){
                let edible_data = new edibleClass;
                pantry.push(edible_data.edible);
            }
        }
        return pantry;
    }  
}