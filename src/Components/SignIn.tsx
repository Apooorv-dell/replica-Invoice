import {
  Button,
  Center,
  Heading,
  Text,
  Input,
  Stack,
  Box,
  Flex,
  Spacer,
  Container,
  LightMode,
  chakra,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { NavLink, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../Service/api-client";

import { useState } from "react";

const schema = z.object({
  email: z.string().min(3).max(255).email(),
  password: z.string().min(8).max(255),
});

type FormData = z.infer<typeof schema>;

function SignIn() {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FieldValues) => {
    apiClient
      .post("/auths", data)
      .then((d) => {
        localStorage.setItem("x-auth-token", d.data);
        navigate("/dashboard/Overview");
        window.location.reload()
      })
      .catch((ex) => {
        console.log("ex", ex.response.data);
        const d = ex.response.data;
        toast({
          title: d,
          description: "Try agin ",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <Box
        backgroundImage="url('bg-1.jpg')"
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
              w="30rem"
              h="36rem"
              color={"black"}
              bg={"white"}
              borderRadius={"1rem"}
            >
              <Box p={10}>
                <Heading>Sign In</Heading>
              </Box>
              <Box pl={10}>
                <Text>New user ?</Text>
                <Text color="teal.500">
                  <NavLink to={"/signup"}>create an account</NavLink>
                </Text>
              </Box>
              <Box p={10}>
                <Stack spacing={5}>
                  <LightMode>
                    <Input
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

                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        variant="flushed"
                        placeholder="Password"
                        borderBottom={"1px solid #CBD5E0"}
                        {...register("password")}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.5rem"
                          size="sm"
                          onClick={() => setShow(!show)}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Text size={"1px"} color={"grey"}>
                      !password should be atleast 8 character long
                    </Text>
                    {errors.password && (
                      <Text size={"sm"} color={"red"}>
                        {errors.password.message}
                      </Text>
                    )}
                  </LightMode>
                </Stack>
              </Box>
              <Box ml={"20rem"}>
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
          </Container>
        </Flex>
      </Box>
    </chakra.form>
  );
}

export default SignIn;
