import * as structure from "./js/ui/gamePage/structure/structure.js";
import * as stationsContainer from "./js/ui/gamePage/stations/stationsContainer/stationsContainer.js";
import * as troll from "./js/entities/troll/troll.js";
import * as edible from "./js/entities/edible/edible.js";
import * as barStation from "./js/ui/gamePage/stations/barStation/barStation.js";
import * as prepStation from "./js/ui/gamePage/stations/prepStation/prepStation.js";
import * as bin from "./js/ui/gamePage/bin/bin.js";
import * as timer from "./js/ui/gamePage/timer/timer.js"
import { Timer } from "./js/entities/timer/timer.js";
import * as login from "./js/ui/loginPage/login.js";
import { PubSub } from "./js/utils/pubsub.js";
import { apiCom } from "./js/utils/apiCom.js";


export class App{
    static gameData = {};

    constructor(){
        this.startGameInstance();
        Timer.StartGameTimer();

/*         PubSub.publish({
            event: "renderLoginPage",
            details: "body" 
        }); */

/*         this.startGameInstance();*/
    }

    async startGameInstance(){
        const food_items = await apiCom("foodItems=all", "game:get-food");
        const trolls = await apiCom("trolls=all", "game:get-trolls");

        App.gameData.trolls = trolls;
        App.gameData.foodItems = food_items;        

        PubSub.publish({
            event: "renderStructure",
            details: {
                "parent": "body",
                "data": App.gameData
            }
        });
    }
}

new App();

/* function renderButton(parent){
    const button = document.createElement("button");
    button.id ="start_game_button";
    button.textContent = "Start";
    parent.appendChild(button);

    button.addEventListener("click", function renderGame() {
        new App();
    });
}

renderButton(document.body) */


