// API https://goodquotesapi.herokuapp.com/#/developer
const apiUrl = "https://goodquotesapi.herokuapp.com";

async function searchBy(query, test) {
  const quoteByTag = await fetch(`${apiUrl}/${query}/${test}`).then(
    (res) =>
      res.json().then((data) => {
        let quotesFormatted = [];

        data.quotes.forEach((q) => {
          const authorFormatted = q.author.trim().replace(",", "");
          quotesFormatted.push({
            quote: q.quote,
            author: authorFormatted,
            source: q.publication,
          });
          //quotesFormatted.tags =
        });
        console.log(quotesFormatted);
        return quotesFormatted;
      })

    //   .then((quotes) => {
    //     let quotesFormatted = [];
    //     quotes.forEach((q) => {
    //       quotesFormatted.push({
    //         quote: q.quote,
    //         author: q.author,
    //         source: q.publication,
    //       });
    //       return quotesFormatted;
    //       //quotesFormatted.tags =
    //     });
    //   })
  );

  // Format data.quotes
  // - [X] create new array
  // - [X] Clean author - remove '\n at beg and end; trim()
  // - [X] change .publication to .source
  // - [ ] add .tag - TO BE CONFIRMED - where do we get the tag from: 1. User selects from dropdown menu; 2. User types themselves

  // Example quote:
  //{
  //   quote: 'Sometimes you wake up. Sometimes the fall kills you. And sometimes, when you fall, you fly.',
  //   author: '\n    Neil Gaiman,\n  ',
  //   source: 'Fables & Reflections',
  //   tag: 'inspiration'
  //}
}

// SEARCH BY TAG
//searchBy("tag", "love");

// SEARCH BY AUTHOR
// searchBy("author", "george+orwell");

// SEARCH BY TITLE
// searchBy("title", "Winnie+Pooh");

// Get 10 random quotes

//

async function searchBy2(query, value, page = 1) {
  const quotesPromise = await fetch(`${apiUrl}/${query}/${value}?page=${page}`);
  const quotesJson = await quotesPromise.json();
  //console.log(quotesJson);
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
  console.log(wordJson);
  return wordJson;
}
getSynonym("creating");
export default searchBy;

export { searchBy2, getSynonym };
