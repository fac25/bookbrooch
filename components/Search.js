import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { searchBy } from "../lib/api-helpers";
import Quote from "../components/Quote";
import { Flex, Box, Button, Select, Input, Heading } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const { user } = useAuth();

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
      // console.log(quotes);
    } catch (error) {
      // console.log(error.message);
      // alert(error.message);
    }
  };

  return (
    <>
      <form id="searchForm" action="" onSubmit={handleSubmit(onSubmit)}>
        <Box minH="16" py="3">
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
              <Button type="submit">Search</Button>
            </div>
          </Flex>
        </Box>
      </form>
      {searchResults.length > 1 && (
        <section>
          <Heading as="p" size="md" textAlign="center" mb="15px">
            Search results:
          </Heading>
          <ul>
            {searchResults.map((quote, index) => {
              quote.tags = ["Inspirational"]
              return (
                <Quote
                  searchResults={true}
                  key={quote.author + index}
                  quoteObj={quote}
                  home={true}
                  user={user}
                />
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
