## 07-11-2022

### Morning

- Setup and test Firestore db

### Afternoon

- Setup and testFirebase Auth
- Deployed to Vercel

## 08-11-2022

### Morning

- We fixed "type": "module" bug.
- Stopped using environment variables (for now).
- Dynamic Routes for users.
- Creating reusable functions to interact with Firestore db.

### Afternoon

- On signup user is added to DB
- Create db queries for adding a new user, adding quotes and displaying the quote collection by a given user

### Questions (from today) for mentors

- .env.local doesn't work with firestore?

## 09-11-2022

## 10-11-2022

### Things to do today

- [x] Complete functionality for delete/add quote on users/[id.js] i.e. page should be re-rendered when new quotes are added or when an exisring quote is deleted
- [x] Merge form-clear branch
- [ ] Update daily log md for 9th Nov
- [x] Investigate dot.env()/environment variables for initFirebase.js
- [x] Look for a way to solve refresh bug on users/[id.js] page (and any page that uses ProtectedRoute component)
- [x] Message mentors about code review
- [x] Update the main readme.md before code review at 4pm
- [x] Create a reusable component for quotes
- [x] Add some content to homepage
- [x] filter functionality for quotes on users/[id.js] page
- [ ] Create at least one game


## Presentation slides
Loading problem
![image](https://user-images.githubusercontent.com/99407460/201329217-cfc1df40-78be-468a-96a5-e55304724db8.png)

---
My favourite!
![image](https://user-images.githubusercontent.com/99407460/201336886-dd89ecea-8d15-43f5-bf5d-cc00d31c4005.png)


---

Firebase (return the id of a newly added document)

``` javascript
  async function addQuote(uidFromAuth, newQuote) {
 //const d = await setDoc(doc(db, `users/${user}/quotes`, "a"), newQuote); // Adds doc named "a" with given quote
     const userQuoteCol = collection(db, `users/${uidFromAuth}/quotes`);
     const ref = await addDoc(userQuoteCol, newQuote); // [Todo] GET random ID?
   return ref.id;
  }
```





## 14-11-2022

### Things to do today

- [ ] Finish the real/fake game
- [ ] Implement search feature
- [ ] Start styling the app
- [ ] Add dark mode functionality

### Morning

- Continued Building the RealOrFake game.
- Building the search feature on the home page.

### Afternoon 
- Continued Building the RealOrFake game.
- Added basic styles to the app.
- Added Theme feature with Chakra ui.



