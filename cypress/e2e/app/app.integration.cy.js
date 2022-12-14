// este test es la suma de todos los otros, ya que no tenemos una api o una bd
import { ScoresService } from "../../../src/domain/services/storage.service.js";

describe('ALL COMPONENTS AND LOGIC Testing: ', () => {
    beforeEach(() => {
        // npm run node:dev
        cy.visit('http://127.0.0.1:8080/#');
    });
    // ######## MENU
    it('Abrimos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('have.attr', 'checked').and('eq', 'checked');
    });
    it('Comprueba que se abre la app y que contiene la palabra Home', () => {
        // expect(true).to.equal(true);
        cy.contains('Home');
    });
    it('Navegamos al Home page', () => {
        cy.get('[data-target="home"]').click();
        cy.contains('Home');
    });
    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });

    // ######### GAME
    it('Abrimos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('have.attr', 'checked').and('eq', 'checked');
    });
    it('Navegamos al Game page, Nos redirige al Home', () => {
        cy.get('[data-target="game"]').click();
        cy.contains('Home');
        // cy.contains('Start Game');
        // cy.get('#start').should('to.be.visible');
    });
    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });

    // ######### SCORES
    it('Abrimos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('have.attr', 'checked').and('eq', 'checked');
    });
    it('Navegamos al Score-page, comprobamos que contiene un elemento visible con id"scoresPage"', () => {
        cy.get('[data-target="scores"]').click();
        cy.contains('Scores');
        cy.get('figure').should('to.be.visible');
        cy.get('#scoresPage');

    });
    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });

    // ############ form UI
    it('Nos dirigimos al home, esta prueba es importante hacerla sin llamar al gamePage, al final de la validaci??n del formulario, sino no veremos los resultados en pantalla', () => {
        cy.get('[data-target="home"]').click();
        cy.contains('Home');
    });
    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });
    it('Nos focalizamos en el input name, tiene dos elementos el input[type=text] y el button[type=submit]', () => {
        cy.get('#nickName').should('contain', '').and('have.attr', 'required').and('include', 'required');
        cy.get('button[type=submit]').should('contain', 'Let me Play');

    });

    // ############## form validation 
    it('Nos dirigimos al home, esta prueba es importante hacerla sin llamar al ROUTER, es decir sin clickar los botones de  navegaci??n de la UI, sino no veremos los resultados en pantalla', () => {
        cy.get('[data-target="home"]').click();
        cy.contains('Home');
    });

    it('Ahora introduciremos datos incorrectos JMLB/1234, comprobando el mensaje de error y la clase que da color rojo al borde del iput-control', () => {
        cy.get('#nickName').should('contain', '').focus().type('JMLB/1234');
        cy.get('#submitButton').click();
        cy.get('.error').first().should('contain', '[a-z][A-z][_]').and('be.visible');
        cy.get('.input-control').first().should('have.class', 'error');
    });

    it('Nos focalizamos en el input name, para introducir datos ficticios correctos JMLB_Moon (datos permitidos), usando la interfaz UI, del formulario, Esto nos redirigir?? autom??ticamente a la pagina game ', () => {
        cy.get('#nickName').should('contain', '').focus().type('JMLB_Moon');
        cy.get('.error').first().should('contain', '');
        cy.get('#submitButton').click();
        cy.contains('Game');
        cy.contains('Start Game');
        cy.get('#start').should('to.be.visible');

    });

});

