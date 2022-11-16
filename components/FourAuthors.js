import WrongAuthorGuessed from "./WrongAuthorGuessed";
import RightAuthorGuessed from "./RightAuthorGuessed";
import { useState } from "react";
export default function FourAuthors({
  optionA,
  optionB,
  optionC,
  optionD,
  actualQuoteObj,
  authorUserChose,
  setAuthorUserChose,
  setLoaderVisible,
  setActualQuoteObj,
  setAuthorsArray,
  startGame,
}) {
  const [guessTruthiness, setGuessTruthiness] = useState();
  function handleClick(event) {
    setAuthorUserChose(event.target.innerText);
    if (event.target.innerText === actualQuoteObj.author) {
      setGuessTruthiness(true);
    } else {
      setGuessTruthiness(false);
    }
    setTimeout(() => {
      console.log("restart the game");
      setAuthorUserChose("");
      setGuessTruthiness();
      startGame(setLoaderVisible, setActualQuoteObj, setAuthorsArray);
    }, 2000);
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {optionA}
      </button>
      <button type="button" onClick={handleClick}>
        {optionB}
      </button>
      <button type="button" onClick={handleClick}>
        {optionC}
      </button>
      <button type="button" onClick={handleClick}>
        {optionD}
      </button>
      {guessTruthiness ? (
        <RightAuthorGuessed
          actualQuoteObj={actualQuoteObj}
        ></RightAuthorGuessed>
      ) : (
        ""
      )}
      {!guessTruthiness && authorUserChose !== "" ? (
        <WrongAuthorGuessed
          actualQuoteObj={actualQuoteObj}
        ></WrongAuthorGuessed>
      ) : (
        ""
      )}
    </div>
  );
}
