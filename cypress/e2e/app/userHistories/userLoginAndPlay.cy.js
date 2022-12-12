import { ScoresService } from "../../../../src/domain/services/storage.service.js";


describe('Integración: Historia de usuario: form component | form validation | game |local storage: ', () => {
    var initialListOfScores = [{ 'John': 123 }, { 'Moon': 456 }, { 'JohnMoon': 789 }, { 'Alvaro': 1 }, { 'Morata': 2 }];

    function saveItemsFromList(list) {
        for (var i = 0; i < initialListOfScores.length; i++) {

            var key = Object.keys(initialListOfScores[i]);

            var value = Number(Object.values(initialListOfScores[i]));
            console.log(typeof value);
            console.log(`key: ${key} => value:  ${value}`);
            ScoresService.set(key, Number(value));
        }
    }
    // how to use
    // saveItemsFromList(initialListOfScores); // rellenamos
    // var listOfScores = ScoresService.getAll(); // recuperamos


    describe('Vamos a realizar una user historie, el usuario se loguea con un nombre que no existe, juega para conseguir x puntos y luego retorna a la pantalla de scores para ver su nombre y sus puntos allí.', () => {

        it('Primero lo logueamos en el sistema como "ALVARO", el sistema es case sensitive, no sería lo mismo que "Alvaro" | "alvaro", esto se podría mejorar!. Comprobemos que el "current user loged" está en la local storage, después del login y que es ALVARO. Todo a través de la interfaz', () => {
            cy.visit('http://127.0.0.1:8080/#');
            ScoresService.clearAll();
            cy.get('#nickName').type('ALVARO');
            cy.get('#submitButton').click();
            ScoresService.setLogedUser('ALVARO');
            // // recuperar el susario 'loged' a través de ScoresService
            const currentUserLoged = ScoresService.getLogerUser();
            console.log('ALVARO =', currentUserLoged);
            assert.equal('ALVARO', currentUserLoged);
            cy.get('[data-target="scores"]').click();
            cy.contains('ALVARO');
            // DAR AL STOP aparecerá su high score ,en etse caso 0
            cy.get('[data-target="game"]').click();
            cy.get('#start').click();
            cy.get('#stop').click();
            cy.contains('HIGH SCORE: 0');
            // voler al juego
            cy.get('#start').click();
            // eperar 3 segundos semáforo en rojo, antes de clickar
            cy.wait(3100);
            for (let c = 0; c < 10; c++) {
                cy.get('#left-foot').click();
                cy.get('#right-foot').click();
            }
            cy.get('#stop').click();
            cy.contains(20);
            // ir a scores para ver el nombre y los puntos conseguidos
            cy.get('[data-target="scores"]').click();
            cy.contains('ALVARO');
            cy.contains('20');
            // podríamos hacer más pruebas, con registro de un nuevo usuario, o del mismo por segunda vez, etc.
        });



    });

});