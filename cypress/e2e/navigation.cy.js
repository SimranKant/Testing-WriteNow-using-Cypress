describe('UI/Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display navbar', () => {
    cy.get('nav.navbar').should('be.visible');
  });

  it('should display brand logo', () => {
    cy.get('.navbar-brand').should('be.visible');
    cy.get('.navbar-brand').should('contain', 'WriteNow');
  });

  it('should display search bar', () => {
    cy.get('input[placeholder="Search"]').should('be.visible');
  });

  it('should navigate to posts page', () => {
    cy.get('a[href="/posts"]').first().click();
    cy.url().should('include', '/posts');
  });

  it('should navigate to team page', () => {
    cy.get('a[href="/team"]').click();
    cy.url().should('include', '/team');
  });

  it('should display team members on team page', () => {
    cy.visit('/team');
    cy.get('.team-card').should('have.length.greaterThan', 0);
  });

  it('should have responsive navbar toggle', () => {
    cy.viewport('iphone-x');
    cy.get('.navbar-toggler').should('be.visible');
    cy.get('.navbar-toggler').click();
  });

  it('should display footer', () => {
    cy.visit('/posts');
    cy.scrollTo('bottom');
    cy.get('footer').should('be.visible');
  });

  it('should have working internal links', () => {
    cy.visit('/');
    cy.get('a[href="/posts"]').first().click();
    cy.url().should('include', '/posts');
    
    cy.get('a[href="/"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
