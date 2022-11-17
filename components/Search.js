import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { searchBy } from "../api-helpers";
import Quote from "../components/Quote";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Box, Button, Select, Input } from "@chakra-ui/react";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("Data from form: " + data.search + data.tagsToSearchBy);
    try {
      const quotes = await searchBy(data.tagsToSearchBy, data.search);
      setSearchResults(quotes);
      //   console.log(quotes);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <Box minH="16" py="3">
        <form id="searchForm" action="" onSubmit={handleSubmit(onSubmit)}>
          <Flex
            justify="center"
            minH="16"
            align="center"
            gap="4"
            direction={{ base: "column", md: "row" }}
          >
            <div>
              {/* <label htmlFor="tags">Search by category</label> */}
              <Select
                placeholder="Search by category"
                id="tagsToSearchBy"
                name="tagsToSearchBy"
                {...register("tagsToSearchBy", {
                  required: "At least one tag is required",
                })}
              >
                <option value="tag">Keyword</option>
                <option value="author">Author</option>
                <option value="title">Title</option>
              </Select>
              {errors.tags && <p>{errors.tags.message}</p>}
            </div>
            <div>
              <Input
                type="text"
                {...register("search", { required: "search is required" })}
                placeholder="Search..."
              />
              {errors.search && <p>{errors.search.message}</p>}
            </div>

            <div>
              <Button type="submit">Submit</Button>
            </div>
          </Flex>
        </form>
      </Box>
      <ul>
        {searchResults.map((quote, index) => {
          return <Quote key={quote.author + index} quoteObj={quote} />;
        })}
      </ul>
    </>
  );
}
