import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Heading, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Quote from "../components/Quote";
import Search from "../components/Search";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  let dayTagPairs = {
    0: "happiness",
    1: "death",
    2: "life",
    3: "motivational",
    4: "funny",
    5: "love",
    6: "friends",
  };
  const [randomQuotes, setRandomQuotes] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(true);
  useEffect(() => {
    let day = new Date().getDay();
    console.log(day);
    fetch(`https://goodquotesapi.herokuapp.com/tag/${dayTagPairs[day]}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.quotes[0].quote);
        let slicedQuotes = data.quotes.slice(0, 5);
        let newRandomQuotes = [];
        slicedQuotes.forEach((element) => {
          newRandomQuotes.push({
            author: element.author.trim().replace(",", ""),
            source: element.publication || " Publication unknown",
            quote: element.quote,
            tags: [dayTagPairs[day]],
          });
        });

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
          <Box borderWidth="1px" p="5" my="20px" borderRadius="5px">
            <Heading as="h2" size="md" textAlign="center">
              Search for a quote
            </Heading>
            <Search />
          </Box>

          {loaderVisible ? <Loader></Loader> : ""}
          {loaderVisible === false ? (
            <ul>
              {randomQuotes.map((quote, index) => {
                return (
                  <Quote
                    key={quote.author + index}
                    quoteObj={quote}
                    home={true}
                    user={user}
                  />
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </section>
      </Container>
    </div>
  );
}
