import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { addQuote } from "../firebase/firestore.js";
import { Select, FormLabel, Box, Button, Text } from "@chakra-ui/react";

export default function FilterQuotesForm({ setCategory }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log("save button clicked");
    //console.log(data);
    try {
      setCategory(data.tagsToFilterBy);
    } catch (error) {
      console.log(error.message);
      // alert(error.message);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Box
          p="3"
          borderWidth="1px"
          my="5"
          display="flex"
          flexDirection="column"
          gap="10px"
        >
          <div>
            <FormLabel htmlFor="tags">Filter by category</FormLabel>
            <Select
              id="tagsToFilterBy"
              name="tagsToFilterBy"
              {...register("tagsToFilterBy", {
                required: "At least one tag is required",
              })}
            >
              <option value="all">All</option>
              <option value="Inspirational">Inspirational</option>
              <option value="Happiness">Happiness</option>
              <option value="Wisdom">Wisdom</option>
              <option value="Funny">Funny</option>
              <option value="Career/professional">Career/professional</option>
            </Select>
            {errors.tags && <p>{errors.tags.message}</p>}
          </div>

          <Button type="submit">Filter</Button>
        </Box>
      </form>
    </div>
  );
}
