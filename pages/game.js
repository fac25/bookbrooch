import Link from "next/link";
const Game = () => {
  return (
    <>
      <h1>Game</h1>
      <div>
        <Link href="/realorfake">
          <button>Real or Fake</button>
        </Link>
      </div>
    </>
  );
};

export default Game;
