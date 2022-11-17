// - [x] find an api to check the quote and break each word down into noun, adjective etc
// - [x] pull out one word from the real quote
// - [x] use an api to get a synonym for that word
// - [x] substitute the synonym to create a fake version of the quote
// - [x] Display quote
// - [x] Real or Fake btns
// - [x] Handle response
// - [x] BTN clicked:
// - [x] message + real quote if wrong
// - [x] alert("You are now playing!");

import { searchBy2, getSynonym } from "../../lib/api-helpers"
import {
  getRndInteger,
  removePunctuationFromString,
  getAdjectivesAdverbs,
} from "../../lib/general-helpers";

import { Container, Heading, Text, Button, Flex } from "@chakra-ui/react";
import Head from "next/head";
// display first quote and hide form
// useState for current quote
// onclick listener for btn clicked = user response
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
export async function getServerSideProps() {
  let schrodingerQuoteInfo = await getSchrodingerQuote();
  return {
    props: {
      schrodingerQuoteInfo,
    },
  };
}
export default function RealOrFake({ schrodingerQuoteInfo }) {
  const [gameQuote, setGameQuote] = useState({});
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    setLoaderVisible(false);
    // console.log(schrodingerQuoteInfo);
    // [1] UPDATE QUOTE STATE WITH INITIAL QUOTE
    getRndInteger(0, 2) === 0
      ? setGameQuote({
        quote: schrodingerQuoteInfo.realQuote,
        answer: true,
        author: schrodingerQuoteInfo.author,
        realQuote: schrodingerQuoteInfo.realQuote,
      })
      : setGameQuote({
        quote: schrodingerQuoteInfo.fakeQuote,
        answer: false,
        author: schrodingerQuoteInfo.author,
        realQuote: schrodingerQuoteInfo.realQuote,
      });
  }, []);

  return (
    <Container maxW="container.lg">
      <Heading as="h1" textAlign="center" mb="5">
        Real or Fake
      </Heading>
      <section id="start-game">
        <Heading
          as="h2"
          fontSize={["1em", "1.5em"]}
          textAlign={["left", "center"]}
          mb="3"
        >
          Is the displayed quote real?
        </Heading>
        <Text
          as="p"
          fontSize={["1em", "1.5em"]}
          textAlign={["left", "center"]}
          mb={9}
        >
          Test your knowledge with spotting if a quote is real or not
        </Text>
      </section>
      {loaderVisible ? <Loader></Loader> : ""}
      <section id="gameQuote">
        <Flex
          m={[0, "auto"]}
          p={5}
          maxW={["container.sm", "container.md"]}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          borderWidth={"1px"}
          shadow={"md"}
        >
          {loaderVisible === false ? (
            <div>
              <p id="quote">{gameQuote.quote}</p>
              <p>{gameQuote.author}</p>
            </div>
          ) : (
            ""
          )}

          <Flex m={5} gap={4} alignItems="center" justifyContent={"center"}>
            <Button
              onClick={(e) =>
                checkAnswer(
                  e,
                  gameQuote.answer,
                  setGameQuote,
                  gameQuote,
                  setLoaderVisible
                )
              }
            >
              Real
            </Button>
            <Button
              onClick={(e) =>
                checkAnswer(
                  e,
                  gameQuote.answer,
                  setGameQuote,
                  gameQuote,
                  setLoaderVisible
                )
              }
            >
              Fake
            </Button>
          </Flex>
        </Flex>
      </section>
    </Container>
  );
}

async function startGame(setGameQuote, setLoaderVisible) {
  try {
    const schrodingerQuoteInfo = await getSchrodingerQuote(); // Schrodinger quote
    setLoaderVisible(false);
    // console.log(schrodingerQuoteInfo);
    // [1] UPDATE QUOTE STATE WITH INITIAL QUOTE
    getRndInteger(0, 2) === 0
      ? setGameQuote({
        quote: schrodingerQuoteInfo.realQuote,
        answer: true,
        author: schrodingerQuoteInfo.author,
        realQuote: schrodingerQuoteInfo.realQuote,
      })
      : setGameQuote({
        quote: schrodingerQuoteInfo.fakeQuote,
        answer: false,
        author: schrodingerQuoteInfo.author,
        realQuote: schrodingerQuoteInfo.realQuote,
      });
  } catch (error) {
    // console.log(error.message);
    // alert(error.message);
  }
}

