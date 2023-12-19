import { GridItem, Grid } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import OverView from "./OverView";
import Analytics from "./Analytics";
import Account from "./Account";
import Catalog from "./Catalog";
import Invoices from "./Invoices";
import ProductService from "../Service/ProductService";
import { Product } from "../Service/ProductService";

const DashBoard = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  useEffect(() => {
    ProductService.getAll<Product>().then(({ data }) => {
      setProducts(data);
    });
  }, []);

  const handleAdd = (data: Product) => {
    const orignalProducts = products;
    ProductService.create<Product>(data)
      .then(({ data }) => {
        setProducts([data, ...products]);
      })
      .catch((err) => {
        console.log("err", err);
        setProducts(orignalProducts);
      });
  };

  const handleDelete = (_id: string) => {
    const orignalProducts = products;
    ProductService.delete(_id)
      .then(() => {
        setProducts(products.filter((Product) => Product._id != _id));
      })
      .catch((err) => {
        console.log("err", err);
        setProducts(orignalProducts);
      });
  };
  return (
    <>
      <Grid
        templateAreas={`"leftSide rightSide" `}
        gridTemplateColumns={"160px"}
      >
        <GridItem
          bg={"black"}
          area="leftSide"
          height={"100vh"}
          position={"fixed"}
        >
          <SideBar />
        </GridItem>

        <GridItem area="rightSide">
          <Routes>
            <Route path="OverView" element={<OverView />} />
            <Route path="Analytics" element={<Analytics />} />
            <Route
              path="Catalog"
              element={
                <Catalog
                  products={products}
                  onAdd={(data) => handleAdd(data)}
                  onDelete={(_id) => handleDelete(_id)}
                />
              }
            />
            <Route path="Invoices" element={<Invoices />} />
            <Route path="Account" element={<Account />} />
          </Routes>
        </GridItem>
      </Grid>
    </>
  );
};

export default DashBoard;
