// Custom commands for WriteNow app testing

// Login command (fixed)
Cypress.Commands.add("login", (username, password) => {
  cy.visit("/users/login");

  cy.get('input[name="username"]').should('be.visible').type(username);
  cy.get('input[name="password"]').should('be.visible').type(password);

  // safer login button selector
  cy.contains('button', 'Login').click();

  cy.url().should("include", "/posts");
});

// Logout command (fixed)
Cypress.Commands.add("logout", () => {
  // dropdown-toggle appears multiple times → use first() or text-based selector
  cy.get(".dropdown-toggle").first().click();

  // logout link exact match
  cy.contains('a', 'Logout').click();
});

// Register command (fixed)
Cypress.Commands.add("registerUser", (username, email, password) => {
  cy.visit("/users/register");

  cy.get('input[name="username"]').should('be.visible').type(username);
  cy.get('input[name="email"]').should('be.visible').type(email);
  cy.get('input[name="password"]').should('be.visible').type(password);

  // safer: find button by text
  cy.contains('button', 'Register').click();
});

// Create post command (fixed)
Cypress.Commands.add("createPost", (title, description) => {
  // Avoid ambiguous link selectors
  cy.contains('a', 'Create Post').click();

  cy.url().should("include", "/posts/new");

  cy.get('input[name="title"]').should('be.visible').type(title);
  cy.get('textarea[name="description"]').should('be.visible').type(description);

  cy.contains('button', 'Publish').click(); // safer
});
