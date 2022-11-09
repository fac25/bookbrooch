import ProtectedRoute from "../../components/ProtectedRoute";

import { displayUserQuotes, getUsername, deleteQuote } from "../../firebase/firestore";
import SaveQuoteForm from "../../components/saveQuoteForm";

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
  const userId = params.id
  // - [X] write a query for the user's name
  // - [X] query the DB for name
  const username = await getUsername(userId)
  // - [X] pass it as props
  // - [x] query for quotes 
  const quoteCol = await displayUserQuotes(userId)
  // const quoteCol = await displayUserQuotes("Eminem123")
  // - [x] map through quotes and display
  console.log(quoteCol);
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
  return (
    <ProtectedRoute>
      <h1>{userData.name}</h1>
      <SaveQuoteForm></SaveQuoteForm>
      <section>
        {userData.quotes.map((quoteObj) => {
          const { author, title, quote, quoteId, tags } = quoteObj;
          return <div key={quoteId}>
            <p>{quote}</p>
            <p>
              <span>
                {author}
              </span>
              -
              <span>
                {title}
              </span>
            </p>
            <p>
              {tags.map(tag => <button key={tag}>{tag}</button>)}
            </p>
            <button onClick={() => {
              console.log(quoteId, userData.userId)
              deleteQuote(userData.userId, quoteId)
            }}>Delete</button>
          </div>
        })}
      </section>
    </ProtectedRoute>
  );
};

export default DashboardPage;
