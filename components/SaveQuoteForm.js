import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { addQuote } from "../firebase/firestore.js";
import {
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Box,
  Heading,
  Select,
} from "@chakra-ui/react";

export default function SaveQuoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useAuth();

  const onSubmit = (data) => {
    // console.log("save button clicked");
    // console.log(data);

    try {
      addQuote(user.uid, data).then(() => {
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
    <div>
      <Heading as="h2" size="md" textAlign="center" mb="5">
        Save a quote
      </Heading>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="3" direction="column" p="5" borderWidth="1px">
          <FormControl
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
          >
            <FormLabel htmlFor="quote" minW="20" textAlign="center">
              Quote
            </FormLabel>
            <Input
              type="text"
              id="quote"
              size="lg"
              {...register("quote", { required: "Quote is required" })}
            />
            {errors.quote && <p>{errors.quote.message}</p>}
          </FormControl>
          <FormControl
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
          >
            <FormLabel htmlFor="source" minW="20" textAlign="center">
              Source
            </FormLabel>
            <Input
              type="text"
              id="source"
              size="lg"
              {...register("source", { required: "Source is required" })}
            />
            {errors.source && <p>{errors.source.message}</p>}
          </FormControl>
          <FormControl
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
          >
            <FormLabel htmlFor="author" minW="20" textAlign="center">
              Author
            </FormLabel>
            <Input
              type="text"
              id="author"
              size="lg"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && <p>{errors.author.message}</p>}
          </FormControl>
          <FormControl
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
          >
            <FormLabel htmlFor="tags" minW="20" textAlign="center">
              Tags
            </FormLabel>
            <Select
              id="tags"
              name="tags"
              {...register("tags", {
                required: "At least one tag is required",
              })}
            >
              <option value="Inspirational">Inspirational</option>
              <option value="Happiness">Happiness</option>
              <option value="Wisdom">Wisdom</option>
              <option value="Funny">Funny</option>
              <option value="Career/professional">Career/professional</option>
            </Select>
            {errors.tags && <p>{errors.tags.message}</p>}
          </FormControl>

          <Button
            type="submit"
            minW={{ base: "full" }}
            maxW={{ md: "16" }}
            alignSelf={{ md: "center" }}
          >
            Save
          </Button>
        </Stack>
      </form>
    </div>
  );
}
