import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderMenuPage(parentId, loggedIn = false){
    const parent = document.querySelector(parentId);

    if(!loggedIn){
        parent.innerHTML = `<div id="menu_page">
                                <div id="menu_modal">
                                    <div id="menu_content">
                                        <button id="start_button">start</button>
                                        <button id="scoreboard_button">scoreboard</button>
                                        <button id="login_button">login</button>
                                        <button id="register_button">register</button>
                                    </div>
                                </div>
                            </div>`;

        const loginButton = parent.querySelector("#login_button");
        const registerButton = parent.querySelector("#register_button");

        
        loginButton.addEventListener("click", () => {
            pageHandler.handleLoginRender();
        });
        
        registerButton.addEventListener("click", () => {
            pageHandler.handleRegisterRender();
        });
    }

    else{
        parent.innerHTML = `<div id="menu_page">
                                <div id="menu_modal">
                                    <div id="menu_content">
                                        <button id="start_button">start</button>
                                        <button id="scoreboard_button">scoreboard</button>
                                        <button id="logout_button">logout</button>
                                    </div>
                                </div>
                            </div>`;

        const logoutButton = parent.querySelector("#logout_button");

        logoutButton.addEventListener("click", () => {
            pageHandler.handleLogout();
        });
    }

    const startButton = parent.querySelector("#start_button");
    const scoreboardButton = parent.querySelector("#scoreboard_button");
    
    startButton.addEventListener("click", () => {
        pageHandler.handlePageAnimation(true);
        pageHandler.initGameOnServer();
    });
    
    scoreboardButton.addEventListener("click", () => {
        /* pageHandler. */
    });
}