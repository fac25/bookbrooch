import ProtectedRoute from "../../components/ProtectedRoute";
import { displayUserQuotes, getUsername } from "../../firebase/firestore";
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
      <section>
        {userData.quotes.map((quote) => {
          return <div key={quote.quoteId}>
            <p>{quote.quote}</p>
            <p>
              <span>
                {quote.author}
              </span>
              -
              <span>
                {quote.title}
              </span>
            </p>
            <p>
              {quote.tags.map(tag => <button key={tag}>{tag}</button>)}
            </p>
          </div>
        })}
      </section>
    </ProtectedRoute>
  );
};

export default DashboardPage;