describe('Form Component Unit Testing: ', () => {
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

    beforeEach(() => { // 8080 dev 5500/dist/ prod
        cy.visit('http://127.0.0.1:8080/#');
        ScoresService.clearAll();
    });
    after(() => {
        ScoresService.clearAll();
    })
    it('Hagamos un set de un user con sus puntos. {"Alfonso", 0 }. recuerda set retorna un user como este { nickName: "Alfonso", highScore: 0 }', () => {
        // cuando un usuario se loguea se crea con 0 puntos para comprobar si existe
        const userLoged = ScoresService.set("Alfonso", 0);
        console.log('######### USER LOGED', userLoged);

        const userInfoRetorned = { nickName: "Alfonso", highScore: 0 };
        console.log('######### USER INFO SET', userInfoRetorned);

        assert.deepEqual(userLoged, userInfoRetorned);

        const userpoints = ScoresService.get('Alfonso');

        assert.deepEqual(userInfoRetorned.highScore, userpoints);
    });
    it('Introduzcamos datos en el localStorage y luego los recuperamos antes de nada vaciemos el local storage', () => {

        saveItemsFromList(initialListOfScores); // rellenamos
        var listOfScores = ScoresService.getAll(); // recuperamos
        // console.log(listOfScores);

        assert.equal(listOfScores.length, 5);
        assert.deepEqual(listOfScores, [
            { nickName: 'JohnMoon', highScore: 789 },
            { nickName: 'Moon', highScore: 456 },
            { nickName: 'John', highScore: 123 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Alvaro', highScore: 1 }
        ]);
    });
    it('Vamos a ver los puntos de un individuo', () => {

        saveItemsFromList(initialListOfScores); // rellenamos
        var pointsOfJohn = ScoresService.get('John'); // recuperamos
        console.log(pointsOfJohn);

        assert.deepEqual(pointsOfJohn, 123);
    });
    it('Actualicemos ese mismo de 123 a 425 y comprobemos que se ha actualizado porque 123 es menor que 425', () => {

        saveItemsFromList(initialListOfScores); // rellenamos
        var currentPointsJohn = ScoresService.get('John'); // recuperamos 123

        const newPointsJohn = 425;

        // solo se actualiza si el nuevo valor es mayor que el viejo  
        // set retorna un objeto construido user = {nickName: 'John', highScore: 425}  
        const user = ScoresService.set('John', newPointsJohn);
        console.log('### actual points:', user.highScore);

        assert.equal(user.highScore, newPointsJohn);

        assert.isTrue(currentPointsJohn < newPointsJohn ? true : false);
    });
    it('Hagamos un proceso completo: 1. Actualizar usuarios 2. update john 3. borrar john 4. recuperar la lista (john no est??) 5. Tomarse un caf?? que estoy cansao', () => {

        saveItemsFromList(initialListOfScores); // rellenamos
        // 1. Actualizar usuarios 
        var listOfScores = ScoresService.getAll();
        assert.equal(listOfScores.length, 5);
        assert.deepEqual(listOfScores, [
            { nickName: 'JohnMoon', highScore: 789 },
            { nickName: 'Moon', highScore: 456 },
            { nickName: 'John', highScore: 123 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Alvaro', highScore: 1 }
        ]);

        // 2. update john a un numero menor, no deber??a actualizarlo
        var user = ScoresService.set('John', 100);
        listOfScores = ScoresService.getAll();
        assert.equal(listOfScores.length, 5);
        assert.deepEqual(listOfScores, [
            { nickName: 'JohnMoon', highScore: 789 },
            { nickName: 'Moon', highScore: 456 },
            { nickName: 'John', highScore: 123 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Alvaro', highScore: 1 }
        ]);

        // 2. update john a un numero mayor ahora si lo actualiza
        user = ScoresService.set('John', 10000);
        listOfScores = ScoresService.getAll();
        assert.equal(listOfScores.length, 5);
        assert.deepEqual(listOfScores, [
            { nickName: 'John', highScore: 10000 },
            { nickName: 'JohnMoon', highScore: 789 },
            { nickName: 'Moon', highScore: 456 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Alvaro', highScore: 1 },
        ]);

        // 3 borrar john 
        ScoresService.remove(user.nickName); // ahora lo borramos, solo a ??l
        listOfScores = ScoresService.getAll();
        assert.equal(listOfScores.length, 4);
        assert.deepEqual(listOfScores, [
            { nickName: 'JohnMoon', highScore: 789 },
            { nickName: 'Moon', highScore: 456 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Alvaro', highScore: 1 },


        ]);

        // si no est?? devolver?? null
        const pointsOfJohn = ScoresService.get('John'); // intentemos recuperarlo
        console.log('#### points of John', pointsOfJohn);
        assert.equal(pointsOfJohn, null);

        // por ultimo borremos todo
        ScoresService.clearAll();
        listOfScores = ScoresService.getAll();
        assert.deepEqual(listOfScores, []); // array vac??o no hay nada en el local storage

    });
});

describe('Integraci??n: Historia de usuario: form component | form validation | game |local storage: ', () => {
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


    describe('Vamos a realizar una user historie, el usuario se loguea con un nombre que no existe, juega para conseguir x puntos y luego retorna a la pantalla de scores para ver su nombre y sus puntos all??.', () => {

        it('Primero lo logueamos en el sistema como "ALVARO", el sistema es case sensitive, no ser??a lo mismo que "Alvaro" | "alvaro", esto se podr??a mejorar!. Comprobemos que el "current user loged" est?? en la local storage, despu??s del login y que es ALVARO. Todo a trav??s de la interfaz', () => {
            cy.visit('http://127.0.0.1:8080/#');
            ScoresService.clearAll();
            cy.get('#nickName').type('ALVARO');
            cy.get('#submitButton').click();
            ScoresService.setLogedUser('ALVARO');
            // // recuperar el susario 'loged' a trav??s de ScoresService
            const currentUserLoged = ScoresService.getLogerUser();
            console.log('ALVARO =', currentUserLoged);
            assert.equal('ALVARO', currentUserLoged);
            cy.get('[data-target="scores"]').click();
            cy.contains('ALVARO');
            // DAR AL STOP aparecer?? su high score ,en etse caso 0
            cy.get('[data-target="game"]').click();
            cy.get('#start').click();
            cy.get('#stop').click();
            cy.contains('HIGH SCORE: 0');
            // voler al juego
            cy.get('#start').click();
            // eperar 3 segundos sem??foro en rojo, antes de clickar
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
            // podr??amos hacer m??s pruebas, con registro de un nuevo usuario, o del mismo por segunda vez, etc.
        });



    });

});