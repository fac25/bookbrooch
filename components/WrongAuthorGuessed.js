export default function WrongAuthorGuessed({ actualQuoteObj }) {
  return (
    <div>
      <p>&#10006; Wrong!</p>
      <p>The correct answer was {actualQuoteObj.author}</p>
    </div>
  );
}
