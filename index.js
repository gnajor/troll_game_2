import { PubSub } from "./js/utils/pubsub.js";
import { pageHandler } from "./js/pageHandler/pageHandler.js";
import { decrypt, encrypt } from "./js/utils/utils.js";
import { Timer } from "./js/entities/timer/timer.js";


export const App = {
    score: 0,
    userId: null,
    gameInstanceId: null,
    loggedIn: false,
    gameData: {},

    initApp(){
        Timer.StartGameTimer();
        if(localStorage.getItem("user")){
            const userData = this.getLocalStorage();
            pageHandler.handleLogin(userData.username, userData.password);
        }
        else{
            pageHandler.handleStartPageRender();
        }
    },

    addScore(amount) {
        this.score += amount;
        PubSub.publish({
            event: "renderNewScore",
            details: this.score,
        });
    },

    setGameData(entity, data){
        this.gameData[entity] = data; 
    },

    setUserId(userId) {
        this.userId = userId;
    },

    setLocalStorage(name, password){
        const data = encrypt(JSON.stringify({
            username: name,
            password: password
        }));
        localStorage.setItem("user", data);
    },

    setLoggedIn(value){
        this.loggedIn = value;
    },

    clearGameData(){
        this.score = 0;
        this.gameInstanceId = null;
        this.gameData = {}
    },

    clearUserGameData(){
        this.score = 0;
        this.userId = null;
        this.gameInstanceId = null;
        this.gameData = {}
        this.loggedIn = false;
    },

    clearLocalStorage(){
        localStorage.clear();
    },

    getLocalStorage(){
        const userData = localStorage.getItem("user");
        const decryptedUserData = decrypt(userData);
        return JSON.parse(decryptedUserData);
    },  

    setGameInstanceId(id) {
        this.gameInstanceId = id;
    }
};

App.initApp();

