import scoresHTML from './scores.component.html';
import scoresCSS from './scores.component.css';

export class ScoresComponent extends HTMLElement {
    constructor() {
        super();
        // this.content = this.createPosts();
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding

        this.innerHTML = scoresHTML;
        this.id = "scoresPage";

    }
}
window.customElements.define("scores-page", ScoresComponent);