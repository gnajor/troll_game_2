import * as structure from "../ui/gamePage/structure/structure.js";
import * as stationsContainer from "../ui/gamePage/stations/stationsContainer/stationsContainer.js";
import * as troll from "../entities/troll/troll.js";
import * as edible from "../entities/edible/edible.js";
import * as barStation from "../ui/gamePage/stations/barStation/barStation.js";
import * as prepStation from "../ui/gamePage/stations/prepStation/prepStation.js";
import * as bin from "../ui/gamePage/bin/bin.js";
import * as timer from "../ui/gamePage/timer/timer.js"
import * as login from "../ui/loginPage/loginPage.js";
import * as startPage from "../ui/startPage/startPage.js";
import * as score from "../ui/gamePage/score/score.js";
import * as gameOverModal from "../ui/gamePage/gameOverModal/gameOverModal.js";
import * as scoreboardUser from "../ui/scoreboardPage/scoreboardUser/scoreboardUser.js";
import { App } from "../../index.js";
import { apiCom } from "../apiCom/apiCom.js";
import { renderLoginPage } from "../ui/loginPage/loginPage.js";
import { renderStructure } from "../ui/gamePage/structure/structure.js";
import { renderMenuPage } from "../ui/menuPage/menuPage.js";
import { renderStartPage } from "../ui/startPage/startPage.js";
import { renderRegisterPage } from "../ui/registerPage/registerPage.js";
import { PubSub } from "../utils/pubsub.js";
import { renderGameModePage } from "../ui/gameModePage/gameModePage.js";
import { renderScoreboardPage } from "../ui/scoreboardPage/scoreboard/scoreboard.js";
import { Edible } from "../entities/edible/edible.js";
import { Ingredient } from "../entities/ingredient/ingredient.js";

export const pageHandler = {
    parentId: "#wrapper",

    handleStartPageRender(){
        renderStartPage(this.parentId);
    },

    handlePageAnimation(status, func = undefined){
        const wrapper = document.querySelector(this.parentId);

        if(status && func){
            wrapper.classList.add("start");
            wrapper.classList.add("new_z_index");
            wrapper.addEventListener("transitionend", func.bind(this), {once: true});
        }
        else{
            wrapper.classList.remove("start");
            wrapper.addEventListener("transitionend", () => {
                wrapper.classList.remove("new_z_index");
            }, {once: true});
        }
    },

    handleMenuPageRender(cameFromGame = false){
        if(cameFromGame){
            App.clearTotalGameData();
        }

        if(App.loggedIn){
            renderMenuPage(this.parentId, true);
        }
        else{
            renderMenuPage(this.parentId);
        }
    },

    async initGameOnServer(){
        if(App.userId === null){
            const guestUserId = await apiCom({
                "name": "guest",
                "password": "guest"
            }, "user:register");

            App.setUserId(guestUserId);
        }
        
        const game_instance_id = await apiCom(`userId=${App.userId}&game=${App.gameMode}`, "game:init");
        App.setGameInstanceId(game_instance_id);
    },

    async initGameAndRender(){
        const game_data = await apiCom("game=" + App.gameMode, "game:get-data");

        App.setGameData("trolls", game_data.trolls);
        App.setGameData("foodItems", game_data.food);  

        this.handlePageAnimation(false);

        renderStructure(this.parentId, App.gameData);
    },

    handleGamePlayAgain(){
        App.clearGameData();
    },

    async handleGameOver(){
        Ingredient.removeIngredients();
        Edible.removeEdibles();

        PubSub.publish({
            event: "renderNewScore",
            details: App.score
        });

        await apiCom({
            score: App.score,
            gameInstanceId: App.gameInstanceId,
        }, "game:over");
    },

    handleLoginRender(){
        renderLoginPage(this.parentId);
    },

    handleStoreGameMode(mode_num){
        App.setGameMode(mode_num);
    },

    handleGameModePageRender(){
        renderGameModePage(this.parentId);
    },

    async handleLogin(username, password){
        const resourse = await apiCom({
            "name": username,
            "password": password
        }, "user:login");

        if(resourse){  
            App.setUserId(resourse.id);
            App.setLocalStorage(username, password);
            App.setLoggedIn(true);
            this.handleMenuPageRender();
        }
        else{
            this.handleLoginRender();
        }
    },

    async handleGetScoreboardUsers(gameMode){
        const data = App.usersScoreData[`game${gameMode}`];

        if(!data){
            const resource = await apiCom(`game=${gameMode}&score=all`, "game:get-users-score");
            App.setUsersScoreData(`game${gameMode}`, resource);
        
            if(resource){
                return resource;
            }
        }
        else{
            return data;
        }
    },

    async handleScoreboardPageRender(){
        const users = await this.handleGetScoreboardUsers(1);

        renderScoreboardPage(this.parentId, users);
        this.handlePageAnimation(false);
    },

    handleScoreBoardReset(){
        App.clearUsersScoreData();
    },

    handleLogout(){
        App.clearLocalStorage();
        App.clearUserGameData();
        this.handleStartPageRender();
    },

    handleRegisterRender(){
        renderRegisterPage(this.parentId);
    },

    handleScoreChange(score){
        App.addScore(score);
    },

    async handleRegiser(username, password){
        const resourse = await apiCom({
            "name": username,
            "password": password
        }, "user:register");

        this.handleLoginRender();
    }
}