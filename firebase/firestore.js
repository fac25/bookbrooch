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

// COLLECTION = collection(db, "quotes") -> even number
// DOCUMENT = doc(db, "users", userEmail) -> odd number

// ----------------------- //

const quotesCol = collection(db, "quotes");
// const snapShot1 = await getDocs(quotesCol);

// TO DO
// - [X] On signup - use uid to create new document
// - [X] On adding new quote, add new doc to quote coll for specific user
// - [X] display all quotes from this user
// - [ ] delete specific quote
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
  // const d = await setDoc(doc(db, `users/${user}/quotes`, "a"), newQuote); // Adds doc named "a" with given quote
  const userQuoteCol = collection(db, "users", uidFromAuth, "quotes");
  const res = await setDoc(doc(userQuoteCol), newQuote);
  // [Todo] GET random ID?
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
  // DISPLAY COLLECTION OF QUOTES
  // const colRef = collection(db, "users", user, "quotes");
  // const userQuoteCol = await getDocs(colRef);
  // userQuoteCol.forEach((snap) => {
  //   console.log(snap.data());
  // });

  // DISPLAY COLLECTION OF QUOTES WITH UNIQUE IDs
  const colRef = collection(db, "users", user, "quotes");
  const userQuoteCol = await getDocs(colRef);
  // getDocs to get snap.id
  // create new onject that includes quoteId

  // const a = colRef.snapshotChanges()
  // console.log(colRef)
  let arr = [];
  userQuoteCol.forEach((snap) => {
    // console.log(snap.id);
    // console.log(snap.data());

    arr.push({
      ...snap.data(),
      quoteId: snap.id,
    });
  });
  // console.log(arr);
  return arr;

  // [Todo]
  // [ ] return an array of quote objects
}

// TEST displayUserQuotes
// displayUserQuotes("Eminem123")

// DELETE SPECIFIC QUOTE =======================
// Delete by id

// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
// Query to get a name from a specific user by their id
async function getUsername(userId) {
  const username = await getDoc(doc(db, "users", userId));

  return username.data().name;
}
// TEST Get username by userId
// getUsername("Eminem123")

// Delete a quote by id

async function deleteQuote(userId, quoteId) {
  // console.log(quoteId)
  await deleteDoc(doc(db, "users", userId, "quotes", quoteId));
  console.log(quoteId + " deleted");
}

// RESOURSES =======================

/*
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
