export type RootStackParamList = {
  Home: undefined;
  Billing: undefined;
  Inventory: undefined;
};

export interface BillClass {
  invInfoId: Number,
  particular: String,
  amt: Number,
  qty: Number
}

export interface CustBillClass {
  custName: String,
  custPhone: String,
  billArr: BillClass[]
}

export type InventoryItem = {
  id: number;
  sku: string;
  qty: number;
  unit_cp: number; // Unit Cost Price
  unit_sp: number; // Unit Sale Price
};