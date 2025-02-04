import { PubSub } from "../../utils/pubsub.js";
import { Ingredient } from "../ingredient/ingredient.js";
import { Timer } from "../timer/timer.js";

export class Edible{
    static edibleInstances = [];

    constructor(details){
        const {data, parentId, id} = details;
        this.edible = data;
        this.id = id;
        this.beingProcessed = false;
        this.prepared = false;
        this.startedTransform = false;
        this.transformed = false;
        this.currentStation = null;
        this.timer = null;
        this.parent = document.querySelector(parentId);
        this.element = this.create();
        Edible.edibleInstances.push(this);
    }

    create(){
        const edibleElement = document.createElement("div");
        edibleElement.id = "edible_" + this.id;
        edibleElement.className = "edible";
        edibleElement.setAttribute("draggable", true);
        edibleElement.addEventListener("dragstart", this.onDragStart.bind(this));

        const textContainer = document.createElement("div");
        textContainer.className = "text_container";
        edibleElement.appendChild(textContainer);

        const ingredientContainer = document.createElement("div");
        ingredientContainer.id = "ingredient_container";
        edibleElement.appendChild(ingredientContainer);

        for(const ingredientData of this.edible.ingredients){
            const ingredient = new Ingredient({
                "data": ingredientData, 
                "parent": ingredientContainer, 
                "type": "edible",
                "id": this.id
            });
            ingredient.render();
            ingredient.storeStartAmount();
        }
        
        return edibleElement;
    }

    render(){
        this.parent.appendChild(this.element);

        const textContainer = this.element.querySelector(".text_container");
        textContainer.textContent = this.edible.name + ` (${this.edible.prep_method})`;

        const ingredientInstances = Ingredient.ingredientInstances.edible.filter((ingredient) => ingredient.id === this.id);
        for(const ingredientInstance of ingredientInstances){
            ingredientInstance.render(); 
        }  
    }

    destroy(){
        this.currentStation.finishedUsing();
        this.element.remove();
    }

    startProcess(processType, newParent = this.parent, currentStation = this.currentStation){
        const processDetails = this.getProcessDetails(processType);
        processDetails.onStart();
        
        if(this.currentStation){
            this.currentStation.finishedUsing();
        }

        this.timer = new Timer(
            processDetails.duration, 
            (time) => processDetails.onTick(time, processDetails.duration), 
            () => processDetails.onFinish()
        );

        this.timer.createProgressbar(this.element, processType);
        this.timer.start();
        this.currentStation = currentStation;
        this.beingProcessed = true;
        this.parent = newParent;
        this.render();
    }

    process(counter, duration, processType){
        const processDetails = this.getProcessDetails(processType);
        const ingredientInstances = Ingredient.ingredientInstances.edible.filter((ingredient) => ingredient.id === this.id);

        for(const ingredientInstance of ingredientInstances){ 
            processDetails.ingredientProcess(ingredientInstance, counter, duration)
            ingredientInstance.render(); 
        }
    }

    _finishCommon(){
        this.beingProcessed = false;
        this.element.setAttribute("draggable", true);
    }

    onDragStart(event){
        event.dataTransfer.setData("text/plain", this.id);
    }

    getProcessDetails(processType){
        const processDetails = {
            "prep": {
                duration: this.edible.prep_time,
                onStart: () => {this.element.removeAttribute("draggable")},
                onTick: (counter, duration) => {this.process(counter, duration, "prep"); },
                onFinish: () => {
                    this.prepared = true;
                    this._finishCommon();
                },
                ingredientProcess: (ingredient, counter, duration) => ingredient.process(counter, duration),
            },

            "trans" : {
                duration: this.edible.rot_time,
                onStart: () => {this.startedTransform = true},
                onTick: (counter, duration) => this.process(counter, duration, "trans"),
                onFinish: () => {
                    this.transformed = true;
                    this._finishCommon();
                    this.destroy();
                    this.currentStation.destroy();
                },
                ingredientProcess: (ingredient, counter, duration) => ingredient.rot(counter, duration),
            },

            "dispose": {
                duration: this.edible.dispose_time,
                onStart: () => {this.element.removeAttribute("draggable");},
                onTick: (counter, duration) => this.process(counter, duration, "dispose"),
                onFinish: () => {
                    this.destroy();
                },
                ingredientProcess: (ingredient, counter, duration) => ingredient.process(0, duration),
            }
        } 

        return processDetails[processType];
    }
}

PubSub.subscribe({
    event: "renderEdibles",
    listener: (details) => {
        const edible = new Edible(details);
        edible.render();
    }
});