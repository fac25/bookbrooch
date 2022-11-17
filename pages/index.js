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
    0: "Happiness",
    1: "Death",
    2: "Life",
    3: "Motivational",
    4: "Funny",
    5: "Love",
    6: "Friends",
  };
  const [randomQuotes, setRandomQuotes] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(true);
  useEffect(() => {
    let day = new Date().getDay();
    // console.log(day);
    fetch(`https://goodquotesapi.herokuapp.com/tag/${dayTagPairs[day]}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.quotes[0].quote);
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
                  console.log(quote)
                  return (
                    <Quote
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
