import Link from "next/link";
import { Container, Heading, Button } from "@chakra-ui/react";

const Game = () => {
  return (
    <Container>
      <Heading as="h1">Games to play</Heading>
      <div>
        <Link href="/games/realorfake">
          <Button mt={5} mr="3">
            Real or Fake
          </Button>
        </Link>
        <Link href="/games/guess-the-author">
          <Button mt={5}>Guess the Author</Button>
        </Link>
      </div>
    </Container>
  );
};

export default Game;
