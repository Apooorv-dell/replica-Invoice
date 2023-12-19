import create from "./AppService";


export type Business = {
  shopName: string;
  gstin: string;
  address: string;
  city: string;
  pincode: number;
};

export default  create('/businessDetails')
