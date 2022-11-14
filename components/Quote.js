import { deleteQuote } from "../firebase/firestore";
import { useState } from "react";
export default function Quote({
  quoteObj,
  userData = null,
  tagIsButton = false,
  setCategory,
}) {
  const { quoteId, quote, author, source, tags = [] } = quoteObj;
  return (
    <li>
      <p>{quote}</p>
      <p>
        <span>{author}</span>-<span>{source}</span>
      </p>
      <p>
        {tags.map((tag) =>
          tagIsButton ? (
            <button onClick={(e) => setCategory(e.target.innerText)} key={tag}>
              {tag}
            </button>
          ) : (
            <p key={tag}>{tag}</p>
          )
        )}
      </p>
      {userData && (
        <button
          onClick={() => {
            console.log(quoteId, userData.userId);
            deleteQuote(userData.userId, quoteId);
          }}
        >
          Delete
        </button>
      )}
    </li>
  );
}
