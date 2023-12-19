import { NavLink, useNavigate } from "react-router-dom";

import {
  Button,
  Center,
  Heading,
  Text,
  Input,
  Stack,
  Flex,
  Box,
  Spacer,
  Container,
  LightMode,
  chakra,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import apiClient from "../Service/api-client";

const schema = z.object({
  name: z.string().min(3).max(225),
  email: z.string().min(3).max(255).email(),
  phoneNo: z.number(),
  password: z.string().min(8).max(255),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const toast = useToast();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FieldValues) => {
    apiClient
      .post("/users", data)
      .then((d) => {
        console.log(d.headers["x-auth-token"]);
        localStorage.setItem("x-auth-token", d.headers["x-auth-token"]);
       
        navigate("/detailsForm", { replace: true });
        window.location.reload()
      })
      .catch((ex) => {
        const d = ex.response.data;
        toast({
          title: d,
          description: "try with different email ",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful]);
  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <Box
        backgroundImage="url('bg-2.jpg')"
        backgroundSize={"cover"}
        height={"100vh"}
      >
        <Flex>
          <Center>
            <Box color={"white"} ml={"20rem"}>
              <Heading>InVoicer</Heading>
            </Box>
          </Center>
          <Spacer />

          <Container pt={"5rem"} mr={"10rem"}>
            <Box
              padding={"1.5rem"}
              color={"black"}
              bg={"white"}
              borderRadius={"1rem"}
            >
              <Box p={10}>
                <Heading>Sign Up</Heading>
              </Box>
              <Box pl={10}>
                <Text>Alredy have an Account? </Text>
                <Text color={"teal.500"}>
                  <NavLink to={"/signin"}> sign in</NavLink>
                </Text>
              </Box>
              <Box p={10}>
                <Stack spacing={3}>
                  <LightMode>
                    <Input
                      mb={4}
                      type="text"
                      variant="flushed"
                      placeholder="Name"
                      borderBottom={"1px solid #CBD5E0"}
                      {...register("name")}
                    />
                    {errors.name && (
                      <Text size={"sm"} color={"red"}>
                        {errors.name.message}
                      </Text>
                    )}
                    <Input
                      mb={4}
                      type="email"
                      variant="flushed"
                      placeholder="Email"
                      borderBottom={"1px solid #CBD5E0"}
                      {...register("email")}
                    />
                    {errors.email && (
                      <Text size={"sm"} color={"red"}>
                        {errors.email.message}
                      </Text>
                    )}

                    <Input
                      mb={4}
                      type="number"
                      variant="flushed"
                      placeholder="Phone no."
                      borderBottom={"1px solid #CBD5E0"}
                      {...register("phoneNo", { valueAsNumber: true })}
                    />
                    {errors.phoneNo && (
                      <Text size={"sm"} color={"red"}>
                        {errors.phoneNo.message}
                      </Text>
                    )}
                    <InputGroup>
                      <Input
                        mb={4}
                        type={show ? "text" : "password"}
                        variant="flushed"
                        placeholder="Password"
                        color={"blackAlpha"}
                        borderBottom={"1px solid #CBD5E0"}
                        {...register("password")}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShow(!show)}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <Text size={"sm"} color={"red"}>
                        {errors.password.message}
                      </Text>
                    )}
                  </LightMode>
                </Stack>
                <Box ml={"20rem"} mt={"1.5rem"}>
                  <Button
                    type="submit"
                    bg={"#4285F4"}
                    color={"white"}
                    borderRadius={"2rem"}
                    w={"8rem"}
                    isDisabled={!isValid}
                  >
                    Sign in
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Flex>
      </Box>
    </chakra.form>
  );
}
