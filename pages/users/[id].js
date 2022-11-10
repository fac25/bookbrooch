import ProtectedRoute from "../../components/ProtectedRoute";
import { useState, useEffect } from "react";
import {
  getUserQuotes,
  getUsername,
  deleteQuote,
  db,
} from "../../firebase/firestore";
import SaveQuoteForm from "../../components/saveQuoteForm";
import { onSnapshot, collection } from "firebase/firestore";
import Quote from "../../components/Quote";

//import getUser function from firebase/firestore.js
export async function getServerSideProps({ params }) {
  //params.id is the user's id

  //Delete the following 7 lines
  // console.log(params);
  // const db = getFirestore(app);
  // const quotesCol = collection(db, "quotes");
  // const snapShot1 = await getDocs(quotesCol);
  // snapShot1.forEach((snap) => {
  //   console.log(snap.data());
  // });

  //get current user's details (their name, quotes etc) from database

  // - [X] query DB to get the user's name, search by params.id
  const userId = params.id;
  // - [X] write a query for the user's name
  // - [X] query the DB for name
  const username = await getUsername(userId);
  // - [X] pass it as props
  // - [x] query for quotes
  const quoteCol = await getUserQuotes(userId);
  // const quoteCol = await getUserQuotes("Eminem123")
  // - [x] map through quotes and display
  return {
    props: {
      userData: {
        userId,
        name: username,
        quotes: quoteCol /* this is just dummy data for now */,
      },
    },
  };
}

const DashboardPage = ({ userData }) => {
  // const [quotes, setQuotes] = useState(userData.quotes);

  // const onDelete = (quoteId) => {
  //   deleteQuote(user.uid, quoteId).then(() => {
  //     let quotesCopy = quotes.filter((obj) => obj.quoteId !== quoteId);
  //     setQuotes(quotesCopy);
  //   });
  // };

  const [quotes, setQuotes] = useState([]);

  // console.log("=============================================");
  // console.log(quoteData);
  useEffect(() => {
    const colRef = collection(db, "users", userData.userId, "quotes");
    //real time update
    onSnapshot(colRef, (snapshot) => {
      const items = [];
      snapshot.docs.forEach((snap) => {
        items.push({
          ...snap.data(),
          quoteId: snap.id,
        });
      });
      setQuotes(items);
    });
  }, []);

  return (
    <ProtectedRoute>
      <h1>{userData.name}</h1>
      <SaveQuoteForm></SaveQuoteForm>
      <section>
        {/* {console.log(quotes)} */}
        <ul>
          {quotes.map((quoteObj) => {
            const { author, source, quote, quoteId, tags } = quoteObj;
            return (
              <Quote key={quoteId} userData={userData} quoteObj={quoteObj} />
              // <li>
              //   <p>{quote}</p>
              //   <p>
              //     <span>{author}</span>-<span>{source}</span>
              //   </p>
              //   <p>
              //     {tags.map((tag) => (
              //       <button key={tag}>{tag}</button>
              //     ))}
              //   </p>
              //   <button
              //     onClick={() => {
              //       console.log(quoteId, userData.userId);
              //       deleteQuote(userData.userId, quoteId);
              //     }}
              //   >
              //     Delete
              //   </button>
              // </li>
            );
          })}
        </ul>
      </section>
    </ProtectedRoute>
  );
};

export default DashboardPage;
