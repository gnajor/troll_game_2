import { PubSub } from "../utils/pubsub.js";
import { Pantry } from "./pantry/pantry.js";
import { TrollVault } from "./trollVault/trollVault.js";

export class GameSetup{
    constructor(){
        this.trolls = null;
        this.edibles = null;
    }

    async initGameSetup(){
        const trollVaults = this.createTrolls(4, 2);
        const pantries = this.createPantries(4, 2);
        this.postToDb(trollVaults, "../api/trollVaults.php");
        this.postToDb(pantries, "../api/pantries.php");

        this.trolls = await this.getDataFromDb("../api/trollVaults.php?trollVault=1", "trolls");
        this.edibles = await this.getDataFromDb("../api/pantries.php?pantry=1", "edibles"); 
    }

    createTrolls(trollVaultAmount, instanceAmount){
        const trollVaults = [];

        for(let i = 0; i < trollVaultAmount; i++){
            const trollVault = new TrollVault(instanceAmount);
            trollVaults.push(trollVault.trollVault);
        }

        return trollVaults;
    }

    createPantries(pantryAmount, instanceAmount){
        const pantries = [];

        for(let i = 0; i < pantryAmount; i++){
            const pantry = new Pantry(instanceAmount);
            pantries.push(pantry.pantry);
        }

        return pantries;
    }

    async postToDb(data, url){
        const request = new Request(url, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
        });

        const response = await this.fetcher(request);
        if(response.ok){
            console.log(response.data)
        }
        else{
            console.error(response.data.error);
        }
    }

    async getDataFromDb(url, type){
        const response = await this.fetcher(url);

        if(response.ok){
            return response.data
        }
        else{
            console.error(response.data.error);
        }
    }

    async fetcher(request){
        try {
            const response = await fetch(request);
            const responseData = {
                ok: response.ok,
                status: response.status,
                data: await response.json()
            };
    
            return responseData
        } 
        catch {
            console.error("Fetch error");
        }
    }
}