import { PubSub } from "../../utils/pubsub.js";
import { Ingredient } from "../ingredient/ingredient.js";
import { Edible } from "../edible/edible.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";

class Troll{
    static trollInstances = [];

    constructor(details){
        const {data, id, parentId} = details;

        this.parent = document.querySelector(parentId);
        this.troll = data;
        this.id = id;
        this.element = this.create();
        Troll.trollInstances.push(this);
        this.points = {
            trollDone: 20,
            overAmount: 4,
            withinZeroUnits: 100,
            whtinPointFiveUnits: 10,
            withinOneUnit: 8,
            withinTwoUnits: 6,
            withinThreeUnits: 4,
            withinMoreUnits: 2,
            trollNotLike: -1,
        }
    }

    create(){
        const trollElement = document.createElement("div");
        trollElement.className = "troll";
        trollElement.id = "troll_" + this.id;

        trollElement.addEventListener("dragover", (event) => event.preventDefault());
        trollElement.addEventListener("drop", this.onDropDeleteAmount.bind(this));

        const trollNameContainer = document.createElement("div");
        trollNameContainer.className = "troll_name";
        trollNameContainer.textContent = this.troll.name;
        trollElement.appendChild(trollNameContainer);

        const trollName = this.troll.name.toLowerCase();
        const image = document.createElement("div");
        image.className = this.troll.name.toLowerCase();
        trollElement.appendChild(image);

        const trollIngredientsContainer = document.createElement("div");
        trollIngredientsContainer.className = "ingredients_container";
        trollElement.appendChild(trollIngredientsContainer) 

        for(const ingredientData of this.troll.ingredients){
            const ingredient = new Ingredient({
                "data": ingredientData,
                "parent": trollIngredientsContainer,
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

        if(!edibleInstance.startedTransform){
            return;
        }

        const edibleIngredients = edibleInstance.edible.ingredients;
        const trollIngredients = Ingredient.ingredientInstances.troll.filter((ingredient) => ingredient.id === this.id);
        let score = 0;
        edibleInstance.timer.stop();


        trollIngredients.forEach(trollIngredient => {
            const specificEdibleIngredient = edibleIngredients.find(edibleIngredient => edibleIngredient.name === trollIngredient.ingredient.name);

            if(specificEdibleIngredient){
                const amountDifference = (trollIngredient.ingredient.amount - specificEdibleIngredient.amount).toFixed(2);
                trollIngredient.ingredient.amount = amountDifference

                if(amountDifference < 0){
                    trollIngredient.ingredient.amount = 0;
                    score += this.points.overAmount;
                }
                
                else if(amountDifference === 0){
                    score += this.points.withinZeroUnits;
                }

                else if(amountDifference <= 0.5){
                    trollIngredient.ingredient.amount = 0;
                    score += this.points.whtinPointFiveUnits;
                }

                else if(amountDifference <= 1){
                    score += this.points.withinOneUnit;
                }

                else if(amountDifference <= 2){
                    score += this.points.withinTwoUnits;
                }
                
                else if(amountDifference <= 3){
                    score += this.points.withinThreeUnits;
                }

                else{
                    score += this.points.withinMoreUnits;
                }
                trollIngredient.render();
                edibleInstance.destroy();
            }
            else{
                score += this.points.trollNotLike;
            }
        });

        if((trollIngredients.filter(trollIngredient => trollIngredient.amount === 0)).length === trollIngredients.length){
            score += this.points.trollDone;
            this.destroy();
        };
        pageHandler.handleScoreChange(score);
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