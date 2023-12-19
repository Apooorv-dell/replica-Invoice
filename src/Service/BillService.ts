import create from "./AppService";

export type Item = {
  itemName: string;
  price: number;
  qty: number;
};

export type Bill = {
  quantity: number;
  items: Item[];
  amount: number;
};

export default create("/bills");
