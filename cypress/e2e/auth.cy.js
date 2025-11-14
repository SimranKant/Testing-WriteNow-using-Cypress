describe("Authentication Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display landing page", () => {
    cy.get("h1").should("be.visible");
    cy.get('a[href="/users/register"]').should("be.visible");
    cy.get('a[href="/users/login"]').should("be.visible");
  });

  it("should navigate to register page", () => {
    cy.get('a[href="/users/register"]').click();
    cy.url().should("include", "/users/register");
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it("should navigate to login page", () => {
    cy.get('a[href="/users/login"]').click();
    cy.url().should("include", "/users/login");
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it("should show validation error for empty login form", () => {
    cy.visit("/users/login");
    cy.get('button[type="submit"]').click();
    cy.get('input[name="username"]').should("be.visible");
  });

  it("should login with valid credentials", () => {
    cy.login("testuser", "password123");
    cy.get('a[href="/chat/inbox"]').should("be.visible");
  });

  it("should logout successfully", () => {
    cy.login("testuser", "password123");
    cy.logout();
    cy.url().should("include", "/");
  });
});
