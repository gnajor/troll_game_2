import { PubSub } from "../../../utils/pubsub.js";

class Troll{
    static trollInstances = [];

    constructor(details){
        const {troll, id, parentSelector} = details;
        this.parent = document.querySelector(parentSelector);
        this.troll = troll;
        this.id = id;
        this.element = this.create();
        Troll.trollInstances.push(this);
    }

    create(){
        const trollElement = document.createElement("div");
        trollElement.className = "troll";
        trollElement.id = "troll_" + this.id;
        trollElement.textContent = this.troll.troll;
        return trollElement;
    }

    render(){
        this.parent.appendChild(this.element);

        for(let ingredient of this.troll.ingredients){
            this.renderIngredients(ingredient, this.element);
        }
    }

    renderIngredients(ingredient, parent){
        const ingredientElement = document.createElement("div");
        ingredientElement.className = this.troll.troll + "_" + ingredient.name;
        ingredientElement.textContent = ingredient.name + ":" + ingredient.amount;
        parent.appendChild(ingredientElement);
    }
}

PubSub.subscribe({
    event: "renderTrolls",
    listener: (details) => {
        const troll = new Troll(details);
        troll.render();
    }
})