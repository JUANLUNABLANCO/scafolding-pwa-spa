import './main.css';
import { NavigatorMenuComponent } from "./infraestructure/components/menu/menuNav.component";
import { router } from "./infraestructure/router/index.router";


const init = ()=>{
  // menu navigator
  new NavigatorMenuComponent();
  
  // routing 
  router(window.location.hash);

  window.addEventListener("hashchange", () => {
    router(window.location.hash);
  });
}

window.addEventListener("load", init);
