import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { addQuote } from "../firebase/firestore.js";

export default function SaveQuoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const onSubmit = (data) => {
    // console.log("save button clicked");
    // console.log(data);

    try {
      addQuote(user.uid, data);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Save a quote</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Quote</label>
          <input
            type="text"
            id="quote"
            {...register("quote", { required: "Quote is required" })}
          />
          {errors.quote && <p>{errors.quote.message}</p>}
        </div>
        <div>
          <label htmlFor="">Source</label>
          <input
            type="text"
            id="source"
            {...register("source", { required: "Source is required" })}
          />
          {errors.source && <p>{errors.source.message}</p>}
        </div>
        <div>
          <label htmlFor="">Author</label>
          <input
            type="text"
            id="author"
            {...register("author", { required: "Author is required" })}
          />
          {errors.author && <p>{errors.author.message}</p>}
        </div>
        <div>
          <label htmlFor="">Tags</label>
          <select
            id="tags"
            name="tags"
            {...register("tags", { required: "At least one tag is required" })}
            multiple
          >
            <option value="Inspirational">Inspirational</option>
            <option value="Happiness">Happiness</option>
            <option value="Wisdom">Wisdom</option>
            <option value="Funny">Funny</option>
            <option value="Career/professional">Career/professional</option>
          </select>
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
