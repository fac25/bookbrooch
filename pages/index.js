import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Quote from "../components/Quote";
import Search from "../components/Search";
import Loader from "../components/Loader";

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
        //console.log(data.quotes[0].quote);
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
  return (
    <div>
      <Container maxW="container.lg" py="15px">
        <Search />
        {loaderVisible ? <Loader></Loader> : ""}
        {loaderVisible === false ? (
          <div>
            <ul>
              {randomQuotes.map((quote, index) => {
                return <Quote key={quote.author + index} quoteObj={quote} />;
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}
