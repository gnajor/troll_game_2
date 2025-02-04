import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderLoginPage(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="login_page">
                            <div class="modal">
                                <div class="modal_content">
                                    <div class="title">
                                        <h2>Welcome back</h2>
                                    </div>
                                    <div class="input_container">
                                        <input placeholder="Username" id="username">
                                        <input placeholder="Password" id="password" type="password">
                                    </div>
                                    <button id="login">Login</button>
                                    <button id="back">back</button>
                                </div>
                            </div>
                        </div>`;

    const loginButton = parent.querySelector("#login");
    const inputUsername = parent.querySelector("#username");
    const inputPassword = parent.querySelector("#password");
    const backButton = parent.querySelector("#back");

    loginButton.addEventListener("click", async () => {
        const password = inputPassword.value;
        const username = inputUsername.value;
        pageHandler.handleLogin(username, password);
    });

    backButton.addEventListener("click", () => {
        pageHandler.handleMenuPageRender();
    });
}
