import * as structure from "./js/ui/structure/structure.js";
import * as stationsContainer from "./js/ui/stationsContainer/stationsContainer.js";
import * as trolls from "./js/gameLogic/trollVault/trolls/trolls.js";
import * as edibles from "./js/gameLogic/pantry/edibles/edibles.js";
import * as troll from "./js/entities/troll/troll.js";
import * as edible from "./js/entities/edible/edible.js";
import * as barStation from "./js/ui/stations/barStation/barStation.js";
import * as prepStation from "./js/ui/stations/prepStation/prepStation.js";
import * as bin from "./js/ui/bin/bin.js";
import * as timer from "./js/ui/timer/timer.js"
import { Timer } from "./js/entities/timer/timer.js";
import { GameSetup } from "./js/gameLogic/gameSetup.js";
import { PubSub } from "./js/utils/pubsub.js";


export class App{
    static gameData = {};

    constructor(){
        this.startGameSetup();
        Timer.StartGameTimer();
    }

    async startGameSetup(){
        const gameSetup = new GameSetup();
        await gameSetup.initGameSetup();
        App.gameData.trolls = gameSetup.trolls;
        App.gameData.edibles = gameSetup.edibles;

        PubSub.publish({
            event: "renderStructure",
            details: "body"
        });
    }
}

function renderButton(parent){
    const button = document.createElement("button");
    button.id ="start_game_button";
    button.textContent = "Start";
    parent.appendChild(button);

    button.addEventListener("click", function renderGame() {
        new App();
    });
}

renderButton(document.body)