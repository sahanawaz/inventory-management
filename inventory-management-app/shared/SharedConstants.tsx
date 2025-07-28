export type RootStackParamList = {
  Home: undefined;
  Billing: undefined;
  Inventory: undefined;
  Ledger: undefined;
  InventoryList: undefined;
};

export interface BillClass {
  invInfoId: number;
  sku: string;
  particular: string;
  amt: number;
  qty: number;
  unitCp: number;
  unitSp: number;
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
  unitCp: number; // Unit Cost Price
  unitSp: number; // Unit Sale Price
};

export interface AlertModalConfig {
  visible: boolean;
  message: string[];
  isSuccess: -1 | 0 | 1;
  iconSrc: string;
}

export interface SysOpt {
  key: number;
  value: string;
  code: string;
}

export interface DropdownOpts {
  catTypeOpts: SysOpt[];
  invTypeOpts: SysOpt[];
  colorOpts: SysOpt[];
  dimensionOpts: SysOpt[];
}
