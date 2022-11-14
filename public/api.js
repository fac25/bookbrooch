// API https://goodquotesapi.herokuapp.com/#/developer

export async function searchBy(query, test) {
  console.log("=================searchBy==================");
  const apiUrl = "https://goodquotesapi.herokuapp.com";

  console.log(query, test);
  let quotesFormatted = [];
  const quoteByTag = await fetch(`${apiUrl}/${query}/${test}`).then((res) =>
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

// Format data.quotes
// - [X] create new array
// - [X] Clean author - remove '\n at beg and end; trim()
// - [X] change .publication to .source
// - [X]  - Do not include tags

// Example quote:
//{
//   quote: 'Sometimes you wake up. Sometimes the fall kills you. And sometimes, when you fall, you fly.',
//   author: '\n    Neil Gaiman,\n  ',
//   source: 'Fables & Reflections',
//   tag: 'inspiration'
//}
// SEARCH BY TAG
// searchBy("tag", "love");

// SEARCH BY AUTHOR
// searchBy("author", "george+orwell");

// SEARCH BY TITLE
// searchBy("title", "Winnie+Pooh");
