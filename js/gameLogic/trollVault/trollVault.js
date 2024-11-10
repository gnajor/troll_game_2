import { TrollBlueprint } from "./trolls/trollBlueprint.js";
import { globals } from "../../utils/globals.js";
import { PubSub } from "../../utils/pubsub.js";

export class TrollVault{
    constructor(instanceAmount){
        const vault = this.getTrollVault(instanceAmount);
        const shuffledVault = globals.shuffle(vault);
        this.trollVault = shuffledVault;
    }

    getTrollVault(instanceAmount){
        let vault = [];

        for(let i = 0; i < instanceAmount; i++){
            for(let trollClass of TrollBlueprint.registeredClasses){
                let trollData = new trollClass;
                vault.push(trollData.troll)
            }
        }
        return vault;
    }  
}

PubSub.subscribe({
    event: "sendNeededDataToState",
    listener: (details) => {
        const {entityAmount, childInstanceAmount} = details;
        const trollVaults = [];
        const url = "../API/trollVaults.php";

        for(let i = 0; i < entityAmount; i++){
            const trollVault = new TrollVault(childInstanceAmount);
            trollVaults.push(trollVault.trollVault);
        }

        PubSub.publish({
            event: "sendDataToState",
            details: {"data": trollVaults, url, "type": "trollVault"}
        });
    }
});