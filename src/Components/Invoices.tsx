import { Grid, GridItem, Center, Heading } from "@chakra-ui/react";
import { Product } from "../Service/ProductService";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { Bill, Item } from "../Service/BillService";
import ProductService from "../Service/ProductService";

// interface Props {
//   products: Product[];
// }

const Invoices = () => {
  // const [products, setProducts] = useState<Product[] | []>([]);
  // useEffect(() => {
  //   ProductService.getAll<Product>().then(({ data }) => {
  //     setProducts(data);
  //   });
  // }, []);

  // const [bill, setBill] = useState<Bill>();



  

  return (
    <>
      <Center padding={"1rem"}>
        <Heading>Invoices</Heading>
      </Center>
      <Grid
        gridTemplateAreas={`"leftSide rightSide"`}
        gridTemplateColumns={"1fr 1fr"}
      >
        <GridItem area={"leftSide"} height={"91.9vh"} overflow={"scroll"}>
          <ProductList

            // products={products}
          />
        </GridItem>
        <GridItem area={"rightSide"} border={"2px solid tomato"}></GridItem>
      </Grid>
    </>
  );
};

export default Invoices;
