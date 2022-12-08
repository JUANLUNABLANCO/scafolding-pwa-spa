// import { pages } from "../pages/index";

// componentes
import { HomeComponent } from "../pages/home/home.component.js";
import { GameComponent } from "../pages/game/game.component.js";
import { ScoresComponent } from "../pages/scores/scores.component.js";


const router = (route) => {
    let content = document.getElementById("root");
    content.innerHTML = "";


    // console.log(route);

    switch (route) {
        case "#/":
            {
                // console.log("in #/");
                window.location.hash = '#/home';
                break;
            }
        case "#/home":
            {
                // console.log("in #/home");
                const homeComponent = new HomeComponent();
                return content.appendChild(homeComponent);
                // break;
            }
        case "#/game":
            {
                console.log('######## NEW PATH: ', window.location.hash);
                // console.log("in #/game");
                // si form validado accessGame = true
                const gameComponent = new GameComponent();
                return content.appendChild(gameComponent);
            }
        case "#/scores":
            {
                // console.log("in #/scores");
                const scoresComponent = new ScoresComponent();
                return content.appendChild(scoresComponent);
            }
        default:
            {
                // console.log("in #/default");
                window.location.hash = '#/';
                break;
            }
    }
};

export { router };