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
          <input type="text" id="quote" {...register("quote")} />
        </div>
        <div>
          <label htmlFor="">Book</label>
          <input type="text" id="book" {...register("book")} />
        </div>
        <div>
          <label htmlFor="">Author</label>
          <input type="text" id="author" {...register("author")} />
        </div>
        <div>
          <label htmlFor="">Tags</label>
          <select id="tags" name="tags" {...register("tags")} multiple>
            <option value="Inspirational">Inspirational</option>
            <option value="Happiness">Happiness</option>
            <option value="Wisdom">Wisdom</option>
            <option value="Funny">Funny</option>
            <option value="Career/professional">Career/professional</option>
          </select>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
