import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import UnprotectedRoute from "../components/UnprotectedRoute";
// import { app } from "../firebase/initFireBase";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   setDoc,
//   doc,
// } from "firebase/firestore";

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
      await logIn(data.email, data.password).then(async (userCredential) => {
        // Signed in
        // Test on if we can work with the db from Front end
        const user = userCredential.user;
        // const db = getFirestore(app);
        // const quotesCol = collection(db, "quotes");
        // const data = {
        //   author: "wqd,dw",
        //   quote: "fqwfw",
        // };

        // await setDoc(doc(db, "quotes", "5"), data);

        // const snapShot1 = await getDocs(quotesCol);
        // snapShot1.forEach((snap) => {
        //   console.log(snap.data());
        // });
        router.push(`/users/${user.uid}`);
        // ...
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <UnprotectedRoute>
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
    </UnprotectedRoute>
  );
};

export default LoginPage;
