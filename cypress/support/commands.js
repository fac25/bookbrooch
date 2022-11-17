// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// Initialise Firebase app
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Cypress.env("apiKey"),
  authDomain: Cypress.env("authDomain"),
  projectId: Cypress.env("projectId"),
  storageBucket: Cypress.env("storageBucket"),
  messagingSenderId: Cypress.env("messagingSenderId"),
  appId: Cypress.env("appId"),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add(
  "login",
  (email = "test@test.com", password = "password") => {
    // programmatically log in without needing the UI
    return signInWithEmailAndPassword(auth, email, password);
  }
);

Cypress.Commands.add("logout", () => {
  // programmatically logged us out without needing the UI
  return signOut(auth);
});
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
