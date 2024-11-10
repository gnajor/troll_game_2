import { PubSub } from "../../utils/pubsub.js";

export class Edible{
    static edibleInstances = [];

    constructor(details){
        const {edible, parentSelector, id} = details;
        this.parent = document.querySelector(parentSelector);
        this.edible = edible;
        this.id = id;
        this.element = this.create();
        Edible.edibleInstances.push(this);
    }

    create(){
        const edibleElement = document.createElement("div");
        edibleElement.id = "edible_" + this.id;
        edibleElement.textContent = this.edible.edible + ` (${this.edible.processes[0].preparation})`;
        edibleElement.setAttribute("draggable", true);
        edibleElement.addEventListener("dragstart", this.onDragStart.bind(this));
        return edibleElement;
    }

    render(){
        this.parent.appendChild(this.element);

        for(let ingredient of this.edible.ingredients){
            this.renderIngredients(ingredient, this.element);
        }
    }

    onDragStart(event){
        event.dataTransfer.setData("text/plain", this.id);
    }

    renderIngredients(ingredient){
        const ingredientElement = document.createElement("div");
        ingredientElement.className = ingredient.name;
        ingredientElement.textContent = ingredient.name + ": " + ingredient.amount;
        this.element.appendChild(ingredientElement);
    }
}

PubSub.subscribe({
    event: "renderEdibles",
    listener: (details) => {
        const edible = new Edible(details);
        edible.render();
    }
});


//ingredients should have it own class

/* Edible{
    beingPrep(prepStationInstance){
        this.beingProcessed = true;
        for(let ingredient of ingredients.dom(prep){
        
        })
    }
} */

//all logic about the edible should be in the edible 
//so there should be a method in Edible that says being prepped which then changes its ingredients and then render them.
//so then in the prepStation you can say: edibleInstance.parent = newParent.
//render = update data

//if render is being called then it will not just render its data on new, as it will instead just render another one.

//a parent class that could have create, render and what do they have in common || composition function
//make dropzone, 

//file system
//entities
//NO compenents only Entites
//In index renderStructure and all that eller i app.js

//drag and drop

//timer is going to effect the edible instance every time it ticks