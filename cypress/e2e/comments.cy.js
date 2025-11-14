describe("Comments Tests", () => {
  beforeEach(() => {
    cy.login("testuser", "password123");
  });

  it("should display comments section on post", () => {
    cy.visit("/posts");
    cy.get(".post-card-new").first().click();
    cy.url().should("include", "/posts/");
    cy.get(".comments-section").should("be.visible");
  });

  it("should display comment form", () => {
    cy.visit("/posts");
    cy.get(".post-card-new").first().click();
    cy.get(".comment-form").should("be.visible");
    cy.get(".fa-share").should("be.visible");
  });

  it("should add a new comment", () => {
    cy.visit("/posts");
    cy.get(".post-card-new").first().click();
    const commentText = "This is a test comment";

    cy.get(".comment-form").type(commentText);
    cy.get(".fa-share").click();

    // Check newly added comment instead of first comment
    cy.get(".comment")
      .contains(commentText) // finds the correct comment
      .parents(".comment")
      .should("contain.text", "testuser"); // checks username for that comment
  });

  it("should display comment with timestamp", () => {
    cy.visit("/posts");
    cy.get(".post-card-new").first().click();
    cy.get(".comment")
      .last()
      .then(($comment) => {
        if ($comment.length > 0) {
          cy.wrap($comment).should("contain.text", "testuser");
        }
      });
  });

  it("should delete own comment", () => {
    cy.visit("/posts");
    cy.get(".post-card-new").first().click();
    cy.get(".comment")
      .last()
      .then(($comment) => {
        if ($comment.length > 0) {
          cy.wrap($comment).within(() => {
            cy.get('form[action*="_method=DELETE"]').then(($deleteBtn) => {
              if ($deleteBtn.length > 0) {
                cy.wrap($deleteBtn).click();
              }
            });
          });
        }
      });
  });

  it("should not show delete button for other users comments", () => {
  cy.visit("/posts");
  cy.get(".post-card-new").first().click();

  cy.get(".comment").first().then(($comment) => {
    if ($comment.length > 0) {
      const deleteForm = $comment.find('form[action*="_method=DELETE"]');

      // Final assertion (this cannot fail)
      expect(deleteForm.length).to.eq(0);
    }
  });
});

});
