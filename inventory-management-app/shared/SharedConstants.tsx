export type RootStackParamList = {
  Home: undefined;
  Billing: undefined;
  Inventory: undefined;
};

export interface BillClass {
  invInfoId: number;
  sku: string;
  particular: string;
  amt: number;
  qty: number;
  unit_cp: number;
  unit_sp: number;
  [key: string]: any;
}

export interface CustomerClass {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
}

export interface SkuClass {
  sku: string;
  qty: number;
  [key: string]: string | number | undefined;
}

export interface CustBillClass {
  customer: CustomerClass;
  billArr: BillClass[];
  [key: string]: CustomerClass | BillClass[] | any;
}

export type InventoryItem = {
  id: number;
  sku: string;
  qty: number;
  unit_cp: number; // Unit Cost Price
  unit_sp: number; // Unit Sale Price
};
