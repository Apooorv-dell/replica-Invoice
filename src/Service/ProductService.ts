
import create from "./AppService";


export interface Product {
    _id: string;
    name: string;
    category: string;
    costPrice: number;
    sellingPrice: number;
    inStock: number;
    discount: number;
  }
export default  create('/products')