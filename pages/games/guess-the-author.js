// - [x] Grab a single random quote
// - [x] Grab 3 other random authors
// - [x] Let user click to choose between options
// - [x] Tell them if they were right or wrong
// - [x] Generate a new random quote
import { searchBy2 } from "../../api-helpers";
import {
  getRndInteger,
  getFourUniqueRandomIntegers,
} from "../../general-helpers";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import FourAuthors from "../../components/FourAuthors";
export async function getServerSideProps() {
  let quotesPlusAuthorsObj = await getQuoteAndThreeOtherAuthors();
  return {
    props: {
      quotesPlusAuthorsObj,
    },
  };
}

export default function GuessTheAuthor({ quotesPlusAuthorsObj }) {
  const [actualQuoteObj, setActualQuoteObj] = useState({});
  const [authorsArray, setAuthorsArray] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [authorUserChose, setAuthorUserChose] = useState("");
  const [fourUniqueRandomIntegers, setFourUniqueRandomIntegers] = useState(
    getFourUniqueRandomIntegers(0, 4)
  );
  useEffect(() => {
    setLoaderVisible(false);
    setActualQuoteObj(quotesPlusAuthorsObj.randomQuoteObj);
    setAuthorsArray(
      quotesPlusAuthorsObj.incorrectAuthors.concat(
        quotesPlusAuthorsObj.randomQuoteObj.author
      )
    );
  }, []);
  return (
    <div>
      <p>Do you know your quotes? Test your knowledge!</p>
      <p>Who said this:</p>
      {loaderVisible ? <Loader></Loader> : ""}
      {loaderVisible === false ? (
        <div>
          <p>{actualQuoteObj.quote}</p>
          <FourAuthors
            optionA={authorsArray[fourUniqueRandomIntegers[0]]}
            optionB={authorsArray[fourUniqueRandomIntegers[1]]}
            optionC={authorsArray[fourUniqueRandomIntegers[2]]}
            optionD={authorsArray[fourUniqueRandomIntegers[3]]}
            actualQuoteObj={actualQuoteObj}
            authorUserChose={authorUserChose}
            setAuthorUserChose={setAuthorUserChose}
            setLoaderVisible={setLoaderVisible}
            setActualQuoteObj={setActualQuoteObj}
            setAuthorsArray={setAuthorsArray}
            startGame={startGame}
          ></FourAuthors>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

async function getQuoteAndThreeOtherAuthors() {
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
  //console.log(quotesResult);
  //get a random page number
  const pageNum = getRndInteger(1, quotesResult.total_pages);
  //get all quotes from that random page
  const quotesByPage = await searchBy2("tag", randomTag, pageNum);
  console.log(quotesByPage);
  // get a single random quote from random page
  const randomQuoteObj = quotesByPage.quotes[getRndInteger(0, 30)];
  console.log(randomQuoteObj);
  //select three OTHER authors from quotesByPage
  let threeOtherAuthors = [];
  const quotesByPageResultAsArray = Object.values(quotesByPage)[2];
  console.log(quotesByPageResultAsArray);
  let twentyNineQuoteObjectsToChooseAuthorsFrom =
    quotesByPageResultAsArray.filter((indQuoteObj) => {
      return indQuoteObj.author !== randomQuoteObj.author;
    });
  //console.log(twentyNineQuoteObjectsToChooseAuthorsFrom);
  for (let i = 0; threeOtherAuthors.length < 3; i++) {
    let randomIndex = getRndInteger(
      0,
      twentyNineQuoteObjectsToChooseAuthorsFrom.length
    );
    let possibleAuthor =
      twentyNineQuoteObjectsToChooseAuthorsFrom[randomIndex].author;
    if (!threeOtherAuthors.includes(possibleAuthor)) {
      threeOtherAuthors.push(possibleAuthor);
    }
  }
  console.log(threeOtherAuthors);

  return {
    randomQuoteObj: randomQuoteObj,
    incorrectAuthors: threeOtherAuthors,
  };
}

async function startGame(setLoaderVisible, setActualQuoteObj, setAuthorsArray) {
  setLoaderVisible(true);
  let quotesPlusAuthorsObj = await getQuoteAndThreeOtherAuthors();
  setLoaderVisible(false);
  setActualQuoteObj(quotesPlusAuthorsObj.randomQuoteObj);
  setAuthorsArray(
    quotesPlusAuthorsObj.incorrectAuthors.concat(
      quotesPlusAuthorsObj.randomQuoteObj.author
    )
  );
}
