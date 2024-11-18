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
        this.transformed = false;
        this.currentStation = null;
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
        if(!this.beingProcessed){return;}
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

    transform(counter){
        if(!this.beingTransformed){return;}
        this.render();
        const progression = this.element.querySelector(".progress");

        if(progression){
            const time = this.edible.processes[1].time;
            progression.style.width = (counter / time) * 100 + "%";
        }
    }

    finishProcessing(){
        this.beingProcessed = false;
        this.processed = true
    }

    finishTransforming(){
        this.beingTransformed = false;
        this.transformed = true;
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
    ha en metod för startCooking or whatever istället för att ha edibleInstance.beingProcessed = true;¨

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