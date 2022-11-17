import { getRndInteger } from "./general-helpers"
// API https://goodquotesapi.herokuapp.com/#/developer
const apiUrl = "https://goodquotesapi.herokuapp.com";

async function searchBy(query, value, page = 1) {
  let quotesFormatted = [];
  const quoteByTag = await fetch(
    `${apiUrl}/${query}/${value}?page=${page}`
  ).then((res) =>
    res.json().then((data) => {
      data.quotes.forEach((q) => {
        const authorFormatted = q.author.trim().replace(",", "");
        quotesFormatted.push({
          quote: q.quote,
          author: authorFormatted,
          source: q.publication === null ? "Unknown source" : q.publication,
        });
      });
    })
  );
  return quotesFormatted;
}

async function searchBy2(query, value, page = 1) {
  const quotesPromise = await fetch(`${apiUrl}/${query}/${value}?page=${page}`);
  const quotesJson = await quotesPromise.json();
  // console.log(quotesJson);
  return quotesJson;
}
//Query for additional pages with ?page=#
//Example: /title/brave+new+world?page=3

// searchBy2("tag", "horror", 5);
//searchBy2("title", "A tale of two cities");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6fe1720b2bmsh7198b6017579de2p149d17jsn8d82c7985f52",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};

async function getSynonym(word) {
  const wordPromise = await fetch(
    `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
    options
  );
  const wordJson = await wordPromise.json();
  // console.log(wordJson);
  return wordJson;
}

async function getQuotesOfTheDay() {
  let day = new Date().getDay();

  let dayTagPairs = {
    0: "Happiness",
    1: "Death",
    2: "Life",
    3: "Motivational",
    4: "Funny",
    5: "Love",
    6: "Friends",
  };

  let pageNum = getRndInteger(0, 100);

  let thingFunctionActuallyReturns;
  let fetchResult = await fetch(
    `https://goodquotesapi.herokuapp.com/tag/${dayTagPairs[day]}?page=${pageNum}`
  )
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
        //console.log(newRandomQuotes);
        thingFunctionActuallyReturns = newRandomQuotes;
        return newRandomQuotes;
      });
    });

  return thingFunctionActuallyReturns;
}

export { searchBy, searchBy2, getSynonym, getQuotesOfTheDay };
