import realorfakeData from "../public/data/realorfakeData";

const RealOrFake = () => {
  function checkAnswer(e, ansQuote) {
    const userRes = e.target.textContent;

    const guessed = false;
    // if they clicked real and real: true = true
    // if they clocked Fake and real: false = true

    // if they clicked real and real: false = false
    // if they clocked Fake and real: true = false
    // console.log(e.target.textContent);

    if ((userRes == "Real" && ansQuote) || (userRes == "Fake" && !ansQuote)) {
      alert("You win!");
    } else if (
      (userRes == "Real" && !ansQuote) ||
      (userRes == "Fake" && ansQuote)
    ) {
      alert("You lose!");
    }

    // Display quote
    // Real or Fake btns
    // Handle response
    // BTN clicked:
    // message + real quote if wrong
    // alert("You are now playing!");
  }
  return (
    <>
      <h1>Real or Fake</h1>
      <div>
        <p id="quote">{realorfakeData[0].quote}</p>
        <section>
          <button onClick={(e) => checkAnswer(e, realorfakeData[0].real)}>
            Real
          </button>
          <button onClick={(e) => checkAnswer(e, realorfakeData[0].real)}>
            Fake
          </button>
        </section>
      </div>
      <div>
        <p id="quote">{realorfakeData[1].quote}</p>
        <section>
          <button onClick={(e) => checkAnswer(e, realorfakeData[1].real)}>
            Real
          </button>
          <button onClick={(e) => checkAnswer(e, realorfakeData[1].real)}>
            Fake
          </button>
        </section>
      </div>
    </>
  );
};

export default RealOrFake;
