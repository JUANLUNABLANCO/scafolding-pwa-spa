// import { expect, should } from "chai"; // no es necesario porque viene integrado en cypress

describe('Router Component Testing: ', ()=>{
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:4200/#');
  });
  it('Comprueba que se abre la app y que contiene la palabra Home', ()=>{
    // expect(true).to.equal(true);
    cy.contains('Home');
  }); 
  it('Navegamos entre las diferentes opciones del menu: Home page', ()=>{
    cy.get('[data-target="home"]').click();
    cy.contains('Home');
  }); 
  it('Navegamos entre las diferentes opciones del menu: Scores page', ()=>{
    cy.get('[data-target="scores"]').click();
    cy.contains('Scores');
  });
  it('Navegamos entre las diferentes opciones del menu: Play page', ()=>{
    cy.get('[data-target="play"]').click();
    cy.contains('Play');
  });
  it('Cerramos el menu', ()=>{
    cy.get('#menu-toggler').click();
    cy.should('not.be.checked');
  });
  it('Abrimos el menu', ()=>{
    cy.get('#menu-toggler').click();
    cy.should('have.attr', 'checked').and('eq', 'checked');
  });

});
