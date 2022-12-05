import gameHTML from './game.component.html';
import './game.component.css';

export class GameComponent extends HTMLElement {
    constructor () {
      super();
      // this.content = this.createPosts();
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
      
      this.innerHTML = gameHTML; 

    }
}
window.customElements.define("game-page", GameComponent);

