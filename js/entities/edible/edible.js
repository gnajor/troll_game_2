import { PubSub } from "../../utils/pubsub.js";
import { Ingredient } from "../ingredient/ingredient.js";

export class Edible{
    static edibleInstances = [];

    constructor(details){
        const {data, parentId, id} = details;
        this.parent = document.querySelector(parentId);
        this.edible = data;
        this.id = id;
        this.element = this.create();
        this.beingProcessed = false;
        this.beingTransformed = false;
        this.processed = false;
        Edible.edibleInstances.push(this);
    }

    create(){
        const edibleElement = document.createElement("div");
        edibleElement.id = "edible_" + this.id;
        edibleElement.setAttribute("draggable", true);
        edibleElement.addEventListener("dragstart", this.onDragStart.bind(this));
        
        return edibleElement;
    }

    render(){
        this.element.innerHTML = "";
        this.parent.appendChild(this.element);
        this.element.textContent = this.edible.edible + ` (${this.edible.processes[0].preparation})`;

        for(let ingredientData of this.edible.ingredients){
            const ingredient = new Ingredient({
                "data": ingredientData, 
                "parent": this.element, 
                "time": this.edible.processes[0].time
            });
            ingredient.render();

        }

        if(this.beingProcessed || this.beingTransformed){
            const progressBar = document.createElement("div");
            const progression = document.createElement("div");
            progressBar.className = "progressBar";
            progression.className = "progress";
            this.element.appendChild(progressBar);
            progressBar.appendChild(progression);
        }
    }

    process(counter){
        this.render();
        const progression = this.element.querySelector(".progress");

        if(progression){
            const time = this.edible.processes[0].time;
            progression.style.width = (counter / time) * 100 + "%";
        }


      /*for(let ingredientData of this.edible.ingredients){
            const ingredient = new Ingredient({"data": ingredientData, "parent": this.element, "time": this.edible.processes[0].time});
            ingredient.process(counter);
            ingredient.originalAmount = ingredientData.amount; 
            this.render();
        }*/  
    }

    //hey hey woawh Im finished prepStation//

    finishProcessing(){
        this.beingProcessed = false;
        this.processed = true;
    }

    onDragStart(event){
        event.dataTransfer.setData("text/plain", this.id);
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