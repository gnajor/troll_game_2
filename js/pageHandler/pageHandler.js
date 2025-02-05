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
import { App } from "../../index.js";
import { apiCom } from "../utils/apiCom.js";
import { renderLoginPage } from "../ui/loginPage/loginPage.js";
import { renderStructure } from "../ui/gamePage/structure/structure.js";
import { renderMenuPage } from "../ui/menuPage/menuPage.js";
import { renderStartPage } from "../ui/startPage/startPage.js";
import { renderRegisterPage } from "../ui/registerPage/registerPage.js";

export const pageHandler = {
    parentId: "#wrapper",

    handleStartPageRender(){
        renderStartPage(this.parentId);
    },

    handlePageAnimation(status){
        const wrapper = document.querySelector(this.parentId);

        if(status){
            wrapper.classList.add("start");
            wrapper.classList.add("new_z_index");

            wrapper.addEventListener("transitionend", () => {
                pageHandler.initGameAndRender();
            }, {once: true});
        }
        else{
            wrapper.classList.remove("start");
            wrapper.addEventListener("transitionend", () => {
                wrapper.classList.remove("new_z_index");
            }, {once: true});
        }
    },

    handleMenuPageRender(){
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
        
        const game_instance_id = await apiCom("userId=" + App.userId, "game:init");
        App.setGameInstanceId(game_instance_id);
    },

    async initGameAndRender(){
        const food_items = await apiCom("foodItems=all", "game:get-food");
        const trolls = await apiCom("trolls=all", "game:get-trolls");

        App.setGameData("trolls", trolls);
        App.setGameData("foodItems", food_items);  
        this.handlePageAnimation(false);

        renderStructure(this.parentId, App.gameData);
    },

    handleGamePlayAgain(){
        App.clearGameData();
    },

    handleGameOver(){
        apiCom({
            score: App.score,
            gameInstanceId: App.gameInstanceId,
            foodItems: App.gameData.foodItems,
            trolls: App.gameData.trolls,
        }, "game:over");
    },

    handleLoginRender(){
        renderLoginPage(this.parentId);
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