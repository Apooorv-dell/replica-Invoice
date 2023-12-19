import {
  Heading,
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";

import Counter from "./Counter";
import ProductService from "../Service/ProductService";
import { Product } from "../Service/ProductService";
import { useState, useEffect } from "react";

// interface Props {
//   // products: Product[];
// }

const ProductList = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  useEffect(() => {
    ProductService.getAll<Product>().then(({ data }) => {
      setProducts(data);
    });
  }, []);
  const [items, setItems] = useState<Product[] | []>([]);

  return (
    <>
      <Heading
        py={"1rem"}
        textAlign={"center"}
        size={"md"}
        overflow={"hidden"}
        mb={"1rem"}
      >
        Product List
      </Heading>
      <Box bg="yellow" height="200px"></Box>
      {items.map((item) => {
        <Heading>{item.category}</Heading>;
      })}
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Product</Th>
              <Th> Stock</Th>

              <Th>Price</Th>

              <Th>Count</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Tr key={product._id}>
                <Td>{index + 1}</Td>
                <Td>{product.name}</Td>

                <Td>{product.inStock}</Td>

                <Td>
                  {(
                    product.sellingPrice -
                    (product.sellingPrice * product.discount) / 100
                  ).toFixed(2)}
                </Td>
                <Td>
                  <Counter />
                </Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    size={"sm"}
                    onClick={() => {
                      console.log(product)
                      setItems([...items, product]);
                    }}
                  >
                    <Text>Add</Text>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductList;
