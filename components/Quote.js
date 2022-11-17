import { deleteQuote, addQuote } from "../firebase/firestore";
import { useForm } from "react-hook-form";
import {
  VStack,
  Box,
  Heading,
  Text,
  Button,
  Select,
  FormLabel,
} from "@chakra-ui/react";
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

  const onSubmit = (data) => {
    // console.log("save button clicked");
    // console.log(data);
    // Data tags to be array and not string
    let dataChanged = { ...data, tags: [data.tags] };
    console.log(dataChanged);
    try {
      addQuote(user.uid, dataChanged).then(() => {
        reset(() => ({
          quote: "",
          source: "",
          author: "",
          tags: "",
        }));
      });
    } catch (error) {
      console.log(error.message);
      // alert(error.message);
    }
  };
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
          {tags.map(
            (tag) =>
              tagIsButton && (
                <div>
                  <Button
                    onClick={(e) => setCategory(e.target.innerText)}
                    key={tag}
                  >
                    {tag}
                  </Button>
                </div>
              )
          )}
        </p>
      )}

      {userData && (
        <Button
          onClick={() => {
            // console.log(quoteId, userData.userId);
            deleteQuote(userData.userId, quoteId);
          }}
        >
          Delete
        </Button>
      )}
      {user && home && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="quote" value={quote} hidden {...register("quote")} />
          <input name="author" value={author} hidden {...register("author")} />
          <input name="source" value={source} hidden {...register("source")} />
          <Select id="tagToChoseFrom" name="tags" {...register("tags")}>
            <option value="Inspirational">Inspirational</option>
            <option value="Happiness">Happiness</option>
            <option value="Wisdom">Wisdom</option>
            <option value="Funny">Funny</option>
            <option value="Career/professional">Career/professional</option>
          </Select>
          <Button type="submit" minH="30px">
            Save
          </Button>
        </form>
      )}
    </Box>
  );
}
