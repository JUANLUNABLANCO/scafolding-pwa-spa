import scoresHTML from './scores.component.html';
import './scores.component.css';
import { ScoresService } from '../../../domain/services/storage.service.js';

export class ScoresComponent extends HTMLElement {
    constructor() {
        super();
        // this.content = this.createPosts();
        // parametros del componente

        this.currentUserLoged = ScoresService.getLogerUser();
        this.highScoreUserLoged = ScoresService.get(this.currentUserLoged);
        // console.log("##### current user loged: name ", this.currentUserLoged);
        // console.log("##### current user loged: high score ", this.highScoreUserLoged);

        this.users = ScoresService.getAll();
        // console.log("##### Users ", this.users);
    }
    static get observerAttributes() { // lista de atributos a observar
        return ['highScoreUserLoged', 'currentUserLoged'];
    }

    attributesChangeCallback(nameAtr, oldValue, newValue) { // atributos que podemos controlar
        switch (nameAtr) {
            case "highScoreUserLoged":
                this.highScoreUserLoged = newValue;
                break;
            case "currentUserLoged":
                this.currentUserLoged = newValue;
                break;
        }
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding

        this.innerHTML = scoresHTML;
        this.id = "scoresPage";

        const greetingBox = this.querySelector('#saludo');
        // console.log(saludoBox);
        const highScoreBox = this.querySelector('#high-score');



        // saludar
        greetingBox.textContent = `Hello ${this.currentUserLoged}`;
        highScoreBox.textContent = `Your Best Score: ${this.highScoreUserLoged}`;

        // tabla
        // Ahora dibujamos la tabla
        var $bodyTable = document.querySelector("#bodyTableBest");
        // Recorrer todos los users
        this.users.forEach((user, id) => {
            // Crear un <tr>
            const $tr = document.createElement("tr");
            // El td del numeral
            let $tdOrder = document.createElement("td");
            $tdOrder.textContent = id + 1;
            $tr.appendChild($tdOrder);
            // Creamos el <td> de nickName y lo adjuntamos a tr
            let $tdNickName = document.createElement("td");
            $tdNickName.classList.add('nameCollum');
            $tdNickName.textContent = user.nickName; // el textContent del td es el nombre
            $tr.appendChild($tdNickName);
            // El td de highScore
            let $tdHighScore = document.createElement("td");
            $tdHighScore.textContent = user.highScore;
            $tr.appendChild($tdHighScore);

            // Finalmente agregamos el <tr> al cuerpo de la tabla
            $bodyTable.appendChild($tr);
        });

        // scroll table
        document.querySelector('.table-scroll').addEventListener('scroll', function(e) {
            this.querySelector('.body-scroll').style.left = this.scrollTop + "px";
        });
    }
}
window.customElements.define("scores-page", ScoresComponent);