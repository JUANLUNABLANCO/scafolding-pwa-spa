import homeHTML from './home.component.html';
import homeCSS from './home.component.css';

export class HomeComponent extends HTMLElement {
    constructor () {
      super();
      // parametros del componente
      this.name="John";
      this.surname="Moon";
      this.myColor;
      // otros parametros
      this.numColumns = 8;
    }
    static get observerAttributes(){ // lista de atributos a observar
      return ['name', 'surname', 'my-color'];
    }
    attributesChangeCallback(nameAtr, oldValue, newValue){ // atributos que podemos controlar
      switch(nameAtr) {
        case 'name':
          this.name = newValue;
          break;
        case "surname":
          this.surname = newValue;
          break;
        case "my-color":
          this.myColor = newValue;
          break;
      }
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
      
      // añadiendole cosas
      console.log("componente cargado");
      this.id = "elplomillazo";
      this.innerHTML = homeHTML + `<br>Hello ${this.name} ${this.surname}`;
      this.style.color = this.myColor || "yellow";
      this.style.fontSize = `${this.numColumns}`;

      console.log("numero de columnas: " + this.numColumns);       
    }
    
    // disconnectedCallback() {
      // metodo que se ejecuta cuando el componente sea eliminado del document
    // }
    
}
// if ('customElements' in window) {
// 	window.customElements.define("home-page", HomeComponent);
// }
window.customElements.define("home-page", HomeComponent);
