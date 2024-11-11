class PrepStation{
    beingUsed = false;

    constructor(details){
        const {parentSelector, prep} = details
        this.parent = document.querySelector(parentSelector);
        this.prep = prep;
        this.renderPrepStation();
    }

    renderPrepStation(){
        if(this.parent){
            const station = document.createElement("div");
            station.id = "station_" + this.prep;
            station.className = "station";
            station.textContent = this.prep;
            this.parent.appendChild(station);

            station.addEventListener("dragover", (event) => event.preventDefault());
            station.addEventListener("drop", this.onDropCheckAndAppend.bind(this));   
        }
        else{
            console.error("Parent Element error");
        }
    }

    onDropCheckAndAppend(event){
        const id = Number(event.dataTransfer.getData("text/plain")); 
        const edibleInstance = Edible.edibleInstances.find(edible => edible.id === id);
        const process = edibleInstance.edible.processes[0].preparation;
        
        if(process === this.prep && !this.beingUsed){
            event.target.appendChild(edibleInstance.element);
            this.beingUsed = true;
        }
    }
}

PubSub.subscribe({
    event: "renderPrepStations",
    listener: (details) => {
        const prepStation = new PrepStation(details);
    }
});