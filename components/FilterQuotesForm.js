import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { addQuote } from "../firebase/firestore.js";

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
      //console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Filter quotes</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="tags">Filter by category</label>
          <select
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
          </select>
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>

        <button type="submit">Filter</button>
      </form>
    </div>
  );
}
