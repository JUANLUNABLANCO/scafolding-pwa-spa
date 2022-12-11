import { ScoresService } from "../../../../src/domain/services/storage.service.js";

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
            { nickName: 'Alvaro', highScore: 1 },
            { nickName: 'John', highScore: 123 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Moon', highScore: 456 }
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
    it('Hagamos un proceso completo: 1. Actualizar usuarios 2. update john 3. borrar john 4. recuperar la lista (john no está) 5. Tomarse un café que estoy cansao', () => {

        saveItemsFromList(initialListOfScores); // rellenamos
        // 1. Actualizar usuarios 
        var listOfScores = ScoresService.getAll();
        assert.equal(listOfScores.length, 5);
        assert.deepEqual(listOfScores, [
            { nickName: 'JohnMoon', highScore: 789 },
            { nickName: 'Alvaro', highScore: 1 },
            { nickName: 'John', highScore: 123 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Moon', highScore: 456 }
        ]);

        // 2. update john a un numero menor, no debería actualizarlo
        var user = ScoresService.set('John', 100);
        listOfScores = ScoresService.getAll();
        assert.equal(listOfScores.length, 5);
        assert.deepEqual(listOfScores, [
            { nickName: 'JohnMoon', highScore: 789 },
            { nickName: 'Alvaro', highScore: 1 },
            { nickName: 'John', highScore: 123 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Moon', highScore: 456 }
        ]);

        // 2. update john a un numero mayor ahora si lo actualiza
        user = ScoresService.set('John', 10000);
        listOfScores = ScoresService.getAll();
        assert.equal(listOfScores.length, 5);
        assert.deepEqual(listOfScores, [
            { nickName: 'JohnMoon', highScore: 789 },
            { nickName: 'Alvaro', highScore: 1 },
            { nickName: 'John', highScore: 10000 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Moon', highScore: 456 }
        ]);

        // 3 borrar john 
        ScoresService.remove(user.nickName); // ahora lo borramos, solo a él
        listOfScores = ScoresService.getAll();
        assert.equal(listOfScores.length, 4);
        assert.deepEqual(listOfScores, [
            { nickName: 'JohnMoon', highScore: 789 },
            { nickName: 'Alvaro', highScore: 1 },
            { nickName: 'Morata', highScore: 2 },
            { nickName: 'Moon', highScore: 456 }
        ]);

        // si no está devolverá null
        const pointsOfJohn = ScoresService.get('John'); // intentemos recuperarlo
        console.log('#### points of John', pointsOfJohn);
        assert.equal(pointsOfJohn, null);

        // por ultimo borremos todo
        ScoresService.clearAll();
        listOfScores = ScoresService.getAll();
        assert.deepEqual(listOfScores, []); // array vacío no hay nada en el local storage

    });
});
// describe('Acceso de Usuario: ', () => {
//     it('anotemos un user loged: ALAVRO', () => {
//         ScoresService.clearAll();
//         ScoresService.setLogedUser('ALVARO');
//         const currentUserLoged = ScoresService.getLogerUser();
//         console.log('ALVARO =', currentUserLoged);
//         assert.equal('ALVARO', currentUserLoged);

//     });

// });