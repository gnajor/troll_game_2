class BarStation{
    constructor(details){
        const {parentSelector, id} = details;
        this.parent = document.querySelector(parentSelector);
        this.id = id;
        this.renderSlot();
    }

    renderSlot(){
        if(this.parent){
            const slot = document.createElement("div");
            this.parent.appendChild(slot);
            slot.className = "slot";
            slot.id = "slot" + (this.id + 1);
            slot.textContent = "slot_" + this.id;

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
    event: "renderSlot",
    listener: (details) => {
        const slot = new Slot(details);
    } 
});