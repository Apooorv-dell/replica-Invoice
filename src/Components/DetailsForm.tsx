import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  chakra,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../Service/api-client";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  shopName: z.string().min(3, { message: "shop name is required" }),
  address: z
    .string()
    .min(3, { message: "Address is required " })
    .max(255, { message: "Address is required " }),
  city: z.string().min(2, { message: "city is required" }),
  pincode: z
    .number()
    .gte(100000, { message: "pincode must be six digit" })
    .lte(999999, { message: "pincode must be six digit" }),
  gstin: z
    .string()
    .min(1, { message: "gstin number must be 15 character in length" })
    .max(15, { message: "gstin number must be 15 character in length" }),
});

type DetailsData = z.infer<typeof schema>;

const DetailsForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<DetailsData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    apiClient
      .post("/businessDetails", data)
      .then((d) => {
        console.log(d);

        navigate("/dashboard/Account", { replace: true });
      })
      .catch((ex) => {
        console.log("ex", ex);
      });
  };
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful]);
  return (
    <>
      <chakra.form
        backgroundImage={"url('bg-1.jpg')"}
        backgroundSize={"cover"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box bg={"white"} padding={"1rem"} borderRadius={"10px"}>
          <Heading as={"h4"} size={"md"} margin={"1rem"}>
            {" "}
            Bussiness Details
          </Heading>
          <VStack padding={"1rem"} width={"400px"}>
            <Input
              variant="flushed"
              color={errors.shopName ? "red" : "black"}
              type="text"
              placeholder="Shop Name"
              margin={"1rem 1rem 0 1rem"}
              {...register("shopName")}
            />
            {errors.shopName && (
              <Text fontSize={"10px"} color={"red"}>
                {errors.shopName.message}
              </Text>
            )}
            <Input
              variant="flushed"
              color={errors.address ? "red" : "black"}
              type="text"
              placeholder="Address"
              m={"1rem 1rem 0 1rem "}
              {...register("address")}
            />
            {errors.address && (
              <Text fontSize={"10px"} color={"red"}>
                {errors.address.message}
              </Text>
            )}
            <Input
              variant="flushed"
              color={errors.city ? "red" : "black"}
              type="text"
              placeholder="City"
              m={"1rem 1rem 0 1rem "}
              {...register("city")}
            />
            {errors.city && (
              <Text fontSize={"10px"} color={"red"}>
                {errors.city.message}
              </Text>
            )}
            <Input
              variant="flushed"
              color={errors.pincode ? "red" : "black"}
              type="number"
              placeholder="PinCode"
              m={"1rem 1rem 0 1rem "}
              {...register("pincode", { valueAsNumber: true })}
            />
            {errors.pincode && (
              <Text fontSize={"10px"} color={"red"}>
                {errors.pincode.message}
              </Text>
            )}

            <Input
              variant="flushed"
              type="text"
              placeholder="GSTIN No."
              m={"1rem 1rem 0 1rem "}
              {...register("gstin")}
            />
            {errors.gstin && (
              <Text fontSize={"10px"} color={"red"}>
                {errors.gstin.message}
              </Text>
            )}
          </VStack>
          <Button
            m={"1rem"}
            size={"md"}
            bg={"#4285F4"}
            color={"white"}
            float={"right"}
            type="submit"
            _hover={{ bg: "#27487E" }}
          >
            {" "}
            Add
          </Button>
        </Box>
      </chakra.form>
    </>
  );
};

export default DetailsForm;
