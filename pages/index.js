import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Quote from "../components/Quote";

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
            author: element.author,
            source: element.publication,
            quote: element.quote,
            tags: [dayTagPairs[day]],
          });
        });

        setRandomQuotes(newRandomQuotes);
      });
  }, []);
  return (
    <div>
      <ul>
        {randomQuotes.map((quote, index) => {
          return <Quote key={quote.author + index} quoteObj={quote} />;
        })}
      </ul>
    </div>
  );
}
