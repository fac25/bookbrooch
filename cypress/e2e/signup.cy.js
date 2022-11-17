context("SignUp", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("nav").contains("Sign Up").click();
  });

  it("Showing all signup form elements", () => {
    cy.get("#signupForm").within(() => {
      cy.get("label").contains("Name");
      cy.get("label").contains("Email");
      cy.get("label").contains("Password");
      cy.get("button").contains("Submit");
    });
  });

  it("Showing error if the required fields are empty", () => {
    cy.get("#signupForm").within(() => {
      cy.contains("Submit").click();
      cy.get("p").contains("Name is required");
      cy.get("p").contains("Email is required");
      cy.get("p").contains("Password is required");
    });
  });

  it("Signed up user is stored in the DB", () => {
    cy.get("#signupForm").within(() => {
      cy.get("#name").type("test");
      cy.get("#email").type("test@test.com");
      cy.get("#password").type("test");
      // cy.contains("Submit").click();
    });
  });
});
