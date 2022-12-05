import formHTML from './form.component.html';
import './form.component.css';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export class FormComponent extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
        this.innerHTML = formHTML;

        const form = this.querySelector('#formName');
        const inputName = this.querySelector('#nickName');
        const submit = this.querySelector('#submitButton');
        // console.log('form: ', form, inputName, submit);
        const MAXCHARNAMEFIELD = inputName.getAttribute('max');
        const MINCHARNAMEFIELD = inputName.getAttribute('min');
        // console.log(MAXCHARNAMEFIELD, MINCHARNAMEFIELD);
        //   MINCHARNAMEFIELD = 3;
        //   permitedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'; // CAN YOU USE A REGEX
        //   isValid = false;
        //   constructor() {
        //     formName.addEventListener('submit', event => { 
        //       event.preventDefault();
        //       console.log('Submit button clicked');
        //       this.validateInputs();
        //       return this.isValid;
        //     });
        //   }


    }

    // disconnectedCallback() {
    // metodo que se ejecuta cuando el componente sea eliminado del document
    // }

}
window.customElements.define("form-player", FormComponent);



//  const submit = document.querySelector('submitButton');




//   setError = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = message;
//     inputControl.classList.add('error');
//     inputControl.classList.remove('success');
//   }
//   setSuccess = element => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = '';
//     inputControl.classList.add('success');
//     inputControl.classList.remove('error');
//   }
//   isTestValid = (texto) => {
//     var count = 0;
//     for (var i = 0; i< texto.length; i++) {
//       const word = texto.charAt(i);
//       if(this.permitedChars.indexOf(word) < 0){
//         count++;
//         console.log(`index ${i}  word  ${word}  count ${count}`);
//       }
//     }
//     const valid = count > 0 ? false : true;
//     return valid;
//   }

//   validateInputs = () => {
//     this.isValid = false;
//     console.log('se está validando'); 
//     const nickNameValue = this.nickName.value.trim();
//     console.log(nickNameValue);

//     if (nickNameValue === '') {
//       this.setError(this.nickName, 'Nick Name is required');
//     } else if (nickNameValue.length < this.MINCHARNAMEFIELD ) {
//       this.setError(this.nickName, `Min length of nick name are ${this.MINCHARNAMEFIELD}` );
//     } else if (nickNameValue.length > this.MAXCHARNAMEFIELD ) {
//       this.setError(this.nickName, `Max length of nick name are ${this.MAXCHARNAMEFIELD}` );
//     } else if (!this.isTestValid(nickNameValue)) {
//       console.log(nickNameValue);
//       this.setError(this.nickName, `Some Characters, not permited! only [a-z][A-z][_]` );
//     } else {
//       alert('VALIDADO');
//       this.setSuccess(this.nickName);
//       // enviar datos to class Scores
//       this.isValid = true;
//       // SCORES.setScore(nickNameValue, 0);
//       ROUTER.load('play');

//     }
//   }