import { PubSub } from "../../utils/pubsub.js";
import { Ingredient } from "../ingredient/ingredient.js";
import { Edible } from "../edible/edible.js";

class Troll{
    static trollInstances = [];

    constructor(details){
        const {data, id, parentId} = details;
        this.parent = document.querySelector(parentId);
        this.troll = data;
        this.id = id;
        this.element = this.create();
        Troll.trollInstances.push(this);
    }

    create(){
        const trollElement = document.createElement("div");
        trollElement.className = "troll";
        trollElement.id = "troll_" + this.id;
        trollElement.textContent = this.troll.troll;

        trollElement.addEventListener("dragover", (event) => event.preventDefault());
        trollElement.addEventListener("drop", this.onDropDeleteAmount.bind(this));

        for(let ingredientData of this.troll.ingredients){
            const ingredient = new Ingredient({
                "data": ingredientData,
                "parent": trollElement,
                "type": "troll",
                "id": this.id
            });
            ingredient.render();
        }
        return trollElement;
    }

    render(){
        this.parent.appendChild(this.element);
    }

    onDropDeleteAmount(event){
        const id = Number(event.dataTransfer.getData("text/plain")); 
        const edibleInstance = Edible.edibleInstances.find(edible => edible.id === id);
        const edibleIngredients = edibleInstance.edible.ingredients;
        const trollIngredients = Ingredient.ingredientInstances.troll.filter((ingredient) => ingredient.id === this.id);

        trollIngredients.forEach(trollIngredient => {
            const specificEdibleIngredient = edibleIngredients.find(edibleIngredient => edibleIngredient.name === trollIngredient.ingredient.name);

            if(specificEdibleIngredient){
                trollIngredient.ingredient.amount = (trollIngredient.ingredient.amount - specificEdibleIngredient.amount).toFixed(2);

                if(trollIngredient.ingredient.amount < 0){
                    trollIngredient.ingredient.amount = 0;
                }
                trollIngredient.render();
                edibleInstance.destroy();
            }
        });
    }

    destroy(){
        this.element.remove();
    }
}

PubSub.subscribe({
    event: "renderTrolls",
    listener: (details) => {
        const troll = new Troll(details);
        troll.render();
    }
})