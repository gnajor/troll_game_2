import { EdibleBlueprint } from "./edibles/edibleBlueprint.js";
import { globals } from "../../utils/globals.js";
import { PubSub } from "../../utils/pubsub.js";

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

PubSub.subscribe({
    event: "sendNeededDataToState",
    listener: (details) => {
        const {entityAmount, childInstanceAmount} = details;

        const pantries = [];
        const url = "../API/pantries.php";

        for(let i = 0; i < entityAmount; i++){
            const pantry = new Pantry(childInstanceAmount);
            pantries.push(pantry.pantry);
        }

        PubSub.publish({
            event: "sendDataToState",
            details: {"data": pantries, url, "type": "pantry"}
        });
    }
});