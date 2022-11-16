import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import {
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Box,
  Heading,
  Flex,
  Container,
} from "@chakra-ui/react";
import UnprotectedRoute from "../components/UnprotectedRoute";

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
    <Container>
      <Flex minH="80vh" width="full" align="center" justifyContent="center">
        <Box p={5} width="xl" borderWidth="1px" shadow="md">
          <Box textAlign="center">
            <Heading mb="20px">logIn</Heading>
          </Box>
          <FormProvider {...methods}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing="3"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <FormControl
                  display="flex"
                  flexDirection={{ base: "column", md: "row" }}
                  alignItems="center"
                >
                  <FormLabel minW="20" textAlign="center">
                    <label htmlFor="">Email</label>
                  </FormLabel>

                  <Input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    size="lg"
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </FormControl>
                <FormControl
                  display="flex"
                  flexDirection={{ base: "column", md: "row" }}
                  alignItems="center"
                >
                  <FormLabel minW="20" textAlign="center">
                    <label htmlFor="">Password</label>
                  </FormLabel>

                  <Input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    size="lg"
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </FormControl>

                <div>
                  <Button type="submit" minWidth={{ base: "full", md: "48" }}>
                    submit
                  </Button>
                </div>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Flex>
    </Container>
</UnprotectedRoute>
  );
};

export default LoginPage;
