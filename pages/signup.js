import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp } = useAuth();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="">Email</label>
          </div>
          <input type="email" id="email" {...register("email")} />
        </div>
        <div>
          <div>
            <label htmlFor="">Password</label>
          </div>

          <input type="password" id="password" {...register("password")} />
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
