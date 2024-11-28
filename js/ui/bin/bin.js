import { PubSub } from "../../utils/pubsub.js";
import { Edible } from "../../entities/edible/edible.js";

function renderBin(parentId){
    const parent = document.querySelector(parentId);

    if(!parent){
        console.error("Parent Element Error");
        return;
    }

    const bin = document.createElement("div");
    bin.textContent = "Bin";
    bin.id = "bin_container";
    parent.appendChild(bin);

    const img = document.createElement("img");
    img.setAttribute("src", "../../../media/images/objects/trash.gif");
    bin.appendChild(img);

    bin.addEventListener("dragover", (event) => event.preventDefault());
    bin.addEventListener("drop", function onDropCheckAndDestroy(event){
        const id = Number(event.dataTransfer.getData("text/plain")); 
        const edibleInstance = Edible.edibleInstances.find(edible => edible.id === id);
        const disposalMethod = edibleInstance.edible.processes[2].disposal;

        
        if(edibleInstance.transformed && edibleInstance.prepared && disposalMethod === "Given away"){
            edibleInstance.destroy();
        }
    });

}

PubSub.subscribe({
    event: "renderBin",
    listener: (parentId) => {
        renderBin(parentId)
    }
})