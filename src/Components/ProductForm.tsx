import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Highlight,
  Input,
  Spacer,

} from "@chakra-ui/react";


import { useForm } from "react-hook-form";

type Data = {
  id: number;
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  discount: number;
};

interface Props {
  onSubmit: (data: Data) => void;
}

export default function ProductForm({ onSubmit }: Props) {
  const { register, handleSubmit, reset } = useForm<Data>();

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Box bg={"#F1F6F9"} width={"100vw"} height={"100vh"}>
        <Center>
          <Heading mt={"3rem"}>
            <Highlight
              query="Catalog"
              styles={{ px: "2", py: "1", rounded: "full", bg: "teal.200" }}
            >
              PRODUCT CATALOG
            </Highlight>
          </Heading>
        </Center>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
          autoComplete="off"
        >
          <Center mt={"5rem"}>
            <Box
              bg={"white"}
              overflow={"visible"}
              boxShadow={"5px 5px 5px 5px teal"}
            >
              <Center>
                <Heading mt={"3rem"} size={"md"}>
                  Add Product Details
                </Heading>
              </Center>

              <Center>
                <HStack mt={"5rem"} pl={"3rem"} pr={"3rem"} spacing={10}>
                  <Box>
                    <Input
                      {...register("productName", { required: true })}
                      width="15rem"
                      variant="outline"
                      placeholder="Product Name"
                      id="product"
                      type="text"
                    />
                  </Box>
                  <Box>
                    <Input
                      {...register("category", { required: true })}
                      width="15rem"
                      variant="outline"
                      placeholder="Category"
                      id="category"
                      type="text"
                    />
                  </Box>
                  <Box>
                    <Input
                      {...register("stock", { required: true })}
                      id="stocks"
                      width="15rem"
                      variant="outline"
                      placeholder="Number in Stocks"
                      type="number"
                    />
                  </Box>
                </HStack>
              </Center>
              <Center>
                <HStack mt={"5rem"} pb={"5rem"} spacing={10}>
                  <Box>
                    <Input
                      {...register("costPrice", { required: true })}
                      id="costPrice"
                      width="15rem"
                      variant="outline"
                      placeholder="Cost Price (in $)"
                      type="number"
                    />
                  </Box>
                  <Box>
                    <Input
                      {...register("sellingPrice", { required: true })}
                      id="sellingPrice"
                      width="15rem"
                      variant="outline"
                      placeholder="Selling Price (in $)"
                      type="number"
                    />
                  </Box>
                  <Box>
                    <Input
                      {...register("discount", { required: true })}
                      id="discount"
                      width="15rem"
                      variant="outline"
                      placeholder="Discount (%)"
                      type="number"
                    />
                  </Box>
                </HStack>
              </Center>
              <Flex>
                <Box></Box>
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
          </Center>
        </form>

        {/* ******************************** DISPLAY PRODUCTS ****************************************** */}
      </Box>
    </>
  );
}
