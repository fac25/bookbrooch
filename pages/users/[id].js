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
  // - [ ] query for quotes 
  const quoteCol = await displayUserQuotes("Eminem123")
  // - [ ] map through quotes and display

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
      <div>
        <h1>{userData.name}</h1>
        <h2>
          {userData.quotes.map(quote => {
          <div key={quote.quoteId}>
            <div>{quote.quoteId}</div>

          </div>
        })}

        </h2>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
