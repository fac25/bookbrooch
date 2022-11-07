import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const LoginPage = () => {
  const { logIn } = useAuth();
  const router = useRouter();
  const methods = useForm({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h2>Log In</h2>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label htmlFor="">Email</label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <div>
              <label htmlFor="">Password</label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <button type="submit">submit</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
