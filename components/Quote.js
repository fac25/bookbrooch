import { deleteQuote, addQuote } from "../firebase/firestore";
import { useState } from "react";
import { VStack, Box, Heading, Text, Button, Select } from "@chakra-ui/react";
export default function Quote({
  quoteObj,
  userData = null,
  tagIsButton = false,
  setCategory,
  home = false,
  user = null,
}) {
  const { quoteId, quote, author, source, tags = ["happy"] } = quoteObj;
  return (
    <Box
      as="li"
      w="full"
      p="5"
      shadow="md"
      borderWidth="1px"
      display="flex"
      flexDirection="column"
      gap="3"
      boxShadow="md"
      className="quote"
    >
      <Text as="p" maxH="200px" overflowY="auto">
        {quote}
      </Text>
      <p>
        <Heading fontSize="md" as="span">
          {author}
        </Heading>{" "}
        -{" "}
        <Heading fontSize="md" as="span">
          {source}
        </Heading>
      </p>
      {tags.length > 0 && (
        <p>
          <span>Tags: </span>
          {tags.map((tag) =>
            tagIsButton ? (
              <Button
                onClick={(e) => setCategory(e.target.innerText)}
                key={tag}
              >
                {tag}
              </Button>
            ) : (
              <Button as="span">{tag}</Button>
            )
          )}
        </p>
      )}

      {userData && (
        <Button
          onClick={() => {
            console.log(quoteId, userData.userId);
            deleteQuote(userData.userId, quoteId);
          }}
        >
          Delete
        </Button>
      )}
      {user && home && (
        <Button
          minH="30px"
          onClick={() => {
            addQuote(user.uid, quoteObj);
          }}
        >
          Save
        </Button>
      )}
    </Box>
  );
}
