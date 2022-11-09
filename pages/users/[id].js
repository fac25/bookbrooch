import ProtectedRoute from "../../components/ProtectedRoute";
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

  return {
    props: {
      userData: {
        name: "Amy",
        quotes: [{}, {}] /* this is just dummy data for now */,
      },
    },
  };
}

const DashboardPage = ({ userData }) => {
  return (
    <ProtectedRoute>
      <div>
        <h1>{userData.name}</h1>
      </div>
      <SaveQuoteForm></SaveQuoteForm>
    </ProtectedRoute>
  );
};

export default DashboardPage;
