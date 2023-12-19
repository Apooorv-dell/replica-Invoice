// import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
// import ProductTable from "./ProductTable";
// import ProductForm from "./ProductForm";
import { Product } from "../Service/ProductService";
import DemoForm from "./DemoForm";
import DemoTable from "./DemoTable";
// import ProductService from "../Service/ProductService";

interface Props {
  products: Product[];
  onDelete: (_id: string) => void;
  onAdd: (data: Product) => void;
}

export default function Catalog({ products, onAdd, onDelete }: Props) {
  // const [products, setProducts] = useState<Product[] | []>([]);
  // useEffect(() => {
  //   ProductService.getAll<Product>().then(({ data }) => {
  //     setProducts(data);
  //   });
  // }, []);

  return (
    <>
      <Box padding={"3rem"}>
        <DemoForm
          onSubmit={(data) => {
            onAdd(data);
            // const orignalProducts =
            // products;
            // ProductService.create<Product>(data)
            //   .then(({ data }) => {
            //     setProducts([data, ...products]);
            //   })
            //   .catch((err) => {
            //     console.log("err", err);
            //     setProducts(orignalProducts);
            //   });
          }}
        />
        <DemoTable
          products={products}
          onDelete={(_id) => {
            onDelete(_id);
            // const orignalProducts = products;
            // ProductService.delete(_id)
            //   .then(() => {
            //     setProducts(products.filter((Product) => Product._id != _id));
            //   })
            //   .catch((err) => {
            //     console.log("err", err);
            //     setProducts(orignalProducts);
            //   });
          }}
        />
      </Box>
    </>
  );
}
