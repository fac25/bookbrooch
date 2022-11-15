// - [ ] input for users to choose where the quote is coming from i.e. specific author, or book or just random
// - [ ] fetch quotes using that input value
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

import { set, useForm } from "react-hook-form";
import { searchBy2, getSynonym } from "../api-helpers";
import {
  getRndInteger,
  removePunctuationFromString,
  getAdjectivesAdverbs,
} from "../general-helpers";
import { useState } from "react";
// display first quote and hide form
// useState for current quote
// onclick listener for btn clicked = user response

export default function RealOrFake() {
  const [gameQuote, setGameQuote] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const fakeQuoteInfo = await getFakeQuote(); // Schrodinger quote
      console.log(fakeQuoteInfo);
      // [1] UPDATE QUOTE STATE WITH INITIAL QUOTE
      getRndInteger(0, 2) === 0
        ? setGameQuote({
            quote: fakeQuoteInfo.realQuote,
            answer: true,
            author: fakeQuoteInfo.author,
          })
        : setGameQuote({
            quote: fakeQuoteInfo.fakeQuote,
            answer: false,
            author: fakeQuoteInfo.author,
            realQuote: fakeQuoteInfo.realQuote,
          });
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <main>
      <h1>Real or fake</h1>
      <section id="start-game">
        <h2>Is this real?</h2>
        <p>Test your knowledge with Spotting if a quote is real or not</p>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label htmlFor="type">Get qutoes of</label>
            </div>
            <input type="text" id="type" {...register("type")} />
          </div>
          <div>
            <button type="submit">submit</button>
          </div>
        </form>
      </section>
      <section id="gameQuote">
        <>
          <div>
            <p id="quote">{gameQuote.quote}</p>
            <p>- {gameQuote.author}</p>
            <section>
              <button
                onClick={(e) =>
                  checkAnswer(e, gameQuote.answer, setGameQuote, gameQuote)
                }
              >
                Real
              </button>
              <button
                onClick={(e) =>
                  checkAnswer(e, gameQuote.answer, setGameQuote, gameQuote)
                }
              >
                Fake
              </button>
            </section>
          </div>
        </>
      </section>
    </main>
  );
}

async function getQuoteAndArrayOfPossibleWordsToChange() {
  //make fetch request just to find out how many pages there are
  const quotesResult = await searchBy2("tag", "life");
  //console.log(quotesResult);
  //get a random page number
  const pageNum = getRndInteger(1, quotesResult.total_pages);
  //get all quotes from that random page
  const quotesByPage = await searchBy2("tag", "life", pageNum);
  //console.log(quotesByPage);
  // get a single random quote from random page
  const randomQuoteObj = quotesByPage.quotes[getRndInteger(0, 30)];
  //console.log(randomQuoteObj);
  const randomQuoteMinusPunctuation = removePunctuationFromString(
    randomQuoteObj.quote
  );
  // Select adjectives, nouns and adverbs from the quote
  const arrayOfPossibleWordsToChange = getAdjectivesAdverbs(
    randomQuoteMinusPunctuation
  );
  //console.log(arrayOfPossibleWordsToChange);
  return [randomQuoteObj, arrayOfPossibleWordsToChange];
}

async function getFakeQuote() {
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
  //console.log(["Real quote:" + quoteObj.quote, "Fake quote:" + fakeQuote]);

  const fakeQuoteInfo = {
    fakeQuote,
    realQuote: quoteObj.quote,
    author: quoteObj.author,
    source: quoteObj.publication,
  };
  return fakeQuoteInfo;
}

// Real or Fake function

async function checkAnswer(e, ansQuote, setGameQuote, gameQuote) {
  const userRes = e.target.textContent;

  const guessed = false;
  // if they clicked real and real: true = true
  // if they clocked Fake and real: false = true

  // if they clicked real and real: false = false
  // if they clocked Fake and real: true = false
  // console.log(e.target.textContent);

  if ((userRes == "Real" && ansQuote) || (userRes == "Fake" && !ansQuote)) {
    alert(
      `Correct! That was a ${userRes.toLowerCase()} quote. ${
        userRes === "Fake" ? "The real quote was:" + gameQuote.realQuote : ""
      }`
    );
  } else if (
    (userRes == "Real" && !ansQuote) ||
    (userRes == "Fake" && ansQuote)
  ) {
    alert(
      `Sorry! That was a ${userRes.toLowerCase()} quote! ${
        userRes === "Fake" ? "The real quote was:" + gameQuote.realQuote : ""
      }`
    );
  }

  const fakeQuoteInfo = await getFakeQuote(); // Schrodinger quote
  getRndInteger(0, 2) === 0
    ? setGameQuote({
        quote: fakeQuoteInfo.realQuote,
        author: fakeQuoteInfo.author,
        answer: true,
      })
    : setGameQuote({
        quote: fakeQuoteInfo.fakeQuote,
        answer: false,
        author: fakeQuoteInfo.author,
        realQuote: fakeQuoteInfo.realQuote,
      });

  // [2] UPDATE STATE GENERATE NEW QUOTE

  // Display quote
  // Real or Fake btns
  // Handle response
  // BTN clicked:
  // message + real quote if wrong
  // alert("You are now playing!");
}
