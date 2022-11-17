import pos from "pos";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function removePunctuationFromString(str) {
  let replaced = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?><@]/g, "");
  // console.log(replaced);
  return replaced;
}

function getAdjectivesAdverbs(sentence) {
  // Tag words from a sentence with part of speech code
  //see https://www.npmjs.com/package/pos for key of word type codes
  const words = new pos.Lexer().lex(`${sentence}`);
  const tagger = new pos.Tagger();
  const taggedWords = tagger.tag(words);

  let wordsToReturn = [];
  taggedWords.forEach((wordAndCodePair) => {
    //Return only adjective, nouns and adverbs;
    wordAndCodePair[1] === "JJ" || wordAndCodePair[1] === "RB"
      ? wordsToReturn.push(wordAndCodePair[0])
      : "do nothing";
  });

  return wordsToReturn;
}

function getFourUniqueRandomIntegers(min, max) {
  let arrayOfFourUniqueRandomIntegers = [];
  for (let i = 0; arrayOfFourUniqueRandomIntegers.length < 4; i++) {
    let newNumber = getRndInteger(min, max);
    if (!arrayOfFourUniqueRandomIntegers.includes(newNumber)) {
      arrayOfFourUniqueRandomIntegers.push(newNumber);
    }
  }
  // console.log(arrayOfFourUniqueRandomIntegers);
  return arrayOfFourUniqueRandomIntegers;
}

export {
  getRndInteger,
  removePunctuationFromString,
  getAdjectivesAdverbs,
  getFourUniqueRandomIntegers,
};
