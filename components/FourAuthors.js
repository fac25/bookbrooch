export default function FourAuthors({
  optionA,
  optionB,
  optionC,
  optionD,
  setAuthorUserChose,
}) {
  function handleClick(event) {
    setAuthorUserChose(event.target.innerText);
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
    </div>
  );
}
