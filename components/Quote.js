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
  const { quoteId, quote, author, source, tags = [] } = quoteObj;
  return (
    <Box
      as="li"
      p={5}
      shadow="md"
      borderWidth="1px"
      display="flex"
      flexDirection="column"
      gap="5"
      boxShadow="md"
      className="quote"
    >
      <Text as="p">{quote}</Text>
      <p>
        <Heading fontSize="md" as="span">
          {author}
        </Heading>{" "}
        -{" "}
        <Heading fontSize="md" as="span">
          {source}
        </Heading>
      </p>
      <p>
        <span>Tags: </span>
        {tags.map((tag) =>
          tagIsButton ? (
            <Button onClick={(e) => setCategory(e.target.innerText)} key={tag}>
              {tag}
            </Button>
          ) : (
            <Button as="span">{tag}</Button>
          )
        )}
      </p>
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
