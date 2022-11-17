import WrongAuthorGuessed from "./WrongAuthorGuessed";
import RightAuthorGuessed from "./RightAuthorGuessed";
import { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
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
    if (event.target.innerText.trim() == actualQuoteObj.author.trim()) {
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
      <Flex flexWrap="wrap" gap="5" mt="5">
        <Button onClick={handleClick}>{optionA}</Button>
        <Button onClick={handleClick}>{optionB}</Button>
        <Button onClick={handleClick}>{optionC}</Button>
        <Button onClick={handleClick}>{optionD}</Button>
      </Flex>
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
