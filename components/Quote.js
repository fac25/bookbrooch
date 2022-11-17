import { deleteQuote, addQuote } from "../firebase/firestore";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { VStack, Box, Heading, Text, Button, Select, FormLabel } from "@chakra-ui/react";
export default function Quote({
  searchResults,
  quoteObj,
  userData = null,
  tagIsButton = false,
  setCategory,
  home = false,
  user = null,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { quoteId, quote, author, source, tags = ["Happiness"] } = quoteObj;
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
          <span>Tag: </span>
          {tags.map((tag) =>
            tagIsButton ? (
              <div>
                < Button
                  onClick={(e) => setCategory(e.target.innerText)}
                  key={tag}
                >
                  {tag}
                </Button>
              </div>
            ) : (
              <span>
                <Select
                  id="tagToChoseFrom"
                  name="tagToChoseFrom"
                  {...register("tagToChoseFrom", {
                    required: "Tag is required",
                  })}
                >
                  <option value="Inspirational">Inspirational</option>
                  <option value="Happiness">Happiness</option>
                  <option value="Wisdom">Wisdom</option>
                  <option value="Funny">Funny</option>
                  <option value="Career/professional">Career/professional</option>
                </Select>
              </span>
            )
          )}
        </p>
      )
      }

      {
        userData && (
          <Button
            onClick={() => {
              // console.log(quoteId, userData.userId);
              deleteQuote(userData.userId, quoteId);
            }}
          >
            Delete
          </Button>
        )
      }
      {
        user && home && (
          <Button
            minH="30px"
            onClick={() => {
              addQuote(user.uid, quoteObj);
            }}
          >
            Save
          </Button>
        )
      }
    </Box >
  );
}
