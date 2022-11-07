import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </AuthContextProvider>
  );
}

export default MyApp;
