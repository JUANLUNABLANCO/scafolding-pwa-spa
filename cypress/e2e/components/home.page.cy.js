// import { expect, should } from "chai"; // no es necesario porque viene integrado en cypress

describe('Router Component Testing: ', ()=>{
  beforeEach(()=>{
    // npm run node:dev
    cy.visit('http://127.0.0.1:8080/#');
  });
  it('Abrimos el menu', ()=>{
    cy.get('#menu-toggler').click();
    cy.should('have.attr', 'checked').and('eq', 'checked');
  });
  it('Comprueba que se abre la app y que contiene la palabra Home', ()=>{
    // expect(true).to.equal(true);
    cy.contains('Home');
  }); 
  it('Navegamos al Home page', ()=>{
    cy.get('[data-target="home"]').click();
    cy.contains('Home');
    cy.contains('Nick Name');
  });
  it('Cerramos el menu', ()=>{
    cy.get('#menu-toggler').click();
    cy.should('not.be.checked');
  });
});
