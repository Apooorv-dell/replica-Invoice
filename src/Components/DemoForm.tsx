import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Highlight,
  Input,
  Spacer,
  chakra,
  Text,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { Product } from "../Service/ProductService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "name should at least 2 character long" })
    .max(255),
  category: z
    .string()
    .min(2, { message: "category should at least 2 character long" })
    .max(255),
  costPrice: z
    .number({ invalid_type_error: " cost price is required" })
    .min(1, { message: "minimum 1 price  required" }),
  sellingPrice: z
    .number({ invalid_type_error: "selling price is required" })
    .min(1, { message: "minimum 1 price  required" }),
  inStock: z
    .number({ invalid_type_error: "stock is required" })
    .min(0, { message: "minimum zero number required" }),
  discount: z.number({
    invalid_type_error: "min zero value required for discount",
  }),
});

interface Props {
  onSubmit: (data: Product) => void;
}

export default function DemoForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(schema),
  });

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>
          <Highlight
            query="Catalog"
            styles={{ px: "2", py: "1", rounded: "full", bg: "teal.200" }}
          >
            PRODUCT CATALOG
          </Highlight>
        </Heading>
      </Center>

      <chakra.form
        my={"3rem"}
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        autoComplete="off"
      >
        <Box>
          <Box
            bg={"white"}
            overflow={"visible"}
            //   boxShadow={"5px 10px 60px  teal"}
            boxShadow={"0px 20px 60px #EEEFF1 "}
          >
            <Center>
              <Heading mt={"2rem"} size={"md"}>
                Add Product Details
              </Heading>
            </Center>

            <Box
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"space-evenly"}
              rowGap={"2rem"}
              py={"2rem"}
            >
              <Box>
                <Input
                  {...register("name", { required: true })}
                  width="23rem"
                  variant="outline"
                  placeholder="Product Name"
                  type="text"
                />
                {errors.name && (
                  <Text size={"sm"} color={"red"}>
                    {errors.name.message}
                  </Text>
                )}
              </Box>
              <Box>
                <Input
                  {...register("category", { required: true })}
                  width="23rem"
                  variant="outline"
                  placeholder="Category"
                  type="text"
                />
                {errors.category && (
                  <Text size={"sm"} color={"red"}>
                    {errors.category.message}
                  </Text>
                )}
              </Box>

              <Box>
                <Input
                  {...register("inStock", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  id="stocks"
                  width="23rem"
                  variant="outline"
                  placeholder="Number in Stocks"
                  type="number"
                />
                {errors.inStock && (
                  <Text size={"sm"} color={"red"}>
                    {errors.inStock.message}
                  </Text>
                )}
              </Box>

              <Box>
                <Input
                  {...register("costPrice", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  width="23rem"
                  variant="outline"
                  placeholder="Cost Price (in $)"
                  type="number"
                />
                {errors.costPrice && (
                  <Text size={"sm"} color={"red"}>
                    {errors.costPrice.message}
                  </Text>
                )}
              </Box>
              <Box>
                <Input
                  {...register("sellingPrice", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  width={"23rem"}
                  variant="outline"
                  placeholder="Selling Price (in $)"
                  type="number"
                />
                {errors.sellingPrice && (
                  <Text size={"sm"} color={"red"}>
                    {errors.sellingPrice.message}
                  </Text>
                )}
              </Box>
              <Box>
                <Input
                  {...register("discount", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  width={"23rem"}
                  id="discount"
                  variant="outline"
                  placeholder="Discount (%)"
                  type="number"
                />
                {errors.discount && (
                  <Text size={"sm"} color={"red"}>
                    {errors.discount.message}
                  </Text>
                )}
              </Box>
            </Box>

            <Flex>
              <Spacer />
              <Button
                onClick={handleScroll}
                type="submit"
                mr={"3rem"}
                mb={"2rem"}
                colorScheme="teal"
              >
                Add
              </Button>
            </Flex>
          </Box>
        </Box>
      </chakra.form>
    </>
  );
}
