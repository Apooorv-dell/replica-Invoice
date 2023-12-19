import {
  Center,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Box,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { Product } from "../Service/ProductService";

interface Props {
  products: Product[] | [];
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onDelete }: Props) {
  return (
    <>
      <Box>
        <Center my={"3rem"}>
          <Heading size={"md"}>PRODUCTS</Heading>
        </Center>

        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Product Name</Th>
                <Th>Category</Th>
                <Th>Cost Price</Th>
                <Th>Selling Price</Th>
                <Th>Number in Stock</Th>
                <Th>Discount(%)</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>

            <Tbody>
              {products.map((product, index) => (
                <Tr key={product._id}>
                  <Td>{index + 1}</Td>
                  <Td>{product.name}</Td>
                  <Td>{product.category}</Td>
                  <Td>${product.costPrice}</Td>
                  <Td>${product.sellingPrice}</Td>
                  <Td>{product.inStock}</Td>
                  <Td>{product.discount}%</Td>
                  <Td>
                    {(
                      product.sellingPrice -
                      (product.sellingPrice * product.discount) / 100
                    ).toFixed(2)}
                  </Td>
                  <Td>
                    <Button
                      onClick={() => onDelete(product._id)}
                      colorScheme="red"
                      variant="ghost"
                    >
                      <MdDelete />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
