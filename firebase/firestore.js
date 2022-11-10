import app from "../firebase/initFireBase.js";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

const db = getFirestore(app);

// ======================= //
//         SYNTAX          //
// ======================= //

// COLLECTION = collection(db, "quotes") -> even number of arguments
// DOCUMENT = doc(db, "users", userEmail) -> odd number of arguments
// WRITING OVER or CREATING a doc with a given id: await setDoc(doc(db, `users/${user}/quotes`, "a"), newQuote); // Adds doc named "a" with given quote (newQuote)

// ----------------------- //

// TO DO
// - [X] On signup - use uid to create new document
// - [X] On adding new quote, add new doc to quote coll for specific user
// - [X] display all quotes from this user
// - [X] delete specific quote
// - [ ] sort and view quotes by author, title, tags
// - [ ] edit specific quote
// - [ ] give user option to order their quotes
// - [ ] up/downvote quotes

async function addNewUserToDB(uidFromAuth, dataName) {
  await setDoc(doc(db, "users", uidFromAuth), { name: dataName });
}
// TEST addUSER =======================
// addNewUserToDB("Eminem123", "Michael M");
// async function test() {
//   const usersCol = collection(db, "users")
//   const snapShot2 = await getDocs(usersCol);
//   snapShot2.forEach((snap) => {
//     console.log(snap.data());
//   });
// }
// test();

// ADDING QUOTES ========================
async function addQuote(uidFromAuth, newQuote) {
  const userQuoteCol = collection(db, "users", uidFromAuth, "quotes");
  const res = await setDoc(doc(userQuoteCol), newQuote);
}

// async function addQuote(uidFromAuth, newQuote) {
//   // const d = await setDoc(doc(db, `users/${user}/quotes`, "a"), newQuote); // Adds doc named "a" with given quote
//   const userQuoteCol = collection(db, `users/${uidFromAuth}/quotes`);
//   const ref = await addDoc(userQuoteCol, newQuote); // [Todo] GET random ID?
//   return ref.id;
// }
// TEST addQUOTE =======================
// addQuote("Eminem123", {
//   quote: "i am so commentful",
//   title: "glwmrkfgw",
//   author: "life",
//   tags: ["eternal", "amazement"]
// })

// DISLPAY ALL QUOTES BY USER =======================
async function getUserQuotes(user) {
// get all QUOTES by user ID
  const colRef = collection(db, "users", user, "quotes");
  //get all docs inside the quotes collection of this user
  const userQuoteCol = await getDocs(colRef);
  let usersQuotesWithQuoteIDsAdded = [];
  userQuoteCol.forEach((snap) => {
    usersQuotesWithQuoteIDsAdded.push({
      ...snap.data(),
      quoteId: snap.id,
    });
  });
  return usersQuotesWithQuoteIDsAdded;
}

// TEST displayUserQuotes
// getUserQuotes("Eminem123")


// Find user's name
// Query to get a name from a specific user by their id
async function getUsername(userId) {
  const username = await getDoc(doc(db, "users", userId));

  return username.data().name;
}
// TEST Get username by userId
// getUsername("Eminem123")

// DELETE SPECIFIC QUOTE (by id) =======================
async function deleteQuote(userId, quoteId) {
  await deleteDoc(doc(db, "users", userId, "quotes", quoteId));
  // console.log(quoteId + " deleted");
}

// RESOURSES =======================

/*
const quotesCol = collection(db, "quotes");
const washingtonRef = doc(db, "quotes");

// Set the "capital" field of the city 'DC'

await updateDoc(washingtonRef, {
  author: "Harry",
});
*/
// Add a new document with a generated id.
// const docRef = await setDoc(collection(db, "quotes"), {
//   author: "Hello",
//   quote: "World",
// });

// const data = {
//   author: "Yassien",
//   quote: "Let's master Firebase",
// };

// const res = await db.collection("quotes").doc("1").set(data);
// console.log(res.id);
// await setDoc(doc(db, "quotes", "3"), data);
// const snapShot1 = await getDocs(quotesCol);

// // await deleteDoc(doc(db, "quotes", "1", quoteid));

// snapShot1.forEach((snap) => {
//   console.log(snap.data());
// });

export {
  addNewUserToDB,
  addQuote,
  getUserQuotes,
  getUsername,
  deleteQuote,
  db,
};
