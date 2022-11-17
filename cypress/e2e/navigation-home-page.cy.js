context("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Contains all Nav elements", () => {
    cy.get("nav").contains("Home");
    cy.get("nav").contains("Login");
    cy.get("nav").contains("Sign Up");
    cy.get("nav").contains("Game");
  });

  it("Home click takes to route '/'", () => {
    cy.get("nav").contains("Home").click();
    cy.location("pathname").should("include", "");
  });

  it("Login click takes to route '/login'", () => {
    cy.get("nav").contains("Login").click();
    cy.location("pathname").should("include", "login");
  });

  it("Sign Up click takes to route '/signup'", () => {
    cy.get("nav").contains("Sign Up").click();
    cy.location("pathname").should("include", "signup");
  });

  it("Login click takes to route '/games/game-selection'", () => {
    cy.get("nav").contains("Game").click();
    cy.location("pathname").should("include", "game");
  });

  it("Logo Click takes to home route '/'", () => {
    cy.get("#logo").contains("Bookbrooch").click();
    cy.location("pathname").should("include", "");
  });
});
