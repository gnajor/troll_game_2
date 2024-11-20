import { PubSub } from "../../utils/pubsub.js";
import { Ingredient } from "../ingredient/ingredient.js";

export class Edible{
    static edibleInstances = [];

    constructor(details){
        const {data, parentId, id} = details;
        this.edible = data;
        this.id = id;
        this.beingProcessed = false;
        this.prepared = false;
        this.transfromed = false;
        this.currentStation = null;
        this.parent = document.querySelector(parentId);
        this.element = this.create();
        Edible.edibleInstances.push(this);
    }

    create(){
        const edibleElement = document.createElement("div");
        edibleElement.id = "edible_" + this.id;
        edibleElement.setAttribute("draggable", true);
        edibleElement.addEventListener("dragstart", this.onDragStart.bind(this));

        const textContainer = document.createElement("div");
        textContainer.className = "text_container";
        edibleElement.appendChild(textContainer);

        const ingredientContainer = document.createElement("div");
        ingredientContainer.id = "ingredient_container";
        edibleElement.appendChild(ingredientContainer);

        for(let ingredientData of this.edible.ingredients){
            const ingredient = new Ingredient({
                "data": ingredientData, 
                "parent": ingredientContainer, 
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
        textContainer.textContent = this.edible.edible + ` (${this.edible.processes[0].preparation})`;

        const ingredientInstances = Ingredient.ingredientInstances.filter((ingredient) => ingredient.id === this.id);
        for(let ingredientInstance of ingredientInstances){
            ingredientInstance.render(); 
        }  

        if(this.beingProcessed){
            const progressBar = this.element.querySelector(".progressBar")

            if(!progressBar){
                const progressBar = document.createElement("div");
                const progression = document.createElement("div");
                progressBar.className = "progressBar";
                progression.className = "progress";
                this.element.appendChild(progressBar);
                progressBar.appendChild(progression);
            }
            else{
                progressBar.innerHTML = "";
                const progression = document.createElement("div");
                progression.className = "progress";
                progressBar.appendChild(progression);
            }
        }
    }

    startPreperation(newParent, currentStation){
        this._startCommon(newParent, currentStation);
        this.element.removeAttribute("draggable");
    }

    startTransformation(newParent, currentStation){
        this._startCommon(newParent, currentStation);
    }

    processPreparation(counter, duration){
        this._processCommon(counter, duration, "prep");
    }

    processTransformation(counter, duration){
        this._processCommon(counter, duration, "trans");
    }

    finishPreperation(){
        this.prepared = true;
        this._finishCommon();
    }

    finishTransformation(){
        this.transformed = true;
        this._finishCommon();
    }

    _startCommon(newParent, currentStation){
        if(this.currentStation){
            this.currentStation.beingUsed = false;
        }
        this.currentStation = currentStation;
        this.beingProcessed = true;
        this.parent = newParent;
        this.render();
    }

    _processCommon(counter, duration, method){
        const progression = this.element.querySelector(".progress");
        const ingredientInstances = Ingredient.ingredientInstances.filter((ingredient) => ingredient.id === this.id);

        for(let ingredientInstance of ingredientInstances){ 
            if(method === "prep"){
                ingredientInstance.process(counter, duration);
            }
            else if(method === "trans"){
                ingredientInstance.rot(counter, duration);
            }

            ingredientInstance.render(); 
        }

        if(method === "trans"){
            progression.style.color = "red";
        }

        if(progression){
            progression.style.width = (counter / duration) * 100 + "%";
        }
    }

    _finishCommon(){
        this.beingProcessed = false;
        this.element.setAttribute("draggable", true);
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

//Part 3???
/* 
    freezable borde finnas i edible || vilket du har :) 
    this.action = this.edible.process[0].action
    preperation borde probably heta station i gameLogic

    if(food.station === this.station) || Din => process === this.prepMethod

    You don't need to use edible.render when you want the station to render 
    so you want a render and a create in prepStation

    använd metoder för att ändra this i edible ändra INTE instansens värde hos PrepStation
    ha en metod för startCooking or whatever istället för att ha edibleInstance.beingProcessed = true;

    ha allting i state.js eller allting i entities state
    
    ha en timer för hela spelet PubSub.js
    
    Kan ha en class Timer som har Timer.start(tid, vad som ska hända varenda gång den tickar, this.timOut) när man droppar den; 

    
    Stationer fungerar på samma sätt:
        Preparation
            vissa drar ned, vissa drar upp
            tills tiden är klar || man kan inte ta ut den mid
            ruttnar så fort dom är tillagade

            Även här kan de inte röras om de har ruttnat

        Baren
            Börjar ruttna efter tid (bara ruttna)
            om den har "bli kvar"
            börjar ruttna

            ges bort (någon kommer att ta bort den, måste vänta till någon kommer)
            bär ut (slänger trollen )

            //om maten blir kvar då händer kassering

        Troll
            Maten försvinner
            Trollet tar så mycket den kan ta

        Trashas
            Mat kan trashas



        Pantry

        Station
            - prep
            - när den är klar ruttnar den
                - tiden får man från Transformation

        Bar
         - börjar ruttna
         - När den har ruttnat (kassering)
         - 

*/









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