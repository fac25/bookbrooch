import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { searchBy } from "../public/api";
import Quote from "../components/Quote";

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
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            {...register("search", { required: "search is required" })}
          />
          {errors.search && <p>{errors.search.message}</p>}
        </div>
        <div>
          <label htmlFor="tags">Search by category</label>
          <select
            id="tagsToSearchBy"
            name="tagsToSearchBy"
            {...register("tagsToSearchBy", {
              required: "At least one tag is required",
            })}
          >
            <option value="tag">Keyword</option>
            <option value="author">Author</option>
            <option value="title">Title</option>
          </select>
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
      <ul>
        {searchResults.map((quote, index) => {
          return <Quote key={quote.author + index} quoteObj={quote} />;
        })}
      </ul>
    </>
  );
}
