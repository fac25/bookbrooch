import Link from "next/link";
import { Container, Heading, Button } from "@chakra-ui/react";

const Game = () => {
  return (
    <Container>
      <Heading>Game</Heading>
      <div>
        <Link href="/realorfake">
          <Button mt={5}>Real or Fake</Button>
        </Link>
<Link href="/guessTheAuthor">
          <Button mt={5}>Guess the Author</Button>
        </Link>
      </div>
    </Container>
  );
};

export default Game;
