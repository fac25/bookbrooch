export default function RightAuthorGuessed({ actualQuoteObj }) {
  return (
    <div>
      <p>&#10004; Woohoo, that was right!</p>
      {actualQuoteObj.publication ? (
        <p>
          {actualQuoteObj.author} wrote that in {actualQuoteObj.publication}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
