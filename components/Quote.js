import { deleteQuote } from "../firebase/firestore";
export default function Quote({ quoteObj, userData }) {
  const { quoteId, quote, author, source, tags } = quoteObj;
  return (
    <li>
      <p>{quote}</p>
      <p>
        <span>{author}</span>-<span>{source}</span>
      </p>
      <p>
        {tags.map((tag) => (
          <button key={tag}>{tag}</button>
        ))}
      </p>
      <button
        onClick={() => {
          console.log(quoteId, userData.userId);
          deleteQuote(userData.userId, quoteId);
        }}
      >
        Delete
      </button>
    </li>
  );
}
