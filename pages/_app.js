import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
