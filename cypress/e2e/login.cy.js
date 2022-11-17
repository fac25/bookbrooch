const authUser = require("../fixtures/auth-user.json");

context("SignUp", () => {
  it("should login without UI", () => {
    const { email, password } = authUser; // from json
    cy.visit("http://localhost:3000");
    cy.login(email, password);

    // UI will reflect the user being logged in
    cy.get("nav").contains("Dashboard");

    cy.logout();
  });
});
