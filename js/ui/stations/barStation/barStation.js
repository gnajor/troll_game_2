import { PubSub } from "../../../utils/pubsub.js";

class BarStation{
    constructor(details){
        this.parent = document.querySelector(details.parentId);
        console.log(details)

        this.id = details.id;
        this.renderBar();
    }

    renderBar(){
        if(this.parent){
            const barStation = document.createElement("div");
            this.parent.appendChild(barStation);
            barStation.className = "barStation";
            barStation.id = "barStation" + (this.id + 1);
            barStation.textContent = "barStation_" + this.id;

            //slot.addEventListener("")
        }
        else{
            console.error("Parent Element error")
        }
    }

    onDropStartTimer(){
        
    }
}

PubSub.subscribe({
    event: "renderBarStations",
    listener: (details) => {
        const slot = new BarStation(details);
    } 
});