async function getQuoteAndArrayOfPossibleWordsToChange() {
  const arrayOfTagsToSearchBy = [
    "life",
    "death",
    "happiness",
    "love",
    "wisdom",
    "inspirational",
    "motivational",
    "funny",
  ];
  //pick a random tag to search by
  let randomTag =
    arrayOfTagsToSearchBy[getRndInteger(0, arrayOfTagsToSearchBy.length)];
  //make fetch request just to find out how many pages there are
  const quotesResult = await searchBy2("tag", randomTag);
  // console.log(quotesResult);
  //get a random page number
  const pageNum = getRndInteger(1, quotesResult.total_pages);
  //get all quotes from that random page
  const quotesByPage = await searchBy2("tag", randomTag, pageNum);
  // console.log(quotesByPage);
  // get a single random quote from random page
  const randomQuoteObj = quotesByPage.quotes[getRndInteger(0, 30)];
  // console.log(randomQuoteObj);
  const randomQuoteMinusPunctuation = removePunctuationFromString(
    randomQuoteObj.quote
  );
  // Select adjectives, nouns and adverbs from the quote
  const arrayOfPossibleWordsToChange = getAdjectivesAdverbs(
    randomQuoteMinusPunctuation
  );
  // console.log(arrayOfPossibleWordsToChange);
  return [randomQuoteObj, arrayOfPossibleWordsToChange];
}

async function getSchrodingerQuote() {
  let [quoteObj, wordsArr] = [];
  let synonymsObj = {
    synonyms: [],
  };
  let wordToReplace;

  do {
    [quoteObj, wordsArr] = await getQuoteAndArrayOfPossibleWordsToChange();
    wordToReplace = wordsArr[getRndInteger(0, wordsArr.length)];
    synonymsObj = await getSynonym(wordToReplace);
  } while (wordsArr.length === 0 || synonymsObj.synonyms.length === 0);

  let fakeWord = synonymsObj.synonyms[0];

  //next: substitute one of the synonyms into the quote to create a fake one
  let fakeQuote = quoteObj.quote.replace(wordToReplace, fakeWord);
  // console.log(["Real quote:" + quoteObj.quote, "Fake quote:" + fakeQuote]);

  const schrodingerQuoteInfo = {
    fakeQuote,
    realQuote: quoteObj.quote,
    author: quoteObj.author,
    source: quoteObj.publication,
  };
  return schrodingerQuoteInfo;
}

// Real or Fake function

async function checkAnswer(
  e,
  ansQuote,
  setGameQuote,
  gameQuote,
  setLoaderVisible
) {
  setLoaderVisible(true);
  // console.log(gameQuote)
  const userRes = e.target.textContent;
  // console.log(`User clicked: ${userRes}`)

  const guessed = false;

  if (userRes === "Real") {
    if (ansQuote) {
      alert("Correct! That was a real quote!");
    } else {
      alert(
        `Incorrect! That was a fake quote. The actual quote is: "${gameQuote.realQuote}!"`
      );
    }
  } else if (userRes === "Fake") {
    if (!ansQuote) {
      alert(
        `Correct! That was a fake quote. The actual quote is: "${gameQuote.realQuote}!"`
      );
    } else {
      alert("Incorrect! That was a real quote!");
    }
  }

  const schrodingerQuoteInfo = await getSchrodingerQuote(); // Schrodinger quote
  setLoaderVisible(false);
  getRndInteger(0, 2) === 0
    ? setGameQuote({
      quote: schrodingerQuoteInfo.realQuote,
      author: schrodingerQuoteInfo.author,
      answer: true,
      realQuote: schrodingerQuoteInfo.realQuote,
    })
    : setGameQuote({
      quote: schrodingerQuoteInfo.fakeQuote,
      answer: false,
      author: schrodingerQuoteInfo.author,
      realQuote: schrodingerQuoteInfo.realQuote,
    });

  // [2] UPDATE STATE GENERATE NEW QUOTE

  // Display quote
  // Real or Fake btns
  // Handle response
  // BTN clicked:
  // message + real quote if wrong
  // alert("You are now playing!");
}
