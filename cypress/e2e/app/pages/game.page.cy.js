// import { expect, should } from "chai"; // no es necesario porque viene integrado en cypress

describe('Router Component Testing: ', () => {
    beforeEach(() => {
        // npm run node:dev
        cy.visit('http://127.0.0.1:8080/#');
    });
    it('Abrimos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('have.attr', 'checked').and('eq', 'checked');
    });
    it('Navegamos al Game page, recuerda si no pones el nombre válido en la caja no te deja ir. En el test de integracion se realiza esto"', () => {
        cy.get('[data-target="game"]').click();
        cy.contains('Home');
    });
    it('Cerramos el menu', () => {
        cy.get('#menu-toggler').click();
        cy.should('not.be.checked');
    });
    it('Naveguemos a Scores', () => {
        cy.get('[data-target="scores"]').click();
        cy.contains('Scores');
    });
    it('Naveguemos desde la url al Home', () => {
        cy.visit('http://127.0.0.1:8080/#/home');
        cy.contains('Home');
    });
    it('Naveguemos desde la url al Game. Nos debe redirigir al Home pues no estamos logueados', () => {
        cy.visit('http://127.0.0.1:8080/#/game');
        cy.contains('Home');
    });
    it('Naveguemos desde la url al Scores', () => {
        cy.visit('http://127.0.0.1:8080/#/scores');
        cy.contains('Scores');
    });
});