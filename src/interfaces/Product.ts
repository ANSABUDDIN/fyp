export interface ProductCategoryData {
  _id?: string;
  code: string;
  name: string;
  description: string;
  categoryType: string | null;
}

export interface GeneralProductData {
  _id?: string;
  name: string;
  size: string;
  color: string;
  class: string;
  style: string;
  brand: string;
  description: string;
  perchasePrice: number;
  salePrice: number;
  wholeSalePrice: number;
}
export interface AccessoriesProductData {
  _id?: string;
  name: string;
  color: string;
  class: string;
  type: string;
  volume: number;
  brand: string;
  description: string;
  perchasePrice: number;
  salePrice: number;
  wholeSalePrice: number;
}
export interface KitProductData {
  _id?: string;
  name: string;
  class: string;
  solution: boolean | string;
  eyeDrop: boolean | string;
  stick: boolean | string;
  tusser: boolean | string;
  container: boolean | string;
  brand: string;
  solutionVolume: string;
  eyedropVolume: string;
  perchasePrice: number;
  salePrice: number;
  wholeSalePrice: number;
}
export interface LenseProductData {
  _id?: string;
  name: string;
  images?: string[];
  lenseColor: string;
  category: string;
  power: string;
  isPower: boolean;
  toneType: boolean;
  isKitInclude: boolean;
  brand: string;
  perchasePrice: number;
  salePrice: number;
  wholeSalePrice: number;
}

export interface CustomerData {
  _id?: string;
  name: string;
  email: string;
  whatsappNumber: string;
}

export interface VendorData {
  _id?: string;
  name: string;
  email: string;
  whatsappNumber: string;
  shopName: string;
  phoneNumber: string;
  address: string;
  city: string;
  website: string;
  socialLink: string;
  reference: string;
}

export interface PurchaseData {
  _id?: string;
  companyId: string;
  vendorId: string;
  productId: string;
  invoiceNumber: number;
  stockIn: string;
  stockOut: string;
  stockRetrun: string;
}
