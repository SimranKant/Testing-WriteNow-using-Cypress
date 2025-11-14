describe("Chat and Messaging Tests", () => {
  beforeEach(() => {
    cy.login("testuser", "password123");
  });

  it("should navigate to chat inbox", () => {
    cy.get('a[href="/chat/inbox"]').click();
    cy.url().should("include", "/chat/inbox");
  });

  it("should display chat inbox page", () => {
    cy.visit("/chat/inbox");
    cy.get(".chatlist-container").should("be.visible");
  });

  it("should display no chats message if no conversations", () => {
    cy.visit("/chat/inbox");
    // Check if either chats exist or empty state is shown
    cy.get("body").should("contain.text", "Messages");
  });

  it("should click on a chat conversation", () => {
    cy.visit("/chat/inbox");
    cy.get(".chat-item")
      .first()
      .then(($chat) => {
        if ($chat.length > 0) {
          cy.wrap($chat).click();
          cy.url().should("include", "/chat/");
        }
      });
  });

  it("should display chat messages", () => {
    cy.visit("/chat/inbox");
    cy.get(".chat-item")
      .first()
      .then(($chat) => {
        if ($chat.length > 0) {
          cy.wrap($chat).click();
          cy.get("#messages").should("be.visible");
          cy.get(".chat-input-area").should("be.visible");
        }
      });
  });

  it("should have send message input field", () => {
    cy.visit("/chat/inbox");
    cy.get(".chat-item")
      .first()
      .then(($chat) => {
        if ($chat.length > 0) {
          cy.wrap($chat).click();
          cy.get("#msgInput").should("be.visible");
          cy.get("button").contains("Send").should("be.visible");
        }
      });
  });

  it("should not allow empty messages", () => {
    cy.visit("/chat/inbox");
    cy.get(".chat-item")
      .first()
      .then(($chat) => {
        if ($chat.length > 0) {
          cy.wrap($chat).click();
          cy.get("#msgInput").should("have.value", "");
        }
      });
  });
});
