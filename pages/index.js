import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Heading, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Quote from "../components/Quote";
import Search from "../components/Search";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { getQuotesOfTheDay } from "../lib/api-helpers";

export default function Home() {
  // let dayTagPairs = {
  //   0: "happiness",
  //   1: "death",
  //   2: "life",
  //   3: "motivational",
  //   4: "funny",
  //   5: "love",
  //   6: "friends",
  // };
  const [randomQuotes, setRandomQuotes] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(true);
  useEffect(() => {
    getQuotesOfTheDay().then((newRandomQuotes) => {
      setRandomQuotes(newRandomQuotes);
      setLoaderVisible(false);
    });
  }, []);

  const { user } = useAuth();

  return (
    <div>
      <Container maxW="container.lg" py="15px">
        <Heading as="h1" size="lg" textAlign="center">
          Quotes to feed your curiousity
        </Heading>
        <section>
          <Heading as="h2" size="md" textAlign="center">
            Search for a quote
          </Heading>
          <Search />

          {loaderVisible ? <Loader></Loader> : ""}
          {loaderVisible === false ? (
            <section>
              <Heading as="h2" size="md" textAlign="center" my="15px">
                Quotes of the day
              </Heading>
              <ul>
                {randomQuotes.map((quote, index) => {
                  //console.log(quote)
                  return (
                    <Quote
                      searchResults
                      key={quote.author + index}
                      quoteObj={quote /* Should have tags included */}
                      home={true}
                      user={user}
                    />
                  );
                })}
              </ul>
            </section>
          ) : (
            ""
          )}
        </section>
      </Container>
    </div>
  );
}
