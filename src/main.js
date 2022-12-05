import './main.css';
import { router } from "./app/router/index.router";


const init = ()=>{
  router(window.location.hash);

  window.addEventListener("hashchange", () => {
    router(window.location.hash);
  });
}

window.addEventListener("load", init);
