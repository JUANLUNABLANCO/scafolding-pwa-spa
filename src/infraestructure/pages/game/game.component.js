import gameHTML from './game.component.html';
import './game.component.css';
import { ScoresService } from '../../../domain/services/storage.service.js';

export class GameComponent extends HTMLElement {
    constructor() {
        super();
        // ScoresService.clearAll();
        this.currentUserLoged = ScoresService.getLogerUser();
        this.highScoreUserLoged = ScoresService.get(this.currentUserLoged);
        console.log("##### current user loged: name ", this.currentUserLoged);
        console.log("##### current user loged: high score ", this.highScoreUserLoged);
    }
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
        this.innerHTML = gameHTML;

        this.game();
    }
    chargeSound(fuente) {
        console.log("AUDIO ###");
        const audio = new Audio(fuente);
        audio.loop = false;
        audio.controls = false;
        audio.volume = .1;
        return audio;
    };
    game() {
        console.log('################# user loged GAME: ', this.currentUserLoged);
        // let soundStepSource = "/assets/fx-sounds/step.wma";
        let TFFLChangeSource = "/src/assets/fx-sounds/tffl-change.wav";
        const fxs_TFFLChange = this.chargeSound(TFFLChangeSource);
        // fxs_TFFLChange.play();

        let isGameOver = false;
        let lives = 3;
        let score = 0;
        let currentColor = 'red';
        let currentClicked = '';
        //Initial Time Reloj
        let reloj;
        let mseconds = 0;
        let seconds = 0;
        let minutes = 0;
        // nuestro intervalo de tiempo
        let intervaloSemaforo;
        // elementos del dom a controlar
        // botones y semaforo
        const startButton = document.getElementById("start");
        const stopButton = document.getElementById("stop");
        const lightTraffic = document.getElementById('lightTraffic');
        const pieIzquierdo = document.getElementById('left-foot');
        const pieDerecho = document.getElementById('right-foot');
        // cajas de texto
        const scoreText = document.getElementById("points-count"); // total puntos
        const livesText = document.getElementById("fails-lives"); // vidas o fallos
        const timeValue = document.getElementById("time");
        const result = document.getElementById("result"); // caja para poner el resultado final
        const controls = document.querySelector(".controls-container"); // puntos finales y mensaje y boton start
        const playerName = document.getElementById("namePlayer");
        const playerHighScore = document.getElementById("highScorePlayer");
        // scoreText.innerText = this.highScoreUserLoged;
        playerName.innerText = this.currentUserLoged;
        playerHighScore.innerText = this.highScoreUserLoged;
        //     // detección de eventos ###
        //     // start button
        startButton.addEventListener("click", () => {
            resetGame();
            //controls amd buttons visibility
            controls.classList.add("hide");
            stopButton.classList.remove("hide");
            startButton.classList.add("hide");
            // empezar
            cambiarIntervalo(3000);
        });
        // Stop game
        stopButton.addEventListener("click", (() => {
            if (score > this.highScoreUserLoged) {
                this.highScoreUserLoged = score;
                ScoresService.set(this.currentUserLoged, score);
            }



            if (isGameOver) {
                gameOver();
            } else {
                stopTime();

                result.innerHTML = `
                    <h3>HIGH SCORE: ${this.highScoreUserLoged} </h3>
                    <h4>Score: ${score}</h4>
                `;

                visibilityOffUI();
            }
        }));
        pieIzquierdo.addEventListener('click', clickDetected);
        pieDerecho.addEventListener('click', clickDetected);
        //     // reset, gameOver, ui ###########
        function resetGame() {
            // variables y textos
            isGameOver = false;
            lives = 3;
            score = 0;
            currentColor = 'red';
            currentClicked = '';
            result.innerText = "";
            setScoreText();
            // semaforo en rojo
            lightTraffic.classList.remove('green');
            lightTraffic.classList.add('red');
            //Initial Time Reloj
            mseconds = 0;
            seconds = 0;
            minutes = 0;
            // reloj en marcha
            stopTime();
            reloj = setInterval(timeGenerator, 10);
        }

        function setScoreText() {
            scoreText.innerHTML = `<span>Points: </span>${score}`;
            livesText.innerHTML = `<span>Lives</sapn> ${lives}`;
        }

        function visibilityOffUI() {
            controls.classList.remove("hide");
            stopButton.classList.add("hide");
            startButton.classList.remove("hide");
        }

        function stopTime() {
            clearTimeout(intervaloSemaforo);
            clearInterval(reloj);
        }

        function gameOver() {
            // parar tiempo
            stopTime();
            // pintar el texto de Result
            result.innerHTML = `<h2>Game Over</h2><h4>Score: ${score}</h4>`;
            //  mostrar result y ocultar UI
            visibilityOffUI();
            // console.log(`lives: ${lives} score: ${score}`);      
        }
        // funciones de tiempo ####
        function stateChangue() {
            // pintar aquí el semáforo del nuevo color y cambiar el estado del currentColor
            lightTraffic.classList.remove(currentColor);
            currentColor = currentColor == 'red' ? 'green' : 'red';
            lightTraffic.classList.add(currentColor);
            // pintar // console.log('Nuevo color: ' + currentColor);
            let nuevoTiempodeEspera = currentColor == 'red' ? 3000 : pickTimeLightGreen();
            // console.log(`nuevo color: ${currentColor} tiempo que estará ese color ms: ${nuevoTiempodeEspera}`);
            cambiarIntervalo(nuevoTiempodeEspera);
        }
        // DEBUG FUNCTION
        // function pickNewTime() {
        //     'console.log(como ahora estamos en verde el tiempo es otro distinto de 3000)'
        //     return 2000;
        // }
        function cambiarIntervalo(ms) {
            // console.log('vamos a cambiar el intervalo a: ' + ms);
            try { clearTimeout(intervaloSemaforo) } catch (e) {};
            intervaloSemaforo = setTimeout(stateChangue, ms); // esperará ms antes de ejecutar
        }
        // pick random time for intervalGreen
        function pickTimeLightGreen() {
            // by the moment 5s greenLight = max(10000 - score * 100, 2000) + random(-1500, 1500)
            let maxTimeGreenLight = Math.max(10000 - score * 100, 2000) + Math.random(-1500, 1500);
            console.log(maxTimeGreenLight);
            return maxTimeGreenLight;
        }
        // reloj ##################
        function timeGenerator() {
            mseconds += 10;

            //minutes logic
            if (mseconds >= 1000) {
                seconds += 1;
                mseconds = 0;
            }
            if (seconds >= 60) {
                minutes += 1;
                seconds = 0;
            }
            //format time before displaying
            let msecondsValue;
            msecondsValue = mseconds < 1000 ? `${mseconds}` : mseconds;
            msecondsValue = mseconds < 100 ? `0${mseconds}` : mseconds;
            msecondsValue = mseconds < 10 ? `00${mseconds}` : mseconds;


            let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
            let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
            timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}:${mseconds}`;

        };
        // deteccion de clicks #####
        function clickDetected(e) {
            fxs_TFFLChange.play();
            // console.log(`click detectado ${currentClicked}`, e.target);
            const whoClicked = document.getElementById(e.target.id).parentElement.parentElement.id;
            console.log(whoClicked);
            // console.log('currentClicked: '+ currentClicked + 'who Clicked: ' + whoClicked);
            if (currentColor == 'red') {
                lives--;
                lives = lives < 0 ? 0 : lives;
                score = 0;
                if (lives == 0) {
                    gameOver();
                }
            } else if (currentColor == 'green') {
                // hayAlternancia
                if (whoClicked != currentClicked) {
                    score++;
                } else {
                    score--;
                    score = score < 0 ? 0 : score;
                }
            }
            currentClicked = whoClicked;
            // console.log('Score: ' + score);
            setScoreText();
        }
    }
}
window.customElements.define("game-page", GameComponent);