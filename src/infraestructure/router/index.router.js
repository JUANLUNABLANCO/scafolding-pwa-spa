// import { pages } from "../pages/index";

// componentes
import { HomeComponent } from "../pages/home/home.component.js";
import { GameComponent } from "../pages/game/game.component.js";
import { ScoresComponent } from "../pages/scores/scores.component.js";

const router = (route) => {
  let content = document.getElementById("root");
  content.innerHTML = "";


  console.log(route);

  switch (route) {
    case "#/": {
      const homeComponent = new HomeComponent();
      return content.appendChild(homeComponent);
      // break;
    }
    case "#/home": {
      window.location.hash = '#/';
      break;
    }
    case "#/game": {
      const gameComponent = new GameComponent();
      return content.appendChild(gameComponent);
    }
    case "#/scores": {
      const scoresComponent = new ScoresComponent();
      return content.appendChild(scoresComponent);
    }
    default: {
      window.location.hash = '#/'; 
      break;
    }
  }
};

export { router };
