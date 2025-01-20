import { PubSub } from "../../utils/pubsub.js";
import { apiCom } from "../../utils/apiCom.js";

function renderLogin(parentSelector){
    const parent = document.querySelector(parentSelector);

    parent.innerHTML = `<div id="input-container">
                            <input id="username">
                            <input type="password" id="password">
                        </div>
                        <div id="button-container">
                            <button id="login">login</button>
                            <button id="register">Register</button>
                        </div>`;

    const loginButton = parent.querySelector("#login");
    const registerButton = parent.querySelector("#register");
    const inputUsername = parent.querySelector("#username");
    const inputPassword = parent.querySelector("#password");

    loginButton.addEventListener("click", () => {
        const password = inputPassword.value;
        const username = inputUsername.value;

        console.log(password, username);
        
        apiCom({
            "name": username,
            "password": password
        }, "user:login");
    });

    registerButton.addEventListener("click", () => {
        const password = inputPassword.value;
        const username = inputUsername.value;

        console.log(password, username);

        apiCom({
            "name": username,
            "password": password
        }, "user:register");
    });
}

PubSub.subscribe({
    event: "renderLoginPage",
    listener: (parent) => {
        renderLogin(parent);
    }
});