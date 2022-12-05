import homeHTML from './home.component.html';
import homeCSS from './home.component.css';

export class HomeComponent extends HTMLElement {
    constructor () {
      super();
      // parametros del componente
      this.name="Anonimus";
      this.surname="Player";
    }
    static get observerAttributes(){ // lista de atributos a observar
      return ['name', 'surname'];
    }
    attributesChangeCallback(nameAtr, oldValue, newValue){ // atributos que podemos controlar
      switch(nameAtr) {
        case 'name':
          this.name = newValue;
          break;
        case "surname":
          this.surname = newValue;
          break;
      }
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
      
      // añadiendole cosas
      // console.log("componente cargado");
      this.id = "homePage";
      this.innerHTML = homeHTML + `<br><h3>Hello ${this.name} ${this.surname}</h3>`;
      
    }
    
    // disconnectedCallback() {
      // metodo que se ejecuta cuando el componente sea eliminado del document
    // }
    
}
// if ('customElements' in window) {
// 	window.customElements.define("home-page", HomeComponent);
// }
window.customElements.define("home-page", HomeComponent);
