import scoresHTML from './scores.component.html';
import scoresCSS from './scores.component.css';

export class ScoresComponent extends HTMLElement {
    constructor() {
        super();
        // this.content = this.createPosts();
        // parametros del componente
        this.hightScore = 0;
        this.nickName = "Anonimus";
    }
    static get observerAttributes() { // lista de atributos a observar
        return ['hightScore', 'nickName'];
    }

    attributesChangeCallback(nameAtr, oldValue, newValue) { // atributos que podemos controlar
        switch (nameAtr) {
            case "hightScore":
                this.nickName = newValue;
                break;
            case "nickName":
                this.nickName = newValue;
                break;
        }
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding

        this.innerHTML = scoresHTML;
        this.id = "scoresPage";

        const saludoBox = this.querySelector('#saludo');
        // console.log(saludoBox);
        const highScoreBox = this.querySelector('#high-score');
        // get datos user
        this.nickName = 'JohnMoon' // from localstorage
        this.highScore = 1022; // from localstorage


        // saludar
        saludoBox.textContent = `Hello ${this.nickName}`;
        highScoreBox.textContent = `Your Best Score: ${this.highScore}`;

    }
}
window.customElements.define("scores-page", ScoresComponent);