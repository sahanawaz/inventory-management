import { JSX } from "react";
import { TextStyle, ViewStyle } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Billing: undefined;
  Inventory: undefined;
  Sales: undefined;
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
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: number | null;
  city: string | null;
  state: string | null;
  info: string | null;
  code: string | null;
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
  info1: string | null;
  info2: string | null;
  key: number;
  code: string;
  value: string;
  desc: string | null;
}

export interface DropdownOpts {
  catTypeOpts: SysOpt[];
  invTypeOpts: SysOpt[];
  colorOpts: SysOpt[];
  dimensionOpts: SysOpt[];
}

export interface InventoryItemType {
  inventoryType: string;
  categoryType: string;
  sku: string;
  color: string;
  dimension: string;
  unitCp: number;
  unitSp: number;
  purchasedQty: number;
  soldQty: number;
  avlQnt: number;
  date: string;
  particular: string;
}

export interface Inventory {
  id: number;
  unitCp: number;
  unitSp: number;
  date: string;
  stampUser: number;
  stampDate: string;
  inventoryDesc: string;
  inventoryType: SysOpt;
}

export interface Category {
  id: number;
  categoryType: SysOpt;
  color: SysOpt;
  dimension: SysOpt;
  stampUser: number;
  stampDate: string;
}

export interface InventoryInfo {
  id: number;
  inventory: Inventory;
  category: Category;
  purchasedQuantity: number;
  soldQuantity: number;
  inventorySku: string;
  stampUser: number;
  stampDate: string;
}

export interface BillItem {
  id: number;
  inventoryInfo: InventoryInfo;
  particulars: string;
  quantity: number;
  amount: number;
  taxAmount: number;
  info: string;
  stampUser: number;
  stampDate: string;
}

export interface Bill {
  id: number;
  customerId: CustomerClass;
  billAmount: number;
  taxAmount: number;
  taxPercent: number;
  discountAmount: number;
  billDate: string;
  stampUser: number;
  additionalCharges: number | null;
  billArr: BillItem[];
}

export interface SelectListProps {
  /**
   * State to accept the selected value
   */
  txtValue: any;
  /**
   * Fn to set Selected option value which will be stored in your local state
   */
  setSelected: Function;

  /**
   * Placeholder text that will be displayed in the select box
   */
  placeholder?: string;

  /**
   * Additional styles for select box
   */
  boxStyles?: ViewStyle;

  /**
   *  	Additional styles for text of select box
   */
  inputStyles?: TextStyle;

  /**
   *  	Additional styles for dropdown scrollview
   */
  dropdownStyles?: ViewStyle;

  /**
   *  Additional styles for dropdown list item
   */
  dropdownItemStyles?: ViewStyle;

  /**
   * Additional styles for list items text
   */
  dropdownTextStyles?: TextStyle;

  /**
   * Maximum height of the dropdown wrapper to occupy
   */
  maxHeight?: number;

  /**
   * Data which will be iterated as options of select list
   */
  data: Array<{}>;

  /**
   * The default option of the select list
   */
  defaultOption?: { key: any; value: any };

  /**
   * Pass any JSX to this prop like Text, Image or Icon to show instead of search icon
   */
  searchicon?: JSX.Element;

  /**
   *  Pass any JSX to this prop like Text, Image or Icon to show instead of chevron icon
   */
  arrowicon?: JSX.Element;

  /**
   * set to false if you dont want to use search functionality
   */
  search?: boolean;

  /**
   * set to false if you dont want to use search functionality
   */
  searchPlaceholder?: string;

  /**
   * Trigger an action when option is selected
   */
  onSelect?: () => void;

  /**
   * set fontFamily of whole component Text
   */
  fontFamily?: string;

  /**
   * set this to change the default search failure text
   */
  notFoundText?: string;

  /**
   * Additional styles for disabled list item
   */
  disabledItemStyles?: ViewStyle;

  /**
   * Additional styles for disabled list items text
   */
  disabledTextStyles?: TextStyle;

  /**
   * What to store inside your local state (key or value)
   */
  save?: "key" | "value";

  /**
   * Control the dropdown with this prop
   */
  dropdownShown?: boolean;

  /**
   *  Pass any JSX to this prop like Text, Image or Icon to show instead of close icon
   */
  closeicon?: JSX.Element;
}

export interface MultipleSelectListProps {
  /**
   * Fn to set Selected option value which will be stored in your local state
   */
  setSelected: Function;

  /**
   * Placeholder text that will be displayed in the select box
   */
  placeholder?: string;

  /**
   * Additional styles for select box
   */
  boxStyles?: ViewStyle;

  /**
   *  	Additional styles for text of select box
   */
  inputStyles?: TextStyle;

  /**
   *  	Additional styles for dropdown scrollview
   */
  dropdownStyles?: ViewStyle;

  /**
   *  Additional styles for dropdown list item
   */
  dropdownItemStyles?: ViewStyle;

  /**
   * Additional styles for list items text
   */
  dropdownTextStyles?: TextStyle;

  /**
   * Maximum height of the dropdown wrapper to occupy
   */
  maxHeight?: number;

  /**
   * Data which will be iterated as options of select list
   */
  data: Array<{}>;

  /**
   * The default option of the select list
   */
  defaultOption?: { key: any; value: any };

  /**
   * Pass any JSX to this prop like Text, Image or Icon to show instead of search icon
   */
  searchicon?: JSX.Element;

  /**
   *  Pass any JSX to this prop like Text, Image or Icon to show instead of chevron icon
   */
  arrowicon?: JSX.Element;

  /**
   * set to false if you dont want to use search functionality
   */
  search?: boolean;

  /**
   * set to false if you dont want to use search functionality
   */
  searchPlaceholder?: string;

  /**
   * Trigger an action when option is selected
   */
  onSelect?: () => void;

  /**
   * set text of label which appears soon after multiple values are selected
   */
  label?: string;

  /**
   * set fontFamily of whole component Text
   */
  fontFamily?: string;

  /**
   * set this to change the default search failure text
   */
  notFoundText?: string;

  /**
   * Additional styles for disabled list item
   */
  disabledItemStyles?: ViewStyle;

  /**
   * Additional styles for disabled list items text
   */
  disabledTextStyles?: TextStyle;

  /**
   * Additional styles for disabled checkbox
   */
  disabledCheckBoxStyles?: ViewStyle;

  /**
   * Additional styles for checkbox
   */
  checkBoxStyles?: ViewStyle;

  /**
   * What to store inside your local state (key or value)
   */
  save?: "key" | "value";

  /**
   * Control the dropdown with this prop
   */
  dropdownShown?: boolean;

  /**
   *  Pass any JSX to this prop like Text, Image or Icon to show instead of close icon
   */
  closeicon?: JSX.Element;

  /**
   * Additional styles for multiselect badge
   */
  badgeStyles?: ViewStyle;

  /**
   * Additional styles for multiselect badge text
   */
  badgeTextStyles?: ViewStyle;

  /**
   * Additional styles for label
   */
  labelStyles?: TextStyle;
}
